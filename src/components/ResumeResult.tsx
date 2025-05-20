
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ResumeResultProps {
  result: {
    category: string;
    id: number;
    confidence: number;
  };
}

export const ResumeResult = ({ result }: ResumeResultProps) => {
  return (
    <div className="mt-4 space-y-6">
      <div className="flex justify-center items-center text-green-600">
        <CheckCircle className="h-8 w-8 mr-2" />
        <span className="text-lg font-medium">Analysis Complete</span>
      </div>
      
      <Card>
        <CardHeader className="bg-blue-50">
          <CardTitle>Resume Category</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-blue-700">{result.category}</h3>
            <p className="text-sm text-gray-500 mt-1">Category ID: {result.id}</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Match Confidence</span>
                <span className="text-sm font-medium">{Math.round(result.confidence)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${result.confidence}%` }}
                ></div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">What does this mean?</h4>
              <p className="text-sm text-gray-600">
                Based on the content of your resume, our system has determined that your experience and skills 
                best match the <strong>{result.category}</strong> job category. You might be well-suited for 
                roles in this field based on your experience and skills.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center mt-6">
        <button 
          onClick={() => window.location.reload()} 
          className="text-blue-600 hover:text-blue-800 underline text-sm"
        >
          Try another resume
        </button>
      </div>
    </div>
  );
};
