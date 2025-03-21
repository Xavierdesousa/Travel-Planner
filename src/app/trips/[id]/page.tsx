'use client';

import { sampleTrips } from '@/data/sampleTrips';
import { format } from 'date-fns';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { FaMapMarkerAlt, FaCalendar, FaClock, FaArrowLeft, FaWallet, FaTag, FaUtensils, FaHotel, FaPlane, FaTicketAlt, FaShoppingBag, FaEllipsisH, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';
import { use, useEffect, useState, useCallback, useTransition } from 'react';
import { useSwipeable } from 'react-swipeable';
import TripMap from '@/components/TripMap';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function TripDetail({ params }: PageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resolvedParams = use(params);
  const [isPending, startTransition] = useTransition();
  
  // Get filter parameters
  const searchQuery = searchParams.get('search') || '';
  const statusFilter = searchParams.get('status') || 'all';
  const tagsFilter = searchParams.get('tags')?.split(',').filter(Boolean) || [];

  // Filter trips based on search parameters
  const filteredTrips = sampleTrips.filter((trip) => {
    const matchesSearch = searchQuery ? 
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    const matchesStatus = statusFilter === 'all' || trip.status === statusFilter;
    const matchesTags = tagsFilter.length === 0 || 
      tagsFilter.every(tag => trip.tags.includes(tag));
    return matchesSearch && matchesStatus && matchesTags;
  });

  // Find current trip in filtered list
  const [currentTrip, setCurrentTrip] = useState(() => {
    const trip = sampleTrips.find((t) => t.id === resolvedParams.id);
    if (!trip) return null;
    
    // Check if current trip matches filters
    const matchesSearch = searchQuery ? 
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    const matchesStatus = statusFilter === 'all' || trip.status === statusFilter;
    const matchesTags = tagsFilter.length === 0 || 
      tagsFilter.every(tag => trip.tags.includes(tag));
    
    return matchesSearch && matchesStatus && matchesTags ? trip : null;
  });

  if (!currentTrip) {
    notFound();
  }

  // Find current trip index and adjacent trips in filtered list
  const currentIndex = filteredTrips.findIndex((t) => t.id === currentTrip.id);
  const prevTrip = currentIndex > 0 ? filteredTrips[currentIndex - 1] : null;
  const nextTrip = currentIndex < filteredTrips.length - 1 ? filteredTrips[currentIndex + 1] : null;

  // Create the filter query string for navigation
  const getFilterQueryString = useCallback(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (statusFilter !== 'all') params.set('status', statusFilter);
    if (tagsFilter.length > 0) params.set('tags', tagsFilter.join(','));
    return params.toString();
  }, [searchQuery, statusFilter, tagsFilter]);

  // Navigation functions with transitions
  const goToPrevTrip = useCallback(() => {
    if (prevTrip) {
      const queryString = getFilterQueryString();
      startTransition(() => {
        setCurrentTrip(prevTrip);
        router.push(`/trips/${prevTrip.id}${queryString ? `?${queryString}` : ''}`, { scroll: false });
      });
    }
  }, [prevTrip, router, getFilterQueryString]);

  const goToNextTrip = useCallback(() => {
    if (nextTrip) {
      const queryString = getFilterQueryString();
      startTransition(() => {
        setCurrentTrip(nextTrip);
        router.push(`/trips/${nextTrip.id}${queryString ? `?${queryString}` : ''}`, { scroll: false });
      });
    }
  }, [nextTrip, router, getFilterQueryString]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevTrip();
      } else if (e.key === 'ArrowRight') {
        goToNextTrip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevTrip, goToNextTrip]);

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => goToNextTrip(),
    onSwipedRight: () => goToPrevTrip(),
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  const getStatusColor = (status: typeof currentTrip.status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-800';
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
    }
  };

  const duration = Math.ceil(
    (currentTrip.endDate.getTime() - currentTrip.startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Add loading state styles
  const contentStyle = isPending ? 'opacity-50 transition-opacity duration-200' : 'transition-opacity duration-200';

  // Update back link to preserve filters
  const backToTripsHref = `/trips${getFilterQueryString() ? `?${getFilterQueryString()}` : ''}`;

  return (
    <div className="min-h-screen bg-gray-50 py-8 relative" {...swipeHandlers}>
      {/* Navigation Arrows */}
      {prevTrip && (
        <button
          onClick={goToPrevTrip}
          disabled={isPending}
          className="fixed left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all z-50 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous trip"
        >
          <FaChevronLeft className="w-5 h-5" />
        </button>
      )}
      {nextTrip && (
        <button
          onClick={goToNextTrip}
          disabled={isPending}
          className="fixed right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all z-50 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next trip"
        >
          <FaChevronRight className="w-5 h-5" />
        </button>
      )}

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${contentStyle}`}>
        {/* Back button with preserved filters */}
        <Link
          href={backToTripsHref}
          className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to Trips
        </Link>

        {/* Trip header with banner image */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="h-96 relative">
            {currentTrip.imageUrl ? (
              <img
                src={currentTrip.imageUrl}
                alt={currentTrip.destination}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-500">
                <FaMapMarkerAlt className="w-16 h-16" />
              </div>
            )}
            <div
              className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                currentTrip.status
              )}`}
            >
              {currentTrip.status.charAt(0).toUpperCase() + currentTrip.status.slice(1)}
            </div>
          </div>

          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{currentTrip.title}</h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {currentTrip.tags.map((tag, index) => (
                <Link
                  key={index}
                  href={`/trips?tags=${encodeURIComponent(tag)}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                >
                  <FaTag className="mr-1 h-3 w-3" />
                  {tag}
                </Link>
              ))}
            </div>

            {/* Trip details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="mr-2" />
                  <span className="text-lg">{currentTrip.destination}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaCalendar className="mr-2" />
                  <span>
                    {format(currentTrip.startDate, 'MMM d, yyyy')} -{' '}
                    {format(currentTrip.endDate, 'MMM d, yyyy')}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaClock className="mr-2" />
                  <span>{duration} days</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaWallet className="mr-2" />
                  <span>
                    Budget: {currentTrip.budget.total} {currentTrip.budget.currency}
                  </span>
                </div>
              </div>
            </div>

            {/* Trip description */}
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About this trip</h2>
              <p className="text-gray-600 whitespace-pre-line">{currentTrip.description}</p>
            </div>

            {/* Map */}
            <div className="border-t pt-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
              <TripMap location={currentTrip.location} />
            </div>

            {/* Itinerary */}
            <div className="border-t pt-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Itinerary</h2>
              <div className="space-y-6">
                {currentTrip.itinerary.map((day) => (
                  <div key={day.day} className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-3 text-gray-900">Day {day.day}</h3>
                    <div className="space-y-3">
                      {day.activities.map((activity, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-blue-600 font-medium w-20">{activity.time}</span>
                          <div>
                            <div className="font-medium text-gray-900">{activity.activity}</div>
                            {activity.location && (
                              <div className="text-sm text-gray-600">{activity.location}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget breakdown */}
            <div className="border-t pt-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Budget Breakdown</h2>
              
              {/* Total budget card */}
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">Total Budget</p>
                    <p className="text-2xl font-bold text-blue-900">
                      {currentTrip.budget.total.toLocaleString()} {currentTrip.budget.currency}
                    </p>
                  </div>
                  <div className="bg-blue-100 rounded-full p-3">
                    <FaWallet className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              {/* Budget categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentTrip.budget.breakdown.map((item, index) => {
                  const getIcon = (category: string) => {
                    switch (category.toLowerCase()) {
                      case 'accommodation':
                        return <FaHotel className="w-5 h-5" />;
                      case 'transportation':
                        return <FaPlane className="w-5 h-5" />;
                      case 'food & dining':
                        return <FaUtensils className="w-5 h-5" />;
                      case 'activities':
                        return <FaTicketAlt className="w-5 h-5" />;
                      case 'shopping':
                        return <FaShoppingBag className="w-5 h-5" />;
                      default:
                        return <FaEllipsisH className="w-5 h-5" />;
                    }
                  };

                  const percentage = Math.round((item.amount / currentTrip.budget.total) * 100);

                  return (
                    <div key={index} className="bg-white rounded-lg p-4 border border-gray-100 hover:border-blue-200 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="text-blue-500">
                            {getIcon(item.category)}
                          </div>
                          <span className="font-medium text-gray-900">{item.category}</span>
                        </div>
                        <span className="font-bold text-gray-900">
                          {item.amount.toLocaleString()} {currentTrip.budget.currency}
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="text-right mt-1">
                        <span className="text-sm text-gray-600">{percentage}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 mt-8 pt-6 border-t">
              <Link
                href={`/trips/${currentTrip.id}/edit`}
                className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-center"
              >
                Edit Trip
              </Link>
              <button className="flex-1 bg-white text-red-500 px-4 py-2 rounded-md border border-red-500 hover:bg-red-50 transition-colors">
                Delete Trip
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 