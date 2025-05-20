
import React, { useState } from 'react';
import { Upload, X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/components/ui/use-toast';
import { analyzeResume } from '@/lib/resumeAnalyzer';
import { ResumeResult } from '@/components/ResumeResult';

export const ResumeUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{
    category: string;
    id: number;
    confidence: number;
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const fileType = selectedFile.type;
      
      // Check if file type is supported
      if (fileType === 'text/plain' || fileType === 'application/pdf' || 
          selectedFile.name.endsWith('.txt') || selectedFile.name.endsWith('.pdf')) {
        setFile(selectedFile);
        setResult(null);
        
        // Read file content
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target && typeof event.target.result === 'string') {
            setFileContent(event.target.result);
          }
        };
        reader.readAsText(selectedFile);
      } else {
        toast({
          title: "Unsupported File Type",
          description: "Please upload a .txt or .pdf file",
          variant: "destructive",
        });
        e.target.value = '';
      }
    }
  };

  const resetFile = () => {
    setFile(null);
    setFileContent(null);
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!fileContent) return;
    
    setIsAnalyzing(true);
    setProgress(0);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, 300);

    try {
      // Simulate analysis with timeout
      setTimeout(() => {
        const analysisResult = analyzeResume(fileContent || "");
        setResult(analysisResult);
        setIsAnalyzing(false);
        clearInterval(progressInterval);
        setProgress(100);
        
        toast({
          title: "Analysis Complete",
          description: `Resume analyzed as: ${analysisResult.category}`,
        });
      }, 3000);
    } catch (error) {
      setIsAnalyzing(false);
      clearInterval(progressInterval);
      toast({
        title: "Analysis Failed",
        description: "There was a problem analyzing your resume",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        {!file ? (
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                const droppedFile = e.dataTransfer.files[0];
                if (droppedFile.type === 'text/plain' || droppedFile.type === 'application/pdf' ||
                    droppedFile.name.endsWith('.txt') || droppedFile.name.endsWith('.pdf')) {
                  setFile(droppedFile);
                  
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    if (event.target && typeof event.target.result === 'string') {
                      setFileContent(event.target.result);
                    }
                  };
                  reader.readAsText(droppedFile);
                } else {
                  toast({
                    title: "Unsupported File Type",
                    description: "Please upload a .txt or .pdf file",
                    variant: "destructive",
                  });
                }
              }
            }}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">Upload Resume</h3>
            <p className="text-sm text-gray-500 mb-4">Drag and drop your resume file here or click to browse</p>
            <Button asChild>
              <label>
                <input
                  type="file"
                  className="hidden"
                  accept=".txt,.pdf"
                  onChange={handleFileChange}
                />
                Browse Files
              </label>
            </Button>
            <p className="text-xs text-gray-400 mt-4">Supported formats: .txt, .pdf</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <button 
                onClick={resetFile}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            {isAnalyzing && (
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Analyzing resume...</p>
                <Progress value={progress} className="h-2" />
              </div>
            )}
            
            {!isAnalyzing && !result && (
              <div className="flex justify-center">
                <Button onClick={handleAnalyze} className="w-full sm:w-auto">
                  Analyze Resume
                </Button>
              </div>
            )}
            
            {result && <ResumeResult result={result} />}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
