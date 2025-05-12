import { User, InsertUser, Transaction, InsertTransaction, Budget, InsertBudget, BankStatement, InsertBankStatement, Subscription, InsertSubscription } from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
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
  
  // Additional methods for transaction processing
  findDuplicateTransaction(transaction: InsertTransaction): Promise<Transaction | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private transactions: Map<number, Transaction>;
  private budgets: Map<number, Budget>;
  private bankStatements: Map<number, BankStatement>;
  
  private userId: number = 1;
  private transactionId: number = 1;
  private budgetId: number = 1;
  private bankStatementId: number = 1;

  constructor() {
    this.users = new Map();
    this.transactions = new Map();
    this.budgets = new Map();
    this.bankStatements = new Map();
    
    // Initialize with a default user
    this.users.set(1, {
      id: 1,
      username: "rahul",
      password: "password", // In a real app, this would be hashed
      email: "rahul@example.com",
      fullName: "Rahul Sharma",
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

export const storage = new MemStorage();
