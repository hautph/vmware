import express from 'express';
const router = express.Router();
import { getIndex, searchTerms, getTerm, getSearchSuggestions } from '../controllers/glossary.js';

console.log('Glossary routes loaded');

// Glossary index page with pagination support
router.get('/', (req, res) => {
  console.log('Glossary index route matched');
  getIndex(req, res);
});

// Search glossary terms
router.get('/search', (req, res) => {
  console.log('Glossary search route matched');
  searchTerms(req, res);
});

// API endpoint for search suggestions
router.get('/api/suggestions', (req, res) => {
  console.log('Glossary suggestions API route matched');
  getSearchSuggestions(req, res);
});

// Simple test route
router.get('/test', (req, res) => {
  console.log('Glossary test route matched');
  res.send('Glossary test route working');
});

// Get specific term - handle both English and Vietnamese terms
// We'll use a more flexible approach to match multi-segment paths
router.get('/term/:firstSegment/:secondSegment', (req, res, next) => {
  console.log('Glossary term route matched (two segments):', req.params);
  try {
    getTerm(req, res);
  } catch (error) {
    console.error('Error in getTerm:', error);
    next(error);
  }
});

router.get('/term/:singleSegment', (req, res, next) => {
  console.log('Glossary term route matched (single segment):', req.params.singleSegment);
  try {
    getTerm(req, res);
  } catch (error) {
    console.error('Error in getTerm:', error);
    next(error);
  }
});

export default router;