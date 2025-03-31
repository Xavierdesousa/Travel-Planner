'use client';

import { FaPlusCircle, FaMapMarkedAlt, FaCalendarCheck, FaPlane, FaUsers, FaShareAlt, FaArrowRight } from 'react-icons/fa';

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
      icon: FaUsers,
      title: 'Invite Travelers',
      description: 'Share your trip with friends and family who are joining you.'
    },
    {
      number: 5,
      icon: FaShareAlt,
      title: 'Collaborate',
      description: 'Let everyone contribute to the planning process and share ideas.'
    },
    {
      number: 6,
      icon: FaPlane,
      title: 'Enjoy Your Trip',
      description: 'Access your plans anywhere and enjoy your well-organized journey.'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">How It Works</h2>
        <div className="relative">
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-center relative">
                  <div className="bg-blue-500 rounded-full w-14 h-14 flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
                    {step.number}
                  </div>
                  <div className="text-blue-500 text-4xl mb-4">
                    <step.icon />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-sm max-w-[200px] text-center">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="mx-4">
                    <FaArrowRight className="text-blue-500 text-2xl" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center text-white text-xl font-bold mb-4 shadow-lg">
                    {step.number}
                  </div>
                  <div className="text-blue-500 text-3xl mb-4">
                    <step.icon />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="md:hidden absolute top-24 right-0 w-full h-0.5 bg-blue-200 transform translate-x-1/2">
                    <div className="absolute right-0 -top-1 w-2 h-2 rounded-full bg-blue-500"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 