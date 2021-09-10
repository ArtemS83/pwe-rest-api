import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uriDb: string = process.env.URI_DB;

export const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  poolSize: 5,
});

mongoose.connection.on('connected', () => {
  console.log('Database connection successful');
});

mongoose.connection.on('error', (err: { message: string }) => {
  console.log(`Database connection error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Database disconnected ');
});

process.on('SIGINT', async () => {
  mongoose.connection.close(() => {
    console.log('Disconnect DB');
    process.exit();
  });
});
