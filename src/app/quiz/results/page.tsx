'use client';

import React, { useState, useEffect } from 'react';
import { getQuizResults, clearQuizResults } from '@/services/quizResultsService';
import Button from '@/components/common/Button';
import Link from 'next/link';

interface QuizResult {
  name: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  date: string;
}

export default function QuizResultsPage() {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'score'>('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  
  useEffect(() => {
    // Client-side only
    loadResults();
  }, []);
  
  const loadResults = () => {
    const quizResults = getQuizResults();
    setResults(quizResults);
  };
  
  const handleClearResults = () => {
    const confirmed = window.confirm('Are you sure you want to clear all quiz results? This cannot be undone.');
    if (confirmed) {
      clearQuizResults();
      setResults([]);
    }
  };
  
  const sortResults = (results: QuizResult[]) => {
    const sortedResults = [...results];
    
    if (sortBy === 'date') {
      sortedResults.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortDir === 'asc' ? dateA - dateB : dateB - dateA;
      });
    } else {
      sortedResults.sort((a, b) => {
        return sortDir === 'asc' ? a.percentage - b.percentage : b.percentage - a.percentage;
      });
    }
    
    return sortedResults;
  };
  
  const toggleSort = (field: 'date' | 'score') => {
    if (sortBy === field) {
      // Toggle direction if already sorting by this field
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to descending
      setSortBy(field);
      setSortDir('desc');
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };
  
  const sortedResults = sortResults(results);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Quiz Results History
          </h1>
          <div className="flex gap-2">
            <Link href="/quiz/admin">
              <Button variant="secondary">
                Admin Dashboard
              </Button>
            </Link>
            <Link href="/quiz">
              <Button variant="secondary">
                Back to Quiz
              </Button>
            </Link>
          </div>
        </div>
        
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          View the history of all quiz attempts and see how everyone is performing.
        </p>
        
        {results.length > 0 ? (
          <>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Name
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                        onClick={() => toggleSort('score')}
                      >
                        Score
                        {sortBy === 'score' && (
                          <span className="ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Percentage
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                        onClick={() => toggleSort('date')}
                      >
                        Date
                        {sortBy === 'date' && (
                          <span className="ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {sortedResults.map((result, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {result.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {result.score}/{result.totalQuestions}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${result.percentage >= 90 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                              result.percentage >= 70 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 
                              result.percentage >= 50 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}
                          >
                            {result.percentage}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {formatDate(result.date)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                variant="secondary"
                onClick={handleClearResults}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Clear All Results
              </Button>
            </div>
          </>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No quiz results have been recorded yet.
            </p>
            <Link href="/quiz">
              <Button>
                Take the Quiz
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 