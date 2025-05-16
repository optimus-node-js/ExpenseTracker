import { 
  User, InsertUser, 
  Transaction, InsertTransaction, 
  Budget, InsertBudget, 
  BankStatement, InsertBankStatement, 
  Subscription, InsertSubscription,
  Loan, InsertLoan,
  IncomeSource, InsertIncomeSource,
  Investment, InsertInvestment,
  Sip, InsertSip
} from "@shared/schema";

import { MongoDBStorage } from './storage.mongodb';
import type { IStorage } from './storage.types';

// Create and export a single instance of MongoDB storage
const storage = new MongoDBStorage();
export { storage };
export type { IStorage };
export * from './storage.mongodb';
