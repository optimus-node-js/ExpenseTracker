import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Briefcase, Users, Heart, MapPin, GraduationCap, Send } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Job application form schema
const applicationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().regex(/^[6-9]\d{9}$/, { message: "Please enter a valid 10-digit Indian mobile number" }),
  position: z.string().min(1, { message: "Please select a position" }),
  resume: z.string().min(1, { message: "Please provide a link to your resume" }),
  coverLetter: z.string().optional(),
  portfolio: z.string().optional(),
  referral: z.string().optional()
});

export default function Careers() {
  // Available job positions
  const jobPositions = [
    {
      id: "frontend-engineer",
      title: "Frontend Engineer",
      department: "Engineering",
      location: "Bangalore (Hybrid)",
      type: "Full-time",
      experience: "2-5 years",
      description: "We're looking for a skilled Frontend Engineer to create responsive and intuitive user interfaces for our financial application.",
      responsibilities: [
        "Develop clean, maintainable, and high-performance code using React, TypeScript, and modern frontend tools",
        "Create responsive and accessible UI components that work across devices",
        "Collaborate with designers to implement visual elements and animations",
        "Optimize application performance and ensure cross-browser compatibility",
        "Write unit and integration tests for UI components"
      ],
      requirements: [
        "2+ years of experience with React and modern JavaScript",
        "Strong understanding of TypeScript and frontend build tools",
        "Experience with responsive design and CSS frameworks like Tailwind CSS",
        "Familiarity with state management solutions and API integration",
        "Excellent problem-solving skills and attention to detail"
      ],
      preferred: [
        "Experience with financial applications or complex data visualization",
        "Knowledge of animation libraries like Framer Motion",
        "Understanding of accessibility standards",
        "Experience with performance optimization"
      ]
    },
    {
      id: "backend-engineer",
      title: "Backend Engineer",
      department: "Engineering",
      location: "Bangalore (Hybrid)",
      type: "Full-time",
      experience: "3-6 years",
      description: "Join our backend team to build secure, scalable APIs and services for our financial platform.",
      responsibilities: [
        "Design and develop RESTful APIs and services using Node.js and Express",
        "Work with database technologies including PostgreSQL and MongoDB",
        "Implement secure authentication and authorization mechanisms",
        "Create and maintain data processing pipelines",
        "Collaborate with frontend engineers to integrate APIs"
      ],
      requirements: [
        "3+ years of experience with Node.js and Express",
        "Strong knowledge of database design and optimization",
        "Experience with ORM technologies like Drizzle ORM or Mongoose",
        "Understanding of security best practices for financial applications",
        "Ability to write clean, maintainable, and well-tested code"
      ],
      preferred: [
        "Experience with financial systems or payment processing",
        "Knowledge of microservices architecture",
        "Familiarity with cloud services (AWS or Azure)",
        "Understanding of data privacy regulations in India"
      ]
    },
    {
      id: "product-manager",
      title: "Product Manager",
      department: "Product",
      location: "Bangalore (Hybrid)",
      type: "Full-time",
      experience: "4+ years",
      description: "We're seeking a product manager to lead the development of innovative features for our personal finance platform.",
      responsibilities: [
        "Define product vision, strategy, and roadmap for specific feature areas",
        "Gather and prioritize requirements based on user research and business goals",
        "Collaborate with design and engineering teams to deliver high-quality features",
        "Analyze user behavior and feedback to improve product offerings",
        "Stay updated on market trends and competitor offerings"
      ],
      requirements: [
        "4+ years of product management experience, preferably in fintech or consumer applications",
        "Strong understanding of agile methodologies",
        "Experience with user research and data-driven decision making",
        "Excellent communication and stakeholder management skills",
        "Ability to translate complex financial concepts into user-friendly features"
      ],
      preferred: [
        "Background in finance or personal financial management",
        "Experience with Indian financial products and regulations",
        "Technical background or understanding of software development",
        "MBA or relevant advanced degree"
      ]
    },
    {
      id: "ux-designer",
      title: "UX Designer",
      department: "Design",
      location: "Bangalore (Hybrid)",
      type: "Full-time",
      experience: "2-5 years",
      description: "Help us create intuitive, engaging experiences for users managing their finances through our platform.",
      responsibilities: [
        "Design user-friendly interfaces and workflows for complex financial tasks",
        "Create wireframes, prototypes, and high-fidelity designs",
        "Conduct user research and usability testing",
        "Develop and maintain our design system",
        "Collaborate with product and engineering teams"
      ],
      requirements: [
        "2+ years of experience in UX/UI design for digital products",
        "Proficiency with design tools like Figma or Sketch",
        "Portfolio demonstrating strong visual design and user-centered thinking",
        "Experience with responsive design for web and mobile platforms",
        "Understanding of design systems and component-based design"
      ],
      preferred: [
        "Experience designing financial applications or data visualization",
        "Knowledge of accessibility standards",
        "Familiarity with animation and micro-interactions",
        "Understanding of Indian users' preferences and behaviors"
      ]
    },
    {
      id: "customer-success",
      title: "Customer Success Specialist",
      department: "Operations",
      location: "Bangalore (Hybrid)",
      type: "Full-time",
      experience: "1-3 years",
      description: "Join our customer success team to help users make the most of RupeeTally's financial management features.",
      responsibilities: [
        "Provide exceptional support to users via email, chat, and phone",
        "Help users understand and utilize our platform's features",
        "Document common issues and contribute to our knowledge base",
        "Collect and organize user feedback for product improvements",
        "Conduct product demos and training sessions"
      ],
      requirements: [
        "1+ years of customer support experience, preferably in SaaS or fintech",
        "Excellent communication skills in English and Hindi",
        "Patient and empathetic approach to problem-solving",
        "Basic understanding of personal finance concepts",
        "Ability to explain complex features in simple terms"
      ],
      preferred: [
        "Experience with financial products or services",
        "Knowledge of additional Indian languages",
        "Technical understanding of web applications",
        "Experience with support ticketing systems"
      ]
    },
    {
      id: "marketing-specialist",
      title: "Digital Marketing Specialist",
      department: "Marketing",
      location: "Bangalore (Hybrid)",
      type: "Full-time",
      experience: "2-4 years",
      description: "Drive growth and engagement for RupeeTally through effective digital marketing strategies tailored for Indian audiences.",
      responsibilities: [
        "Plan and execute digital marketing campaigns across multiple channels",
        "Manage social media presence and content strategy",
        "Create engaging content that educates users about personal finance",
        "Analyze campaign performance and optimize marketing efforts",
        "Collaborate with product team on user acquisition and retention"
      ],
      requirements: [
        "2+ years of experience in digital marketing, preferably for consumer apps",
        "Experience with social media marketing, content marketing, and SEO",
        "Familiarity with marketing analytics tools",
        "Strong copywriting skills and ability to create engaging content",
        "Understanding of the Indian digital landscape and consumer behavior"
      ],
      preferred: [
        "Experience marketing financial products or services",
        "Knowledge of personal finance topics",
        "Experience with growth hacking techniques",
        "Familiarity with marketing automation tools"
      ]
    }
  ];

  // State for selected job
  const [selectedJob, setSelectedJob] = React.useState(jobPositions[0]);

  // Form setup for job application
  const form = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position: selectedJob.title,
      resume: "",
      coverLetter: "",
      portfolio: "",
      referral: ""
    }
  });

  // Update form when selected job changes
  React.useEffect(() => {
    form.setValue("position", selectedJob.title);
  }, [selectedJob, form]);

  // Handle form submission
  function onSubmit(data: z.infer<typeof applicationSchema>) {
    console.log(data);
    toast({
      title: "Application Submitted",
      description: "Thank you for applying to RupeeTally! We'll review your application and get back to you soon.",
    });
    form.reset();
  }

  // Values section data
  const values = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Collaborative Culture",
      description: "We value diverse perspectives and work together to solve complex problems."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Work-Life Balance",
      description: "We believe in flexible working arrangements that support your personal wellbeing."
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Continuous Learning",
      description: "We provide learning opportunities and encourage professional growth."
    }
  ];

  // Benefits section data
  const benefits = [
    "Competitive salary and equity options",
    "Comprehensive health insurance for you and your family",
    "Flexible working hours and remote work options",
    "Learning and development allowance",
    "Annual retreats and team bonding events",
    "Parental leave and childcare benefits",
    "Mental health support and wellness programs",
    "Internet and home office allowance",
    "Generous paid time off"
  ];

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
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">Careers</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Join the RupeeTally Team</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Help us transform how Indians manage their finances. We're building innovative solutions that empower people 
            to achieve financial clarity and confidence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="gap-2" onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}>
              <Briefcase className="h-4 w-4" />
              View Open Positions
            </Button>
            <Button variant="outline" size="lg" className="gap-2" onClick={() => document.getElementById('company-culture')?.scrollIntoView({ behavior: 'smooth' })}>
              <Users className="h-4 w-4" />
              Our Culture
            </Button>
          </div>
        </motion.div>

        {/* Company culture section */}
        <motion.div
          id="company-culture"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Culture</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              At RupeeTally, we're passionate about creating a workplace where innovation thrives, 
              diversity is celebrated, and everyone can contribute to our mission.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card border rounded-lg p-8 text-center hover:shadow-md transition-all"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Benefits & Perks</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We believe in taking care of our team members and providing the support you need to do your best work.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-primary/5 rounded-lg p-8 md:p-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p>{benefit}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Open positions section */}
        <motion.div
          id="open-positions"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join our team and be part of building India's leading personal finance management platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-4">
              {/* Job listings sidebar */}
              {jobPositions.map((job, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    selectedJob.id === job.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-card border hover:border-primary'
                  }`}
                  onClick={() => setSelectedJob(job)}
                >
                  <h3 className="text-lg font-medium mb-1">{job.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      {job.department}
                    </span>
                    <span className="text-sm flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {job.location}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              variants={itemVariants}
              className="lg:col-span-2 bg-card border rounded-lg p-6 md:p-8"
            >
              {/* Job details */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{selectedJob.title}</h3>
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    {selectedJob.department}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {selectedJob.location}
                  </Badge>
                  <Badge variant="outline">{selectedJob.type}</Badge>
                  <Badge variant="outline">{selectedJob.experience}</Badge>
                </div>
                <p className="text-muted-foreground mb-6">{selectedJob.description}</p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3">Responsibilities</h4>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  {selectedJob.responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3">Requirements</h4>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  {selectedJob.requirements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-3">Nice to Have</h4>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  {selectedJob.preferred.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <Button size="lg" className="w-full md:w-auto" onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}>
                Apply for this Position
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Application form */}
        <motion.div
          id="apply-form"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Apply Now</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ready to join our team? Fill out the form below to submit your application.
            </p>
          </div>

          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Job Application</CardTitle>
              <CardDescription>Apply for: {selectedJob.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="10-digit mobile number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position</FormLabel>
                          <FormControl>
                            <Input {...field} readOnly />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="resume"
                      render={({ field }) => (
                        <FormItem className="col-span-full">
                          <FormLabel>Resume Link</FormLabel>
                          <FormControl>
                            <Input placeholder="Link to your resume (Google Drive, Dropbox, etc.)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="portfolio"
                      render={({ field }) => (
                        <FormItem className="col-span-full">
                          <FormLabel>Portfolio/Github (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Link to your portfolio or Github profile" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="coverLetter"
                      render={({ field }) => (
                        <FormItem className="col-span-full">
                          <FormLabel>Cover Letter (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us why you're interested in this role and what makes you a great fit" 
                              className="min-h-32"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="referral"
                      render={({ field }) => (
                        <FormItem className="col-span-full">
                          <FormLabel>Referred By (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Name of the person who referred you" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Submit Application
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Final CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">Don't See a Position That Fits?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            We're always looking for talented individuals to join our team. Send your resume to 
            careers@rupeetally.com and tell us how you can contribute to our mission.
          </p>
          <Link href="/contact">
            <Button variant="outline" size="lg">Contact Us</Button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}