import fs from 'fs';
import path from 'path';

// Function to convert a single exam file
function convertExamFile(inputPath, outputPath) {
    // Read the file content
    const content = fs.readFileSync(inputPath, 'utf8');
    
    // Split content into questions
    const questions = content.split(/Question \d+/).filter(q => q.trim().length > 0);
    
    // Process each question
    let formattedQuestions = [];
    let questionCounter = 1;
    
    for (const question of questions) {
        // Skip metadata lines
        const lines = question.split('\n').filter(line => 
            !line.includes('Answer saved') && 
            !line.includes('Marked out of') && 
            !line.includes('Not flagged') &&
            !line.includes('Flag question') &&
            !line.includes('Question text') &&
            line.trim().length > 0
        );
        
        if (lines.length === 0) continue;
        
        // Extract question text (first line that's not an option)
        let questionText = '';
        let optionsStartIndex = 0;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            // Check if this line looks like an option (starts with a number followed by a period)
            if (/^\d+\./.test(line)) {
                optionsStartIndex = i;
                break;
            } else if (line.length > 0) {
                questionText += line + ' ';
            }
        }
        
        // Extract options
        let options = [];
        let correctAnswers = [];
        
        for (let i = optionsStartIndex; i < lines.length; i++) {
            const line = lines[i].trim();
            // Check if this line is an option
            const optionMatch = line.match(/^(\d+)\.\s*(.*)/);
            if (optionMatch) {
                const optionNumber = optionMatch[1];
                const optionText = optionMatch[2];
                options.push({
                    letter: String.fromCharCode(64 + parseInt(optionNumber)), // Convert 1->A, 2->B, etc.
                    text: optionText
                });
            }
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