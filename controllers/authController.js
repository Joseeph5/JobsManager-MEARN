import User from '../models/User.js';
import { BadRequestError } from '../errors/index.js';

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError('please provide all values');
  }

  try {
    const user = await User.create(req.body);
    res.status(201).json({ msg: ' user is registered', user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    res.status(200).json({ msg: 'register user value' });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res) => {
  const { name, email, password } = req.body;

  res.status(200).json({ msg: 'register user' });
};

export { register, login, updateUser };
