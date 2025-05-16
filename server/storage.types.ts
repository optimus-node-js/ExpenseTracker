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