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
      fullContent: fullContent,
      language: metadata.language || 'en' // Add language information
    };
  }
  
  return null;
}

// Function to generate table of contents from markdown content
function generateTOCFromContent(content) {
  const headers = [];
  const lines = content.split('\n');
  const headerIds = new Set(); // Keep track of IDs to ensure uniqueness
  
  // Track if we're inside a code block
  let inCodeBlock = false;
  
  lines.forEach(line => {
    // Check for code block markers
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      return; // Skip code block markers
    }
    
    // Skip headers inside code blocks
    if (inCodeBlock) {
      return;
    }
    
    // Look for headers outside of code blocks
    const headerMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headerMatch) {
      const level = headerMatch[1].length;
      const text = headerMatch[2].trim();
      // Ensure text is a string before processing
      const headerText = typeof text === 'string' ? text : String(text);
      
      // Skip headers that are likely code comments or contain "copy"
      if (headerText.toLowerCase().includes('copy') || 
          headerText.startsWith('#') || 
          headerText.match(/^[\$#>]/)) {
        return;
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
      
      headers.push({ level, text: headerText, id: uniqueId });
    }
  });
  
  return headers;
}

// Function to load all glossary terms from Markdown files
function loadGlossaryTerms(req) {
  const glossaryDir = path.join(__dirname, '..', 'docs', 'glossary');
  const terms = {};
  
  // Determine current language from request
  const currentLanguage = req && req.language ? req.language : 'en';
  
  // Load terms from main directory
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
            fileKey: termKey, // Store the file key for URL mapping
            language: termData.language || 'en' // Default to English if not specified
          };
        }
      }
    });
  }
  
  // Load terms from Vietnamese directory
  const viGlossaryDir = path.join(glossaryDir, 'vi');
  if (fs.existsSync(viGlossaryDir)) {
    const viFiles = fs.readdirSync(viGlossaryDir);
    
    viFiles.forEach(file => {
      if (file.endsWith('.md')) {
        const filePath = path.join(viGlossaryDir, file);
        const termData = parseMarkdownFile(filePath);
        
        if (termData) {
          // Use filename without extension as the key, with 'vi/' prefix for Vietnamese terms
          const termKey = 'vi/' + path.basename(file, '.md').toLowerCase();
          terms[termKey] = {
            ...termData,
            fileKey: termKey, // Store the file key for URL mapping
            language: termData.language || 'vi' // Default to Vietnamese for vi directory
          };
        }
      }
    });
  }
  
  // Filter terms by current language
  const filteredTerms = {};
  Object.keys(terms).forEach(key => {
    const term = terms[key];
    // For English, show terms with language 'en' or no language specified
    // For Vietnamese, show terms with language 'vi'
    if ((currentLanguage === 'en' && (term.language === 'en' || !term.language)) ||
        (currentLanguage === 'vi' && term.language === 'vi')) {
      filteredTerms[key] = term;
    }
  });
  
  return filteredTerms;
}

// Function to create a URL-friendly key from a term name
function createUrlKey(termName) {
  return termName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
}

// Function to find term by URL parameter
function findTermByUrlParam(terms, urlParam) {
  console.log('Searching for term with urlParam:', urlParam);
  
  // First try direct match with file keys
  if (terms[urlParam]) {
    console.log('Found direct match for term:', urlParam);
    return terms[urlParam];
  }
  
  console.log('No direct match found, trying term name match');
  
  // Try to match by term name (for cases where URL param is the actual term name)
  const decodedParam = decodeURIComponent(urlParam).toLowerCase();
  console.log('Decoded param:', decodedParam);
  
  for (const key in terms) {
    const term = terms[key];
    const termNameKey = createUrlKey(term.term);
    console.log(`Checking key: ${key}, termNameKey: ${termNameKey}, term: ${term.term}`);
    if (termNameKey === urlParam || term.term.toLowerCase() === decodedParam) {
      console.log('Found term by name match:', term.title);
      return term;
    }
  }
  
  console.log('No term found for urlParam:', urlParam);
  return null;
}

// Function to group terms by category
function groupTermsByCategory(terms) {
  const categories = {};
  
  terms.forEach(term => {
    const category = normalizeCategoryForDisplay(term.category) || 'Uncategorized';
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

// Function to normalize category names for URL parameters
function normalizeCategoryForUrl(category) {
  if (!category) return '';
  // Convert spaces to underscores for URL parameters
  return category.replace(/\s+/g, '_');
}

// Function to normalize category names for display/lookup
function normalizeCategoryForDisplay(category) {
  if (!category) return '';
  // Keep underscores for lookup since translation keys use underscores
  return category.replace(/\s+/g, '_');
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
function calculateRelevance(term, query) {
  const lowerQuery = query.toLowerCase();
  let score = 0;
  
  // Title match (highest priority)
  if (term.title && term.title.toLowerCase().includes(lowerQuery)) {
    score += 100;
  }
  
  // Term name match (high priority)
  if (term.term && term.term.toLowerCase().includes(lowerQuery)) {
    score += 80;
  }
  
  // Category match (medium priority)
  if (term.category && term.category.toLowerCase().includes(lowerQuery)) {
    score += 50;
  }
  
  // Definition match (lower priority)
  if (term.definition && term.definition.toLowerCase().includes(lowerQuery)) {
    score += 20;
  }
  
  // Full content match (lowest priority)
  if (term.fullContent && term.fullContent.toLowerCase().includes(lowerQuery)) {
    score += 10;
  }
  
  return score;
}

// Helper function to clean and prepare code content for clipboard
function cleanCodeForClipboard(codeContent) {
  // First decode HTML entities
  let cleanCode = codeContent
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&apos;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&#(\d+);/g, function(match, dec) {
      return String.fromCharCode(dec);
    })
    .replace(/&#x([0-9a-fA-F]+);/g, function(match, hex) {
      return String.fromCharCode(parseInt(hex, 16));
    });
  
  // Remove any remaining HTML tags
  cleanCode = cleanCode.replace(/<[^>]*>/g, '');
  
  // Second pass to ensure all entities are decoded
  cleanCode = cleanCode
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
  
  // Clean up extra whitespace while preserving structure
  cleanCode = cleanCode
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\t/g, '    ') // Convert tabs to spaces
    .trim();
  
  return cleanCode;
}

// Helper function to escape text for HTML attributes
function escapeForHtmlAttribute(text) {
  return text
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\n/g, '\\n') // Use JavaScript-style escaping for newlines
    .replace(/\r/g, '');
}

// Get glossary index page with pagination and categorization
export const getIndex = (req, res) => {
  const terms = Object.values(loadGlossaryTerms(req));
  const categories = groupTermsByCategory(terms);
  
  // Pagination parameters
  const page = parseInt(req.query.page) || 1;
  const categoryFilter = req.query.category || 'all';
  const termsPerPage = 12; // Increased from 10 to load more terms initially
  
  // Filter terms by category if specified
  let filteredTerms = terms;
  if (categoryFilter !== 'all') {
    // Normalize the filter to handle both underscore and space formats
    const normalizedFilter = normalizeCategoryForUrl(categoryFilter);
    filteredTerms = terms.filter(term => {
      if (!term.category) return false;
      // Normalize term category for comparison
      const normalizedTermCategory = normalizeCategoryForDisplay(term.category);
      return normalizedTermCategory.toLowerCase() === normalizedFilter.toLowerCase();
    });
  }
  
  // For "All Categories", we'll load all terms but still group them by category
  // For specific categories, we'll use pagination
  let displayCategories = {};
  let totalTerms = filteredTerms.length;
  let totalPages = Math.ceil(totalTerms / termsPerPage);
  
  if (categoryFilter === 'all') {
    // For "All Categories", load all terms but limit initial display
    displayCategories = groupTermsByCategory(filteredTerms);
    totalPages = Math.ceil(totalTerms / termsPerPage);
    
    // Limit initial display to first page of terms
    const startIndex = (page - 1) * termsPerPage;
    const endIndex = startIndex + termsPerPage;
    
    // Flatten all terms with their categories, sort by category name, then by term name
    const allTermsWithCategory = [];
    Object.keys(displayCategories).sort().forEach(category => {
      displayCategories[category].sort((a, b) => (a.term || '').localeCompare(b.term || '')); // Sort terms within category
      displayCategories[category].forEach(term => {
        allTermsWithCategory.push({category, term});
      });
    });
    
    // Get the slice for current page
    const pageTerms = allTermsWithCategory.slice(startIndex, endIndex);
    
    // Regroup the page terms by category
    displayCategories = {};
    pageTerms.forEach(item => {
      if (!displayCategories[item.category]) {
        displayCategories[item.category] = [];
      }
      displayCategories[item.category].push(item.term);
    });
  } else {
    // For specific categories, use pagination as before
    totalPages = Math.ceil(totalTerms / termsPerPage);
    
    // Group filtered terms by category for display
    const groupedTerms = groupTermsByCategory(filteredTerms);
    
    // Group filtered terms by category for display
    displayCategories = {};
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
  }
  
  // Create unique list of categories with normalized names
  const uniqueCategories = [...new Set(Object.keys(groupTermsByCategory(terms)))];
  const urlSafeCategories = uniqueCategories
    .map(category => normalizeCategoryForUrl(category))
    .sort();
  
  res.render('glossary/index', { 
    title: 'VMware Glossary',
    terms: Object.values(displayCategories).flat().filter(term => term !== undefined),
    categories: urlSafeCategories,
    displayCategories,
    currentPage: page,
    totalPages: totalPages,
    totalTerms: totalTerms,
    categoryFilter: normalizeCategoryForUrl(categoryFilter),
    termsPerPage
  });
};

// API endpoint to load more glossary terms for lazy loading
export const getMoreTerms = (req, res) => {
  const terms = Object.values(loadGlossaryTerms(req));
  const categoryFilter = req.query.category || 'all';
  const page = parseInt(req.query.page) || 1;
  const termsPerPage = 12; // Match the initial page size
  
  // Filter terms by category if specified
  let filteredTerms = terms;
  if (categoryFilter !== 'all') {
    // Normalize the filter to handle both underscore and space formats
    const normalizedFilter = normalizeCategoryForUrl(categoryFilter);
    filteredTerms = terms.filter(term => {
      if (!term.category) return false;
      // Normalize term category for comparison
      const normalizedTermCategory = normalizeCategoryForDisplay(term.category);
      return normalizedTermCategory.toLowerCase() === normalizedFilter.toLowerCase();
    });
  }
  
  // Group filtered terms by category for display
  const groupedTerms = groupTermsByCategory(filteredTerms);
  
  // Calculate pagination
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
  const displayCategories = {};
  pageTerms.forEach(item => {
    if (!displayCategories[item.category]) {
      displayCategories[item.category] = [];
    }
    displayCategories[item.category].push(item.term);
  });
  
  // Check if there are more terms to load
  const hasMore = endIndex < allTermsWithCategory.length;
  
  res.json({
    displayCategories,
    hasMore,
    nextPage: page + 1,
    totalTerms: filteredTerms.length // Add total terms count for accurate display
  });
};

// API endpoint to get search suggestions
export const getSearchSuggestions = (req, res) => {
  const query = req.query.q || '';
  
  if (!query || query.length < 2) {
    return res.json([]);
  }
  
  const terms = Object.values(loadGlossaryTerms(req));
  const suggestions = [];
  
  // Collect unique terms that match the query
  const uniqueTerms = new Set();
  
  terms.forEach(term => {
    // Check if term title or name matches the query
    if ((term.title && term.title.toLowerCase().includes(query.toLowerCase())) ||
        (term.term && term.term.toLowerCase().includes(query.toLowerCase()))) {
      // Only add if not already added
      if (!uniqueTerms.has(term.term)) {
        uniqueTerms.add(term.term);
        suggestions.push({
          term: term.term,
          title: term.title,
          category: term.category
        });
      }
    }
  });
  
  // Sort suggestions by relevance (title match first, then term match)
  suggestions.sort((a, b) => {
    const aTitleMatch = a.title && a.title.toLowerCase().includes(query.toLowerCase());
    const bTitleMatch = b.title && b.title.toLowerCase().includes(query.toLowerCase());
    
    // If one has title match and other doesn't, prioritize title match
    if (aTitleMatch && !bTitleMatch) return -1;
    if (!aTitleMatch && bTitleMatch) return 1;
    
    // If both have title match or both don't, sort alphabetically
    const aTitle = (a.title || a.term).toLowerCase();
    const bTitle = (b.title || b.term).toLowerCase();
    return aTitle.localeCompare(bTitle);
  });
  
  // Limit to 10 suggestions
  const limitedSuggestions = suggestions.slice(0, 10);
  
  res.json(limitedSuggestions);
};

// Search glossary terms with improved ranking and highlighting
export const searchTerms = (req, res) => {
  const query = req.query.q ? req.query.q.toLowerCase() : '';
  
  if (!query) {
    return res.redirect('/glossary');
  }
  
  const terms = Object.values(loadGlossaryTerms(req));
  
  // Filter and rank terms
  const rankedResults = terms
    .map(term => {
      // Check if term matches the query
      const matches = 
        (term.title && term.title.toLowerCase().includes(query)) ||
        (term.term && term.term.toLowerCase().includes(query)) ||
        (term.definition && term.definition.toLowerCase().includes(query)) ||
        (term.category && term.category.toLowerCase().includes(query)) ||
        (term.fullContent && term.fullContent.toLowerCase().includes(query));
      
      if (!matches) return null;
      
      // Calculate relevance score
      const relevance = calculateRelevance(term, query);
      
      // Highlight query in title, term, and definition
      const highlightedTitle = term.title ? highlightText(term.title, query) : term.title;
      const highlightedTerm = term.term ? highlightText(term.term, query) : term.term;
      const highlightedDefinition = term.definition ? highlightText(term.definition, query) : term.definition;
      
      return {
        ...term,
        relevance,
        title: highlightedTitle,
        term: highlightedTerm,
        definition: highlightedDefinition
      };
    })
    .filter(term => term !== null)
    .sort((a, b) => b.relevance - a.relevance); // Sort by relevance (highest first)
  
  res.render('glossary/search', { 
    title: 'Glossary Search Results',
    results: rankedResults,
    query
  });
};

// Get specific term
export const getTerm = (req, res) => {
  // Handle both route patterns:
  // 1. /glossary/term/:singleSegment (for English terms like "esxi")
  // 2. /glossary/term/:firstSegment/:secondSegment (for Vietnamese terms like "vi/guest-operating-system")
  
  let termPath;
  
  if (req.params.secondSegment) {
    // Two-segment path like "vi/guest-operating-system"
    termPath = req.params.firstSegment + '/' + req.params.secondSegment;
  } else {
    // Single-segment path like "esxi"
    termPath = req.params.singleSegment;
  }
  
  console.log('Term path extracted:', termPath);
  
  const termKey = termPath.toLowerCase();
  console.log('Term key to search:', termKey);
  
  const allTerms = loadGlossaryTerms(req);
  console.log('Available terms count:', Object.keys(allTerms).length);
  
  // Log some of the available terms to see what keys we have
  const termKeys = Object.keys(allTerms);
  console.log('First 10 term keys:', termKeys.slice(0, 10));
  
  const term = findTermByUrlParam(allTerms, termKey);
  
  console.log('Found term:', term ? term.title : 'Not found');
  
  if (!term) {
    console.log('Term not found, returning 404');
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
    
    // Ensure level is a valid number (default to 2 if invalid)
    const validLevel = (typeof level === 'number' && level >= 1 && level <= 6) ? level : 2;
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
  
  // Convert markdown content to HTML
  let fullContentHtml = marked.parse(term.fullContent || '');
  
  // Add copy buttons to code blocks
  fullContentHtml = fullContentHtml.replace(/<pre><code class="([^"]*?)">([\s\S]*?)<\/code><\/pre>/g, 
    function(match, langClass, codeContent) {
      // Clean the code content for clipboard
      const cleanCode = cleanCodeForClipboard(codeContent);
      
      // Escape for HTML attribute
      const escapedCleanCode = escapeForHtmlAttribute(cleanCode);
      
      return '<div class="code-block-wrapper">' +
        '<pre><code class="' + langClass + '">' + codeContent + '</code></pre>' +
        '<button class="btn btn-outline-primary btn-sm copy-btn" data-clipboard-text="' + escapedCleanCode + '">' +
        '<i class="bi bi-clipboard"></i>' +
        '</button>' +
        '</div>';
    }
  );
  
  // Also handle code blocks without language class
  fullContentHtml = fullContentHtml.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, 
    function(match, codeContent) {
      // Clean the code content for clipboard
      const cleanCode = cleanCodeForClipboard(codeContent);
      
      // Escape for HTML attribute
      const escapedCleanCode = escapeForHtmlAttribute(cleanCode);
      
      return '<div class="code-block-wrapper">' +
        '<pre><code>' + codeContent + '</code></pre>' +
        '<button class="btn btn-outline-primary btn-sm copy-btn" data-clipboard-text="' + escapedCleanCode + '">' +
        '<i class="bi bi-clipboard"></i>' +
        '</button>' +
        '</div>';
    }
  );
  
  // Fix glossary links to use the correct URL format
  fullContentHtml = fullContentHtml.replace(/href="\/glossary\/(?!term\/)([^"]+)"/g, 'href="/glossary/term/$1"');
  
  // Also fix links that already have term/ but might have .md extensions
  fullContentHtml = fullContentHtml.replace(/href="\/glossary\/term\/([^"]+\.md)"/g, function(match, termPath) {
    // Remove .md extension
    const cleanPath = termPath.replace(/\.md$/, '');
    return `href="/glossary/term/${cleanPath}"`;
  });
  
  // For Vietnamese terms, update links to point to Vietnamese versions when they exist
  if (term.language === 'vi') {
    // Get all Vietnamese term keys for comparison
    const viTermKeys = Object.keys(allTerms).filter(key => allTerms[key].language === 'vi');
    const viTermNames = viTermKeys.map(key => {
      // Extract the term name from the key (remove 'vi/' prefix if present)
      return key.replace(/^vi\//, '');
    });
    
    // Update links to point to Vietnamese versions when they exist
    fullContentHtml = fullContentHtml.replace(/href="\/glossary\/term\/([^"]+)"/g, function(match, termName) {
      // Check if there's a Vietnamese version of this term
      const termKey = termName.toLowerCase().replace(/\s+/g, '-');
      if (viTermNames.includes(termKey)) {
        return `href="/glossary/term/vi/${termName}"`;
      }
      return match;
    });
  }
  
  // Find related terms (same category, excluding current term)
  // For Vietnamese terms, only show Vietnamese related terms
  // For English terms, only show English related terms
  const relatedTerms = Object.values(allTerms)
    .filter(t => 
      t.category === term.category && 
      t.term !== term.term &&
      t.language === term.language
    )
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
    fileKey: String(term.fileKey || ''),
    language: String(term.language || 'en')
  };
  
  console.log('Rendering term with title:', cleanTerm.title);
  console.log('Term language:', cleanTerm.language);
  
  res.render('glossary/term', { 
    title: term.title,
    term: cleanTerm,
    relatedTerms: relatedTerms
  });
};