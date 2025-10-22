// Knowledge base controller
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const hljs = require('highlight.js');

// Configure marked with highlight.js
marked.setOptions({
  highlight: function(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-'
});

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
exports.getIndex = (req, res) => {
  const articles = loadKnowledgeArticles();
  res.render('knowledge/index', { 
    title: 'Knowledge Base',
    articles
  });
};

// Search articles
exports.searchArticles = (req, res) => {
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
exports.getArticle = (req, res) => {
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
  
  // Convert markdown to HTML
  const articleHtml = marked.parse(article.content || '');
  
  res.render('knowledge/article', { 
    title: article.title,
    article: {
      ...article,
      contentHtml: articleHtml
    }
  });
};