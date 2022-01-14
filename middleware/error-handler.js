const errorHandle = (err, req, res, next) => {
  console.log('error...');

  const defaultError = {
    statusCode: err.statusCode || 500,
    msg: err.message || 'Something went wrong, try again later',
  };
  if (err.name === 'ValidationError') {
    defaultError.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    defaultError.statusCode = 400;
    defaultError.msg = `user is already a member`;
  }

  res.status(defaultError.statusCode).json({ error: defaultError });
};
export default errorHandle;
