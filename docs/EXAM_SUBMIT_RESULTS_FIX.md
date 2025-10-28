# Exam Submit Results Fix

This document summarizes the fix made to resolve the "Error Something went wrong!" issue when submitting exams and viewing results.

## Issues Identified

1. **JSON Parsing Error**: When submitting exams, the `userAnswers` and `flaggedQuestions` data were being sent as JSON strings but not properly parsed in the controller, causing a "userAnswers[index].join is not a function" error.

2. **Incorrect Retake Exam Link**: The "Retake Exam" button in the results page had an incorrect URL with double "/exam" prefix.

## Root Cause Analysis

### 1. JSON Parsing Issue
In the exam view JavaScript code, the form data was being stringified:
```javascript
const answersInput = document.createElement('input');
answersInput.type = 'hidden';
answersInput.name = 'userAnswers';
answersInput.value = JSON.stringify(userAnswers);
```

However, in the controller, the data was being used directly without parsing:
```javascript
const { userAnswers, timeTaken, flaggedQuestions } = req.body;
```

This meant `userAnswers` was a JSON string rather than an object, causing the `.join()` method to fail.

### 2. Incorrect Link
In the results page template, the "Retake Exam" link was incorrectly formatted:
```html
<a href="/exam/exam/<%= exam.id %>" class="btn btn-primary">
```

## Solution Implemented

### 1. Fixed JSON Parsing
Updated the `submitExam` function in [src/controllers/exam.js](file:///Users/hautp/Documents/github/vmware/src/controllers/exam.js) to properly parse JSON strings:

```javascript
// Parse userAnswers if it's a JSON string
if (typeof userAnswers === 'string') {
  try {
    userAnswers = JSON.parse(userAnswers);
  } catch (e) {
    userAnswers = {};
  }
}

// Parse flaggedQuestions if it's a JSON string
if (typeof flaggedQuestions === 'string') {
  try {
    flaggedQuestions = JSON.parse(flaggedQuestions);
  } catch (e) {
    flaggedQuestions = {};
  }
}
```

### 2. Fixed Retake Exam Link
Updated the link in [src/views/exam/results.ejs](file:///Users/hautp/Documents/github/vmware/src/views/exam/results.ejs):

```html
<!-- Changed from: -->
<a href="/exam/exam/<%= exam.id %>" class="btn btn-primary">

<!-- To: -->
<a href="/exam/<%= exam.id %>" class="btn btn-primary">
```

### 3. Added Defensive Code in Template
Added defensive code in [src/views/exam/results.ejs](file:///Users/hautp/Documents/github/vmware/src/views/exam/results.ejs) to handle cases where `userAnswers[index]` might not be an array:

```html
<% if (Array.isArray(userAnswers[index])) { %>
  <%= userAnswers[index].join(', ') %>
<% } else { %>
  <%= userAnswers[index] %>
<% } %>
```

## Result

After implementing these fixes:
1. Exam submissions now work correctly without errors
2. Results page displays properly with user answers
3. "Retake Exam" button navigates to the correct URL
4. No more "Error Something went wrong!" messages

## Benefits

1. **Resolved Submission Error**: Users can now successfully submit exams and view results
2. **Proper Data Handling**: JSON data is correctly parsed and used
3. **Correct Navigation**: All links point to valid URLs
4. **Improved Robustness**: Defensive coding prevents future errors

## Testing

The fix has been tested to ensure:
- Exam submissions complete successfully
- Results page displays without errors
- User answers are correctly shown
- "Retake Exam" button works properly
- No parsing errors occur with form data