import express from 'express';
const router = express.Router();
import { 
  getIndex,
  calculateBackupRestore
} from '../controllers/backup.js';

// Backup/Restore Speed calculator
router.get('/', getIndex);
router.post('/', calculateBackupRestore);

export default router;