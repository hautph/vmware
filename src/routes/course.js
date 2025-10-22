import express from 'express';
const router = express.Router();
import { getIndex, getDay, saveNotes } from '../controllers/course.js';

// Course notes index page
router.get('/', getIndex);

// Get specific course day
router.get('/day/:id', getDay);

// Save course notes
router.post('/notes', saveNotes);

export default router;