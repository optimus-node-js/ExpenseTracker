import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

let connecting: Promise<boolean> | null = null;

// Connect once and reuse the connection (important for serverless, where instances are reused).
export async function connectToMongoDB(): Promise<boolean> {
  if (mongoose.connection.readyState === 1) return true;
  if (!MONGODB_URI) {
    console.error('MONGODB_URI is not set');
    return false;
  }
  if (!connecting) {
    connecting = mongoose
      .connect(MONGODB_URI, { serverSelectionTimeoutMS: 10000 })
      .then(() => {
        console.log('Connected to MongoDB');
        return true;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error.message);
        connecting = null;
        return false;
      });
  }
  return connecting;
}

export async function disconnectFromMongoDB() {
  await mongoose.disconnect();
  connecting = null;
  return true;
}

export function isConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

export function getConnection() {
  return mongoose.connection;
}

export default mongoose;
