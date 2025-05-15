import mongoose from 'mongoose';

// MongoDB connection string from environment variable with fallback
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://SupremeRahul:***REDACTED***@clusternse.wpf8cel.mongodb.net/ExpenseTracker';

// Configure Mongoose
mongoose.set('strictQuery', false);

// Connect to MongoDB
export async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return false;
  }
}

// Disconnect from MongoDB (useful for testing or graceful shutdown)
export async function disconnectFromMongoDB() {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    return true;
  } catch (error) {
    console.error('MongoDB disconnection error:', error);
    return false;
  }
}

// Check connection status
export function isConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

// Get connection instance
export function getConnection() {
  return mongoose.connection;
}

export default mongoose;