import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import hljs from 'highlight.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to parse frontmatter and content from Markdown files
function parseMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (match) {
    const frontmatter = match[1];
    const markdownContent = match[2];
    
    // Parse frontmatter
    const frontmatterLines = frontmatter.split('\n');
    const metadata = {};
    frontmatterLines.forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        metadata[key.trim()] = valueParts.join(':').trim();
      }
    });
    
    return {
      id: path.basename(filePath, '.md'),
      title: metadata.title,
      category: metadata.category,
      excerpt: metadata.excerpt,
      content: markdownContent,
      language: metadata.language
    };
  }
  
  // If no frontmatter, parse the whole file
  return {
    id: path.basename(filePath, '.md'),
    title: path.basename(filePath, '.md'),
    content: content,
    language: 'en'
  };
}

// Function to highlight search terms in text
function highlightText(text, query) {
  if (!text || !query) return text;
  
  // Escape special regex characters in query
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Create regex to match the query (case insensitive)
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  
  // Replace matches with highlighted version
  return text.replace(regex, '<mark>$1</mark>');
}

// Function to calculate search relevance score
function calculateRelevance(article, query) {
  const lowerQuery = query.toLowerCase();
  let score = 0;
  
  // Title match (highest priority)
  if (article.title && article.title.toLowerCase().includes(lowerQuery)) {
    score += 100;
  }
  
  // Category match (medium priority)
  if (article.category && article.category.toLowerCase().includes(lowerQuery)) {
    score += 50;
  }
  
  // Excerpt match (lower priority)
  if (article.excerpt && article.excerpt.toLowerCase().includes(lowerQuery)) {
    score += 30;
  }
  
  // Content match (lowest priority)
  if (article.content && article.content.toLowerCase().includes(lowerQuery)) {
    score += 10;
  }
  
  return score;
}

// Function to generate table of contents from markdown content
function generateTOCFromContent(content) {
  const headers = [];
  const lines = content.split('\n');
  const headerIds = new Set(); // Keep track of IDs to ensure uniqueness
  
  lines.forEach(line => {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headerMatch) {
      const level = headerMatch[1].length;
      const text = headerMatch[2].trim();
      // Ensure text is a string before processing
      const headerText = typeof text === 'string' ? text : String(text);
      
      // Create a simple slug from the text
      let id = headerText.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      // Ensure unique IDs
      let uniqueId = id;
      let counter = 1;
      while (headerIds.has(uniqueId)) {
        uniqueId = `${id}-${counter}`;
        counter++;
      }
      headerIds.add(uniqueId);
      
      headers.push({ level, text: headerText, id: uniqueId });
    }
  });
  
  return headers;
}

// Function to load all knowledge base articles from Markdown files
function loadKnowledgeArticles(req) {
  const knowledgeDir = path.join(__dirname, '..', 'docs', 'knowledge');
  const articles = [];
  
  // Determine current language from request, mapping language variants to base languages
  const currentLanguage = req && req.language ? 
    (req.language.startsWith('en') ? 'en' : req.language) : 'en';
  
  // Load articles from main directory
  if (fs.existsSync(knowledgeDir)) {
    const files = fs.readdirSync(knowledgeDir);
    
    files.forEach(file => {
      if (file.endsWith('.md')) {
        const filePath = path.join(knowledgeDir, file);
        const articleData = parseMarkdownFile(filePath);
        
        if (articleData) {
          // Add language information
          articleData.language = articleData.language || 'en';
          // Only include articles that match the current language or are in the main directory (English)
          if (articleData.language === currentLanguage || (!articleData.language && currentLanguage === 'en')) {
            // Generate excerpt if missing or too short
            if (!articleData.excerpt || articleData.excerpt.length < 50) {
              // Create excerpt from content (first paragraph or first 200 characters)
              const contentWithoutHeaders = articleData.content.replace(/^(#{1,6}\s+.+\n?)/gm, '').trim();
              const firstParagraph = contentWithoutHeaders.split('\n\n')[0] || contentWithoutHeaders.substring(0, 200);
              articleData.excerpt = firstParagraph.substring(0, 200) + (firstParagraph.length > 200 ? '...' : '');
            }
            articles.push(articleData);
          }
        }
      }
    });
  }
  
  // Load articles from language-specific directory
  const langKnowledgeDir = path.join(knowledgeDir, currentLanguage);
  if (currentLanguage !== 'en' && fs.existsSync(langKnowledgeDir)) {
    const langFiles = fs.readdirSync(langKnowledgeDir);
    
    langFiles.forEach(file => {
      if (file.endsWith('.md')) {
        const filePath = path.join(langKnowledgeDir, file);
        const articleData = parseMarkdownFile(filePath);
        
        if (articleData) {
          // Add language information
          articleData.language = currentLanguage;
          // Generate excerpt if missing or too short
          if (!articleData.excerpt || articleData.excerpt.length < 50) {
            // Create excerpt from content (first paragraph or first 200 characters)
            const contentWithoutHeaders = articleData.content.replace(/^(#{1,6}\s+.+\n?)/gm, '').trim();
            const firstParagraph = contentWithoutHeaders.split('\n\n')[0] || contentWithoutHeaders.substring(0, 200);
            articleData.excerpt = firstParagraph.substring(0, 200) + (firstParagraph.length > 200 ? '...' : '');
          }
          articles.push(articleData);
        }
      }
    });
  }
  
  return articles;
}

// Function to group articles by common categories
function groupArticlesByCategory(articles) {
  const categoryGroups = {
    'Core VMware Technologies': ['Storage', 'Compute', 'Networking', 'Security', 'Virtualization'],
    'Management & Operations': ['Installation', 'Monitoring', 'Automation', 'Updates'],
    'Disaster Recovery & Backup': ['Disaster Recovery', 'Backup'],
    'Performance & Optimization': ['Performance', 'Resource Management', 'Tuning'],
    'Advanced Features': ['Kubernetes', 'Tanzu', 'vSAN', 'SRM']
  };
  
  const groupedArticles = {};
  
  // Initialize groups
  Object.keys(categoryGroups).forEach(group => {
    groupedArticles[group] = [];
  });
  
  // Articles that don't fit into any group go to "Other"
  groupedArticles['Other'] = [];
  
  articles.forEach(article => {
    let placed = false;
    
    // Check each category group
    Object.keys(categoryGroups).forEach(group => {
      if (categoryGroups[group].some(cat => 
        article.category && article.category.toLowerCase().includes(cat.toLowerCase()))) {
        groupedArticles[group].push(article);
        placed = true;
      }
    });
    
    // If not placed in any group, put in "Other"
    if (!placed) {
      groupedArticles['Other'].push(article);
    }
  });
  
  // Remove empty groups
  Object.keys(groupedArticles).forEach(group => {
    if (groupedArticles[group].length === 0) {
      delete groupedArticles[group];
    }
  });
  
  return groupedArticles;
}

// Get knowledge base index page
export const getIndex = (req, res) => {
  const articles = loadKnowledgeArticles(req);
  const groupedArticles = groupArticlesByCategory(articles);
  res.render('knowledge/index', { 
    title: 'Knowledge Base',
    articles,
    groupedArticles
  });
};

// Search articles with improved ranking and highlighting
export const searchArticles = (req, res) => {
  const query = req.query.q ? req.query.q.toLowerCase() : '';
  
  if (!query) {
    return res.redirect('/knowledge');
  }
  
  const articles = loadKnowledgeArticles(req);
  
  // Filter and rank articles
  const rankedResults = articles
    .map(article => {
      // Check if article matches the query
      const matches = 
        (article.title && article.title.toLowerCase().includes(query)) ||
        (article.category && article.category.toLowerCase().includes(query)) ||
        (article.excerpt && article.excerpt.toLowerCase().includes(query)) ||
        (article.content && article.content.toLowerCase().includes(query));
      
      if (!matches) return null;
      
      // Calculate relevance score
      const relevance = calculateRelevance(article, query);
      
      // Highlight query in title, category, and excerpt
      const highlightedTitle = article.title ? highlightText(article.title, query) : article.title;
      const highlightedCategory = article.category ? highlightText(article.category, query) : article.category;
      const highlightedExcerpt = article.excerpt ? highlightText(article.excerpt, query) : article.excerpt;
      
      return {
        ...article,
        relevance,
        title: highlightedTitle,
        category: highlightedCategory,
        excerpt: highlightedExcerpt
      };
    })
    .filter(article => article !== null)
    .sort((a, b) => b.relevance - a.relevance); // Sort by relevance (highest first)
  
  // Convert markdown to HTML for search results
  rankedResults.forEach(article => {
    if (article.content) {
      // If we have a highlighted excerpt, use it directly (it already contains HTML highlighting)
      if (article.excerpt && article.excerpt.includes('<mark>')) {
        // The excerpt is already highlighted, just add ellipsis if needed
        article.excerptHtml = article.excerpt + (article.excerpt.length < article.content.length ? '...' : '');
      } else {
        // If no highlighting, create excerpt from content and parse it
        const rawExcerpt = article.excerpt ? article.excerpt : (article.content.substring(0, 300) + '...');
        article.excerptHtml = marked.parse(rawExcerpt);
      }
    }
  });
  
  res.render('knowledge/search', { 
    title: 'Knowledge Base Search Results',
    results: rankedResults,
    query
  });
};

// API endpoint to get search suggestions
export const getSearchSuggestions = (req, res) => {
  const query = req.query.q || '';
  
  if (!query || query.length < 2) {
    return res.json([]);
  }
  
  const articles = loadKnowledgeArticles(req);
  const suggestions = [];
  
  // Collect unique articles that match the query
  const uniqueArticles = new Set();
  
  articles.forEach(article => {
    // Check if article title or category matches the query
    if ((article.title && article.title.toLowerCase().includes(query.toLowerCase())) ||
        (article.category && article.category.toLowerCase().includes(query.toLowerCase()))) {
      // Only add if not already added
      if (!uniqueArticles.has(article.title)) {
        uniqueArticles.add(article.title);
        suggestions.push({
          id: article.id,
          title: article.title,
          category: article.category
        });
      }
    }
  });
  
  // Limit to 10 suggestions
  const limitedSuggestions = suggestions.slice(0, 10);
  
  res.json(limitedSuggestions);
};

// Get specific article
export const getArticle = (req, res) => {
  const articleId = req.params.id;
  const articles = loadKnowledgeArticles(req);
  const article = articles.find(a => a.id === articleId);
  
  if (!article) {
    return res.status(404).render('error', {
      title: 'Article Not Found',
      message: 'The requested knowledge base article was not found.',
      error: {}
    });
  }
  
  // Configure marked with highlight.js and custom renderer
  const renderer = new marked.Renderer();
  
  // Keep track of header IDs to ensure uniqueness
  const headerIds = new Set();
  
  // Custom header renderer to add IDs
  renderer.heading = function(text, level, raw, slugger) {
    // Ensure text is a string - this is the key fix
    let headerText;
    if (typeof text === 'string') {
      headerText = text;
    } else if (text && typeof text === 'object') {
      // If it's an object, try to convert it properly
      headerText = text.text || text.content || JSON.stringify(text);
    } else {
      headerText = String(text);
    }
    
    // Ensure level is a valid number (default to 2 if invalid)
    const validLevel = (typeof level === 'number' && level >= 1 && level <= 6) ? level : 2;
    
    // Create a simple slug from the text
    let id = headerText.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    // Ensure unique IDs
    let uniqueId = id;
    let counter = 1;
    while (headerIds.has(uniqueId)) {
      uniqueId = `${id}-${counter}`;
      counter++;
    }
    headerIds.add(uniqueId);
    
    return `<h${validLevel} id="${uniqueId}">${headerText}</h${validLevel}>`;
  };
  
  marked.setOptions({
    highlight: function(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-',
    renderer: renderer
  });
  
  // Convert markdown to HTML
  let articleHtml = marked.parse(article.content || '');
  
  // Add copy buttons to code blocks
  articleHtml = articleHtml.replace(/<pre><code class="([^"]*?)">([\s\S]*?)<\/code><\/pre>/g, 
    function(match, langClass, codeContent) {
      // Remove HTML entities and clean up the code content for clipboard
      const cleanCode = codeContent
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
      
      return '<div class="code-block-wrapper">' +
        '<pre><code class="' + langClass + '">' + codeContent + '</code></pre>' +
        '<button class="btn btn-outline-primary btn-sm copy-btn" data-clipboard-text="' + cleanCode.trim() + '">' +
        '<i class="bi bi-clipboard"></i> Copy' +
        '</button>' +
        '</div>';
    }
  );
  
  // Also handle code blocks without language class
  articleHtml = articleHtml.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, 
    function(match, codeContent) {
      // Remove HTML entities and clean up the code content for clipboard
      const cleanCode = codeContent
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
      
      return '<div class="code-block-wrapper">' +
        '<pre><code>' + codeContent + '</code></pre>' +
        '<button class="btn btn-outline-primary btn-sm copy-btn" data-clipboard-text="' + cleanCode.trim() + '">' +
        '<i class="bi bi-clipboard"></i> Copy' +
        '</button>' +
        '</div>';
    }
  );
  
  // Generate TOC from content AFTER processing with marked
  // This ensures the IDs match between the content and TOC
  const headers = generateTOCFromContent(article.content || '');
  
  // Create a clean article object with only the properties we need
  const cleanArticle = {
    id: String(article.id || ''),
    title: String(article.title || ''),
    category: String(article.category || ''),
    excerpt: String(article.excerpt || ''),
    contentHtml: String(articleHtml || ''),
    headers: headers || []
  };
  
  res.render('knowledge/article', { 
    title: article.title,
    article: cleanArticle
  });
};
