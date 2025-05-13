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

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined>;
  updateCashReserve(id: number, amount: number): Promise<User | undefined>;
  
  // Transaction methods
  getTransaction(id: number): Promise<Transaction | undefined>;
  getAllTransactions(userId: number): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  updateTransaction(id: number, transaction: InsertTransaction): Promise<Transaction | undefined>;
  deleteTransaction(id: number): Promise<boolean>;
  
  // Budget methods
  getBudget(id: number): Promise<Budget | undefined>;
  getAllBudgets(userId: number): Promise<Budget[]>;
  createBudget(budget: InsertBudget): Promise<Budget>;
  updateBudget(id: number, budget: InsertBudget): Promise<Budget | undefined>;
  deleteBudget(id: number): Promise<boolean>;
  
  // Bank statement methods
  getBankStatement(id: number): Promise<BankStatement | undefined>;
  getAllBankStatements(userId: number): Promise<BankStatement[]>;
  createBankStatement(statement: InsertBankStatement): Promise<BankStatement>;
  
  // Subscription methods
  getSubscription(id: number): Promise<Subscription | undefined>;
  getAllSubscriptions(userId: number): Promise<Subscription[]>;
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  updateSubscription(id: number, subscription: InsertSubscription): Promise<Subscription | undefined>;
  deleteSubscription(id: number): Promise<boolean>;
  
  // Loan methods (for lending/borrowing)
  getLoan(id: number): Promise<Loan | undefined>;
  getAllLoans(userId: number): Promise<Loan[]>;
  createLoan(loan: InsertLoan): Promise<Loan>;
  updateLoan(id: number, loan: Partial<InsertLoan>): Promise<Loan | undefined>;
  deleteLoan(id: number): Promise<boolean>;
  
  // Income Sources methods
  getIncomeSource(id: number): Promise<IncomeSource | undefined>;
  getAllIncomeSources(userId: number): Promise<IncomeSource[]>;
  createIncomeSource(incomeSource: InsertIncomeSource): Promise<IncomeSource>;
  updateIncomeSource(id: number, incomeSource: Partial<InsertIncomeSource>): Promise<IncomeSource | undefined>;
  deleteIncomeSource(id: number): Promise<boolean>;
  
  // Investment methods
  getInvestment(id: number): Promise<Investment | undefined>;
  getAllInvestments(userId: number): Promise<Investment[]>;
  createInvestment(investment: InsertInvestment): Promise<Investment>;
  updateInvestment(id: number, investment: Partial<InsertInvestment>): Promise<Investment | undefined>;
  deleteInvestment(id: number): Promise<boolean>;
  
  // SIP methods
  getSip(id: number): Promise<Sip | undefined>;
  getAllSips(userId: number): Promise<Sip[]>;
  createSip(sip: InsertSip): Promise<Sip>;
  updateSip(id: number, sip: Partial<InsertSip>): Promise<Sip | undefined>;
  deleteSip(id: number): Promise<boolean>;
  
  // Additional methods for transaction processing
  findDuplicateTransaction(transaction: InsertTransaction): Promise<Transaction | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private transactions: Map<number, Transaction>;
  private budgets: Map<number, Budget>;
  private bankStatements: Map<number, BankStatement>;
  private subscriptions: Map<number, Subscription>;
  private loans: Map<number, Loan>;
  private incomeSources: Map<number, IncomeSource>;
  private investments: Map<number, Investment>;
  private sips: Map<number, Sip>;
  
  private userId: number = 1;
  private transactionId: number = 1;
  private budgetId: number = 1;
  private bankStatementId: number = 1;
  private subscriptionId: number = 1;
  private loanId: number = 1;
  private incomeSourceId: number = 1;
  private investmentId: number = 1;
  private sipId: number = 1;

  constructor() {
    this.users = new Map();
    this.transactions = new Map();
    this.budgets = new Map();
    this.bankStatements = new Map();
    this.subscriptions = new Map();
    this.loans = new Map();
    this.incomeSources = new Map();
    this.investments = new Map();
    this.sips = new Map();
    
    // Initialize with a default user
    this.users.set(1, {
      id: 1,
      username: "rahul",
      password: "password", // In a real app, this would be hashed
      email: "rahul@example.com",
      fullName: "Rahul Sharma",
      cashReserve: "0", // Starting with zero cash reserve
      createdAt: new Date(),
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    const existingUser = await this.getUser(id);
    if (!existingUser) {
      return undefined;
    }
    
    const updatedUser: User = { 
      ...existingUser, 
      ...userData,
      id, // Keep the original ID
      createdAt: existingUser.createdAt // Keep the original creation date
    };
    
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  async updateCashReserve(id: number, amount: number): Promise<User | undefined> {
    const existingUser = await this.getUser(id);
    if (!existingUser) {
      return undefined;
    }
    
    const updatedUser: User = { 
      ...existingUser,
      cashReserve: amount.toString(),
      id, // Keep the original ID
      createdAt: existingUser.createdAt // Keep the original creation date
    };
    
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  // Transaction methods
  async getTransaction(id: number): Promise<Transaction | undefined> {
    return this.transactions.get(id);
  }
  
  async getAllTransactions(userId: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .filter(transaction => transaction.userId === userId);
  }
  
  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const id = this.transactionId++;
    const newTransaction: Transaction = { 
      ...transaction, 
      id, 
      createdAt: new Date(),
      tags: transaction.tags || [],
    };
    this.transactions.set(id, newTransaction);
    return newTransaction;
  }
  
  async updateTransaction(id: number, transaction: InsertTransaction): Promise<Transaction | undefined> {
    const existingTransaction = this.transactions.get(id);
    
    if (!existingTransaction) {
      return undefined;
    }
    
    const updatedTransaction: Transaction = {
      ...existingTransaction,
      ...transaction,
      id,
      tags: transaction.tags || existingTransaction.tags,
    };
    
    this.transactions.set(id, updatedTransaction);
    return updatedTransaction;
  }
  
  async deleteTransaction(id: number): Promise<boolean> {
    return this.transactions.delete(id);
  }
  
  // Budget methods
  async getBudget(id: number): Promise<Budget | undefined> {
    return this.budgets.get(id);
  }
  
  async getAllBudgets(userId: number): Promise<Budget[]> {
    return Array.from(this.budgets.values())
      .filter(budget => budget.userId === userId);
  }
  
  async createBudget(budget: InsertBudget): Promise<Budget> {
    const id = this.budgetId++;
    const newBudget: Budget = { 
      ...budget, 
      id, 
      createdAt: new Date(),
    };
    this.budgets.set(id, newBudget);
    return newBudget;
  }
  
  async updateBudget(id: number, budget: InsertBudget): Promise<Budget | undefined> {
    const existingBudget = this.budgets.get(id);
    
    if (!existingBudget) {
      return undefined;
    }
    
    const updatedBudget: Budget = {
      ...existingBudget,
      ...budget,
      id,
    };
    
    this.budgets.set(id, updatedBudget);
    return updatedBudget;
  }
  
  async deleteBudget(id: number): Promise<boolean> {
    return this.budgets.delete(id);
  }
  
  // Bank statement methods
  async getBankStatement(id: number): Promise<BankStatement | undefined> {
    return this.bankStatements.get(id);
  }
  
  async getAllBankStatements(userId: number): Promise<BankStatement[]> {
    return Array.from(this.bankStatements.values())
      .filter(statement => statement.userId === userId);
  }
  
  async createBankStatement(statement: InsertBankStatement): Promise<BankStatement> {
    const id = this.bankStatementId++;
    const newStatement: BankStatement = { 
      ...statement, 
      id, 
      processedAt: new Date(),
    };
    this.bankStatements.set(id, newStatement);
    return newStatement;
  }
  
  // Subscription methods
  async getSubscription(id: number): Promise<Subscription | undefined> {
    return this.subscriptions.get(id);
  }
  
  async getAllSubscriptions(userId: number): Promise<Subscription[]> {
    return Array.from(this.subscriptions.values())
      .filter(subscription => subscription.userId === userId);
  }
  
  async createSubscription(subscription: InsertSubscription): Promise<Subscription> {
    const id = this.subscriptionId++;
    
    const newSubscription: Subscription = {
      ...subscription,
      id,
      createdAt: new Date()
    };
    
    this.subscriptions.set(id, newSubscription);
    return newSubscription;
  }
  
  async updateSubscription(id: number, subscription: InsertSubscription): Promise<Subscription | undefined> {
    const existingSubscription = this.subscriptions.get(id);
    if (!existingSubscription) {
      return undefined;
    }
    
    const updatedSubscription: Subscription = {
      ...existingSubscription,
      ...subscription,
      id
    };
    
    this.subscriptions.set(id, updatedSubscription);
    return updatedSubscription;
  }
  
  async deleteSubscription(id: number): Promise<boolean> {
    return this.subscriptions.delete(id);
  }
  
  // Check for duplicate transactions based on date, amount, and description
  async findDuplicateTransaction(transaction: InsertTransaction): Promise<Transaction | undefined> {
    const transactionDate = new Date(transaction.date);
    
    return Array.from(this.transactions.values()).find(
      (t) => {
        const existingDate = new Date(t.date);
        
        return (
          t.userId === transaction.userId &&
          t.amount === transaction.amount &&
          t.description === transaction.description &&
          existingDate.getDate() === transactionDate.getDate() &&
          existingDate.getMonth() === transactionDate.getMonth() &&
          existingDate.getFullYear() === transactionDate.getFullYear()
        );
      }
    );
  }
}

import { DatabaseStorage } from "./storage.postgres";

// Use DatabaseStorage instead of MemStorage
export const storage = new DatabaseStorage();
