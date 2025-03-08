'use client';

import React from 'react';
import Button from '@/components/common/Button';
import { getTopPerformers, getRecentResults } from '@/services/quizResultsService';
import Link from 'next/link';

interface ResultsProps {
  score: number;
  totalQuestions: number;
  onRestartQuiz: () => void;
  userName: string;
}

const Results: React.FC<ResultsProps> = ({ score, totalQuestions, onRestartQuiz, userName }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getFeedback = () => {
    if (percentage >= 90) {
      return {
        title: "Excellent!",
        message: "You have an outstanding understanding of heart anatomy and function. You might have a future in cardiology!",
        color: "text-green-600 dark:text-green-400"
      };
    } else if (percentage >= 70) {
      return {
        title: "Great Job!",
        message: "You have a solid understanding of heart anatomy and function. Keep learning to master the subject!",
        color: "text-blue-600 dark:text-blue-400"
      };
    } else if (percentage >= 50) {
      return {
        title: "Good Effort!",
        message: "You have a basic understanding of heart anatomy and function. Review the topics you missed to improve your knowledge.",
        color: "text-yellow-600 dark:text-yellow-400"
      };
    } else {
      return {
        title: "Keep Learning!",
        message: "You're just beginning to understand heart anatomy and function. Don't worry, review the material and try again!",
        color: "text-red-600 dark:text-red-400"
      };
    }
  };
  
  const feedback = getFeedback();
  const topPerformers = getTopPerformers(5);
  const recentResults = getRecentResults(5);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Quiz Results
        </h2>
        
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">
          Great job, <span className="font-semibold">{userName}</span>!
        </p>
        
        <div className="mb-6">
          <div className="inline-block relative w-32 h-32 mb-4">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="3"
                strokeDasharray="100, 100"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={percentage >= 90 ? "#10b981" : percentage >= 70 ? "#3b82f6" : percentage >= 50 ? "#f59e0b" : "#ef4444"}
                strokeWidth="3"
                strokeDasharray={`${percentage}, 100`}
              />
              <text x="18" y="20.5" className="text-3xl font-bold" textAnchor="middle" fill="currentColor">
                {percentage}%
              </text>
            </svg>
          </div>
          
          <p className="text-xl font-semibold mb-2">
            You scored <span className={feedback.color}>{score}</span> out of <span className="text-gray-700 dark:text-gray-300">{totalQuestions}</span>
          </p>
        </div>
        
        <div className="mb-8">
          <h3 className={`text-xl font-semibold mb-2 ${feedback.color}`}>
            {feedback.title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            {feedback.message}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Top Performers */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Top Scores
          </h3>
          
          {topPerformers.length > 0 ? (
            <ul className="space-y-2">
              {topPerformers.map((result, index) => (
                <li key={index} className="flex justify-between items-center text-sm">
                  <span className="font-medium">
                    {index + 1}. {result.name}
                  </span>
                  <span className={result.percentage >= 90 ? "text-green-600 dark:text-green-400" : 
                                  result.percentage >= 70 ? "text-blue-600 dark:text-blue-400" : 
                                  result.percentage >= 50 ? "text-yellow-600 dark:text-yellow-400" : 
                                  "text-red-600 dark:text-red-400"}>
                    {result.score}/{result.totalQuestions} ({result.percentage}%)
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No quiz results yet.
            </p>
          )}
        </div>
        
        {/* Recent Results */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Recent Attempts
          </h3>
          
          {recentResults.length > 0 ? (
            <ul className="space-y-2">
              {recentResults.map((result, index) => (
                <li key={index} className="flex justify-between items-center text-sm">
                  <span className="font-medium">
                    {result.name}
                  </span>
                  <span className={result.percentage >= 90 ? "text-green-600 dark:text-green-400" : 
                                  result.percentage >= 70 ? "text-blue-600 dark:text-blue-400" : 
                                  result.percentage >= 50 ? "text-yellow-600 dark:text-yellow-400" : 
                                  "text-red-600 dark:text-red-400"}>
                    {result.score}/{result.totalQuestions} ({result.percentage}%)
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No quiz results yet.
            </p>
          )}
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button onClick={onRestartQuiz}>
          Take Quiz Again
        </Button>
        <Link href="/quiz/results" className="ml-4">
          <Button variant="secondary">
            View All Results
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Results; 