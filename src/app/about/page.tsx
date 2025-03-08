import React from 'react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          About HHS Heart
        </h1>
        
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            HHS Heart is an immersive educational platform dedicated to exploring the human heart through 
            interactive 3D visualization, practical tools, and engaging content. Our mission is to transform 
            complex medical concepts into accessible learning experiences for students, educators, healthcare 
            professionals, and curious minds.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            We believe that understanding the heart—its structure, function, and importance to overall health—should 
            be accessible to everyone. Through interactive technology and evidence-based information, we aim to 
            inspire curiosity and promote heart health awareness.
          </p>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Our Approach
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
              Educational Excellence
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              All content is developed with scientific accuracy and educational best practices in mind. 
              We strive to present information that is both academically sound and engaging.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
              Interactive Learning
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              We believe in learning by doing. Our interactive tools and 3D models allow users to 
              explore concepts hands-on, enhancing understanding and retention.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
              Accessibility
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              We design our platform to be accessible to users of all backgrounds, technical abilities, 
              and learning styles. Our content is structured to accommodate different levels of prior knowledge.
            </p>
          </div>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Disclaimer
          </h2>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              HHS Heart is an educational resource only and is not intended to provide medical advice, 
              diagnosis, or treatment. The information provided on this website should not be used as a 
              substitute for professional medical care or advice.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Always consult with qualified healthcare providers for any questions or concerns regarding 
              your health or the health of others.
            </p>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Have questions, suggestions, or feedback? We'd love to hear from you! 
            Please contact us at <a href="mailto:info@hhsheart.org" className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400">info@hhsheart.org</a>.
          </p>
        </section>
      </div>
    </div>
  );
} 