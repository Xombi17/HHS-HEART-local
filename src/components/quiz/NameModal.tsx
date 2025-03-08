'use client';

import React, { useState } from 'react';
import Button from '@/components/common/Button';

interface NameModalProps {
  onSubmit: (name: string) => void;
}

const NameModal: React.FC<NameModalProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    // Name is valid, submit it
    onSubmit(name.trim());
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to the Heart Knowledge Quiz!
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Please enter your name to begin
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                        bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                        focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Your name"
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}
          </div>
          
          <div className="flex justify-end">
            <Button type="submit">
              Start Quiz
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NameModal; 