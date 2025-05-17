import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Search, Calendar, User, Clock, ArrowRight, Filter } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Blog post type definition
type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  featuredImage: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    title: string;
  };
  publishDate: string;
  readTime: number;
};

// Blog Categories
const categories = [
  "All",
  "Personal Finance",
  "Investment",
  "Savings",
  "Budgeting",
  "Taxation",
  "Financial Planning"
];

export default function Blog() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);
  
  // Sample blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "7 Smart Ways to Track Your Daily Expenses in India",
      excerpt: "Discover practical strategies to monitor your daily spending and take control of your finances with these India-specific tips.",
      featuredImage: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=1000&auto=format&fit=crop",
      category: "Budgeting",
      tags: ["Expense Tracking", "Budgeting", "Personal Finance"],
      author: {
        name: "Priya Sharma",
        avatar: "",
        title: "Financial Advisor"
      },
      publishDate: "May 10, 2025",
      readTime: 5
    },
    {
      id: "2",
      title: "Understanding SIP: Your Path to Long-term Wealth Creation",
      excerpt: "Learn how Systematic Investment Plans (SIPs) can help you build wealth consistently over time with disciplined investing.",
      featuredImage: "https://images.unsplash.com/photo-1568234928966-359d24852629?q=80&w=1000&auto=format&fit=crop",
      category: "Investment",
      tags: ["SIP", "Mutual Funds", "Wealth Creation"],
      author: {
        name: "Vikram Mehta",
        avatar: "",
        title: "Investment Strategist"
      },
      publishDate: "May 5, 2025",
      readTime: 8
    },
    {
      id: "3",
      title: "Tax Saving Investments: Beyond Section 80C",
      excerpt: "Explore tax-saving investment options beyond the popular Section 80C to optimize your tax liability efficiently.",
      featuredImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop",
      category: "Taxation",
      tags: ["Tax Planning", "Investments", "Section 80C"],
      author: {
        name: "Rohit Kumar",
        avatar: "",
        title: "Tax Consultant"
      },
      publishDate: "April 28, 2025",
      readTime: 7
    },
    {
      id: "4",
      title: "The 50-30-20 Budget Rule: Adapting it for Indian Households",
      excerpt: "Learn how to adapt the popular 50-30-20 budgeting rule to suit Indian financial contexts and family structures.",
      featuredImage: "https://images.unsplash.com/photo-1571612182374-0fe44d5f4716?q=80&w=1000&auto=format&fit=crop",
      category: "Budgeting",
      tags: ["Budget", "Financial Planning", "Money Management"],
      author: {
        name: "Shikha Patel",
        avatar: "",
        title: "Financial Educator"
      },
      publishDate: "April 22, 2025",
      readTime: 6
    },
    {
      id: "5",
      title: "Digital Payment Apps in India: Choosing the Right One",
      excerpt: "Compare the most popular digital payment apps in India and discover which one best suits your financial needs.",
      featuredImage: "https://images.unsplash.com/photo-1580508174046-170816f65662?q=80&w=1000&auto=format&fit=crop",
      category: "Personal Finance",
      tags: ["Digital Payments", "UPI", "Mobile Banking"],
      author: {
        name: "Aditya Singh",
        avatar: "",
        title: "Fintech Analyst"
      },
      publishDate: "April 15, 2025",
      readTime: 5
    },
    {
      id: "6",
      title: "Emergency Fund: How Much is Enough for Indian Families?",
      excerpt: "Understand the importance of emergency funds and how to calculate the ideal amount for your specific Indian household needs.",
      featuredImage: "https://images.unsplash.com/photo-1633158829875-e5316a358c6c?q=80&w=1000&auto=format&fit=crop",
      category: "Savings",
      tags: ["Emergency Fund", "Financial Security", "Savings"],
      author: {
        name: "Neha Gupta",
        avatar: "",
        title: "Financial Planner"
      },
      publishDate: "April 10, 2025",
      readTime: 6
    },
    {
      id: "7",
      title: "Retirement Planning in Your 30s: A Guide for Young Indians",
      excerpt: "Start planning for retirement early with this comprehensive guide tailored for young Indian professionals in their 30s.",
      featuredImage: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1000&auto=format&fit=crop",
      category: "Financial Planning",
      tags: ["Retirement", "Planning", "Investment"],
      author: {
        name: "Arjun Rao",
        avatar: "",
        title: "Retirement Specialist"
      },
      publishDate: "April 5, 2025",
      readTime: 9
    },
    {
      id: "8",
      title: "Gold vs Mutual Funds: Where Should Indians Invest?",
      excerpt: "Compare traditional gold investments with modern mutual funds to understand which might be better for your financial goals.",
      featuredImage: "https://images.unsplash.com/photo-1589735247758-1dbff8c1a38f?q=80&w=1000&auto=format&fit=crop",
      category: "Investment",
      tags: ["Gold", "Mutual Funds", "Investment Comparison"],
      author: {
        name: "Kavita Nair",
        avatar: "",
        title: "Investment Analyst"
      },
      publishDate: "March 28, 2025",
      readTime: 7
    },
    {
      id: "9",
      title: "Understanding the New Tax Regime: Should You Switch?",
      excerpt: "Analyze the benefits and drawbacks of India's new tax regime to determine if switching makes financial sense for you.",
      featuredImage: "https://images.unsplash.com/photo-1612630741022-b29ec8624cd1?q=80&w=1000&auto=format&fit=crop",
      category: "Taxation",
      tags: ["Tax Regime", "Income Tax", "Tax Planning"],
      author: {
        name: "Rajesh Kumar",
        avatar: "",
        title: "Tax Advisor"
      },
      publishDate: "March 22, 2025",
      readTime: 8
    }
  ];

  // State variables
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  // Filter posts based on search query and category
  React.useEffect(() => {
    let filtered = blogPosts;
    
    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    setFilteredPosts(filtered);
  }, [searchQuery, selectedCategory]);

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

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
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
          <Badge variant="outline" className="mb-4">Our Blog</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Financial Insights & Education</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover practical financial tips, investment strategies, and personal finance advice 
            tailored for Indian households and investors.
          </p>
          
          {/* Search and filter */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search articles..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {selectedCategory}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {categories.map((category) => (
                  <DropdownMenuItem 
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-muted" : ""}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>
        
        {/* Featured blog post */}
        {filteredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16"
          >
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-64 md:h-auto relative overflow-hidden">
                  <img
                    src={filteredPosts[0].featuredImage}
                    alt={filteredPosts[0].title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge>{filteredPosts[0].category}</Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {filteredPosts[0].publishDate}
                    </span>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {filteredPosts[0].readTime} min read
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{filteredPosts[0].title}</h2>
                  <p className="text-muted-foreground mb-6">{filteredPosts[0].excerpt}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={filteredPosts[0].author.avatar} />
                        <AvatarFallback>{getInitials(filteredPosts[0].author.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{filteredPosts[0].author.name}</p>
                        <p className="text-xs text-muted-foreground">{filteredPosts[0].author.title}</p>
                      </div>
                    </div>
                    <Link href={`/blog/${filteredPosts[0].id}`}>
                      <Button>Read More</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
        
        {/* Blog posts grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.slice(1).map((post) => (
                <motion.div key={post.id} variants={itemVariants}>
                  <Card className="h-full flex flex-col hover:shadow-md transition-shadow overflow-hidden">
                    <div className="h-48 relative overflow-hidden">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge>{post.category}</Badge>
                      </div>
                    </div>
                    <CardContent className="flex-1 pt-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.publishDate}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime} min read
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h3>
                      <p className="text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter className="pt-0 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={post.author.avatar} />
                          <AvatarFallback>{getInitials(post.author.name)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{post.author.name}</span>
                      </div>
                      <Link href={`/blog/${post.id}`}>
                        <Button variant="ghost" size="sm" className="gap-1">
                          Read 
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search criteria or browse a different category.</p>
              <Button onClick={() => {setSearchQuery(""); setSelectedCategory("All");}}>View All Articles</Button>
            </div>
          )}
        </motion.div>
        
        {/* Newsletter section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-primary/5 rounded-lg p-8 md:p-12 text-center max-w-4xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated With Financial Insights</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest articles, tips, and financial advice directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input placeholder="Your email address" type="email" />
            <Button>Subscribe</Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}