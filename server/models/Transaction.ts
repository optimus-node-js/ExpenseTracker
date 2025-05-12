import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface ITransaction extends Document {
  userId: IUser['_id'];
  description: string;
  amount: number;
  date: Date;
  category: string;
  type: 'income' | 'expense';
  paymentMode: string;
  notes?: string;
  tags?: string[];
  source?: string;
  reference?: string;
  createdAt: Date;
}

const TransactionSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  },
  paymentMode: {
    type: String,
    required: true
  },
  notes: String,
  tags: [String],
  source: String,
  reference: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);