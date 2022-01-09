import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorHandleMiddleware from './middleware/error-handler.js';
import dotenv from 'dotenv';
import connectDB from './db/connect.js';

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;

// express middleware
app.use(express.json());

app.get('/', (req, res) => {
  //   throw new Error('error ');
  res.send('Hello World!');
});

// custom middle ware
app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server listening on port ${port}!`);
    });
  } catch (error) {
    console.log(error.errors);
  }
};

start();
