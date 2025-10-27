import express from 'express';
const router = express.Router();
import { getIndex, searchArticles, getArticle, getSearchSuggestions } from '../controllers/knowledge.js';

// Knowledge base index page
router.get('/', getIndex);

// Search articles
router.get('/search', searchArticles);

// API endpoint for search suggestions
router.get('/api/suggestions', getSearchSuggestions);

// Get specific article
router.get('/article/:id', getArticle);

export default router;