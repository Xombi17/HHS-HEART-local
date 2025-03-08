'use client';

import React, { useState, useEffect } from 'react';
import { getQuizResults, clearQuizResults } from '@/services/quizResultsService';
import { isAdminSetup, verifyAdminPassword, setAdminPassword } from '@/services/authService';
import Button from '@/components/common/Button';
import Link from 'next/link';

interface QuizResult {
  name: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  date: string;
}

export default function AdminPage() {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'score' | 'name'>('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [filterName, setFilterName] = useState('');
  const [isFirstSetup, setIsFirstSetup] = useState(false);
  
  useEffect(() => {
    setIsFirstSetup(!isAdminSetup());
  }, []);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFirstSetup) {
      if (!newPassword || newPassword.length < 4) {
        setError('Password must be at least 4 characters');
        return;
      }
      
      if (newPassword !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      
      setAdminPassword(newPassword);
      setIsAdminMode(true);
      setSuccess('Admin password set successfully');
      loadResults();
    } else {
      if (verifyAdminPassword(adminPassword)) {
        setIsAdminMode(true);
        setError('');
        loadResults();
      } else {
        setError('Invalid password');
      }
    }
  };
  
  const loadResults = () => {
    const quizResults = getQuizResults();
    setResults(quizResults);
  };
  
  const handleClearResults = () => {
    const confirmed = window.confirm('Are you sure you want to clear all quiz results? This cannot be undone.');
    if (confirmed) {
      clearQuizResults();
      setResults([]);
      setSuccess('All quiz results have been cleared');
    }
  };
  
  const handleExport = () => {
    try {
      const dataStr = JSON.stringify(results, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `quiz-results-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      setSuccess('Results exported successfully');
    } catch (err) {
      console.error('Export error:', err);
      setError('Failed to export results');
    }
  };
  
  const sortResults = (results: QuizResult[]) => {
    const sortedResults = [...results];
    
    // First filter by name if filter is set
    const filteredResults = filterName 
      ? sortedResults.filter(r => r.name.toLowerCase().includes(filterName.toLowerCase()))
      : sortedResults;
    
    // Then sort by selected field
    if (sortBy === 'date') {
      filteredResults.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortDir === 'asc' ? dateA - dateB : dateB - dateA;
      });
    } else if (sortBy === 'score') {
      filteredResults.sort((a, b) => {
        return sortDir === 'asc' ? a.percentage - b.percentage : b.percentage - a.percentage;
      });
    } else if (sortBy === 'name') {
      filteredResults.sort((a, b) => {
        return sortDir === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      });
    }
    
    return filteredResults;
  };
  
  const toggleSort = (field: 'date' | 'score' | 'name') => {
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
  
  const getSortLabel = (label: string, field: 'date' | 'score' | 'name') => {
    return (
      <span className="cursor-pointer">
        {label} {sortBy === field && (sortDir === 'asc' ? '↑' : '↓')}
      </span>
    );
  };
  
  const sortedResults = sortResults(results);
  
  // Stats calculations
  const totalAttempts = results.length;
  const uniqueUsers = new Set(results.map(r => r.name)).size;
  const averageScore = results.length 
    ? results.reduce((sum, r) => sum + r.percentage, 0) / results.length 
    : 0;
  
  if (!isAdminMode) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {isFirstSetup ? 'Admin Setup' : 'Admin Login'}
            </h1>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded">
                {error}
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-4">
              {isFirstSetup ? (
                <>
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Create Admin Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded 
                               text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                      placeholder="New password"
                      autoComplete="new-password"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded 
                               text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                      placeholder="Confirm password"
                      autoComplete="new-password"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label htmlFor="adminPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Admin Password
                  </label>
                  <input
                    type="password"
                    id="adminPassword"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded 
                             text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                    placeholder="Password"
                    autoComplete="current-password"
                  />
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <Link href="/quiz">
                  <Button variant="secondary">
                    Back to Quiz
                  </Button>
                </Link>
                <Button type="submit">
                  {isFirstSetup ? 'Set Password' : 'Login'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Quiz Admin Dashboard
          </h1>
          <Link href="/quiz">
            <Button variant="secondary">
              Back to Quiz
            </Button>
          </Link>
        </div>
        
        {success && (
          <div className="mb-6 p-3 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded">
            {success}
            <button 
              className="float-right text-sm" 
              onClick={() => setSuccess('')}
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h3 className="text-lg font-medium mb-2">Total Attempts</h3>
            <p className="text-3xl font-bold text-red-600">{totalAttempts}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h3 className="text-lg font-medium mb-2">Unique Users</h3>
            <p className="text-3xl font-bold text-blue-600">{uniqueUsers}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h3 className="text-lg font-medium mb-2">Average Score</h3>
            <p className="text-3xl font-bold text-green-600">{averageScore.toFixed(2)}%</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-6">
          <div className="p-4">
            <div className="flex flex-wrap justify-between items-center mb-4">
              <h2 className="text-xl font-bold">All Quiz Results</h2>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Filter by name"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded 
                           text-gray-900 dark:text-white bg-white dark:bg-gray-700 mr-2"
                />
                <Button 
                  variant="secondary"
                  onClick={handleExport}
                  className="mr-2"
                >
                  Export JSON
                </Button>
                <Button 
                  variant="secondary"
                  onClick={handleClearResults}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Clear All
                </Button>
              </div>
            </div>
            
            {results.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700 text-xs uppercase">
                    <tr>
                      <th 
                        className="px-6 py-3 text-left" 
                        onClick={() => toggleSort('name')}
                      >
                        {getSortLabel('Name', 'name')}
                      </th>
                      <th 
                        className="px-6 py-3 text-left" 
                        onClick={() => toggleSort('score')}
                      >
                        {getSortLabel('Score', 'score')}
                      </th>
                      <th className="px-6 py-3 text-left">
                        Percentage
                      </th>
                      <th 
                        className="px-6 py-3 text-left" 
                        onClick={() => toggleSort('date')}
                      >
                        {getSortLabel('Date', 'date')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {sortedResults.map((result, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 text-sm font-medium">
                          {result.name}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {result.score}/{result.totalQuestions}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`
                            px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full
                            ${result.percentage >= 90 ? 'bg-green-100 text-green-800' : 
                              result.percentage >= 70 ? 'bg-blue-100 text-blue-800' : 
                              result.percentage >= 50 ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'}
                          `}>
                            {result.percentage}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {formatDate(result.date)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="py-4 text-center text-gray-500">
                No quiz results available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 