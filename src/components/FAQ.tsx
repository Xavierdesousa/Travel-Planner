'use client';

import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How do I create my first trip?',
      answer: 'Creating your first trip is easy! Simply click on the "Start Planning" button, enter your destination and travel dates, and follow our step-by-step guide to add activities, budget, and other details.'
    },
    {
      question: 'Can I share my trip plans with others?',
      answer: 'Yes! You can easily share your trip plans with friends and family. They can view your itinerary, add suggestions, and even collaborate on planning group trips.'
    },
    {
      question: 'Is the app free to use?',
      answer: 'Yes, our basic features are completely free to use. We also offer premium features for advanced travelers who need more detailed planning tools.'
    },
    {
      question: 'Can I access my trips offline?',
      answer: 'Yes, you can download your trip details for offline access. This ensures you have all your important information even without an internet connection.'
    },
    {
      question: 'How can I track my travel budget?',
      answer: 'Our app includes a comprehensive budget tracking feature. You can set your total budget, break it down by categories, and track expenses as you go.'
    },
    {
      question: 'What happens if I need to change my plans?',
      answer: 'No problem! You can easily modify your trip details at any time. Our flexible system allows you to update dates, activities, and other information whenever needed.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <FaChevronUp className="text-blue-500" />
                ) : (
                  <FaChevronDown className="text-gray-400" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-900">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 