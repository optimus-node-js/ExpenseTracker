import type { Express } from "express";
import { createServer, type Server } from "http";
import { isConnected } from "./db/mongodb";
import { MongoDBStorage } from "./storage.mongodb";
import { storage as memStorage } from "./storage";
import multer from "multer";
import { processStatementFile } from "./utils/transaction-parser";
import { body, param, validationResult } from "express-validator";
import { insertTransactionSchema, insertBudgetSchema, insertSubscriptionSchema } from "@shared/schema";

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
      const transactions = await storage.getAllTransactions(1); // Using userId 1 for now
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
        const transaction = await storage.createTransaction({
          userId: 1, // Using userId 1 for now
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
        const id = parseInt(req.params.id);
        const transaction = await storage.updateTransaction(id, {
          userId: 1, // Using userId 1 for now
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
      const userId = 1; // Using userId 1 for now
      
      // Get all transactions for the user
      const transactions = await storage.getAllTransactions(userId);
      
      // Get all budgets for the user
      const budgets = await storage.getAllBudgets(userId);
      
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
      const userId = 1; // Using userId 1 for now
      const transactions = await storage.getAllTransactions(userId);
      
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
        const userId = 1; // Using userId 1 for now
        
        // Process the statement file
        const result = await processStatementFile(file, password, userId, storage);
        
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

  // ===== User Profile Endpoints =====
  
  // Get user profile
  app.get("/api/user/profile", async (req, res) => {
    try {
      // In a real application, this would come from session/auth middleware
      // For now, we'll query the first user in the database
      const user = await storage.getUserByUsername("user");
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
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
      body("email").optional().isEmail().withMessage("Email must be valid")
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const userId = 1; // Using userId 1 for now
        const user = await storage.getUser(userId);
        
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        
        // For now, since we don't have a full updateUser method, we'll just return the user
        // with the updated fields (in a real app we would update the database)
        const updatedUser = {
          ...user,
          ...req.body
        };
        
        // Don't send password in the response
        const { password, ...userProfile } = updatedUser;
        
        res.json(userProfile);
      } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Failed to update user profile" });
      }
    }
  );

  const httpServer = createServer(app);

  return httpServer;
}
