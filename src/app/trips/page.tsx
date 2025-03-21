'use client';

import { useState, useEffect } from 'react';
import { sampleTrips } from '@/data/sampleTrips';
import TripCard from '@/components/TripCard';
import { Listbox } from '@headlessui/react';
import { FaSearch, FaChevronDown, FaCheck, FaTimes } from 'react-icons/fa';
import { Trip } from '@/types/trip';
import { useRouter, useSearchParams } from 'next/navigation';

export default function TripsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<Trip['status'] | 'all'>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get unique tags from all trips
  const allTags = Array.from(
    new Set(sampleTrips.flatMap((trip) => trip.tags))
  ).sort();

  // Initialize filters from URL on mount
  useEffect(() => {
    const query = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all';
    const tags = searchParams.get('tags')?.split(',').filter(Boolean) || [];
    
    setSearchQuery(query);
    setSelectedStatus(status as Trip['status'] | 'all');
    setSelectedTags(tags);
  }, [searchParams]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (searchQuery) {
      params.set('search', searchQuery);
    }
    
    if (selectedStatus !== 'all') {
      params.set('status', selectedStatus);
    }
    
    if (selectedTags.length > 0) {
      params.set('tags', selectedTags.join(','));
    }

    const newUrl = params.toString() ? `?${params.toString()}` : '';
    router.push(`/trips${newUrl}`, { scroll: false });
  }, [searchQuery, selectedStatus, selectedTags, router]);

  // Filter trips based on search, status, and tags
  const filteredTrips = sampleTrips.filter((trip) => {
    const matchesSearch = trip.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || trip.status === selectedStatus;
    const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => trip.tags.includes(tag));
    return matchesSearch && matchesStatus && matchesTags;
  });

  // Group trips by status
  const upcomingTrips = filteredTrips.filter((trip) => trip.status === 'upcoming');
  const ongoingTrips = filteredTrips.filter((trip) => trip.status === 'ongoing');
  const completedTrips = filteredTrips.filter((trip) => trip.status === 'completed');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
        </div>

        {/* Filters Section */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search trips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex gap-4">
            {/* Status Filter Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedStatus('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedStatus === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedStatus('upcoming')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedStatus === 'upcoming'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setSelectedStatus('ongoing')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedStatus === 'ongoing'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Ongoing
              </button>
              <button
                onClick={() => setSelectedStatus('completed')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedStatus === 'completed'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Completed
              </button>
            </div>

            {/* Tags Multi-select */}
            <div className="relative w-72">
              <Listbox value={selectedTags} onChange={setSelectedTags} multiple>
                <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900">
                  <span className="block truncate">
                    {selectedTags.length === 0
                      ? 'Select tags'
                      : `${selectedTags.length} tag${selectedTags.length === 1 ? '' : 's'} selected`}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <FaChevronDown className="h-4 w-4 text-gray-400" />
                  </span>
                </Listbox.Button>
                <Listbox.Options className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-auto focus:outline-none">
                  {allTags.map((tag) => (
                    <Listbox.Option
                      key={tag}
                      value={tag}
                      className={({ active }) =>
                        `${active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'}
                        cursor-pointer select-none relative py-2 pl-10 pr-4`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {tag}
                          </span>
                          {selected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                              <FaCheck className="h-4 w-4" />
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>

            {/* Clear Filters */}
            {(searchQuery || selectedStatus !== 'all' || selectedTags.length > 0) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedStatus('all');
                  setSelectedTags([]);
                }}
                className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <FaTimes className="mr-2" />
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Active filters summary */}
        {(searchQuery || selectedStatus !== 'all' || selectedTags.length > 0) && (
          <div className="mb-6">
            <p className="text-gray-600">
              {`Showing ${filteredTrips.length} trip${filteredTrips.length === 1 ? '' : 's'}`}
              {selectedStatus !== 'all' && ` • Status: ${selectedStatus}`}
              {selectedTags.length > 0 && ` • Tags: ${selectedTags.join(', ')}`}
              {searchQuery && ` • Search: "${searchQuery}"`}
            </p>
          </div>
        )}

        {/* Upcoming Trips */}
        {upcomingTrips.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upcoming Trips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </div>
        )}

        {/* Ongoing Trips */}
        {ongoingTrips.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Ongoing Trips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ongoingTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </div>
        )}

        {/* Completed Trips */}
        {completedTrips.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Completed Trips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </div>
        )}

        {/* No trips message */}
        {filteredTrips.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              No trips found matching your filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 