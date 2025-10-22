const express = require('express');
const router = express.Router();
const glossaryController = require('../controllers/glossary');

// Glossary index page with pagination support
router.get('/', glossaryController.getIndex);

// Search glossary terms
router.get('/search', glossaryController.searchTerms);

// Get specific term
router.get('/term/:term', glossaryController.getTerm);

module.exports = router;