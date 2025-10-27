import express from 'express';
const router = express.Router();
import { 
  getIndex,
  calculateLicensing
} from '../controllers/licensing.js';

// Licensing Cost Calculator
router.get('/', getIndex);
router.post('/', calculateLicensing);

export default router;