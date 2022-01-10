const getAllJobs = async (req, res) => {
  res.status(200).json({ msg: 'getAllJobs' });
};

const showStats = async (req, res) => {
  res.status(200).json({ msg: 'showStats' });
};
const createJob = async (req, res) => {
  res.status(200).json({ msg: 'createJob' });
};

const updateJob = async (req, res) => {
  res.status(200).json({ msg: 'updateJob' });
};

const deleteJob = async (req, res) => {
  res.status(200).json({ msg: 'deleteJob' });
};

export { createJob, getAllJobs, updateJob, deleteJob, showStats };
