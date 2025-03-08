'use client';

import React from 'react';
import QuizContainer from '@/components/quiz/QuizContainer';

export default function QuizPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Heart Knowledge Quiz
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Test your understanding of cardiac anatomy and function with our interactive quiz. 
          Challenge yourself with 10 questions covering various aspects of heart structure and physiology.
        </p>
        
        <QuizContainer />
      </div>
    </div>
  );
} 