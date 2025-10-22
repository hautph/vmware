import express from 'express';
const router = express.Router();
import { getIndex, calculateResources } from '../controllers/resource.js';

// Resource sizing calculator page
router.get('/', getIndex);

// Calculate resources
router.post('/calculate', calculateResources);

export default router;