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
      title: metadata.title || path.basename(filePath, '.md'),
      module: metadata.module || 'VMware vSphere',
      total_questions: metadata.total_questions || '',
      content: markdownContent || ''
    };
  }
  
  // If no frontmatter, parse the whole file
  return {
    id: path.basename(filePath, '.md'),
    title: path.basename(filePath, '.md'),
    module: 'VMware vSphere',
    total_questions: '',
    content: content || ''
  };
}

// Function to extract questions from content
function extractQuestions(content) {
  const pages = [];
  const pageRegex = /## Page \d+\s*\n([\s\S]*?)(?=## Page \d+|$)/g;
  let match;
  
  while ((match = pageRegex.exec(content)) !== null) {
    const pageContent = match[1];
    const questions = [];
    const questionRegex = /### Question \d+\s*\n([\s\S]*?)(?=\n### Question \d+|$)/g;
    let questionMatch;
    
    while ((questionMatch = questionRegex.exec(pageContent)) !== null) {
      const questionBlock = questionMatch[1].trim();
      questions.push(questionBlock);
    }
    
    pages.push({
      pageNumber: pages.length + 1,
      questions: questions
    });
  }
  
  return pages;
}

// Function to load all exam modules from Markdown files
function loadExams() {
  const examDir = path.join(__dirname, '..', 'docs', 'exam');
  const exams = [];
  
  if (fs.existsSync(examDir)) {
    const files = fs.readdirSync(examDir);
    
    files.forEach(file => {
      if (file.endsWith('.md')) {
        const filePath = path.join(examDir, file);
        const examData = parseMarkdownFile(filePath);
        
        if (examData) {
          exams.push(examData);
        }
      }
    });
  }
  
  return exams;
}

// Get exam index page
export const getIndex = (req, res) => {
  const exams = loadExams();
  
  res.render('exam/index', { 
    title: 'VMware Exam Modules',
    exams: exams
  });
};

// Get specific exam
export const getExam = (req, res) => {
  const examId = req.params.id;
  const exams = loadExams();
  const exam = exams.find(e => e.id === examId);
  
  if (!exam) {
    return res.status(404).render('error', {
      title: 'Exam Not Found',
      message: 'The requested exam module was not found.',
      error: {}
    });
  }
  
  // Extract pages and questions
  const pages = extractQuestions(exam.content);
  
  // Count total questions
  let totalQuestions = 0;
  pages.forEach(page => {
    totalQuestions += page.questions.length;
  });
  
  // Configure marked with highlight.js
  marked.setOptions({
    highlight: function(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-'
  });
  
  // Convert markdown to HTML
  const htmlContent = marked(exam.content);
  
  res.render('exam/exam', { 
    title: exam.title,
    exam: {
      ...exam,
      total_questions: totalQuestions
    },
    pages: pages,
    content: htmlContent,
    examState: 'introduction' // Add exam state: introduction, active, paused
  });
};

// Submit exam results
export const submitExam = (req, res) => {
  const examId = req.params.id;
  let { userAnswers, timeTaken, flaggedQuestions } = req.body;
  
  // Parse userAnswers if it's a JSON string
  if (typeof userAnswers === 'string') {
    try {
      userAnswers = JSON.parse(userAnswers);
    } catch (e) {
      userAnswers = {};
    }
  }
  
  // Parse flaggedQuestions if it's a JSON string
  if (typeof flaggedQuestions === 'string') {
    try {
      flaggedQuestions = JSON.parse(flaggedQuestions);
    } catch (e) {
      flaggedQuestions = {};
    }
  }
  
  const exams = loadExams();
  const exam = exams.find(e => e.id === examId);
  
  if (!exam) {
    return res.status(404).render('error', {
      title: 'Exam Not Found',
      message: 'The requested exam module was not found.',
      error: {}
    });
  }
  
  // Extract pages and questions
  const pages = extractQuestions(exam.content);
  
  // Count total questions
  let totalQuestions = 0;
  pages.forEach(page => {
    totalQuestions += page.questions.length;
  });
  
  // Calculate statistics
  const answeredCount = Object.keys(userAnswers).length;
  const flaggedCount = flaggedQuestions ? Object.keys(flaggedQuestions).length : 0;
  
  // Prepare questions data for the results page
  const questions = [];
  let questionIndex = 0;
  pages.forEach(page => {
    page.questions.forEach(questionBlock => {
      // Simple parsing to get question title
      const lines = questionBlock.split('\n');
      const title = lines[0] || `Question ${questionIndex + 1}`;
      
      questions.push({
        title: title,
        flagged: flaggedQuestions && flaggedQuestions[questionIndex]
      });
      
      questionIndex++;
    });
  });
  
  res.render('exam/results', {
    title: 'Exam Results',
    exam: {
      ...exam,
      total_questions: totalQuestions
    },
    totalQuestions: totalQuestions,
    answeredQuestions: answeredCount,
    flaggedQuestions: flaggedCount,
    timeTaken: timeTaken,
    userAnswers: userAnswers,
    questions: questions
  });
};