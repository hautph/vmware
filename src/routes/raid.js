import express from 'express';
const router = express.Router();
import { 
  getIndex,
  calculateRAID
} from '../controllers/raid.js';

// RAID calculator
router.get('/', getIndex);
router.post('/', calculateRAID);

export default router;