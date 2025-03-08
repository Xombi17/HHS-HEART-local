interface QuizResult {
  name: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  date: string;
}

// Key for storing results in localStorage
const QUIZ_RESULTS_KEY = 'hhs_heart_quiz_results';

/**
 * Save a quiz result to localStorage
 */
export const saveQuizResult = (name: string, score: number, totalQuestions: number): void => {
  // Calculate percentage
  const percentage = Math.round((score / totalQuestions) * 100);
  
  // Create result object
  const result: QuizResult = {
    name,
    score,
    totalQuestions,
    percentage,
    date: new Date().toISOString()
  };
  
  // Get existing results
  const existingResults = getQuizResults();
  
  // Add new result
  const updatedResults = [...existingResults, result];
  
  // Save back to localStorage
  try {
    localStorage.setItem(QUIZ_RESULTS_KEY, JSON.stringify(updatedResults));
  } catch (error) {
    console.error('Error saving quiz result:', error);
  }
};

/**
 * Get all quiz results from localStorage
 */
export const getQuizResults = (): QuizResult[] => {
  try {
    const resultsJson = localStorage.getItem(QUIZ_RESULTS_KEY);
    if (!resultsJson) return [];
    
    return JSON.parse(resultsJson);
  } catch (error) {
    console.error('Error reading quiz results:', error);
    return [];
  }
};

/**
 * Clear all quiz results
 */
export const clearQuizResults = (): void => {
  try {
    localStorage.removeItem(QUIZ_RESULTS_KEY);
  } catch (error) {
    console.error('Error clearing quiz results:', error);
  }
};

/**
 * Get top performers (highest scores)
 */
export const getTopPerformers = (limit = 5): QuizResult[] => {
  const results = getQuizResults();
  
  // Sort by percentage (highest first)
  return results
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, limit);
};

/**
 * Get recent results
 */
export const getRecentResults = (limit = 5): QuizResult[] => {
  const results = getQuizResults();
  
  // Sort by date (most recent first)
  return results
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}; 