'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

// Sample reviews data
const reviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    review: 'This app made planning my Europe trip so much easier! Love the budget tracking feature.',
    rating: 5,
    location: 'New York, USA'
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    review: 'Perfect for organizing my business trips. The itinerary sharing is fantastic!',
    rating: 5,
    location: 'Toronto, Canada'
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    review: 'I use this for all my family vacations now. The interface is so intuitive!',
    rating: 5,
    location: 'London, UK'
  },
  {
    id: 4,
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    review: 'Great for group trips! We used it to plan our hiking expedition.',
    rating: 5,
    location: 'Seoul, South Korea'
  },
  {
    id: 5,
    name: 'Lisa Patel',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    review: 'The budget breakdown feature helped me save so much on my last trip!',
    rating: 5,
    location: 'Mumbai, India'
  }
];

export default function Reviews() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => (prev + 1) % (reviews.length * 400));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          What Our Travelers Say
        </h2>
        <div className="relative overflow-hidden">
          <div 
            className="flex gap-6 transition-transform duration-500 ease-linear"
            style={{ transform: `translateX(-${scrollPosition}px)` }}
          >
            {/* Duplicate reviews for infinite scroll effect */}
            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className="flex-none w-80 bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-center mb-4">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">{review.name}</h3>
                    <p className="text-xs text-gray-500">{review.location}</p>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 15.585l-6.327 3.89 1.688-7.302L.373 7.323l7.372-.635L10 0l2.255 6.688 7.372.635-4.988 4.85 1.688 7.302L10 15.585z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-600">{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 