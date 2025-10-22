const express = require('express');
const router = express.Router();
const calculatorController = require('../controllers/calculator');

// Calculator index page
router.get('/', calculatorController.getIndex);

// VM Density calculator
router.get('/vm-density', calculatorController.getVMDensity);
router.post('/vm-density', calculatorController.calculateVMDensity);

// Storage Capacity calculator
router.get('/storage', calculatorController.getStorage);
router.post('/storage', calculatorController.calculateStorage);

// Network Bandwidth calculator
router.get('/network', calculatorController.getNetwork);
router.post('/network', calculatorController.calculateNetwork);

// vSAN Sizing calculator
router.get('/vsan-sizing', calculatorController.getVSANSizing);
router.post('/vsan-sizing', calculatorController.calculateVSANSizing);

// Disaster Recovery calculator
router.get('/disaster-recovery', calculatorController.getDisasterRecovery);
router.post('/disaster-recovery', calculatorController.calculateDisasterRecovery);

module.exports = router;