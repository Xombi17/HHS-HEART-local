'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 shadow-md dark:bg-gray-900 dark:bg-opacity-90">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-red-600 dark:text-red-500">
            HHS Heart
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-800 hover:text-red-600 dark:text-gray-200 dark:hover:text-red-500">
              Home
            </Link>
            <Link href="/anatomy" className="text-gray-800 hover:text-red-600 dark:text-gray-200 dark:hover:text-red-500">
              Anatomy Explorer
            </Link>
            <Link href="/tools" className="text-gray-800 hover:text-red-600 dark:text-gray-200 dark:hover:text-red-500">
              Interactive Tools
            </Link>
            <Link href="/quiz" className="text-gray-800 hover:text-red-600 dark:text-gray-200 dark:hover:text-red-500">
              Quiz
            </Link>
            <Link href="/resources" className="text-gray-800 hover:text-red-600 dark:text-gray-200 dark:hover:text-red-500">
              Resources
            </Link>
            <Link href="/about" className="text-gray-800 hover:text-red-600 dark:text-gray-200 dark:hover:text-red-500">
              About
            </Link>
          </div>
          
          <div className="md:hidden">
            <button className="text-gray-800 dark:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 