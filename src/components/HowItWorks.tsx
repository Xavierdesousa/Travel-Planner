'use client';

import { FaPlusCircle, FaMapMarkedAlt, FaCalendarCheck, FaPlane } from 'react-icons/fa';

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: FaPlusCircle,
      title: 'Create Trip',
      description: 'Start by creating a new trip with basic details like destination and dates.'
    },
    {
      number: 2,
      icon: FaMapMarkedAlt,
      title: 'Plan Itinerary',
      description: 'Add activities, locations, and timings to your daily itinerary.'
    },
    {
      number: 3,
      icon: FaCalendarCheck,
      title: 'Set Budget',
      description: 'Define your budget and track expenses by categories.'
    },
    {
      number: 4,
      icon: FaPlane,
      title: 'Enjoy Your Trip',
      description: 'Access your plans anywhere and enjoy your well-organized journey.'
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              <div className="flex flex-col items-center">
                <div className="bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center text-white text-xl font-bold mb-4">
                  {step.number}
                </div>
                <div className="text-blue-500 text-3xl mb-4">
                  <step.icon />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-900">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-24 right-0 w-full h-0.5 bg-blue-200 transform translate-x-1/2">
                  <div className="absolute right-0 -top-1 w-2 h-2 rounded-full bg-blue-500"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 