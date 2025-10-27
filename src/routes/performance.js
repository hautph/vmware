import express from 'express';
const router = express.Router();
import { 
  getIndex,
  calculatePerformance
} from '../controllers/performance.js';

// Performance & Optimization Calculator
router.get('/', getIndex);
router.post('/', calculatePerformance);

export default router;