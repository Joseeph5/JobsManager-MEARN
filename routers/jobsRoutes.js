import { Router } from 'express';

import {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  showStats,
} from '../controllers/jobsController.js';

const router = Router();

router.get('/', getAllJobs);
router.post('/', createJob);
router.patch('/:id', updateJob);
router.delete('/:id', deleteJob);
router.get('/stats', showStats);

export default router;
