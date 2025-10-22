import express from 'express';
const router = express.Router();
import { getIndex, searchArticles, getArticle } from '../controllers/knowledge.js';

// Knowledge base index page
router.get('/', getIndex);

// Search articles
router.get('/search', searchArticles);

// Get specific article
router.get('/article/:id', getArticle);

export default router;