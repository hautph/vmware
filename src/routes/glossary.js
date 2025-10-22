import express from 'express';
const router = express.Router();
import { getIndex, searchTerms, getTerm } from '../controllers/glossary.js';

// Glossary index page with pagination support
router.get('/', getIndex);

// Search glossary terms
router.get('/search', searchTerms);

// Get specific term
router.get('/term/:term', getTerm);

export default router;