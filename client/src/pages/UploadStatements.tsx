import { FileUpload } from "@/components/FileUpload";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { InfoIcon } from "lucide-react";

export default function UploadStatements() {
  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Upload Bank Statements</h1>
        <p className="text-muted-foreground mt-1">
          Import your bank transactions automatically from PDF or Excel statements
        </p>
      </div>
      
      {/* Upload Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <FileUpload />
        </div>
        
        <div className="space-y-6">
          <Card className="glassmorphism">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Supported Banks</CardTitle>
              <CardDescription>
                RupeeTally supports statements from these banks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">HDFC Bank</span>
                  <Badge variant="outline" className="text-xs">PDF & Excel</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">State Bank of India</span>
                  <Badge variant="outline" className="text-xs">PDF & Excel</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">ICICI Bank</span>
                  <Badge variant="outline" className="text-xs">PDF & Excel</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">Axis Bank</span>
                  <Badge variant="outline" className="text-xs">PDF & Excel</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">Kotak Mahindra Bank</span>
                  <Badge variant="outline" className="text-xs">PDF</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">Yes Bank</span>
                  <Badge variant="outline" className="text-xs">PDF</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">Bank of Baroda</span>
                  <Badge variant="outline" className="text-xs">Excel</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">Punjab National Bank</span>
                  <Badge variant="outline" className="text-xs">Excel</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Alert className="glassmorphism">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Privacy First</AlertTitle>
            <AlertDescription>
              Your financial data never leaves your device. We process your statements locally and securely.
            </AlertDescription>
          </Alert>
          
          <Card className="glassmorphism">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Tips for Best Results</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm list-disc pl-5">
                <li>Download complete monthly statements from your bank portal</li>
                <li>Ensure statements include transaction details, dates, and amounts</li>
                <li>For password-protected PDFs, have the password ready</li>
                <li>Excel formats (.xlsx, .xls) work best with minimal formatting</li>
                <li>Transactions are automatically de-duplicated based on date, amount, and description</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* FAQ Section */}
      <Card className="glassmorphism mt-6">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">What file formats are supported?</h3>
            <p className="text-sm text-muted-foreground">
              RupeeTally supports PDF and Excel (.xlsx, .xls) statement formats from most major Indian banks.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">How is my data protected?</h3>
            <p className="text-sm text-muted-foreground">
              Your statements are processed securely, and we never store your raw bank statements. Only the extracted transaction data is saved to your account.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">What if my bank isn't supported?</h3>
            <p className="text-sm text-muted-foreground">
              We're constantly adding support for more banks. In the meantime, you can manually enter transactions or try exporting your statements to Excel.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">How are categories assigned?</h3>
            <p className="text-sm text-muted-foreground">
              Our system automatically categorizes transactions based on their descriptions. You can always edit categories after import.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Can I upload multiple statements?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, you can upload multiple statements. Our system will automatically detect and prevent duplicate entries.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">What if my PDF is password-protected?</h3>
            <p className="text-sm text-muted-foreground">
              You'll be prompted to enter the password during the upload process. We don't store your document passwords.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
