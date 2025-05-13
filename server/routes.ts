import type { Express } from "express";
import { createServer, type Server } from "http";
import { isConnected } from "./db/mongodb";
import { MongoDBStorage } from "./storage.mongodb";
import { storage as memStorage } from "./storage";
import multer from "multer";
import { processStatementFile } from "./utils/transaction-parser";
import { body, param, validationResult } from "express-validator";
import { 
  insertTransactionSchema, 
  insertBudgetSchema, 
  insertSubscriptionSchema,
  insertLoanSchema,
  insertIncomeSourceSchema,
  insertInvestmentSchema,
  insertSipSchema
} from "@shared/schema";

// Create a MongoDB storage instance or use in-memory storage as fallback
const storage = isConnected() ? new MongoDBStorage() : memStorage;

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only PDF and Excel files
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.mimetype === "application/vnd.ms-excel"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and Excel files are allowed"));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "UP" });
  });

  // ===== Transactions Endpoints =====

  // Get all transactions
  app.get("/api/transactions", async (req, res) => {
    try {
      // Get the active user
      const user = await storage.getUserByUsername("user");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const transactions = await storage.getAllTransactions(user.id);
      res.json(transactions);
    } catch (error) {
      console.error("Error getting transactions:", error);
      res.status(500).json({ message: "Failed to retrieve transactions" });
    }
  });

  // Get single transaction
  app.get("/api/transactions/:id", 
    param("id").isNumeric(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const id = parseInt(req.params.id);
        const transaction = await storage.getTransaction(id);
        
        if (!transaction) {
          return res.status(404).json({ message: "Transaction not found" });
        }
        
        res.json(transaction);
      } catch (error) {
        console.error("Error getting transaction:", error);
        res.status(500).json({ message: "Failed to retrieve transaction" });
      }
    }
  );

  // Create transaction
  app.post("/api/transactions", 
    body().custom(value => {
      try {
        insertTransactionSchema.parse(value);
        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    }),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        // Get the active user
        const user = await storage.getUserByUsername("user");
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        
        const transaction = await storage.createTransaction({
          userId: user.id,
          ...req.body,
          date: new Date(req.body.date),
        });
        
        res.status(201).json(transaction);
      } catch (error) {
        console.error("Error creating transaction:", error);
        res.status(500).json({ message: "Failed to create transaction" });
      }
    }
  );

  // Update transaction
  app.put("/api/transactions/:id", 
    param("id").isNumeric(),
    body().custom(value => {
      try {
        insertTransactionSchema.parse(value);
        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    }),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        // Get the active user
        const user = await storage.getUserByUsername("user");
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        
        const id = parseInt(req.params.id);
        const transaction = await storage.updateTransaction(id, {
          userId: user.id,
          ...req.body,
          date: new Date(req.body.date),
        });
        
        if (!transaction) {
          return res.status(404).json({ message: "Transaction not found" });
        }
        
        res.json(transaction);
      } catch (error) {
        console.error("Error updating transaction:", error);
        res.status(500).json({ message: "Failed to update transaction" });
      }
    }
  );

  // Delete transaction
  app.delete("/api/transactions/:id", 
    param("id").isNumeric(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const id = parseInt(req.params.id);
        const success = await storage.deleteTransaction(id);
        
        if (!success) {
          return res.status(404).json({ message: "Transaction not found" });
        }
        
        res.status(204).send();
      } catch (error) {
        console.error("Error deleting transaction:", error);
        res.status(500).json({ message: "Failed to delete transaction" });
      }
    }
  );

  // ===== Budget Endpoints =====

  // Get all budgets
  app.get("/api/budgets", async (req, res) => {
    try {
      const budgets = await storage.getAllBudgets(1); // Using userId 1 for now
      res.json(budgets);
    } catch (error) {
      console.error("Error getting budgets:", error);
      res.status(500).json({ message: "Failed to retrieve budgets" });
    }
  });

  // Get single budget
  app.get("/api/budgets/:id", 
    param("id").isNumeric(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const id = parseInt(req.params.id);
        const budget = await storage.getBudget(id);
        
        if (!budget) {
          return res.status(404).json({ message: "Budget not found" });
        }
        
        res.json(budget);
      } catch (error) {
        console.error("Error getting budget:", error);
        res.status(500).json({ message: "Failed to retrieve budget" });
      }
    }
  );

  // Create budget
  app.post("/api/budgets", 
    body().custom(value => {
      try {
        insertBudgetSchema.parse(value);
        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    }),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        // Set budget period dates
        const startDate = new Date();
        let endDate;
        
        if (req.body.period === "monthly") {
          endDate = new Date(startDate);
          endDate.setMonth(endDate.getMonth() + 1);
        } else if (req.body.period === "weekly") {
          endDate = new Date(startDate);
          endDate.setDate(endDate.getDate() + 7);
        }
        
        const budget = await storage.createBudget({
          userId: 1, // Using userId 1 for now
          ...req.body,
          startDate,
          endDate,
        });
        
        res.status(201).json(budget);
      } catch (error) {
        console.error("Error creating budget:", error);
        res.status(500).json({ message: "Failed to create budget" });
      }
    }
  );

  // Update budget
  app.put("/api/budgets/:id", 
    param("id").isNumeric(),
    body().custom(value => {
      try {
        insertBudgetSchema.parse(value);
        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    }),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const id = parseInt(req.params.id);
        
        // Get existing budget to keep original dates
        const existingBudget = await storage.getBudget(id);
        if (!existingBudget) {
          return res.status(404).json({ message: "Budget not found" });
        }
        
        const budget = await storage.updateBudget(id, {
          userId: 1, // Using userId 1 for now
          ...req.body,
          startDate: existingBudget.startDate,
          endDate: existingBudget.endDate,
        });
        
        res.json(budget);
      } catch (error) {
        console.error("Error updating budget:", error);
        res.status(500).json({ message: "Failed to update budget" });
      }
    }
  );

  // Delete budget
  app.delete("/api/budgets/:id", 
    param("id").isNumeric(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const id = parseInt(req.params.id);
        const success = await storage.deleteBudget(id);
        
        if (!success) {
          return res.status(404).json({ message: "Budget not found" });
        }
        
        res.status(204).send();
      } catch (error) {
        console.error("Error deleting budget:", error);
        res.status(500).json({ message: "Failed to delete budget" });
      }
    }
  );

  // ===== Dashboard Endpoints =====

  // Get dashboard data
  app.get("/api/dashboard", async (req, res) => {
    try {
      // Get the active user
      const user = await storage.getUserByUsername("user");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Get all transactions for the user
      const transactions = await storage.getAllTransactions(user.id);
      
      // Get all budgets for the user
      const budgets = await storage.getAllBudgets(user.id);
      
      // Calculate totals
      const totalIncome = transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + Number(t.amount), 0);
      
      const totalExpenses = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0);
      
      const monthlySavings = totalIncome - totalExpenses;
      
      // Calculate budget utilization
      const totalBudget = budgets
        .filter(b => b.period === "monthly")
        .reduce((sum, b) => sum + Number(b.amount), 0);
      
      const budgetUtilization = totalBudget > 0 
        ? Math.round((totalExpenses / totalBudget) * 100) 
        : 0;
      
      // Calculate changes (mock for now)
      const incomeChange = {
        value: 12.5,
        isPositive: true,
      };
      
      const expenseChange = {
        value: 8.3,
        isPositive: false,
      };
      
      const savingsChange = {
        value: 5.2,
        isPositive: true,
      };
      
      // Get category breakdown
      const categoryData = {};
      transactions
        .filter(t => t.type === "expense")
        .forEach(t => {
          if (!categoryData[t.category]) {
            categoryData[t.category] = 0;
          }
          categoryData[t.category] += Number(t.amount);
        });
      
      const categoryBreakdown = Object.entries(categoryData)
        .map(([name, value]) => ({
          name,
          value,
          color: "", // Will be assigned on the client
        }))
        .sort((a, b) => (b.value as number) - (a.value as number));
      
      // Get monthly trend (mock for now)
      const monthlyTrend = [
        { month: "Jan", income: 95000, expense: 62000 },
        { month: "Feb", income: 98000, expense: 67000 },
        { month: "Mar", income: 105000, expense: 69000 },
        { month: "Apr", income: 110000, expense: 72000 },
        { month: "May", income: 118000, expense: 75000 },
        { month: "Jun", income: 115000, expense: 77000 },
        { month: "Jul", income: 125000, expense: 78450 },
      ];
      
      // Get recent transactions
      const recentTransactions = transactions
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);
      
      res.json({
        totalIncome,
        totalExpenses,
        monthlySavings,
        budgetUtilization,
        incomeChange,
        expenseChange,
        savingsChange,
        categoryBreakdown,
        monthlyTrend,
        recentTransactions,
      });
    } catch (error) {
      console.error("Error getting dashboard data:", error);
      res.status(500).json({ message: "Failed to retrieve dashboard data" });
    }
  });

  // ===== Analytics Endpoints =====

  app.get("/api/analytics", async (req, res) => {
    try {
      // Get the active user
      const user = await storage.getUserByUsername("user");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const transactions = await storage.getAllTransactions(user.id);
      
      // Summary data calculation would happen here
      // For now, return structured mock data as shown in the Analytics.tsx component
      
      res.json({
        summary: {
          totalIncome: 125000,
          totalExpense: 78450,
          savings: 46550,
          savingsRate: 37.24,
          transactionCount: transactions.length,
          averageExpense: transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + Number(t.amount), 0) / 
            (transactions.filter(t => t.type === "expense").length || 1)
        },
        // Other mock data as needed by the frontend component
      });
    } catch (error) {
      console.error("Error getting analytics data:", error);
      res.status(500).json({ message: "Failed to retrieve analytics data" });
    }
  });

  // ===== File Upload Endpoints =====

  // Upload bank statement
  app.post("/api/upload-statement", 
    upload.single("file"), 
    async (req, res) => {
      try {
        if (!req.file) {
          return res.status(400).json({ message: "No file uploaded" });
        }

        const file = req.file;
        const password = req.body.password;
        
        // Get the active user
        const user = await storage.getUserByUsername("user");
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        
        // Process the statement file
        const result = await processStatementFile(file, password, user.id, storage);
        
        res.json({
          message: "File processed successfully",
          ...result
        });
      } catch (error) {
        console.error("Error processing statement:", error);
        
        // Check if the error is related to a password-protected file
        if (error.message === "Password required" || error.message.includes("password")) {
          return res.status(401).json({ 
            message: "Password required",
            passwordRequired: true 
          });
        }
        
        res.status(500).json({ message: "Failed to process statement: " + error.message });
      }
    }
  );

  // ===== Subscription Endpoints =====
  
  // Get all subscriptions
  app.get("/api/subscriptions", async (req, res) => {
    try {
      const userId = 1; // Using userId 1 for now
      const subscriptions = await storage.getAllSubscriptions(userId);
      res.json(subscriptions);
    } catch (error) {
      console.error("Error getting subscriptions:", error);
      res.status(500).json({ message: "Failed to get subscriptions" });
    }
  });

  // Get a subscription by ID
  app.get(
    "/api/subscriptions/:id",
    [
      param("id").isInt().withMessage("Subscription ID must be an integer")
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const id = parseInt(req.params.id);
        const subscription = await storage.getSubscription(id);
        
        if (!subscription) {
          return res.status(404).json({ message: "Subscription not found" });
        }
        
        res.json(subscription);
      } catch (error) {
        console.error("Error getting subscription:", error);
        res.status(500).json({ message: "Failed to get subscription" });
      }
    }
  );

  // Create a new subscription
  app.post(
    "/api/subscriptions",
    [
      body("name").notEmpty().withMessage("Name is required"),
      body("amount").isFloat({ min: 0 }).withMessage("Amount must be a positive number"),
      body("billingCycle").isIn(["weekly", "monthly", "quarterly", "yearly"]).withMessage("Billing cycle must be one of: weekly, monthly, quarterly, yearly"),
      body("startDate").isISO8601().withMessage("Start date must be a valid date"),
      body("nextBillingDate").isISO8601().withMessage("Next billing date must be a valid date"),
      body("category").notEmpty().withMessage("Category is required"),
      body("paymentMethod").notEmpty().withMessage("Payment method is required"),
      body("autoRenew").isBoolean().withMessage("Auto renew must be a boolean"),
      body("active").isBoolean().withMessage("Active must be a boolean")
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        // Validate with zod schema
        const validatedData = insertSubscriptionSchema.parse({
          ...req.body,
          userId: 1, // Using userId 1 for now
          startDate: new Date(req.body.startDate),
          nextBillingDate: new Date(req.body.nextBillingDate)
        });
        
        const subscription = await storage.createSubscription(validatedData);
        res.status(201).json(subscription);
      } catch (error) {
        console.error("Error creating subscription:", error);
        res.status(500).json({ message: "Failed to create subscription" });
      }
    }
  );

  // Update a subscription
  app.patch(
    "/api/subscriptions/:id",
    [
      param("id").isInt().withMessage("Subscription ID must be an integer"),
      body("name").optional().notEmpty().withMessage("Name cannot be empty"),
      body("amount").optional().isFloat({ min: 0 }).withMessage("Amount must be a positive number"),
      body("billingCycle").optional().isIn(["weekly", "monthly", "quarterly", "yearly"]).withMessage("Billing cycle must be one of: weekly, monthly, quarterly, yearly"),
      body("startDate").optional().isISO8601().withMessage("Start date must be a valid date"),
      body("nextBillingDate").optional().isISO8601().withMessage("Next billing date must be a valid date"),
      body("category").optional().notEmpty().withMessage("Category cannot be empty"),
      body("paymentMethod").optional().notEmpty().withMessage("Payment method cannot be empty"),
      body("autoRenew").optional().isBoolean().withMessage("Auto renew must be a boolean"),
      body("active").optional().isBoolean().withMessage("Active must be a boolean")
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const id = parseInt(req.params.id);
        const existingSubscription = await storage.getSubscription(id);
        
        if (!existingSubscription) {
          return res.status(404).json({ message: "Subscription not found" });
        }
        
        // Prepare update data with proper date conversion
        const updateData = {
          ...existingSubscription,
          ...req.body,
          userId: 1, // Using userId 1 for now
          id: undefined, // Remove id as it's not needed for update
          createdAt: undefined // Remove createdAt as it's not needed for update
        };
        
        // Convert date strings to Date objects if present
        if (req.body.startDate) {
          updateData.startDate = new Date(req.body.startDate);
        }
        
        if (req.body.nextBillingDate) {
          updateData.nextBillingDate = new Date(req.body.nextBillingDate);
        }
        
        const updatedSubscription = await storage.updateSubscription(id, updateData);
        
        if (!updatedSubscription) {
          return res.status(404).json({ message: "Failed to update subscription" });
        }
        
        res.json(updatedSubscription);
      } catch (error) {
        console.error("Error updating subscription:", error);
        res.status(500).json({ message: "Failed to update subscription" });
      }
    }
  );

  // Delete a subscription
  app.delete(
    "/api/subscriptions/:id",
    [
      param("id").isInt().withMessage("Subscription ID must be an integer")
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const id = parseInt(req.params.id);
        const success = await storage.deleteSubscription(id);
        
        if (!success) {
          return res.status(404).json({ message: "Subscription not found" });
        }
        
        res.status(204).send();
      } catch (error) {
        console.error("Error deleting subscription:", error);
        res.status(500).json({ message: "Failed to delete subscription" });
      }
    }
  );

  // ===== Loans/Lending/Borrowing Endpoints =====
  
  // Get all loans
  app.get("/api/loans", async (req, res) => {
    try {
      // Get the active user
      const user = await storage.getUserByUsername("user");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const loans = await storage.getAllLoans(user.id);
      res.json(loans);
    } catch (error) {
      console.error("Error getting loans:", error);
      res.status(500).json({ message: "Failed to retrieve loans" });
    }
  });

  // Get single loan
  app.get("/api/loans/:id", 
    param("id").isNumeric(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const id = parseInt(req.params.id);
        const loan = await storage.getLoan(id);
        
        if (!loan) {
          return res.status(404).json({ message: "Loan not found" });
        }
        
        res.json(loan);
      } catch (error) {
        console.error("Error getting loan:", error);
        res.status(500).json({ message: "Failed to retrieve loan" });
      }
    }
  );

  // Create loan
  app.post("/api/loans", 
    body().custom(value => {
      try {
        insertLoanSchema.parse(value);
        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    }),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        // Get the active user
        const user = await storage.getUserByUsername("user");
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        
        // Prepare loan data
        const loanData = {
          ...req.body,
          userId: user.id,
          startDate: new Date(req.body.startDate),
          dueDate: req.body.dueDate ? new Date(req.body.dueDate) : null,
          createdAt: new Date()
        };
        
        const newLoan = await storage.createLoan(loanData);
        res.status(201).json(newLoan);
      } catch (error) {
        console.error("Error creating loan:", error);
        res.status(500).json({ message: "Failed to create loan" });
      }
    }
  );

  // Update a loan
  app.patch(
    "/api/loans/:id",
    [
      param("id").isInt().withMessage("Loan ID must be an integer"),
      body("amount").optional().isFloat({ min: 0 }).withMessage("Amount must be a positive number"),
      body("personName").optional().notEmpty().withMessage("Person name cannot be empty"),
      body("type").optional().isIn(["lent", "borrowed"]).withMessage("Type must be either 'lent' or 'borrowed'"),
      body("status").optional().isIn(["pending", "partially_paid", "paid"]).withMessage("Status must be one of: pending, partially_paid, paid"),
      body("startDate").optional().isISO8601().withMessage("Start date must be a valid date"),
      body("dueDate").optional().isISO8601().withMessage("Due date must be a valid date"),
      body("interestRate").optional().isFloat({ min: 0 }).withMessage("Interest rate must be a positive number"),
      body("paidAmount").optional().isFloat({ min: 0 }).withMessage("Paid amount must be a positive number")
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const id = parseInt(req.params.id);
        const existingLoan = await storage.getLoan(id);
        
        if (!existingLoan) {
          return res.status(404).json({ message: "Loan not found" });
        }
        
        // Prepare update data with proper date conversion
        const updateData = {
          ...req.body
        };
        
        // Convert date strings to Date objects if present
        if (req.body.startDate) {
          updateData.startDate = new Date(req.body.startDate);
        }
        
        if (req.body.dueDate) {
          updateData.dueDate = new Date(req.body.dueDate);
        }
        
        const updatedLoan = await storage.updateLoan(id, updateData);
        
        if (!updatedLoan) {
          return res.status(404).json({ message: "Failed to update loan" });
        }
        
        res.json(updatedLoan);
      } catch (error) {
        console.error("Error updating loan:", error);
        res.status(500).json({ message: "Failed to update loan" });
      }
    }
  );

  // Delete a loan
  app.delete(
    "/api/loans/:id",
    [
      param("id").isInt().withMessage("Loan ID must be an integer")
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const id = parseInt(req.params.id);
        const success = await storage.deleteLoan(id);
        
        if (!success) {
          return res.status(404).json({ message: "Loan not found" });
        }
        
        res.status(204).send();
      } catch (error) {
        console.error("Error deleting loan:", error);
        res.status(500).json({ message: "Failed to delete loan" });
      }
    }
  );

  // ===== Income Sources Endpoints =====
  
  // Get all income sources
  app.get("/api/income-sources", async (req, res) => {
    try {
      // Get the active user
      const user = await storage.getUserByUsername("user");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const incomeSources = await storage.getAllIncomeSources(user.id);
      res.json(incomeSources);
    } catch (error) {
      console.error("Error getting income sources:", error);
      res.status(500).json({ message: "Failed to retrieve income sources" });
    }
  });

  // Create income source
  app.post("/api/income-sources", 
    body().custom(value => {
      try {
        insertIncomeSourceSchema.parse(value);
        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    }),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        // Get the active user
        const user = await storage.getUserByUsername("user");
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        
        // Prepare income source data
        const incomeSourceData = {
          ...req.body,
          userId: user.id,
          startDate: new Date(req.body.startDate),
          endDate: req.body.endDate ? new Date(req.body.endDate) : null,
          createdAt: new Date()
        };
        
        const newIncomeSource = await storage.createIncomeSource(incomeSourceData);
        res.status(201).json(newIncomeSource);
      } catch (error) {
        console.error("Error creating income source:", error);
        res.status(500).json({ message: "Failed to create income source" });
      }
    }
  );
  
  // ===== Investments Endpoints =====
  
  // Get all investments
  app.get("/api/investments", async (req, res) => {
    try {
      // Get the active user
      const user = await storage.getUserByUsername("user");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const investments = await storage.getAllInvestments(user.id);
      res.json(investments);
    } catch (error) {
      console.error("Error getting investments:", error);
      res.status(500).json({ message: "Failed to retrieve investments" });
    }
  });

  // Create investment
  app.post("/api/investments", 
    body().custom(value => {
      try {
        insertInvestmentSchema.parse(value);
        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    }),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        // Get the active user
        const user = await storage.getUserByUsername("user");
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        
        // Prepare investment data
        const investmentData = {
          ...req.body,
          userId: user.id,
          purchaseDate: new Date(req.body.purchaseDate),
          maturityDate: req.body.maturityDate ? new Date(req.body.maturityDate) : null,
          createdAt: new Date()
        };
        
        const newInvestment = await storage.createInvestment(investmentData);
        res.status(201).json(newInvestment);
      } catch (error) {
        console.error("Error creating investment:", error);
        res.status(500).json({ message: "Failed to create investment" });
      }
    }
  );
  
  // ===== SIP Endpoints =====
  
  // Get all SIPs
  app.get("/api/sips", async (req, res) => {
    try {
      // Get the active user
      const user = await storage.getUserByUsername("user");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const sips = await storage.getAllSips(user.id);
      res.json(sips);
    } catch (error) {
      console.error("Error getting SIPs:", error);
      res.status(500).json({ message: "Failed to retrieve SIPs" });
    }
  });

  // Create SIP
  app.post("/api/sips", 
    body().custom(value => {
      try {
        insertSipSchema.parse(value);
        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    }),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        // Get the active user
        const user = await storage.getUserByUsername("user");
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        
        // Prepare SIP data
        const sipData = {
          ...req.body,
          userId: user.id,
          startDate: new Date(req.body.startDate),
          endDate: req.body.endDate ? new Date(req.body.endDate) : null,
          createdAt: new Date()
        };
        
        const newSip = await storage.createSip(sipData);
        res.status(201).json(newSip);
      } catch (error) {
        console.error("Error creating SIP:", error);
        res.status(500).json({ message: "Failed to create SIP" });
      }
    }
  );

  // ===== User Profile Endpoints =====
  
  // Get user profile
  app.get("/api/user/profile", async (req, res) => {
    try {
      // In a real application, this would come from session/auth middleware
      // For now, we'll create a default user if one doesn't exist
      let user = await storage.getUserByUsername("user");
      
      if (!user) {
        // Create a default user
        user = await storage.createUser({
          username: "user",
          password: "password", // In a real app, this would be hashed
          email: "user@example.com",
          fullName: "Sample User"
        });
        console.log("Created default user:", user.id);
      }
      
      // Don't send password in the response
      const { password, ...userProfile } = user;
      
      res.json(userProfile);
    } catch (error) {
      console.error("Error getting user profile:", error);
      res.status(500).json({ message: "Failed to get user profile" });
    }
  });

  // Update user profile
  app.patch(
    "/api/user/profile",
    [
      body("fullName").optional().notEmpty().withMessage("Full name cannot be empty"),
      body("email").optional().isEmail().withMessage("Email must be valid"),
      body("cashReserve").optional().isNumeric().withMessage("Cash reserve must be a number")
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        // Get the user by username since we're not using sessions yet
        const user = await storage.getUserByUsername("user");
        
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        
        // Update the user profile with the new data
        const updatedUser = await storage.updateUser(user.id, req.body);
        
        if (!updatedUser) {
          return res.status(500).json({ message: "Failed to update user profile" });
        }
        
        // Don't send password in the response
        const { password, ...userProfile } = updatedUser;
        
        res.json(userProfile);
      } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Failed to update user profile" });
      }
    }
  );
  
  // Update cash reserve
  app.patch(
    "/api/user/cash-reserve",
    [
      body("amount").isNumeric().withMessage("Amount must be a number")
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        // Get the user by username since we're not using sessions yet
        const user = await storage.getUserByUsername("user");
        
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        
        // Update the cash reserve
        const amount = Number(req.body.amount);
        const updatedUser = await storage.updateCashReserve(user.id, amount);
        
        if (!updatedUser) {
          return res.status(500).json({ message: "Failed to update cash reserve" });
        }
        
        // Don't send password in the response
        const { password, ...userProfile } = updatedUser;
        
        res.json(userProfile);
      } catch (error) {
        console.error("Error updating cash reserve:", error);
        res.status(500).json({ message: "Failed to update cash reserve" });
      }
    }
  );

  const httpServer = createServer(app);

  return httpServer;
}
