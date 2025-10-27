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
      title: metadata.title || '',
      day: metadata.day || '',
      content: markdownContent || ''
    };
  }
  
  // If no frontmatter, parse the whole file
  return {
    id: path.basename(filePath, '.md'),
    title: path.basename(filePath, '.md'),
    day: '',
    content: content || ''
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

// Function to load all course days from Markdown files
function loadCourseDays() {
  const courseDir = path.join(__dirname, '..', 'docs', 'course');
  const days = [];
  const extras = [];
  
  if (fs.existsSync(courseDir)) {
    const files = fs.readdirSync(courseDir);
    
    files.forEach(file => {
      if (file.endsWith('.md')) {
        const filePath = path.join(courseDir, file);
        const dayData = parseMarkdownFile(filePath);
        
        if (dayData) {
          // Separate day modules from extra modules
          if (file.startsWith('day')) {
            days.push(dayData);
          } else if (file.startsWith('extra')) {
            extras.push(dayData);
          }
        }
      }
    });
    
    // Sort by day number
    days.sort((a, b) => {
      const dayA = parseInt(a.day) || 0;
      const dayB = parseInt(b.day) || 0;
      return dayA - dayB;
    });
    
    // Sort extras by their numeric part
    extras.sort((a, b) => {
      const extraNumA = parseInt(a.id.replace('extra', '')) || 0;
      const extraNumB = parseInt(b.id.replace('extra', '')) || 0;
      return extraNumA - extraNumB;
    });
  }
  
  return { days, extras };
}

// Get course index page
export const getIndex = (req, res) => {
  const { days, extras } = loadCourseDays();
  
  res.render('course/index', { 
    title: 'Course Notes',
    courseDays: days,
    extraModules: extras
  });
};

// Get specific course day
export const getDay = (req, res) => {
  const dayId = req.params.id;
  const { days, extras } = loadCourseDays();
  const allDays = [...days, ...extras];
  const day = allDays.find(d => d.id === dayId);
  
  if (!day) {
    return res.status(404).render('error', {
      title: 'Day Not Found',
      message: 'The requested course day was not found.',
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
  
  // Convert markdown to HTML
  let contentHtml = marked.parse(day.content || '');
  
  // Add copy buttons to code blocks
  contentHtml = contentHtml.replace(/<pre><code class="([^"]*?)">([\s\S]*?)<\/code><\/pre>/g, 
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
  contentHtml = contentHtml.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, 
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
  const headers = generateTOCFromContent(day.content || '');
  
  // Create a clean day object with only the properties we need
  // Ensure all values are strings to prevent [object Object] issues
  const cleanDay = {
    id: String(day.id || ''),
    title: String(day.title || ''),
    day: String(day.day || ''),
    contentHtml: String(contentHtml || ''),
    headers: headers || []
  };
  
  // Determine if this is a day module or extra module for the title
  const moduleType = dayId.startsWith('extra') ? 'Extra' : 'Day';
  res.render('course/day', { 
    title: `${moduleType} ${cleanDay.day}: ${cleanDay.title}`,
    day: cleanDay
  });
};

// Save course notes
export const saveNotes = (req, res) => {
  const { day, notes } = req.body;
  
  // In a real application, you would save this to a database
  // For now, we'll just send a success response
  res.json({ success: true, message: 'Notes saved successfully' });
};