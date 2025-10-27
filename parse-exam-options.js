import fs from 'fs';
import path from 'path';

// Function to convert a single exam file
function convertExamFile(inputPath, outputPath) {
    console.log(`Processing ${inputPath}`);
    
    // Read the file content
    const content = fs.readFileSync(inputPath, 'utf8');
    
    // Split content into questions by looking for "Question X" patterns
    const questionBlocks = content.split(/Question \d+/).filter(q => q.trim().length > 50);
    
    // Process each question
    let formattedQuestions = [];
    let questionCounter = 1;
    
    for (const block of questionBlocks) {
        // Clean up the block
        let cleanBlock = block.replace(/\n+/g, ' ').trim();
        
        // Skip metadata
        cleanBlock = cleanBlock.replace(/Answer saved.*?Select one or more:/, 'Select one or more:')
                              .replace(/Answer saved.*?Select one:/, 'Select one:')
                              .replace(/Marked out of.*?Not flaggedFlag question Question text/, '')
                              .replace(/Not flaggedFlag question Question text/, '')
                              .replace(/\s+/g, ' ')
                              .trim();
        
        // Extract question text (everything before the first option)
        const optionStartMatch = cleanBlock.match(/\d+\./);
        if (!optionStartMatch) {
            questionCounter++;
            continue;
        }
        
        const questionText = cleanBlock.substring(0, optionStartMatch.index).trim();
        
        // Extract options (everything after the question text)
        const optionsText = cleanBlock.substring(optionStartMatch.index);
        
        // Parse options
        const options = [];
        const optionRegex = /(\d+)\.\s*([^0-9]*)/g;
        let match;
        
        while ((match = optionRegex.exec(optionsText)) !== null) {
            const optionNumber = match[1];
            const optionText = match[2].trim();
            const optionLetter = String.fromCharCode(64 + parseInt(optionNumber)); // Convert 1->A, 2->B, etc.
            if (optionText.length > 0) {
                options.push(`${optionLetter}. ${optionText}`);
            }
        }
        
        // Format the question in markdown
        let formattedQuestion = `### Question ${questionCounter}\n`;
        formattedQuestion += `${questionText}\n\n`;
        
        // Add options
        formattedQuestion += options.join('\n') + '\n';
        
        formattedQuestions.push(formattedQuestion);
        questionCounter++;
    }
    
    // Write the formatted content to the output file
    const fileName = path.basename(inputPath, '.md');
    const formattedContent = `---
title: ${fileName}
---

# ${fileName}

${formattedQuestions.join('\n')}`;

    fs.writeFileSync(outputPath, formattedContent);
    console.log(`Converted ${inputPath} to ${outputPath}`);
}

// Process all .md files in the directory
const examDir = 'src/docs/exam/vmware01';
const files = fs.readdirSync(examDir);

files.forEach(file => {
    if (file.endsWith('.md')) {
        const inputPath = path.join(examDir, file);
        const outputPath = inputPath; // Overwrite the original file
        try {
            convertExamFile(inputPath, outputPath);
        } catch (error) {
            console.error(`Error converting ${file}:`, error.message);
        }
    }
});

console.log('Conversion complete!');