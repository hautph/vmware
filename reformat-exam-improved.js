import fs from 'fs';
import path from 'path';

// Read the file
const filePath = 'src/docs/exam/2v0-2123.md';
const content = fs.readFileSync(filePath, 'utf8');

// Split into lines
let lines = content.split('\n');

// Remove duplicate frontmatter
let cleanedLines = [];
let inFirstFrontmatter = false;
let firstFrontmatterEnded = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Skip the first frontmatter block
    if (!firstFrontmatterEnded && line.trim() === '---') {
        if (!inFirstFrontmatter) {
            inFirstFrontmatter = true;
            continue;
        } else {
            // Skip until we find the end of the first frontmatter
            while (i < lines.length && lines[i].trim() !== '---') {
                i++;
            }
            firstFrontmatterEnded = true;
            i++; // Skip the closing ---
            continue;
        }
    }
    
    // Skip duplicate title
    if (firstFrontmatterEnded && line.trim() === '# 2v0-2123' && cleanedLines.length < 10) {
        continue;
    }
    
    cleanedLines.push(line);
}

// Process the content to improve readability
let formattedLines = [];
let inOptions = false;

for (let i = 0; i < cleanedLines.length; i++) {
    let line = cleanedLines[i];
    
    // Add extra spacing before page headers
    if (line.trim().startsWith('## Page ')) {
        if (formattedLines.length > 0 && !formattedLines[formattedLines.length - 1].trim() === '') {
            formattedLines.push('');
        }
        formattedLines.push(line);
        formattedLines.push('');
        continue;
    }
    
    // Add extra spacing before question headers
    if (line.trim().startsWith('### Question ')) {
        if (formattedLines.length > 0 && !formattedLines[formattedLines.length - 1].trim() === '') {
            formattedLines.push('');
        }
        formattedLines.push(line);
        continue;
    }
    
    // Format options to be on separate lines with proper spacing
    if (line.includes('  A. ') || line.includes('  B. ') || line.includes('  C. ') || line.includes('  D. ') || line.includes('  E. ') || line.includes('  F. ')) {
        // Split the line by options
        const options = line.split(/  ([A-F]\. )/).filter(part => part.trim() !== '');
        for (let j = 0; j < options.length; j++) {
            if (options[j].match(/^[A-F]\. $/)) {
                // This is an option letter, combine with the next part
                if (j + 1 < options.length) {
                    formattedLines.push(options[j] + options[j + 1]);
                    j++; // Skip the next part since we've combined it
                }
            } else if (!options[j].match(/^[A-F]\. $/)) {
                // This is standalone text, add it as is
                formattedLines.push(options[j]);
            }
        }
        continue;
    }
    
    formattedLines.push(line);
}

// Write the formatted content
fs.writeFileSync(filePath, formattedLines.join('\n'));

console.log('File reformatted successfully!');