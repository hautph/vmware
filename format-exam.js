import fs from 'fs';
import path from 'path';

// Function to format the exam file
function formatExamFile(inputPath, outputPath) {
    console.log(`Processing ${inputPath}`);
    
    // Read the file content
    const content = fs.readFileSync(inputPath, 'utf8');
    
    // Split content into questions
    const questionBlocks = content.split(/Question \d+/).filter(q => q.trim().length > 50);
    
    // Process each question
    let formattedQuestions = [];
    let questionCounter = 1;
    
    for (const block of questionBlocks) {
        // Clean up the block
        let cleanBlock = block.replace(/\n+/g, ' ').trim();
        
        // Remove metadata lines
        cleanBlock = cleanBlock.replace(/Answer saved.*?Select one or more:/, 'Select one or more:')
                              .replace(/Answer saved.*?Select one:/, 'Select one:')
                              .replace(/Marked out of.*?Not flaggedFlag question Question text/, '')
                              .replace(/Not flaggedFlag question Question text/, '')
                              .replace(/Flag question Question text/, '')
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
        
        // Parse options and combine multiline options
        const options = [];
        const optionLines = optionsText.split(/\n/).map(line => line.trim()).filter(line => line.length > 0);
        
        let currentOption = null;
        for (const line of optionLines) {
            const optionMatch = line.match(/^(\d+)\.\s*(.*)/);
            if (optionMatch) {
                // If we were building an option, save it
                if (currentOption) {
                    options.push(currentOption);
                }
                
                // Start a new option
                const optionNumber = optionMatch[1];
                const optionText = optionMatch[2].trim();
                currentOption = {
                    number: optionNumber,
                    letter: String.fromCharCode(64 + parseInt(optionNumber)), // Convert 1->A, 2->B, etc.
                    text: optionText
                };
            } else if (currentOption) {
                // Continue building the current option (multi-line option text)
                currentOption.text += ' ' + line;
            }
        }
        
        // Don't forget the last option
        if (currentOption) {
            options.push(currentOption);
        }
        
        // Determine if this is single or multiple choice
        let isMultipleChoice = false;
        if (questionText.includes('Choose two') || 
            questionText.includes('Choose three') || 
            questionText.includes('Choose four') ||
            questionText.includes('Select one or more')) {
            isMultipleChoice = true;
        }
        
        // Format the question in markdown
        let formattedQuestion = `### Question ${questionCounter}\n`;
        formattedQuestion += `${questionText}\n\n`;
        
        // Add options
        for (const option of options) {
            formattedQuestion += `${option.letter}. ${option.text}\n`;
        }
        
        formattedQuestion += '\n';
        formattedQuestions.push(formattedQuestion);
        questionCounter++;
    }
    
    // Group questions into pages (5 questions per page)
    const pages = [];
    for (let i = 0; i < formattedQuestions.length; i += 5) {
        pages.push(formattedQuestions.slice(i, i + 5));
    }
    
    // Write the formatted content to the output file
    const fileName = path.basename(inputPath, '.md');
    let formattedContent = `---
title: ${fileName}
---

# ${fileName}

`;
    
    pages.forEach((page, index) => {
        formattedContent += `## Page ${index + 1}\n\n`;
        formattedContent += page.join('\n');
    });
    
    fs.writeFileSync(outputPath, formattedContent);
    console.log(`Formatted ${inputPath} to ${outputPath}`);
}

// Process the exam file
const inputPath = 'src/docs/exam/2v0-2123.md';
const outputPath = 'src/docs/exam/2v0-2123-formatted.md';

try {
    formatExamFile(inputPath, outputPath);
    console.log('Formatting complete!');
} catch (error) {
    console.error('Error formatting file:', error.message);
}