const express = require('express');
const router = express.Router();
const knowledgeController = require('../controllers/knowledge');

// Knowledge base index page
router.get('/', knowledgeController.getIndex);

// Search articles
router.get('/search', knowledgeController.searchArticles);

// Get specific article
router.get('/article/:id', knowledgeController.getArticle);

module.exports = router;