'use client';

import React from 'react';
import AnimatedSection from '../common/AnimatedSection';

const testimonials = [
  {
    quote: "The 3D heart model and interactive tools have completely transformed how I teach cardiac anatomy to my students.",
    author: "",
    title: ""
  },
  {
    quote: "As a medical student, I found the heart rate simulator and anatomy explorer incredibly helpful for understanding complex concepts.",
    author: "",
    title: ""
  },
  {
    quote: "The interactive quizzes helped me prepare for my exams. The visual approach makes learning about the heart much more engaging.",
    author: "",
    title: ""
  }
];

const TestimonialSection = () => {
  return (
    <section className="bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="slideUp" className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how HHS Heart is helping students, educators, and healthcare professionals
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection 
              key={index} 
              animation="fadeIn" 
              delay={index * 200}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700"
            >
              <svg className="w-10 h-10 text-gray-400 mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-gray-300 text-lg italic mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="mt-auto">
                <p className="text-white font-semibold">{testimonial.author}</p>
                <p className="text-gray-400">{testimonial.title}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection; 