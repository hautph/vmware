import express from 'express';
const router = express.Router();
import { getIndex, getArticle, searchArticles, getSearchSuggestions } from '../controllers/documentation.js';

// Documentation index page
router.get('/', getIndex);

// Search articles
router.get('/search', searchArticles);

// API endpoint for search suggestions
router.get('/api/suggestions', getSearchSuggestions);

// Get specific documentation article
router.get('/article/:id', getArticle);

export default router;