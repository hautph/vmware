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
        // Split the block into lines
        const lines = block.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        
        // Remove metadata lines
        const cleanLines = lines.filter(line => 
            !line.includes('Answer saved') && 
            !line.includes('Marked out of') && 
            !line.includes('Not flagged') &&
            !line.includes('Flag question') &&
            !line.includes('Question text')
        );
        
        if (cleanLines.length === 0) continue;
        
        // Find where options start
        let questionText = '';
        let options = [];
        let collectingOptions = false;
        let currentOption = null;
        
        for (let i = 0; i < cleanLines.length; i++) {
            const line = cleanLines[i];
            
            // Check if this line is an option (starts with a number followed by a period)
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
                collectingOptions = true;
            } else if (collectingOptions && currentOption) {
                // Continue building the current option (multi-line option text)
                currentOption.text += ' ' + line;
            } else if (!collectingOptions) {
                // This is part of the question text
                questionText += line + ' ';
            }
        }
        
        // Don't forget the last option
        if (currentOption) {
            options.push(currentOption);
        }
        
        // Clean up question text
        questionText = questionText.replace(/\s+/g, ' ').trim();
        
        // Determine if this is single or multiple choice
        let isMultipleChoice = false;
        if (questionText.includes('Choose two') || 
            questionText.includes('Choose three') || 
            questionText.includes('Choose four') ||
            questionText.includes('Select one or more')) {
            isMultipleChoice = true;
        }
        
        // Add "Select one:" or "Select one or more:" if not already present
        if (!questionText.includes('Select one:') && !questionText.includes('Select one or more:')) {
            questionText += isMultipleChoice ? '\n\nSelect one or more:' : '\n\nSelect one:';
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