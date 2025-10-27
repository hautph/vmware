import express from 'express';
const router = express.Router();
import { 
  getIndex,
  getVMDensity,
  calculateVMDensity,
  getStorage,
  calculateStorage,
  getNetwork,
  calculateNetwork,
  getVSANSizing,
  calculateVSANSizing,
  getVSANDetailed,
  calculateVSANDetailed,
  getDisasterRecovery,
  calculateDisasterRecovery,
  getVSANCost,
  calculateVSANCost
} from '../controllers/calculator.js';

// Calculator index page
router.get('/', getIndex);

// VM Density calculator
router.get('/vm-density', getVMDensity);
router.post('/vm-density', calculateVMDensity);

// Storage Capacity calculator
router.get('/storage', getStorage);
router.post('/storage', calculateStorage);

// Network Bandwidth calculator
router.get('/network', getNetwork);
router.post('/network', calculateNetwork);

// vSAN Sizing calculator
router.get('/vsan-sizing', getVSANSizing);
router.post('/vsan-sizing', calculateVSANSizing);

// Enhanced vSAN Detailed calculator
router.get('/vsan-detailed', getVSANDetailed);
router.post('/vsan-detailed', calculateVSANDetailed);

// Disaster Recovery calculator
router.get('/disaster-recovery', getDisasterRecovery);
router.post('/disaster-recovery', calculateDisasterRecovery);

// vSAN Cost calculator
router.get('/vsan-cost', getVSANCost);
router.post('/vsan-cost', calculateVSANCost);

export default router;