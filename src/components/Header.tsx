
import React from 'react';
import { FileText } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-xl text-gray-800">ResumeAI</span>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a></li>
            <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About</a></li>
            <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
