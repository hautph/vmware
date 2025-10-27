import fs from 'fs';
import path from 'path';

// Function to convert a single exam file
function convertExamFile(inputPath, outputPath) {
    // Read the file content
    const content = fs.readFileSync(inputPath, 'utf8');
    
    // Split content into questions
    const questionBlocks = content.split(/Question \d+/).filter(q => q.trim().length > 0);
    
    // Process each question
    let formattedQuestions = [];
    let questionCounter = 1;
    
    for (const block of questionBlocks) {
        // Clean up the block
        const lines = block.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        
        // Skip metadata lines
        const cleanLines = lines.filter(line => 
            !line.includes('Answer saved') && 
            !line.includes('Marked out of') && 
            !line.includes('Not flagged') &&
            !line.includes('Flag question') &&
            !line.includes('Question text')
        );
        
        if (cleanLines.length === 0) continue;
        
        // Extract question text and options
        let questionText = '';
        let options = [];
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
                const optionText = optionMatch[2];
                currentOption = {
                    letter: String.fromCharCode(64 + parseInt(optionNumber)), // Convert 1->A, 2->B, etc.
                    text: optionText
                };
            } else if (currentOption) {
                // Continue building the current option (multi-line option text)
                currentOption.text += ' ' + line;
            } else if (line.length > 0) {
                // This is part of the question text
                questionText += line + ' ';
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
        formattedQuestion += `${questionText.trim()}\n\n`;
        
        // Add options
        for (const option of options) {
            formattedQuestion += `${option.letter}. ${option.text}\n`;
        }
        
        formattedQuestion += '\n';
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