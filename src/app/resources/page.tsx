import React from 'react';

const resources = [
  {
    title: 'World Heart Federation',
    description: 'Leading global organization dedicated to heart health, providing resources on cardiovascular disease prevention and control.',
    url: 'https://www.world-heart-federation.org/',
    category: 'Organization',
  },
  {
    title: 'American Heart Association',
    description: 'Nonprofit organization focused on heart disease and stroke prevention, offering educational resources and research.',
    url: 'https://www.heart.org/',
    category: 'Organization',
  },
  {
    title: 'British Heart Foundation',
    description: 'UK charity dedicated to funding research, influencing policy, and providing support and information on heart and circulatory diseases.',
    url: 'https://www.bhf.org.uk/',
    category: 'Organization',
  },
  {
    title: 'Heart Anatomy - Khan Academy',
    description: 'Educational videos and articles explaining heart anatomy and physiology in an accessible format.',
    url: 'https://www.khanacademy.org/science/health-and-medicine/circulatory-system',
    category: 'Educational',
  },
  {
    title: 'Heart and Circulatory System - KidsHealth',
    description: 'Age-appropriate information about the heart and circulatory system for children, teens, and parents.',
    url: 'https://kidshealth.org/en/parents/heart.html',
    category: 'Educational',
  },
  {
    title: 'Journal of the American College of Cardiology',
    description: 'Peer-reviewed medical journal covering all aspects of cardiovascular disease.',
    url: 'https://www.jacc.org/',
    category: 'Academic',
  },
];

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Learning Resources
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Explore our curated collection of authoritative sources on heart anatomy, function, and health. 
          These resources provide additional information for deeper exploration of cardiac topics.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {resources.map((resource, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {resource.title}
                  </h2>
                  <span className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded-full text-xs font-medium">
                    {resource.category}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {resource.description}
                </p>
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400"
                >
                  Visit Resource
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Disclaimer
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            The resources listed on this page are provided for educational purposes only. 
            HHS Heart is not affiliated with these organizations and does not endorse specific medical advice. 
            Always consult with healthcare professionals for medical concerns.
          </p>
        </div>
      </div>
    </div>
  );
} 