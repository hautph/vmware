const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course');

// Course notes index page
router.get('/', courseController.getIndex);

// Get specific course day
router.get('/day/:id', courseController.getDay);

// Save course notes
router.post('/notes', courseController.saveNotes);

module.exports = router;