'use client';

import { sampleTrips } from '@/data/sampleTrips';
import { Trip } from '@/types/trip';
import { format } from 'date-fns';
import { notFound, useRouter } from 'next/navigation';
import { FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import { use, useState } from 'react';
import TripMap from '@/components/TripMap';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function TripEdit({ params }: PageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  
  // Find the trip to edit
  const originalTrip = sampleTrips.find((t) => t.id === resolvedParams.id);
  
  if (!originalTrip) {
    notFound();
  }

  // Initialize form state with trip data
  const [formData, setFormData] = useState({
    title: originalTrip.title,
    destination: originalTrip.destination,
    description: originalTrip.description,
    startDate: format(originalTrip.startDate, 'yyyy-MM-dd'),
    endDate: format(originalTrip.endDate, 'yyyy-MM-dd'),
    status: originalTrip.status,
    tags: [...originalTrip.tags],
    imageUrl: originalTrip.imageUrl,
    location: {
      lat: originalTrip.location.lat,
      lng: originalTrip.location.lng
    },
    budget: {
      total: originalTrip.budget.total,
      currency: originalTrip.budget.currency,
      breakdown: [...originalTrip.budget.breakdown]
    },
    itinerary: originalTrip.itinerary.map(day => ({
      day: day.day,
      activities: day.activities.map(activity => ({
        time: activity.time,
        activity: activity.activity,
        location: activity.location || ''
      }))
    }))
  });

  // Handle form field changes
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle budget breakdown changes
  const handleBudgetBreakdownChange = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      budget: {
        ...prev.budget,
        breakdown: prev.budget.breakdown.map((item, i) => 
          i === index ? { ...item, [field]: field === 'amount' ? Number(value) : value } : item
        )
      }
    }));
  };

  // Add new budget category
  const addBudgetCategory = () => {
    setFormData(prev => ({
      ...prev,
      budget: {
        ...prev.budget,
        breakdown: [
          ...prev.budget.breakdown,
          { category: '', amount: 0 }
        ]
      }
    }));
  };

  // Remove budget category
  const removeBudgetCategory = (index: number) => {
    setFormData(prev => ({
      ...prev,
      budget: {
        ...prev.budget,
        breakdown: prev.budget.breakdown.filter((_, i) => i !== index)
      }
    }));
  };

  // Handle itinerary changes
  const handleActivityChange = (dayIndex: number, activityIndex: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((day, dIdx) =>
        dIdx === dayIndex
          ? {
              ...day,
              activities: day.activities.map((activity, aIdx) =>
                aIdx === activityIndex
                  ? { ...activity, [field]: value }
                  : activity
              )
            }
          : day
      )
    }));
  };

  // Add new activity to a day
  const addActivity = (dayIndex: number) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((day, idx) =>
        idx === dayIndex
          ? {
              ...day,
              activities: [
                ...day.activities,
                { time: '12:00', activity: '', location: '' }
              ]
            }
          : day
      )
    }));
  };

  // Remove activity from a day
  const removeActivity = (dayIndex: number, activityIndex: number) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((day, idx) =>
        idx === dayIndex
          ? {
              ...day,
              activities: day.activities.filter((_, aIdx) => aIdx !== activityIndex)
            }
          : day
      )
    }));
  };

  // Add new day to itinerary
  const addDay = () => {
    const nextDayNumber = formData.itinerary.length + 1;
    setFormData(prev => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        {
          day: nextDayNumber,
          activities: [{ time: '12:00', activity: '', location: '' }]
        }
      ]
    }));
  };

  // Remove day from itinerary
  const removeDay = (dayIndex: number) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary
        .filter((_, idx) => idx !== dayIndex)
        .map((day, idx) => ({ ...day, day: idx + 1 }))
    }));
  };

  // Handle tag changes
  const handleTagChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.map((tag, i) => (i === index ? value : tag))
    }));
  };

  // Add new tag
  const addTag = () => {
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, '']
    }));
  };

  // Remove tag
  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert dates back to Date objects
    const updatedTrip: Trip = {
      ...originalTrip,
      ...formData,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate)
    };

    // Here you would typically make an API call to update the trip
    console.log('Updated trip:', updatedTrip);
    
    // Navigate back to trip detail page
    router.push(`/trips/${originalTrip.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={`/trips/${originalTrip.id}`}
          className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to Trip Details
        </Link>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Trip</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Destination</label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) => handleChange('destination', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleChange('startDate', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleChange('endDate', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Image URL</label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => handleChange('imageUrl', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                  required
                />
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Tags</h2>
                <button
                  type="button"
                  onClick={addTag}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                >
                  <FaPlus className="mr-1" /> Add Tag
                </button>
              </div>

              <div className="space-y-2">
                {formData.tags.map((tag, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => handleTagChange(index, e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                      placeholder="Enter tag"
                    />
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Location</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.location.lat}
                    onChange={(e) => handleChange('location', { ...formData.location, lat: parseFloat(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.location.lng}
                    onChange={(e) => handleChange('location', { ...formData.location, lng: parseFloat(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                    required
                  />
                </div>
              </div>

              <div className="h-64">
                <TripMap location={formData.location} />
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Budget</h2>
                <button
                  type="button"
                  onClick={addBudgetCategory}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                >
                  <FaPlus className="mr-1" /> Add Category
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Budget</label>
                  <input
                    type="number"
                    value={formData.budget.total}
                    onChange={(e) => handleChange('budget', { ...formData.budget, total: parseFloat(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Currency</label>
                  <input
                    type="text"
                    value={formData.budget.currency}
                    onChange={(e) => handleChange('budget', { ...formData.budget, currency: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                {formData.budget.breakdown.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item.category}
                      onChange={(e) => handleBudgetBreakdownChange(index, 'category', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                      placeholder="Category"
                      required
                    />
                    <input
                      type="number"
                      value={item.amount}
                      onChange={(e) => handleBudgetBreakdownChange(index, 'amount', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                      placeholder="Amount"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => removeBudgetCategory(index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Itinerary</h2>
                <button
                  type="button"
                  onClick={addDay}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                >
                  <FaPlus className="mr-1" /> Add Day
                </button>
              </div>

              <div className="space-y-6">
                {formData.itinerary.map((day, dayIndex) => (
                  <div key={dayIndex} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Day {day.day}</h3>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => addActivity(dayIndex)}
                          className="inline-flex items-center px-2 py-1 text-sm text-blue-700 hover:text-blue-800"
                        >
                          <FaPlus className="mr-1" /> Add Activity
                        </button>
                        <button
                          type="button"
                          onClick={() => removeDay(dayIndex)}
                          className="p-1 text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {day.activities.map((activity, activityIndex) => (
                        <div key={activityIndex} className="flex items-start gap-2">
                          <input
                            type="time"
                            value={activity.time}
                            onChange={(e) => handleActivityChange(dayIndex, activityIndex, 'time', e.target.value)}
                            className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                            required
                          />
                          <input
                            type="text"
                            value={activity.activity}
                            onChange={(e) => handleActivityChange(dayIndex, activityIndex, 'activity', e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                            placeholder="Activity"
                            required
                          />
                          <input
                            type="text"
                            value={activity.location}
                            onChange={(e) => handleActivityChange(dayIndex, activityIndex, 'location', e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                            placeholder="Location (optional)"
                          />
                          <button
                            type="button"
                            onClick={() => removeActivity(dayIndex, activityIndex)}
                            className="p-2 text-red-500 hover:text-red-700"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Save Changes
              </button>
              <Link
                href={`/trips/${originalTrip.id}`}
                className="flex-1 bg-white text-gray-500 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 