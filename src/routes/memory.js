import express from 'express';
const router = express.Router();
import { 
  getIndex,
  calculateMemorySizing
} from '../controllers/memory.js';

// Memory Sizing calculator
router.get('/', getIndex);
router.post('/', calculateMemorySizing);

export default router;