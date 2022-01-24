import { UnauthenticatedError } from '../errors/index.js';

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser !== resourceUserId.toString()) {
    throw new UnauthenticatedError('Not authorized to access this route');
  }
};

export default checkPermissions;
