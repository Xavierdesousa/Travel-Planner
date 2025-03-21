'use client';

import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

export default function CallToAction() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Start Your Journey?</h2>
        <p className="text-xl text-gray-900 mb-8 max-w-2xl mx-auto">
          Join thousands of travelers who plan their trips with us. Create your first trip today and experience the joy of organized travel planning.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/create"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors"
          >
            Start Planning Now
            <FaArrowRight className="ml-2" />
          </Link>
          <Link
            href="/trips"
            className="inline-flex items-center px-8 py-3 border border-blue-500 text-base font-medium rounded-md text-blue-500 hover:bg-blue-50 transition-colors"
          >
            View Example Trips
          </Link>
        </div>
      </div>
    </section>
  );
} 