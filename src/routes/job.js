import express from 'express';
import jobController from '../controllers/JobController.js';
const router = express.Router();

router.get('/', jobController.show);
router.get('/all', jobController.getAll);
router.get('/search', jobController.getSearch);

export default router;
