'use client';

import { Trip } from '@/types/trip';
import { format } from 'date-fns';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaMapMarkerAlt, FaCalendar, FaTag } from 'react-icons/fa';
import { useCallback } from 'react';

interface TripCardProps {
  trip: Trip;
}

export default function TripCard({ trip }: TripCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getStatusColor = (status: Trip['status']) => {
    switch (status) {
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-800';
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
    }
  };

  const displayTags = trip.tags.slice(0, 4);
  const remainingTags = trip.tags.length - 4;

  // Create the filter query string for navigation
  const getFilterQueryString = useCallback(() => {
    const params = new URLSearchParams();
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const tags = searchParams.get('tags');

    if (search) params.set('search', search);
    if (status && status !== 'all') params.set('status', status);
    if (tags) params.set('tags', tags);
    
    return params.toString();
  }, [searchParams]);

  const handleTagClick = (tag: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/trips?tags=${encodeURIComponent(tag)}`);
  };

  // Create the trip detail URL with preserved filters
  const tripDetailUrl = `/trips/${trip.id}${getFilterQueryString() ? `?${getFilterQueryString()}` : ''}`;

  return (
    <Link href={tripDetailUrl} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="h-48 bg-gray-200 relative">
          {trip.imageUrl ? (
            <img
              src={trip.imageUrl}
              alt={trip.destination}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-500">
              <FaMapMarkerAlt className="w-12 h-12" />
            </div>
          )}
          <div className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(trip.status)}`}>
            {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{trip.title}</h3>
          <div className="flex items-center text-gray-600 mb-2">
            <FaMapMarkerAlt className="mr-2" />
            <span>{trip.destination}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-4">
            <FaCalendar className="mr-2" />
            <span>
              {format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {displayTags.map((tag, index) => (
              <button
                key={index}
                onClick={(e) => handleTagClick(tag, e)}
                className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
              >
                <FaTag className="mr-1 h-3 w-3" />
                {tag}
              </button>
            ))}
            {remainingTags > 0 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-gray-100 text-gray-600">
                +{remainingTags} more
              </span>
            )}
          </div>
          <p className="text-gray-600 mb-4 line-clamp-2">{trip.description}</p>
          <div className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
            View Details
          </div>
        </div>
      </div>
    </Link>
  );
} 