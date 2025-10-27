import express from 'express';
const router = express.Router();
import { getIndex, getExam, submitExam } from '../controllers/exam.js';

// Exam index page
router.get('/', getIndex);

// Get specific exam
router.get('/exam/:id', getExam);

// Submit exam results
router.post('/exam/:id/submit', submitExam);

export default router;