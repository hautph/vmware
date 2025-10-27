import fs from 'fs';

// Read the file
const filePath = 'src/docs/exam/2v0-2123.md';
const content = fs.readFileSync(filePath, 'utf8');

// Split into lines
let lines = content.split('\n');

// Process the content to improve readability
let formattedLines = [];

// Add proper frontmatter
formattedLines.push('---');
formattedLines.push('title: 2v0-2123');
formattedLines.push('---');
formattedLines.push('');
formattedLines.push('# 2v0-2123');
formattedLines.push('');

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Skip existing frontmatter and title
    if (line.trim() === '---' || line.trim() === 'title: 2v0-2123' || line.trim() === '# 2v0-2123') {
        continue;
    }
    
    // Add extra spacing before page headers
    if (line.trim().startsWith('## Page ')) {
        if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1].trim() !== '') {
            formattedLines.push('');
        }
        formattedLines.push(line);
        formattedLines.push('');
        continue;
    }
    
    // Add extra spacing before question headers
    if (line.trim().startsWith('### Question ')) {
        if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1].trim() !== '') {
            formattedLines.push('');
        }
        formattedLines.push(line);
        continue;
    }
    
    // Format options to be on separate lines
    if (line.includes('  A. ') || line.includes('  B. ') || line.includes('  C. ') || line.includes('  D. ') || line.includes('  E. ') || line.includes('  F. ')) {
        // Split the line by options
        const optionRegex = /([A-F]\.\s*[^A-F]*)/g;
        const options = line.match(optionRegex);
        
        if (options) {
            for (const option of options) {
                formattedLines.push(option.trim());
            }
        } else {
            formattedLines.push(line);
        }
        continue;
    }
    
    formattedLines.push(line);
}

// Write the formatted content
fs.writeFileSync(filePath, formattedLines.join('\n'));

console.log('File reformatted successfully!');