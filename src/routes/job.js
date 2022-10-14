import express from 'express';
import jobController from '../controllers/JobController.js';
const router = express.Router();

router.get('/all/skill', jobController.getAllSkill);
router.get('/all', jobController.getAll);
router.get('/search', jobController.getSearch);
router.get('/', jobController.show);

export default router;
