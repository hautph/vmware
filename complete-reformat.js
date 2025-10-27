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
        let remainingLine = line;
        
        // Extract and add each option separately
        const options = ['A. ', 'B. ', 'C. ', 'D. ', 'E. ', 'F. '];
        for (const option of options) {
            const index = remainingLine.indexOf('  ' + option);
            if (index !== -1) {
                // Extract the part before this option (if any)
                const before = remainingLine.substring(0, index);
                if (before.trim() !== '') {
                    formattedLines.push(before.trim());
                }
                
                // Extract this option and everything until the next option or end of line
                const optionStart = index + 2; // Skip the two spaces
                let optionEnd = remainingLine.length;
                
                // Find the next option
                for (const nextOption of options) {
                    if (nextOption !== option) {
                        const nextIndex = remainingLine.indexOf('  ' + nextOption, optionStart);
                        if (nextIndex !== -1 && nextIndex < optionEnd) {
                            optionEnd = nextIndex;
                        }
                    }
                }
                
                const optionText = remainingLine.substring(optionStart, optionEnd).trim();
                formattedLines.push(optionText);
                
                // Update remaining line
                remainingLine = remainingLine.substring(optionEnd);
            }
        }
        
        // Add any remaining text
        if (remainingLine.trim() !== '') {
            formattedLines.push(remainingLine.trim());
        }
        
        continue;
    }
    
    formattedLines.push(line);
}

// Write the formatted content
fs.writeFileSync(filePath, formattedLines.join('\n'));

console.log('File reformatted successfully!');