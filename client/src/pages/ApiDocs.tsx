import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Search, Code, Lock, FileJson, Copy, ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from '@/hooks/use-toast';

export default function ApiDocs() {
  // State for search
  const [searchQuery, setSearchQuery] = useState("");
  
  // API sections and endpoints
  const apiSections = [
    {
      id: "authentication",
      title: "Authentication",
      description: "How to authenticate with the RupeeTally API",
      endpoints: [
        {
          id: "get-token",
          method: "POST",
          path: "/api/auth/token",
          title: "Generate API Token",
          description: "Generate an API token to use for authenticated requests.",
          request: {
            body: {
              email: "your.email@example.com",
              apiKey: "your_api_key"
            }
          },
          response: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            expiresIn: 3600
          },
          parameters: [],
          authentication: "API Key",
          sampleCode: {
            curl: `curl -X POST https://api.rupeetally.com/api/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{"email": "your.email@example.com", "apiKey": "your_api_key"}'`,
            javascript: `fetch('https://api.rupeetally.com/api/auth/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'your.email@example.com',
    apiKey: 'your_api_key'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`
          }
        }
      ]
    },
    {
      id: "transactions",
      title: "Transactions",
      description: "Endpoints for managing financial transactions",
      endpoints: [
        {
          id: "get-transactions",
          method: "GET",
          path: "/api/transactions",
          title: "List Transactions",
          description: "Get a list of transactions with optional filtering.",
          parameters: [
            {
              name: "limit",
              type: "number",
              description: "Maximum number of transactions to return. Default is 50, maximum is 100.",
              required: false
            },
            {
              name: "offset",
              type: "number",
              description: "Number of transactions to skip for pagination. Default is 0.",
              required: false
            },
            {
              name: "startDate",
              type: "string (ISO 8601)",
              description: "Filter transactions from this date onwards.",
              required: false
            },
            {
              name: "endDate",
              type: "string (ISO 8601)",
              description: "Filter transactions until this date.",
              required: false
            },
            {
              name: "type",
              type: "string",
              description: "Filter by transaction type: 'income' or 'expense'.",
              required: false
            },
            {
              name: "category",
              type: "string",
              description: "Filter by transaction category ID.",
              required: false
            }
          ],
          response: [
            {
              id: 12345,
              amount: 2500,
              type: "expense",
              description: "Grocery shopping",
              category: "groceries",
              date: "2025-04-15T10:30:00Z",
              paymentMethod: "upi",
              tags: ["monthly", "essentials"]
            }
          ],
          authentication: "Bearer Token",
          sampleCode: {
            curl: `curl -X GET https://api.rupeetally.com/api/transactions?limit=10&type=expense \\
  -H "Authorization: Bearer YOUR_TOKEN"`,
            javascript: `fetch('https://api.rupeetally.com/api/transactions?limit=10&type=expense', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`
          }
        },
        {
          id: "create-transaction",
          method: "POST",
          path: "/api/transactions",
          title: "Create Transaction",
          description: "Create a new financial transaction.",
          request: {
            body: {
              amount: 1500,
              type: "expense",
              description: "Restaurant dinner",
              category: "dining_out",
              date: "2025-05-12T19:45:00Z",
              paymentMethod: "credit_card",
              tags: ["leisure", "weekend"]
            }
          },
          response: {
            id: 12346,
            amount: 1500,
            type: "expense",
            description: "Restaurant dinner",
            category: "dining_out",
            date: "2025-05-12T19:45:00Z",
            paymentMethod: "credit_card",
            tags: ["leisure", "weekend"],
            createdAt: "2025-05-12T20:00:00Z"
          },
          parameters: [],
          authentication: "Bearer Token",
          sampleCode: {
            curl: `curl -X POST https://api.rupeetally.com/api/transactions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -d '{
    "amount": 1500,
    "type": "expense",
    "description": "Restaurant dinner",
    "category": "dining_out",
    "date": "2025-05-12T19:45:00Z",
    "paymentMethod": "credit_card",
    "tags": ["leisure", "weekend"]
  }'`,
            javascript: `fetch('https://api.rupeetally.com/api/transactions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  },
  body: JSON.stringify({
    amount: 1500,
    type: "expense",
    description: "Restaurant dinner",
    category: "dining_out",
    date: "2025-05-12T19:45:00Z",
    paymentMethod: "credit_card",
    tags: ["leisure", "weekend"]
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`
          }
        },
        {
          id: "update-transaction",
          method: "PATCH",
          path: "/api/transactions/:id",
          title: "Update Transaction",
          description: "Update an existing transaction by ID.",
          request: {
            body: {
              amount: 1750,
              description: "Restaurant dinner with friends",
              tags: ["leisure", "weekend", "friends"]
            }
          },
          response: {
            id: 12346,
            amount: 1750,
            type: "expense",
            description: "Restaurant dinner with friends",
            category: "dining_out",
            date: "2025-05-12T19:45:00Z",
            paymentMethod: "credit_card",
            tags: ["leisure", "weekend", "friends"],
            updatedAt: "2025-05-12T20:15:00Z"
          },
          parameters: [
            {
              name: "id",
              type: "number",
              description: "The ID of the transaction to update.",
              required: true
            }
          ],
          authentication: "Bearer Token",
          sampleCode: {
            curl: `curl -X PATCH https://api.rupeetally.com/api/transactions/12346 \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -d '{
    "amount": 1750,
    "description": "Restaurant dinner with friends",
    "tags": ["leisure", "weekend", "friends"]
  }'`,
            javascript: `fetch('https://api.rupeetally.com/api/transactions/12346', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  },
  body: JSON.stringify({
    amount: 1750,
    description: "Restaurant dinner with friends",
    tags: ["leisure", "weekend", "friends"]
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`
          }
        }
      ]
    },
    {
      id: "budgets",
      title: "Budgets",
      description: "Endpoints for managing budget plans",
      endpoints: [
        {
          id: "get-budgets",
          method: "GET",
          path: "/api/budgets",
          title: "List Budgets",
          description: "Get a list of all your budgets.",
          parameters: [
            {
              name: "period",
              type: "string",
              description: "Filter by budget period: 'weekly' or 'monthly'.",
              required: false
            }
          ],
          response: [
            {
              id: 5001,
              name: "Groceries",
              amount: 8000,
              period: "monthly",
              category: "groceries",
              startDate: "2025-05-01T00:00:00Z",
              spent: 3200,
              remaining: 4800
            }
          ],
          authentication: "Bearer Token",
          sampleCode: {
            curl: `curl -X GET https://api.rupeetally.com/api/budgets \\
  -H "Authorization: Bearer YOUR_TOKEN"`,
            javascript: `fetch('https://api.rupeetally.com/api/budgets', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`
          }
        },
        {
          id: "create-budget",
          method: "POST",
          path: "/api/budgets",
          title: "Create Budget",
          description: "Create a new budget category.",
          request: {
            body: {
              name: "Entertainment",
              amount: 5000,
              period: "monthly",
              category: "entertainment",
              startDate: "2025-05-01T00:00:00Z"
            }
          },
          response: {
            id: 5002,
            name: "Entertainment",
            amount: 5000,
            period: "monthly",
            category: "entertainment",
            startDate: "2025-05-01T00:00:00Z",
            spent: 0,
            remaining: 5000,
            createdAt: "2025-05-12T13:00:00Z"
          },
          parameters: [],
          authentication: "Bearer Token",
          sampleCode: {
            curl: `curl -X POST https://api.rupeetally.com/api/budgets \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -d '{
    "name": "Entertainment",
    "amount": 5000,
    "period": "monthly",
    "category": "entertainment",
    "startDate": "2025-05-01T00:00:00Z"
  }'`,
            javascript: `fetch('https://api.rupeetally.com/api/budgets', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  },
  body: JSON.stringify({
    name: "Entertainment",
    amount: 5000,
    period: "monthly",
    category: "entertainment",
    startDate: "2025-05-01T00:00:00Z"
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`
          }
        }
      ]
    },
    {
      id: "investments",
      title: "Investments",
      description: "Endpoints for managing investment portfolio",
      endpoints: [
        {
          id: "get-investments",
          method: "GET",
          path: "/api/investments",
          title: "List Investments",
          description: "Get a list of all your investments.",
          parameters: [
            {
              name: "type",
              type: "string",
              description: "Filter by investment type: 'stocks', 'mutual_funds', 'gold', etc.",
              required: false
            }
          ],
          response: [
            {
              id: 3001,
              name: "Equity Growth Fund",
              type: "mutual_fund",
              purchaseDate: "2023-01-15T00:00:00Z",
              purchaseValue: 50000,
              currentValue: 58500,
              returns: 17,
              category: "equity"
            }
          ],
          authentication: "Bearer Token",
          sampleCode: {
            curl: `curl -X GET https://api.rupeetally.com/api/investments \\
  -H "Authorization: Bearer YOUR_TOKEN"`,
            javascript: `fetch('https://api.rupeetally.com/api/investments', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`
          }
        },
        {
          id: "create-investment",
          method: "POST",
          path: "/api/investments",
          title: "Create Investment",
          description: "Add a new investment to your portfolio.",
          request: {
            body: {
              name: "Digital Gold",
              type: "gold",
              purchaseDate: "2025-04-01T00:00:00Z",
              purchaseValue: 25000,
              quantity: 5,
              notes: "Festive season purchase"
            }
          },
          response: {
            id: 3002,
            name: "Digital Gold",
            type: "gold",
            purchaseDate: "2025-04-01T00:00:00Z",
            purchaseValue: 25000,
            currentValue: 25000,
            returns: 0,
            quantity: 5,
            notes: "Festive season purchase",
            createdAt: "2025-05-12T14:30:00Z"
          },
          parameters: [],
          authentication: "Bearer Token",
          sampleCode: {
            curl: `curl -X POST https://api.rupeetally.com/api/investments \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -d '{
    "name": "Digital Gold",
    "type": "gold",
    "purchaseDate": "2025-04-01T00:00:00Z",
    "purchaseValue": 25000,
    "quantity": 5,
    "notes": "Festive season purchase"
  }'`,
            javascript: `fetch('https://api.rupeetally.com/api/investments', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  },
  body: JSON.stringify({
    name: "Digital Gold",
    type: "gold",
    purchaseDate: "2025-04-01T00:00:00Z",
    purchaseValue: 25000,
    quantity: 5,
    notes: "Festive season purchase"
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`
          }
        }
      ]
    },
    {
      id: "loans",
      title: "Loans",
      description: "Endpoints for managing loans and borrowings",
      endpoints: [
        {
          id: "get-loans",
          method: "GET",
          path: "/api/loans",
          title: "List Loans",
          description: "Get a list of all your loans and borrowings.",
          parameters: [
            {
              name: "type",
              type: "string",
              description: "Filter by loan type: 'lent' or 'borrowed'.",
              required: false
            },
            {
              name: "status",
              type: "string",
              description: "Filter by status: 'active', 'paid', or 'overdue'.",
              required: false
            }
          ],
          response: [
            {
              id: 2001,
              amount: 10000,
              type: "lent",
              personName: "Rahul Sharma",
              purpose: "Emergency",
              date: "2025-03-10T00:00:00Z",
              dueDate: "2025-06-10T00:00:00Z",
              status: "active",
              interestRate: 0
            }
          ],
          authentication: "Bearer Token",
          sampleCode: {
            curl: `curl -X GET https://api.rupeetally.com/api/loans \\
  -H "Authorization: Bearer YOUR_TOKEN"`,
            javascript: `fetch('https://api.rupeetally.com/api/loans', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`
          }
        },
        {
          id: "create-loan",
          method: "POST",
          path: "/api/loans",
          title: "Create Loan",
          description: "Record a new loan or borrowing.",
          request: {
            body: {
              amount: 5000,
              type: "borrowed",
              personName: "Priya Patel",
              purpose: "Trip expenses",
              date: "2025-05-10T00:00:00Z",
              dueDate: "2025-05-25T00:00:00Z",
              interestRate: 0
            }
          },
          response: {
            id: 2002,
            amount: 5000,
            type: "borrowed",
            personName: "Priya Patel",
            purpose: "Trip expenses",
            date: "2025-05-10T00:00:00Z",
            dueDate: "2025-05-25T00:00:00Z",
            status: "active",
            interestRate: 0,
            createdAt: "2025-05-12T15:45:00Z"
          },
          parameters: [],
          authentication: "Bearer Token",
          sampleCode: {
            curl: `curl -X POST https://api.rupeetally.com/api/loans \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -d '{
    "amount": 5000,
    "type": "borrowed",
    "personName": "Priya Patel",
    "purpose": "Trip expenses",
    "date": "2025-05-10T00:00:00Z",
    "dueDate": "2025-05-25T00:00:00Z",
    "interestRate": 0
  }'`,
            javascript: `fetch('https://api.rupeetally.com/api/loans', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  },
  body: JSON.stringify({
    amount: 5000,
    type: "borrowed",
    personName: "Priya Patel",
    purpose: "Trip expenses",
    date: "2025-05-10T00:00:00Z",
    dueDate: "2025-05-25T00:00:00Z",
    interestRate: 0
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`
          }
        }
      ]
    }
  ];

  // Filter sections and endpoints based on search query
  const filteredSections = searchQuery.trim() === '' 
    ? apiSections 
    : apiSections
        .map(section => ({
          ...section,
          endpoints: section.endpoints.filter(endpoint => 
            endpoint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            endpoint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            endpoint.path.toLowerCase().includes(searchQuery.toLowerCase())
          )
        }))
        .filter(section => section.endpoints.length > 0);

  // Function to copy code to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: "The code sample has been copied to your clipboard."
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <header className="container mx-auto py-6 px-4">
        <Link href="/">
          <Button variant="ghost" className="flex items-center">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">Developer Tools</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">API Documentation</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Integrate RupeeTally's financial management capabilities into your own applications with our 
            comprehensive API.
          </p>
          
          <div className="relative max-w-xl mx-auto mb-10">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search endpoints..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4 flex-wrap justify-center">
            <Link href="#getting-started">
              <Button variant="outline" className="gap-2">
                <Code className="h-4 w-4" />
                Getting Started
              </Button>
            </Link>
            <Link href="#authentication">
              <Button variant="outline" className="gap-2">
                <Lock className="h-4 w-4" />
                Authentication
              </Button>
            </Link>
            <Link href="#rate-limits">
              <Button variant="outline" className="gap-2">
                <FileJson className="h-4 w-4" />
                Rate Limits
              </Button>
            </Link>
          </div>
        </motion.div>
        
        {/* Getting Started section */}
        <motion.div
          id="getting-started"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 scroll-mt-20"
        >
          <h2 className="text-3xl font-bold mb-6">Getting Started</h2>
          <div className="space-y-6">
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Base URL</h3>
              <div className="bg-muted p-4 rounded flex justify-between items-center mb-4">
                <code className="text-sm">https://api.rupeetally.com</code>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => copyToClipboard("https://api.rupeetally.com")}
                  className="h-8 w-8 p-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-muted-foreground">
                All API requests should be made to this base URL followed by the specific endpoint path.
              </p>
            </div>
            
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Request Format</h3>
              <p className="text-muted-foreground mb-4">
                The API accepts JSON-encoded request bodies and returns JSON-encoded responses. Always include the following headers:
              </p>
              <div className="bg-muted p-4 rounded mb-4">
                <code className="text-sm block mb-2">Content-Type: application/json</code>
                <code className="text-sm block">Authorization: Bearer YOUR_TOKEN</code>
              </div>
              <p className="text-muted-foreground">
                Replace <code className="text-sm">YOUR_TOKEN</code> with the token obtained from the authentication endpoint.
              </p>
            </div>
            
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Response Format</h3>
              <p className="text-muted-foreground mb-4">
                Successful responses have a 2xx status code and return either a JSON object or an array of objects. Error responses have 4xx or 5xx status codes and return an error object:
              </p>
              <div className="bg-muted p-4 rounded mb-4">
                <pre className="text-sm overflow-x-auto">
{`{
  "error": {
    "code": "unauthorized",
    "message": "Invalid or expired token"
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Authentication details section */}
        <motion.div
          id="authentication"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 scroll-mt-20"
        >
          <h2 className="text-3xl font-bold mb-6">Authentication</h2>
          <div className="bg-card border rounded-lg p-6">
            <p className="text-muted-foreground mb-4">
              To use the RupeeTally API, you need to authenticate using an API key and token:
            </p>
            <ol className="list-decimal pl-5 space-y-4 mb-6">
              <li className="text-muted-foreground">
                <span className="text-foreground font-medium">Generate an API key</span> in your RupeeTally account settings under "Developer Options."
              </li>
              <li className="text-muted-foreground">
                <span className="text-foreground font-medium">Use the API key</span> to generate an authentication token via the <code className="text-sm">/api/auth/token</code> endpoint.
              </li>
              <li className="text-muted-foreground">
                <span className="text-foreground font-medium">Include the token</span> as a Bearer token in the Authorization header of all subsequent requests.
              </li>
            </ol>
            <div className="bg-muted p-4 rounded mb-4">
              <code className="text-sm">Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</code>
            </div>
            <p className="text-muted-foreground">
              Tokens expire after 1 hour. Generate a new token when needed.
            </p>
          </div>
        </motion.div>
        
        {/* Rate Limits section */}
        <motion.div
          id="rate-limits"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 scroll-mt-20"
        >
          <h2 className="text-3xl font-bold mb-6">Rate Limits</h2>
          <div className="bg-card border rounded-lg p-6">
            <p className="text-muted-foreground mb-4">
              RupeeTally API implements rate limiting to ensure fair usage. Limits vary by plan:
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 font-medium">Plan</th>
                    <th className="text-left py-2 px-4 font-medium">Rate Limit</th>
                    <th className="text-left py-2 px-4 font-medium">Reset Period</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4">Free</td>
                    <td className="py-2 px-4">100 requests</td>
                    <td className="py-2 px-4">Per hour</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">Premium</td>
                    <td className="py-2 px-4">1,000 requests</td>
                    <td className="py-2 px-4">Per hour</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">Enterprise</td>
                    <td className="py-2 px-4">10,000 requests</td>
                    <td className="py-2 px-4">Per hour</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mb-2">Rate limit information is included in the response headers:</p>
            <div className="bg-muted p-4 rounded">
              <code className="text-sm block mb-2">X-RateLimit-Limit: 100</code>
              <code className="text-sm block mb-2">X-RateLimit-Remaining: 95</code>
              <code className="text-sm block">X-RateLimit-Reset: 1620000000</code>
            </div>
          </div>
        </motion.div>
        
        {/* API Endpoints sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8">API Endpoints</h2>
          
          {filteredSections.length > 0 ? (
            <div className="space-y-12">
              {filteredSections.map((section) => (
                <motion.div 
                  key={section.id} 
                  variants={itemVariants}
                  id={section.id}
                  className="scroll-mt-20"
                >
                  <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
                  <p className="text-muted-foreground mb-6">{section.description}</p>
                  
                  <div className="space-y-8">
                    {section.endpoints.map((endpoint) => (
                      <div key={endpoint.id} className="bg-card border rounded-lg overflow-hidden">
                        {/* Endpoint header */}
                        <div className="p-6 border-b bg-muted/30">
                          <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                            <div>
                              <h4 className="text-xl font-semibold mb-2">{endpoint.title}</h4>
                              <p className="text-muted-foreground">{endpoint.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={
                                endpoint.method === "GET" ? "default" : 
                                endpoint.method === "POST" ? "outline" : 
                                endpoint.method === "PATCH" ? "secondary" : 
                                "destructive"
                              } className="font-mono">
                                {endpoint.method}
                              </Badge>
                              <code className="text-sm bg-muted p-2 rounded font-mono">{endpoint.path}</code>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Lock className="h-3 w-3" />
                              {endpoint.authentication}
                            </Badge>
                          </div>
                        </div>
                        
                        {/* Endpoint details */}
                        <div className="p-6">
                          <Tabs defaultValue="parameters" className="w-full">
                            <TabsList className="mb-4">
                              <TabsTrigger value="parameters">Parameters</TabsTrigger>
                              <TabsTrigger value="request">Request</TabsTrigger>
                              <TabsTrigger value="response">Response</TabsTrigger>
                              <TabsTrigger value="code">Code Examples</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="parameters">
                              {endpoint.parameters.length > 0 ? (
                                <div className="overflow-x-auto">
                                  <table className="w-full border-collapse">
                                    <thead>
                                      <tr className="border-b">
                                        <th className="text-left py-2 px-4 font-medium">Parameter</th>
                                        <th className="text-left py-2 px-4 font-medium">Type</th>
                                        <th className="text-left py-2 px-4 font-medium">Required</th>
                                        <th className="text-left py-2 px-4 font-medium">Description</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {endpoint.parameters.map((param, index) => (
                                        <tr key={index} className="border-b">
                                          <td className="py-2 px-4 font-mono text-sm">{param.name}</td>
                                          <td className="py-2 px-4 text-sm">{param.type}</td>
                                          <td className="py-2 px-4">
                                            {param.required ? (
                                              <Badge>Required</Badge>
                                            ) : (
                                              <Badge variant="outline">Optional</Badge>
                                            )}
                                          </td>
                                          <td className="py-2 px-4 text-muted-foreground">{param.description}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              ) : (
                                <p className="text-muted-foreground">This endpoint doesn't require any parameters.</p>
                              )}
                            </TabsContent>
                            
                            <TabsContent value="request">
                              {endpoint.request ? (
                                <div className="bg-muted rounded-lg p-4 relative">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="absolute top-2 right-2 h-8 w-8 p-0"
                                    onClick={() => copyToClipboard(JSON.stringify(endpoint.request.body, null, 2))}
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                  <pre className="text-sm overflow-x-auto">
                                    {JSON.stringify(endpoint.request.body, null, 2)}
                                  </pre>
                                </div>
                              ) : (
                                <p className="text-muted-foreground">This endpoint doesn't require a request body.</p>
                              )}
                            </TabsContent>
                            
                            <TabsContent value="response">
                              <div className="bg-muted rounded-lg p-4 relative">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="absolute top-2 right-2 h-8 w-8 p-0"
                                  onClick={() => copyToClipboard(JSON.stringify(endpoint.response, null, 2))}
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                                <pre className="text-sm overflow-x-auto">
                                  {JSON.stringify(endpoint.response, null, 2)}
                                </pre>
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="code">
                              <Tabs defaultValue="curl">
                                <TabsList className="mb-4">
                                  <TabsTrigger value="curl">cURL</TabsTrigger>
                                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                                </TabsList>
                                
                                <TabsContent value="curl">
                                  <div className="bg-muted rounded-lg p-4 relative">
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="absolute top-2 right-2 h-8 w-8 p-0"
                                      onClick={() => copyToClipboard(endpoint.sampleCode.curl)}
                                    >
                                      <Copy className="h-4 w-4" />
                                    </Button>
                                    <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
                                      {endpoint.sampleCode.curl}
                                    </pre>
                                  </div>
                                </TabsContent>
                                
                                <TabsContent value="javascript">
                                  <div className="bg-muted rounded-lg p-4 relative">
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="absolute top-2 right-2 h-8 w-8 p-0"
                                      onClick={() => copyToClipboard(endpoint.sampleCode.javascript)}
                                    >
                                      <Copy className="h-4 w-4" />
                                    </Button>
                                    <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
                                      {endpoint.sampleCode.javascript}
                                    </pre>
                                  </div>
                                </TabsContent>
                              </Tabs>
                            </TabsContent>
                          </Tabs>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No endpoints found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search criteria or browse a different section.</p>
              <Button onClick={() => setSearchQuery("")}>View All Endpoints</Button>
            </div>
          )}
        </motion.div>
        
        {/* Support section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-primary/5 rounded-lg p-8 md:p-12 text-center max-w-4xl mx-auto mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Help?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our team is here to help you integrate with the RupeeTally API. Contact us for technical support or to explore 
            enterprise solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://github.com/rupeetally/api-docs" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2">
                <FileJson className="h-4 w-4" />
                API Reference
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="gap-2">
                Contact Support
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}