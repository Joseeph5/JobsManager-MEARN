import { Router } from 'express';

import {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
} from '../controllers/jobsController.js';

const router = Router();

router.get('/', getAllJobs);
router.post('/', createJob);
router.patch('/:id', updateJob);
router.delete('/:id', deleteJob);

export default router;
