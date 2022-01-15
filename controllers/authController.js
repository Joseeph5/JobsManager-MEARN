import User from '../models/User.js';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';

import bcrypt from 'bcryptjs';

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError('please provide all values');
  }

  try {
    const user = await User.create(req.body);
    const token = user.createJWT();
    res.status(201).json({
      msg: ' user is registered',
      user: {
        email: user.email,
        lastName: user.lastName,
        location: user.location,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide all values');
  }

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthenticatedError('Incorrect Email!');
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError('Incorrect Password');
    }

    const token = user.createJWT();
    user.password = undefined;
    res.status(200).json({ msg: 'login user', user, token });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res) => {
  let { email, name, lastName, location, password } = req.body;
  if (!email || !name || !lastName) {
    throw new BadRequestError('Please provide all values');
  }
  if (password) {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { $set: { lastName, name, email, location, password } },
    {
      new: true,
    }
  );

  // const user = await User.findOne({ _id: req.user.userId });

  // user.email = email;
  // user.name = name;
  // user.lastName = lastName;

  // await user.save();

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user,
    token,
    location: user.location,
  });
};

export { register, login, updateUser };
