import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Check, Heart, Users, Shield, Target } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function About() {
  // Company values
  const values = [
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Customer First',
      description: 'We prioritize our users in every decision we make, building features that truly matter to Indian households.'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Security & Privacy',
      description: 'Your financial data is sacrosanct. We employ the strongest security measures to protect your information.'
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Simplicity',
      description: 'Financial management should be accessible to everyone, regardless of financial background or expertise.'
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'Made in India',
      description: 'Built by Indians, for Indians. We understand the unique financial challenges and opportunities in India.'
    }
  ];

  // Team members
  const teamMembers = [
    {
      name: 'Arjun Sharma',
      role: 'Founder & CEO',
      bio: 'Former fintech executive with over 10 years of experience in personal finance. Passionate about helping Indians achieve financial freedom.',
      image: '/placeholder-avatar.png'
    },
    {
      name: 'Priya Patel',
      role: 'Chief Product Officer',
      bio: 'Product visionary with experience at leading Indian startups. Committed to building intuitive financial tools for everyone.',
      image: '/placeholder-avatar.png'
    },
    {
      name: 'Vikram Mehta',
      role: 'CTO',
      bio: 'Technology leader with expertise in secure fintech applications. Previous experience at major financial institutions.',
      image: '/placeholder-avatar.png'
    },
    {
      name: 'Neha Gupta',
      role: 'Head of Customer Success',
      bio: 'Customer advocate with a passion for financial education. Ensures every RupeeTally user gets the support they need.',
      image: '/placeholder-avatar.png'
    }
  ];

  // Journey timeline
  const timeline = [
    {
      year: '2021',
      title: 'The Beginning',
      description: 'RupeeTally was founded with a mission to simplify financial management for every Indian.'
    },
    {
      year: '2022',
      title: 'First 10,000 Users',
      description: 'Reached a milestone of 10,000 active users across India, from metro cities to tier-2 towns.'
    },
    {
      year: '2023',
      title: 'Investment Tracking Launch',
      description: 'Released comprehensive investment tracking features tailored for Indian investors, including SIPs and mutual funds.'
    },
    {
      year: '2024',
      title: 'Mobile App Release',
      description: 'Launched our mobile app for Android and iOS, bringing expense tracking on-the-go to all our users.'
    },
    {
      year: '2025',
      title: 'Looking Forward',
      description: 'Continuing to innovate with AI-powered insights, tax optimization, and more features tailored for Indian users.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
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
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">About Us</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission: Financial Clarity for Every Indian</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            RupeeTally was born from a simple idea: making personal finance management accessible, 
            straightforward, and tailored to the unique needs of Indian users.
          </p>
        </motion.div>

        {/* Our Story */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20"
        >
          <motion.div variants={itemVariants} className="order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              In 2021, our founder Arjun Sharma was struggling to manage his finances using existing tools. 
              None of them understood the nuances of Indian financial systems - from tracking UPI transactions to managing SIPs.
            </p>
            <p className="text-muted-foreground mb-4">
              He teamed up with Priya Patel and Vikram Mehta to create a solution built specifically for Indian users.
              RupeeTally was designed from the ground up to understand how Indians earn, spend, save, and invest.
            </p>
            <p className="text-muted-foreground">
              Today, we're proud to serve thousands of users across India, helping them gain control of their finances 
              and work toward their financial goals.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="order-1 md:order-2 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-8 shadow-sm">
            <div className="aspect-video rounded-lg bg-card flex items-center justify-center border">
              <span className="text-3xl font-bold text-primary">RupeeTally</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do at RupeeTally, from product design to customer support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card border rounded-lg p-6 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Journey */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The story of RupeeTally is just beginning. Here's how far we've come.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative flex flex-col ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } gap-8 md:gap-16`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary -translate-x-1/2"></div>
                  
                  {/* Year */}
                  <div className={`md:w-1/2 pl-12 md:pl-0 ${
                    index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'
                  }`}>
                    <h3 className="text-2xl font-bold text-primary">{item.year}</h3>
                  </div>
                  
                  {/* Content */}
                  <div className="md:w-1/2 pl-12 md:pl-0">
                    <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Team section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind RupeeTally who are dedicated to transforming how Indians manage their finances.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card border rounded-lg p-6 text-center hover:shadow-md transition-all"
              >
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-primary text-sm mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Join Us section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-primary/5 rounded-lg p-8 md:p-12 text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We're always looking for talented individuals who are passionate about fintech and want to make a difference 
            in how Indians manage their finances.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/careers">
              <Button size="lg">View Open Positions</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">Contact Us</Button>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}