import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import checkPermissions from '../utils/permissions.js';

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs, totalJobs: jobs.length });
};

const createJob = async (req, res, next) => {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError('Please Provide All Values');
  }

  req.body.createdBy = req.user.userId;

  try {
    const job = await Job.create(req.body);

    res.status(StatusCodes.CREATED).json({ job });
  } catch (error) {
    next(error);
  }
};

const updateJob = async (req, res, next) => {
  const { id: jobId } = req.params;
  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError('Please Provide All Values');
  }
  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    throw new NotFoundError(`No Job with Id ${jobId}`);
  }

  checkPermissions(req.user.userId, job.createdBy);

  try {
    const updatedJob = await Job.findOneAndUpdate(
      { _id: jobId },
      { $set: req.body },
      {
        new: true,
      }
    );

    res.status(StatusCodes.OK).json({ updatedJob });
  } catch (error) {
    next(error);
  }
};

const deleteJob = async (req, res, next) => {
  const { id: jobId } = req.params;

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id : ${jobId}`);
  }

  checkPermissions(req.user.userId, job.createdBy);

  try {
    await job.remove();
    res.status(StatusCodes.OK).json({ msg: 'Success! Job removed' });
  } catch (error) {
    next(error);
  }
};

const showStats = async (req, res) => {
  res.status(200).json({ msg: 'showStats' });
};

export { createJob, getAllJobs, updateJob, deleteJob, showStats };
