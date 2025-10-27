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
        let cleanBlock = block.replace(/\n+/g, '\n').trim();
        
        // Skip metadata lines
        const lines = cleanBlock.split('\n').filter(line => 
            !line.includes('Answer saved') && 
            !line.includes('Marked out of') && 
            !line.includes('Not flagged') &&
            !line.includes('Flag question') &&
            !line.includes('Question text') &&
            line.trim().length > 0
        );
        
        if (lines.length === 0) continue;
        
        // Extract question text and options
        let questionText = '';
        let options = [];
        let collectingOptions = false;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Check if this line is an option (starts with a number followed by a period)
            const optionMatch = line.match(/^(\d+)\.\s*(.*)/);
            if (optionMatch) {
                collectingOptions = true;
                const optionNumber = optionMatch[1];
                const optionText = optionMatch[2].replace(/\s+/g, ' ').trim();
                const optionLetter = String.fromCharCode(64 + parseInt(optionNumber)); // Convert 1->A, 2->B, etc.
                options.push(`${optionLetter}. ${optionText}`);
            } else if (collectingOptions && line.match(/^\d+\./)) {
                // Another option
                const optionMatch = line.match(/^(\d+)\.\s*(.*)/);
                if (optionMatch) {
                    const optionNumber = optionMatch[1];
                    const optionText = optionMatch[2].replace(/\s+/g, ' ').trim();
                    const optionLetter = String.fromCharCode(64 + parseInt(optionNumber));
                    options.push(`${optionLetter}. ${optionText}`);
                }
            } else if (!collectingOptions) {
                // This is part of the question text
                questionText += line + ' ';
            }
        }
        
        // Clean up question text
        questionText = questionText.replace(/\s+/g, ' ').trim();
        
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