'use client';

import { FaUsers, FaGlobeAmericas, FaStar, FaCalendarCheck } from 'react-icons/fa';

export default function Statistics() {
  const stats = [
    {
      icon: FaUsers,
      number: '10k+',
      label: 'Happy Travelers'
    },
    {
      icon: FaGlobeAmericas,
      number: '50+',
      label: 'Countries'
    },
    {
      icon: FaStar,
      number: '4.9',
      label: 'Average Rating'
    },
    {
      icon: FaCalendarCheck,
      number: '100k+',
      label: 'Trips Planned'
    }
  ];

  return (
    <section className="py-16 bg-blue-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-block p-4 rounded-full bg-blue-400 mb-4">
                <stat.icon className="text-4xl" />
              </div>
              <div className="text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-lg text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 