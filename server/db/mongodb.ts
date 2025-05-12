import mongoose from 'mongoose';
import { log } from '../vite';

const MONGODB_URI = 'mongodb+srv://SupremeRahul:***REDACTED***@clusternse.wpf8cel.mongodb.net/ExpenseTracker';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    log('Connected to MongoDB', 'mongodb');
    return mongoose.connection;
  } catch (error) {
    log(`MongoDB connection error: ${error}`, 'mongodb');
    process.exit(1);
  }
};

export default connectDB;