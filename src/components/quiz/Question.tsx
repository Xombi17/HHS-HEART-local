'use client';

import React from 'react';
import { QuizQuestion } from './quizData';

interface QuestionProps {
  question: QuizQuestion;
  selectedAnswer: number | null;
  onSelectAnswer: (answerIndex: number) => void;
  showAnswer: boolean;
}

const Question: React.FC<QuestionProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  showAnswer
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        {question.question}
      </h3>
      
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <div key={index} className="flex items-start">
            <button
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedAnswer === index
                  ? showAnswer
                    ? index === question.correctAnswer
                      ? 'bg-green-100 dark:bg-green-900/30 border border-green-500'
                      : 'bg-red-100 dark:bg-red-900/30 border border-red-500'
                    : 'bg-blue-100 dark:bg-blue-900/30 border border-blue-500'
                  : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-transparent'
              } ${
                showAnswer && index === question.correctAnswer
                  ? 'bg-green-100 dark:bg-green-900/30 border border-green-500'
                  : ''
              }`}
              onClick={() => !showAnswer && onSelectAnswer(index)}
              disabled={showAnswer}
            >
              <div className="flex items-center">
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full mr-3 ${
                  selectedAnswer === index
                    ? showAnswer
                      ? index === question.correctAnswer
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                } ${
                  showAnswer && index === question.correctAnswer
                    ? 'bg-green-500 text-white'
                    : ''
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  {option}
                </span>
              </div>
            </button>
          </div>
        ))}
      </div>
      
      {showAnswer && (
        <div className={`p-4 rounded-lg ${
          selectedAnswer === question.correctAnswer
            ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500'
            : 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500'
        }`}>
          <p className={`font-medium mb-1 ${
            selectedAnswer === question.correctAnswer
              ? 'text-green-700 dark:text-green-400'
              : 'text-red-700 dark:text-red-400'
          }`}>
            {selectedAnswer === question.correctAnswer
              ? 'Correct!'
              : `Incorrect. The correct answer is: ${question.options[question.correctAnswer]}`
            }
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default Question; 