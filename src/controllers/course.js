// Course notes controller
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
      day: metadata.day,
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
exports.getIndex = (req, res) => {
  const courseDays = loadCourseDays();
  
  res.render('course/index', { 
    title: 'Course Notes',
    courseDays
  });
};

// Get specific course day
exports.getDay = (req, res) => {
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
  
  // Convert markdown to HTML
  const contentHtml = marked.parse(day.content || '');
  
  res.render('course/day', { 
    title: `Day ${day.day}: ${day.title}`,
    day: {
      ...day,
      contentHtml: contentHtml
    }
  });
};

// Save course notes
exports.saveNotes = (req, res) => {
  const { day, notes } = req.body;
  
  // In a real application, you would save this to a database
  // For now, we'll just send a success response
  res.json({ success: true, message: 'Notes saved successfully' });
};