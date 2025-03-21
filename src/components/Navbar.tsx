'use client';

import Link from 'next/link';
import { FaPlane } from 'react-icons/fa';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <FaPlane className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold text-gray-800">TravelPlanner</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              href="/trips" 
              className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              My Trips
            </Link>
            <Link 
              href="/create" 
              className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-medium"
            >
              Create Trip
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 