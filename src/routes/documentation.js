import express from 'express';
const router = express.Router();
import { getIndex, getArticle } from '../controllers/documentation.js';

// Documentation index page
router.get('/', getIndex);

// Get specific documentation article
router.get('/article/:id', getArticle);

export default router;