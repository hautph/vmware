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
      content: markdownContent
    };
  }
  
  // If no frontmatter, parse the whole file
  return {
    id: path.basename(filePath, '.md'),
    title: path.basename(filePath, '.md'),
    content: content
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
function loadKnowledgeArticles() {
  const knowledgeDir = path.join(__dirname, '..', 'docs', 'knowledge');
  const articles = [];
  
  if (fs.existsSync(knowledgeDir)) {
    const files = fs.readdirSync(knowledgeDir);
    
    files.forEach(file => {
      if (file.endsWith('.md')) {
        const filePath = path.join(knowledgeDir, file);
        const articleData = parseMarkdownFile(filePath);
        
        if (articleData) {
          articles.push(articleData);
        }
      }
    });
  }
  
  return articles;
}

// Get knowledge base index page
export const getIndex = (req, res) => {
  const articles = loadKnowledgeArticles();
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
  
  const articles = loadKnowledgeArticles();
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
  const articles = loadKnowledgeArticles();
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
    
    return `<h${level} id="${uniqueId}">${headerText}</h${level}>`;
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
  const articleHtml = marked.parse(article.content || '');
  
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
