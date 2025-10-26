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
  
  // Determine current language from request
  const currentLanguage = req && req.language ? req.language : 'en';
  
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
          articles.push(articleData);
        }
      }
    });
  }
  
  return articles;
}

// Get knowledge base index page
export const getIndex = (req, res) => {
  const articles = loadKnowledgeArticles(req);
  res.render('knowledge/index', { 
    title: 'Knowledge Base',
    articles
  });
};

// Search articles
export const searchArticles = (req, res) => {
  const query = req.query.q ? req.query.q.toLowerCase() : '';
  
  if (!query) {
    return res.redirect('/knowledge');
  }
  
  const articles = loadKnowledgeArticles(req);
  const results = articles.filter(article => 
    article.title.toLowerCase().includes(query) || 
    (article.content && article.content.toLowerCase().includes(query)) ||
    (article.category && article.category.toLowerCase().includes(query))
  );
  
  // Convert markdown to HTML for search results
  results.forEach(article => {
    if (article.content) {
      article.excerptHtml = marked.parse(article.content.substring(0, 300) + '...');
    }
  });
  
  res.render('knowledge/search', { 
    title: 'Knowledge Base Search Results',
    results,
    query
  });
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
