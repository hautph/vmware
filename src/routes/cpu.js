import express from 'express';
const router = express.Router();
import { 
  getIndex,
  calculateCPUSizing
} from '../controllers/cpu.js';

// CPU Sizing calculator
router.get('/', getIndex);
router.post('/', calculateCPUSizing);

export default router;