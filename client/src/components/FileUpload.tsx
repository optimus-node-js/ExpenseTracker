import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, FileUp, FileSpreadsheet, FileDigit, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Define the form schema
const formSchema = z.object({
  file: z.instanceof(FileList).refine((files) => files.length === 1, {
    message: "Please select a file",
  }),
  password: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function FileUpload() {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [needsPassword, setNeedsPassword] = useState(false);
  const [uploadSummary, setUploadSummary] = useState<{
    success: boolean;
    total: number;
    added: number;
    duplicates: number;
  } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const fileType = form.watch("file")?.[0]?.name?.split(".").pop()?.toLowerCase();
  
  const getFileIcon = () => {
    if (!fileType) return <FileUp className="h-10 w-10 text-muted-foreground" />;
    
    if (["pdf"].includes(fileType)) {
      return <FileDigit className="h-10 w-10 text-destructive" />;
    }
    
    if (["xls", "xlsx", "csv"].includes(fileType)) {
      return <FileSpreadsheet className="h-10 w-10 text-secondary" />;
    }
    
    return <FileUp className="h-10 w-10 text-muted-foreground" />;
  };

  const onSubmit = async (data: FormValues) => {
    setIsUploading(true);
    setProgress(0);
    
    try {
      const file = data.file[0];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      
      if (fileExtension !== 'pdf' && fileExtension !== 'xlsx' && fileExtension !== 'xls') {
        toast({
          title: "Invalid file format",
          description: "Please upload a PDF or Excel file",
          variant: "destructive",
        });
        setIsUploading(false);
        return;
      }
      
      // Start with initial progress
      setProgress(10);
      
      // Set up XHR for real-time progress tracking
      const xhr = new XMLHttpRequest();
      
      // Create FormData with file and password
      const formData = new FormData();
      formData.append('file', file);
      if (data.password) {
        formData.append('password', data.password);
      }
      
      // Create a promise to handle the upload
      try {
        const result = await new Promise<any>((resolve, reject) => {
          xhr.open('POST', '/api/upload-statement', true);
          
          // Track upload progress
          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const percentComplete = Math.round((event.loaded / event.total) * 90) + 10;
              setProgress(percentComplete <= 100 ? percentComplete : 100);
            }
          };
          
          // Handle upload completion
          xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                const response = JSON.parse(xhr.responseText);
                resolve(response);
              } catch (error) {
                reject(new Error('Invalid response format'));
              }
            } else {
              try {
                const errorData = JSON.parse(xhr.responseText);
                
                // Handle password protected files
                if (xhr.status === 401 && errorData.message === 'Password required') {
                  setNeedsPassword(true);
                  reject(new Error('Password required'));
                } else {
                  reject(new Error(errorData.message || 'Upload failed'));
                }
              } catch (e) {
                reject(new Error(`Upload failed with status ${xhr.status}`));
              }
            }
          };
          
          xhr.onerror = function() {
            reject(new Error('Network error occurred during upload'));
          };
          
          xhr.send(formData);
        });
        
        // Set progress to 100% when complete
        setProgress(100);
        
        // Set upload summary
        setUploadSummary({
          success: true,
          total: result.total || 0,
          added: result.added || 0,
          duplicates: result.duplicates || 0,
        });
        
        // Show success toast
        toast({
          title: "Upload Successful",
          description: `Added ${result.added} new transactions from your statement.`,
        });
        
        // Reset form
        form.reset();
        setNeedsPassword(false);
        
        // Invalidate queries to refresh data
        queryClient.invalidateQueries({ queryKey: ['/api/transactions'] });
        queryClient.invalidateQueries({ queryKey: ['/api/dashboard'] });
        
      } catch (error) {
        console.error('Upload error:', error);
        
        // Don't show error toast for password protected files
        if (error instanceof Error && error.message === 'Password required') {
          toast({
            title: "Password Required",
            description: "This file is password protected. Please enter the password.",
          });
        } else {
          toast({
            title: "Upload Failed",
            description: error instanceof Error ? error.message : "Failed to upload and parse the statement",
            variant: "destructive",
          });
          
          setUploadSummary({
            success: false,
            total: 0,
            added: 0,
            duplicates: 0,
          });
        }
      }
    } catch (error) {
      console.error('File processing error:', error);
      toast({
        title: "Error",
        description: "Failed to process file",
        variant: "destructive",
      });
    } finally {
      // If we still need password, don't reset the uploading state
      if (!needsPassword) {
        setIsUploading(false);
      }
      setTimeout(() => {
        if (progress === 100) {
          setProgress(0);
        }
      }, 2000);
    }
  };

  return (
    <Card className="w-full glassmorphism">
      <CardHeader>
        <CardTitle>Upload Bank Statement</CardTitle>
        <CardDescription>
          Upload your bank statement in PDF or Excel format to import transactions
        </CardDescription>
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {/* File Upload */}
            <FormField
              control={form.control}
              name="file"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormControl>
                    <div className="grid w-full items-center gap-1.5">
                      <div className="flex flex-col items-center justify-center w-full border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 transition-colors hover:border-muted-foreground/50">
                        {value && value.length > 0 ? (
                          <div className="flex flex-col items-center gap-2">
                            {getFileIcon()}
                            <p className="text-sm font-medium text-foreground">{value[0].name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(value[0].size / 1024).toFixed(2)} KB
                            </p>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                form.setValue("file", undefined as any);
                                setNeedsPassword(false);
                                form.setValue("password", "");
                              }}
                              className="mt-2"
                            >
                              Remove File
                            </Button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <Upload className="h-10 w-10 text-muted-foreground" />
                            <p className="text-sm font-medium text-foreground">Drag & drop or click to select</p>
                            <p className="text-xs text-muted-foreground">Supports PDF, Excel (.xlsx, .xls)</p>
                            <Input
                              id="file"
                              type="file"
                              accept=".pdf,.xlsx,.xls"
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                  onChange(e.target.files);
                                  // Reset password if file changes
                                  form.setValue("password", "");
                                  setNeedsPassword(false);
                                }
                              }}
                              {...rest}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              className="mt-2"
                              onClick={() => document.getElementById("file")?.click()}
                            >
                              Select File
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Password field (if needed) */}
            {needsPassword && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter document password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This document is password protected
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            {/* Progress bar during upload */}
            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Uploading to Cloudinary...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
            
            {/* Upload summary */}
            {uploadSummary && (
              <div className={`p-4 rounded-lg ${
                uploadSummary.success ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"
              }`}>
                <div className="flex items-start gap-3">
                  {uploadSummary.success ? (
                    <div className="rounded-full bg-secondary/20 p-1">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.66669 10.4667L4.10669 7.90669L3.16669 8.84669L6.66669 12.3467L13.6667 5.34669L12.7267 4.40669L6.66669 10.4667Z" fill="hsl(var(--secondary))" />
                      </svg>
                    </div>
                  ) : (
                    <div className="rounded-full bg-destructive/20 p-1">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                    </div>
                  )}
                  <div>
                    <h4 className={`text-sm font-medium ${
                      uploadSummary.success ? "text-secondary" : "text-destructive"
                    }`}>
                      {uploadSummary.success ? "Upload Successful" : "Upload Failed"}
                    </h4>
                    {uploadSummary.success && (
                      <p className="text-xs mt-1 text-muted-foreground">
                        Found {uploadSummary.total} transactions. Added {uploadSummary.added} new transactions. 
                        {uploadSummary.duplicates > 0 && ` Skipped ${uploadSummary.duplicates} duplicates.`}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" type="button">
                  View Instructions
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>How to prepare your statement?</AlertDialogTitle>
                  <AlertDialogDescription>
                    <div className="space-y-2 text-sm">
                      <p>Follow these steps to prepare your bank statement for upload:</p>
                      <ol className="list-decimal pl-4 space-y-1">
                        <li>Download your bank statement in PDF or Excel format from your bank's website</li>
                        <li>Make sure the statement contains transaction date, description, amount, and type</li>
                        <li>If your statement is password-protected, you'll be asked to provide the password</li>
                        <li>Our system will automatically detect and avoid adding duplicate transactions</li>
                        <li>After upload, verify the transactions on your dashboard</li>
                      </ol>
                      <p className="pt-2">Supported banks: HDFC, SBI, ICICI, Axis, and most major Indian banks</p>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>Got it</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
            <Button type="submit" disabled={isUploading || !form.formState.isDirty}>
              {isUploading ? "Processing..." : "Upload Statement"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
