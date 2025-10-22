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
    
    // Split content into definition and other sections
    const sections = markdownContent.split('## ');
    const definition = sections[0].trim();
    
    // For backward compatibility, still extract code samples and configuration
    // But also keep the full content for display
    let codeSample = '';
    let configuration = '';
    let fullContent = markdownContent;
    
    for (let i = 1; i < sections.length; i++) {
      const section = sections[i];
      if (section.startsWith('Code Sample')) {
        // Extract just the code part, removing the header and code block markers
        const codeLines = section.split('\n').slice(1);
        const codeContent = codeLines.join('\n').trim();
        // Remove markdown code block markers
        codeSample = codeContent.replace(/```[a-z]*\n?/g, '').trim();
      } else if (section.startsWith('Configuration')) {
        // Extract just the configuration part, removing the header and code block markers
        const configLines = section.split('\n').slice(1);
        const configContent = configLines.join('\n').trim();
        // Remove markdown code block markers
        configuration = configContent.replace(/```[a-z]*\n?/g, '').trim();
      }
    }
    
    return {
      term: metadata.term || path.basename(filePath, '.md').replace(/-/g, ' '),
      title: metadata.title || metadata.term || path.basename(filePath, '.md').replace(/-/g, ' '),
      definition: definition,
      category: metadata.category,
      codeSample: codeSample,
      configuration: configuration,
      fullContent: fullContent
    };
  }
  
  return null;
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

// Function to load all glossary terms from Markdown files
function loadGlossaryTerms() {
  const glossaryDir = path.join(__dirname, '..', 'docs', 'glossary');
  const terms = {};
  
  if (fs.existsSync(glossaryDir)) {
    const files = fs.readdirSync(glossaryDir);
    
    files.forEach(file => {
      if (file.endsWith('.md')) {
        const filePath = path.join(glossaryDir, file);
        const termData = parseMarkdownFile(filePath);
        
        if (termData) {
          // Use filename without extension as the key
          const termKey = path.basename(file, '.md').toLowerCase();
          terms[termKey] = {
            ...termData,
            fileKey: termKey // Store the file key for URL mapping
          };
        }
      }
    });
  }
  
  return terms;
}

// Function to create a URL-friendly key from a term name
function createUrlKey(termName) {
  return termName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
}

// Function to find term by URL parameter
function findTermByUrlParam(terms, urlParam) {
  // First try direct match with file keys
  if (terms[urlParam]) {
    return terms[urlParam];
  }
  
  // Try to match by term name (for cases where URL param is the actual term name)
  const decodedParam = decodeURIComponent(urlParam).toLowerCase();
  for (const key in terms) {
    const term = terms[key];
    const termNameKey = createUrlKey(term.term);
    if (termNameKey === urlParam || term.term.toLowerCase() === decodedParam) {
      return term;
    }
  }
  
  return null;
}

// Function to group terms by category
function groupTermsByCategory(terms) {
  const categories = {};
  
  terms.forEach(term => {
    const category = term.category || 'Uncategorized';
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(term);
  });
  
  // Sort categories alphabetically
  const sortedCategories = {};
  Object.keys(categories).sort().forEach(key => {
    sortedCategories[key] = categories[key];
  });
  
  return sortedCategories;
}

// Get glossary index page with pagination and categorization
export const getIndex = (req, res) => {
  const terms = Object.values(loadGlossaryTerms());
  const categories = groupTermsByCategory(terms);
  
  // Pagination parameters
  const page = parseInt(req.query.page) || 1;
  const categoryFilter = req.query.category || 'all';
  const termsPerPage = 10;
  
  // Filter terms by category if specified
  let filteredTerms = terms;
  if (categoryFilter !== 'all') {
    filteredTerms = terms.filter(term => 
      term.category && term.category.toLowerCase() === categoryFilter.toLowerCase()
    );
  }
  
  // For category-based display, we'll show all categories but paginate within each
  // Calculate total terms and pages based on filtered terms
  const totalTerms = filteredTerms.length;
  const totalPages = Math.ceil(totalTerms / termsPerPage);
  
  // Group filtered terms by category for display
  const groupedTerms = groupTermsByCategory(filteredTerms);
  
  // For the current page, we need to determine which terms to show
  // We'll take termsPerPage terms total, distributed across categories
  const displayCategories = {};
  let termsAdded = 0;
  const startIndex = (page - 1) * termsPerPage;
  const endIndex = startIndex + termsPerPage;
  
  // Flatten all terms with their categories, sort by category name, then by term name
  const allTermsWithCategory = [];
  Object.keys(groupedTerms).sort().forEach(category => {
    groupedTerms[category].sort((a, b) => (a.term || '').localeCompare(b.term || '')); // Sort terms within category
    groupedTerms[category].forEach(term => {
      allTermsWithCategory.push({category, term});
    });
  });
  
  // Get the slice for current page
  const pageTerms = allTermsWithCategory.slice(startIndex, endIndex);
  
  // Group the page terms by category
  pageTerms.forEach(item => {
    if (!displayCategories[item.category]) {
      displayCategories[item.category] = [];
    }
    displayCategories[item.category].push(item.term);
  });
  
  res.render('glossary/index', { 
    title: 'VMware Glossary',
    terms: pageTerms.map(item => item.term).filter(term => term !== undefined),
    categories: Object.keys(groupTermsByCategory(terms)).sort(),
    displayCategories,
    currentPage: page,
    totalPages,
    totalTerms,
    categoryFilter,
    termsPerPage
  });
};

// Search glossary terms
export const searchTerms = (req, res) => {
  const query = req.query.q ? req.query.q.toLowerCase() : '';
  
  if (!query) {
    return res.redirect('/glossary');
  }
  
  const terms = loadGlossaryTerms();
  const results = Object.values(terms).filter(term => 
    term.term.toLowerCase().includes(query) || 
    term.definition.toLowerCase().includes(query) ||
    term.category.toLowerCase().includes(query)
  );
  
  res.render('glossary/search', { 
    title: 'Glossary Search Results',
    results,
    query
  });
};

// Get specific term
export const getTerm = (req, res) => {
  const termKey = req.params.term.toLowerCase();
  const allTerms = loadGlossaryTerms();
  const term = findTermByUrlParam(allTerms, termKey);
  
  if (!term) {
    return res.status(404).render('error', {
      title: 'Term Not Found',
      message: 'The requested VMware term was not found.',
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
  
  // Convert markdown content to HTML
  let fullContentHtml = marked.parse(term.fullContent || '');
  
  // Fix glossary links to use the correct URL format
  fullContentHtml = fullContentHtml.replace(/href="\/glossary\/(?!term\/)([^"]+)"/g, 'href="/glossary/term/$1"');
  
  // Find related terms (same category, excluding current term)
  const relatedTerms = Object.values(allTerms)
    .filter(t => t.category === term.category && t.term !== term.term)
    .slice(0, 5); // Limit to 5 related terms
  
  // Generate TOC from content AFTER processing with marked
  // This ensures the IDs match between the content and TOC
  const headers = generateTOCFromContent(term.fullContent || '');
  
  // Create a clean term object with only the properties we need
  const cleanTerm = {
    term: String(term.term || ''),
    title: String(term.title || ''),
    category: String(term.category || ''),
    definition: String(term.definition || ''),
    codeSample: String(term.codeSample || ''),
    configuration: String(term.configuration || ''),
    fullContentHtml: String(fullContentHtml || ''),
    headers: headers || [],
    fileKey: String(term.fileKey || '')
  };
  
  res.render('glossary/term', { 
    title: term.title,
    term: cleanTerm,
    relatedTerms: relatedTerms
  });
};
