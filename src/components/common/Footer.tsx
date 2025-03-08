'use client';

import Link from 'next/link';
import { Parallax } from 'react-parallax';

const Footer = () => {
  return (
    <Parallax bgImage="/images/footer-bg.jpg" strength={200} bgImageStyle={{ minHeight: '100%' }}>
      <footer className="bg-gradient-to-b from-gray-800 to-gray-900 py-8 border-t border-gray-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">HHS Heart</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                An immersive educational platform dedicated to exploring the human heart through interactive 3D visualization,
                practical tools, and engaging content.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/anatomy" className="text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500">
                    Anatomy Explorer
                  </Link>
                </li>
                <li>
                  <Link href="/tools" className="text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500">
                    Interactive Tools
                  </Link>
                </li>
                <li>
                  <Link href="/quiz" className="text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500">
                    Quiz
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500">
                    Resources
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://www.world-heart-federation.org/" target="_blank" rel="noopener noreferrer" 
                     className="text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500">
                    World Heart Federation
                  </a>
                </li>
                <li>
                  <a href="https://www.heart.org/" target="_blank" rel="noopener noreferrer"
                     className="text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500">
                    American Heart Association
                  </a>
                </li>
                <li>
                  <a href="https://www.bhf.org.uk/" target="_blank" rel="noopener noreferrer"
                     className="text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500">
                    British Heart Foundation
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-gray-600 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} HHS Heart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </Parallax>
  );
};

export default Footer; 