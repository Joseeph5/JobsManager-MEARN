import mongoose from 'mongoose';

const connectDB = async (url) => {
  return mongoose.connect(url).then(() => {
    console.log('database is connected!');
  });
};

export default connectDB;
