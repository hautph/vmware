import os
import re

def convert_exam_file(input_path, output_path):
    print(f"Processing {input_path}")
    
    # Read the file content
    with open(input_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split content into questions
    question_blocks = re.split(r'Question \d+', content)
    question_blocks = [q for q in question_blocks if q.strip() and len(q.strip()) > 50]
    
    # Process each question
    formatted_questions = []
    question_counter = 1
    
    for block in question_blocks:
        # Remove metadata lines
        lines = block.split('\n')
        clean_lines = []
        for line in lines:
            if not any(metadata in line for metadata in [
                'Answer saved', 'Marked out of', 'Not flagged', 
                'Flag question', 'Question text'
            ]):
                clean_lines.append(line)
        
        # Join lines and clean up
        clean_text = ' '.join(clean_lines).strip()
        clean_text = re.sub(r'\s+', ' ', clean_text)
        
        # Extract question text (before first option)
        option_match = re.search(r'\d+\.', clean_text)
        if not option_match:
            question_counter += 1
            continue
            
        question_text = clean_text[:option_match.start()].strip()
        
        # Extract options
        options_text = clean_text[option_match.start():]
        options = []
        option_pattern = r'(\d+)\.\s*([^0-9]*)'
        
        for match in re.finditer(option_pattern, options_text):
            option_number = int(match.group(1))
            option_text = match.group(2).strip()
            if option_text:
                option_letter = chr(64 + option_number)  # Convert 1->A, 2->B, etc.
                options.append(f"{option_letter}. {option_text}")
        
        # Format the question
        formatted_question = f"### Question {question_counter}\n"
        formatted_question += f"{question_text}\n\n"
        formatted_question += '\n'.join(options) + '\n'
        
        formatted_questions.append(formatted_question)
        question_counter += 1
    
    # Write output
    file_name = os.path.basename(input_path).replace('.md', '')
    formatted_content = f"""---
title: {file_name}
---

# {file_name}

""" + '\n'.join(formatted_questions)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(formatted_content)
    
    print(f"Converted {input_path} to {output_path}")

# Process all .md files
exam_dir = 'src/docs/exam/vmware01'
for file in os.listdir(exam_dir):
    if file.endswith('.md'):
        input_path = os.path.join(exam_dir, file)
        output_path = input_path  # Overwrite original
        try:
            convert_exam_file(input_path, output_path)
        except Exception as e:
            print(f"Error converting {file}: {e}")

print("Conversion complete!")