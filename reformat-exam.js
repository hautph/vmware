import fs from 'fs';
import path from 'path';

// Read the file
const filePath = 'src/docs/exam/2v0-2123.md';
const content = fs.readFileSync(filePath, 'utf8');

// Split into lines
const lines = content.split('\n');

// Process the content
let formattedLines = [];
let inQuestion = false;
let questionLines = [];

// Add the frontmatter as is
formattedLines.push('---');
formattedLines.push('title: 2v0-2123');
formattedLines.push('---');
formattedLines.push('');
formattedLines.push('# 2v0-2123');
formattedLines.push('');

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines at the beginning
    if (line === '' && formattedLines.length < 6) continue;
    
    // Skip the original frontmatter
    if (line === '---' && formattedLines.length < 6) {
        while (i < lines.length && lines[i].trim() !== '---') {
            i++;
        }
        continue;
    }
    
    // Skip the duplicate title
    if (line.startsWith('# 2v0-2123') && formattedLines.length < 10) {
        continue;
    }
    
    // Handle page headers
    if (line.startsWith('## Page ')) {
        formattedLines.push('');
        formattedLines.push(line);
        formattedLines.push('');
        continue;
    }
    
    // Handle question headers
    if (line.startsWith('### Question ')) {
        if (inQuestion) {
            // Process the previous question
            formattedLines.push(...processQuestion(questionLines));
            formattedLines.push('');
        }
        inQuestion = true;
        questionLines = [line];
        continue;
    }
    
    // Collect question content
    if (inQuestion) {
        questionLines.push(line);
    } else if (line !== '') {
        formattedLines.push(line);
    }
}

// Process the last question
if (inQuestion && questionLines.length > 0) {
    formattedLines.push(...processQuestion(questionLines));
}

// Write the formatted content
fs.writeFileSync(filePath, formattedLines.join('\n'));

function processQuestion(lines) {
    if (lines.length === 0) return [];
    
    const result = [lines[0]]; // Question header
    
    // Combine all lines into one text
    let fullText = lines.slice(1).join(' ').trim();
    
    // Split by bullet points
    const parts = fullText.split('•');
    let questionText = parts[0].trim();
    
    // Add bullet points as list items
    if (parts.length > 1) {
        result.push(questionText);
        result.push('');
        for (let i = 1; i < parts.length; i++) {
            result.push(`- ${parts[i].trim()}`);
        }
    } else {
        result.push(questionText);
    }
    
    result.push('');
    return result;
}

console.log('File reformatted successfully!');