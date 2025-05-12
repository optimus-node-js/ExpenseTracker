import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IBankStatement extends Document {
  userId: IUser['_id'];
  localId?: number; // Numeric ID for backwards compatibility
  filename: string;
  fileType: 'pdf' | 'excel';
  bankName?: string;
  accountNumber?: string;
  statementPeriod?: string;
  processedAt: Date;
  totalTransactions?: number;
  importedTransactions?: number;
  skippedDuplicates?: number;
}

const BankStatementSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  localId: {
    type: Number,
    index: true
  },
  filename: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    enum: ['pdf', 'excel'],
    required: true
  },
  bankName: String,
  accountNumber: String,
  statementPeriod: String,
  processedAt: {
    type: Date,
    default: Date.now
  },
  totalTransactions: Number,
  importedTransactions: Number,
  skippedDuplicates: Number
});

export default mongoose.model<IBankStatement>('BankStatement', BankStatementSchema);