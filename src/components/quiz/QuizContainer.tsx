'use client';

import React, { useState, useEffect } from 'react';
import { quizQuestions } from './quizData';
import Question from './Question';
import Results from './Results';
import Button from '@/components/common/Button';
import NameModal from './NameModal';
import { saveQuizResult } from '@/services/quizResultsService';

const QuizContainer: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(quizQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const [showNameModal, setShowNameModal] = useState<boolean>(true);
  
  // Calculate score when quiz is completed
  useEffect(() => {
    if (quizCompleted) {
      const newScore = answers.reduce((total: number, answer, index) => {
        if (answer !== null && answer === quizQuestions[index].correctAnswer) {
          return total + 1;
        }
        return total;
      }, 0);
      setScore(newScore);
      
      // Save the quiz result
      if (userName) {
        saveQuizResult(userName, newScore, quizQuestions.length);
      }
    }
  }, [quizCompleted, answers, userName]);
  
  const handleSelectAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(newAnswers);
  };
  
  const handleNextQuestion = () => {
    setShowAnswer(false);
    
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setShowAnswer(false);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleCheckAnswer = () => {
    setShowAnswer(true);
  };
  
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers(Array(quizQuestions.length).fill(null));
    setShowAnswer(false);
    setQuizCompleted(false);
    setScore(0);
    setShowNameModal(true); // Show name modal again for the new attempt
  };
  
  const handleNameSubmit = (name: string) => {
    setUserName(name);
    setShowNameModal(false);
  };
  
  // Show name modal first
  if (showNameModal) {
    return <NameModal onSubmit={handleNameSubmit} />;
  }
  
  // Show results if completed
  if (quizCompleted) {
    return (
      <Results 
        score={score} 
        totalQuestions={quizQuestions.length} 
        onRestartQuiz={handleRestartQuiz}
        userName={userName}
      />
    );
  }
  
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Heart Knowledge Quiz
        </h2>
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
          </div>
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Player: {userName}
          </div>
        </div>
      </div>
      
      <div className="mb-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div 
          className="bg-red-600 h-2.5 rounded-full" 
          style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
        ></div>
      </div>
      
      <Question 
        question={currentQuestion}
        selectedAnswer={currentAnswer}
        onSelectAnswer={handleSelectAnswer}
        showAnswer={showAnswer}
      />
      
      <div className="flex justify-between">
        <Button 
          variant="secondary" 
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        
        <div className="flex gap-4">
          {!showAnswer && currentAnswer !== null && (
            <Button onClick={handleCheckAnswer}>
              Check Answer
            </Button>
          )}
          
          {showAnswer && (
            <Button onClick={handleNextQuestion}>
              {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizContainer; 