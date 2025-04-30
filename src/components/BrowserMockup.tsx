
import React, { ReactNode } from 'react';

interface BrowserMockupProps {
  children: ReactNode;
}

const BrowserMockup = ({ children }: BrowserMockupProps) => {
  return (
    <div className="w-full max-w-4xl h-[400px] md:h-[500px] border border-gray-700 rounded-lg overflow-hidden">
      <div className="h-10 bg-gray-900 flex items-center px-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      <div className="h-[calc(100%-40px)] flex items-center justify-center bg-black">
        {children}
      </div>
    </div>
  );
};

export default BrowserMockup;
