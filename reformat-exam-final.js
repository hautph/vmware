import fs from 'fs';
import path from 'path';

// Read the file
const filePath = 'src/docs/exam/2v0-2123.md';
const content = fs.readFileSync(filePath, 'utf8');

// Split into lines
let lines = content.split('\n');

// Process the content to improve readability
let formattedLines = [];

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Fix the frontmatter
    if (line.trim() === 'title: 2v0-2123' && i === 0) {
        formattedLines.push('---');
        formattedLines.push('title: 2v0-2123');
        formattedLines.push('---');
        formattedLines.push('');
        formattedLines.push('# 2v0-2123');
        formattedLines.push('');
        // Skip the next lines until we reach the first page
        while (i < lines.length && !lines[i].trim().startsWith('## Page ')) {
            i++;
        }
        i--; // Adjust for the loop increment
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
        const parts = line.split(/  ([A-F]\. )/);
        for (let j = 0; j < parts.length; j++) {
            if (parts[j] && parts[j].match(/^[A-F]\. $/)) {
                // This is an option letter, combine with the next part
                if (j + 1 < parts.length) {
                    formattedLines.push(parts[j] + parts[j + 1].trim());
                    j++; // Skip the next part since we've combined it
                }
            } else if (parts[j] && parts[j].trim() !== '') {
                // This is standalone text
                if (!parts[j].match(/^[A-F]\. $/)) {
                    formattedLines.push(parts[j].trim());
                }
            }
        }
        continue;
    }
    
    formattedLines.push(line);
}

// Write the formatted content
fs.writeFileSync(filePath, formattedLines.join('\n'));

console.log('File reformatted successfully!');