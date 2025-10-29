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
  
  // Custom header renderer to add IDs and properly handle bold text
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
    
    // First, process the text to handle bold markdown
    let processedText = headerText;
    
    // Handle bold text (**text** or __text__)
    processedText = processedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    processedText = processedText.replace(/__(.*?)__/g, '<strong>$1</strong>');
    
    // Handle italic text (*text* or _text_)
    processedText = processedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
    processedText = processedText.replace(/_(.*?)_/g, '<em>$1</em>');
    
    // Handle inline code (`code`)
    processedText = processedText.replace(/`(.*?)`/g, '<code>$1</code>');
    
    // Create a simple slug from the raw text (before processing)
    // Ensure raw is a string
    const rawText = typeof raw === 'string' ? raw : headerText;
    let id = rawText.toLowerCase()
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
    return `<h${validLevel} id="${uniqueId}">${processedText}</h${validLevel}>`;
  };
  
  marked.setOptions({
    highlight: function(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-',
    renderer: renderer,
    // Enable gfm for better markdown processing
    gfm: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  });
  
  // Preprocess the content to handle special patterns before markdown parsing
  let processedContent = day.content || '';
  
  // Handle excessive hash characters used as separators
  // Replace lines with multiple hash characters with proper horizontal rules
  processedContent = processedContent.replace(/^#{3,}.*$/gm, '<hr>');
  
  // Handle the specific pattern with question marks and hash characters
  processedContent = processedContent.replace(/#{3,}\s*IOPS trong vSAN 8 là gì \? công thức tính như thế nào \?\s*#{3,}/g, '<hr>\n<h2>IOPS trong vSAN 8 là gì? Công thức tính như thế nào?</h2>\n<hr>');
  
  // Handle bold text in headers that might not be processed correctly
  // This handles cases where bold text is at the beginning of headers
  processedContent = processedContent.replace(/^(#{1,6})\s*\*\*(.*?)\*\*(.*?)$/gm, '$1 <strong>$2</strong>$3');
  processedContent = processedContent.replace(/^(#{1,6})\s*__(.*?)__(.*?)$/gm, '$1 <strong>$2</strong>$3');
  
  // Handle the section after the motivational message to improve Python code formatting
  // Find the content that comes after the motivational message and before the next major section
  const motivationalMessage = "Chúc bạn xây dựng thành công công cụ calculator vSAN của riêng mình! Đây sẽ là một tài sản vô giá cho công việc của bạn.";
  const pythonCodeStart = "Sau khi chạy thêm chat yêu cầu tạo file excel bằng python jupyter code sau:";
  
  // Create a regex to match the pattern
  const sectionRegex = new RegExp(`(${motivationalMessage})\\s*
\\s*(#{3,})\\s*
\\s*(${pythonCodeStart}[\\s\\S]*?)(?=
#{2,}|
---|
\\s*
|$)`, 'g');
  
  processedContent = processedContent.replace(sectionRegex,
    function(match, message, separator, codeSection) {
      // Clean up the code section
      const cleanCode = codeSection.trim();
      // Return the message followed by a properly formatted Python code block
      return message + '\n\n``python\n' + cleanCode + '\n```\n';
    }
  );
  
  // Convert markdown to HTML
  let contentHtml = marked.parse(processedContent);
  
  // Additional post-processing for special cases
  // Handle remaining hash separators that might have been converted to headers
  contentHtml = contentHtml.replace(/<h[1-6][^>]*>\s*#{3,}\s*<\/h[1-6]>/g, '<hr>');
  
  // Handle lines with multiple hash characters as horizontal rules
  contentHtml = contentHtml.replace(/<p>\s*#{3,}\s*<\/p>/g, '<hr>');
  
  // Handle the specific pattern with question marks and hash characters
  contentHtml = contentHtml.replace(/<p>\s*#{3,}\s*IOPS trong vSAN 8 là gì \? công thức tính như thế nào \?\s*#{3,}\s*<\/p>/g, '<hr>\n<h2>IOPS trong vSAN 8 là gì? Công thức tính như thế nào?</h2>\n<hr>');
  
  // Also handle bold text in headers that might not be processed correctly
  contentHtml = contentHtml.replace(/<h[1-6]([^>]*)>\s*\*\*(.*?)\*\*\s*<\/h[1-6]>/g, '<h$1><strong>$2</strong><\/h$1>');
  contentHtml = contentHtml.replace(/<h[1-6]([^>]*)>\s*__(.*?)__\s*<\/h[1-6]>/g, '<h$1><strong>$2</strong><\/h$1>');
  
  // Enhanced code block processing to fix copy functionality
  contentHtml = contentHtml.replace(/<pre><code class="([^"]*?)">([\s\S]*?)<\/code><\/pre>/g, 
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
  contentHtml = contentHtml.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, 
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
  
  // Generate TOC from content AFTER processing with marked
  // This ensures the IDs match between the content and TOC
  const headers = generateTOCFromContent(processedContent);
  
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
