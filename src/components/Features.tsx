'use client';

import { FaRoute, FaWallet, FaMapMarkedAlt, FaCalendarAlt, FaUsers, FaLock } from 'react-icons/fa';

export default function Features() {
  const features = [
    {
      icon: FaRoute,
      title: 'Smart Itinerary Planning',
      description: 'Create detailed day-by-day itineraries with activities, times, and locations.'
    },
    {
      icon: FaWallet,
      title: 'Budget Tracking',
      description: 'Keep track of your expenses and budget with detailed breakdowns by category.'
    },
    {
      icon: FaMapMarkedAlt,
      title: 'Interactive Maps',
      description: 'Visualize your trip with interactive maps and location markers.'
    },
    {
      icon: FaCalendarAlt,
      title: 'Flexible Scheduling',
      description: 'Easily adjust and modify your plans as needed with our flexible scheduling system.'
    },
    {
      icon: FaUsers,
      title: 'Group Planning',
      description: 'Collaborate with friends and family to plan group trips together.'
    },
    {
      icon: FaLock,
      title: 'Secure Storage',
      description: 'Keep all your travel plans safe and accessible in one secure place.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose TravelPlanner</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-blue-500 text-4xl mb-4">
                <feature.icon className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-900">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 