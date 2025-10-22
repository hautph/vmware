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
  
  if (fs.existsSync(courseDir)) {
    const files = fs.readdirSync(courseDir);
    
    files.forEach(file => {
      if (file.endsWith('.md')) {
        const filePath = path.join(courseDir, file);
        const dayData = parseMarkdownFile(filePath);
        
        if (dayData) {
          days.push(dayData);
        }
      }
    });
    
    // Sort by day number
    days.sort((a, b) => {
      const dayA = parseInt(a.day) || 0;
      const dayB = parseInt(b.day) || 0;
      return dayA - dayB;
    });
  }
  
  return days;
}

// Get course index page
export const getIndex = (req, res) => {
  const courseDays = loadCourseDays();
  
  res.render('course/index', { 
    title: 'Course Notes',
    courseDays
  });
};

// Get specific course day
export const getDay = (req, res) => {
  const dayId = req.params.id;
  const courseDays = loadCourseDays();
  const day = courseDays.find(d => d.id === dayId);
  
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
  const content = day.content || '';
  const contentHtml = marked.parse(content);
  
  // Generate TOC from content AFTER processing with marked
  // This ensures the IDs match between the content and TOC
  const headers = generateTOCFromContent(content);
  
  // Create a clean day object with only the properties we need
  // Ensure all values are strings to prevent [object Object] issues
  const cleanDay = {
    id: String(day.id || ''),
    title: String(day.title || ''),
    day: String(day.day || ''),
    contentHtml: String(contentHtml || ''),
    headers: headers || []
  };
  
  res.render('course/day', { 
    title: `Day ${cleanDay.day}: ${cleanDay.title}`,
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