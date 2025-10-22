const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resource');

// Resource sizing calculator page
router.get('/', resourceController.getIndex);

// Calculate resources
router.post('/calculate', resourceController.calculateResources);

module.exports = router;