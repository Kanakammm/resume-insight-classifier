
import React from 'react';
import { FileSearch, CheckCircle, BarChart } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      icon: <FileSearch className="h-8 w-8 text-blue-600" />,
      title: "Upload & Analyze",
      description: "Upload your resume file (PDF or TXT) and our AI will analyze its content."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
      title: "Text Processing",
      description: "We clean and process the text to extract key information from your resume."
    },
    {
      icon: <BarChart className="h-8 w-8 text-blue-600" />,
      title: "Job Matching",
      description: "Our algorithm matches your resume to the most relevant job category based on content."
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-center mb-4">
            {feature.icon}
          </div>
          <h3 className="text-xl font-semibold text-center mb-2">{feature.title}</h3>
          <p className="text-gray-600 text-center">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};
