
import React from 'react';
import { ResumeUploader } from '@/components/ResumeUploader';
import { Features } from '@/components/Features';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">Resume Screening App</h1>
          <p className="text-center text-gray-600 mb-12">Upload a resume to analyze its content and determine the best job category match.</p>
          
          <ResumeUploader />
          
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">How It Works</h2>
            <Features />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
