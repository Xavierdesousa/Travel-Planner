export interface Trip {
  id: string;
  title: string;
  destination: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: 'upcoming' | 'ongoing' | 'completed';
  imageUrl?: string;
  photos: string[];
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  itinerary: {
    day: number;
    activities: {
      time: string;
      activity: string;
      location?: string;
    }[];
  }[];
  budget: {
    total: number;
    currency: string;
    breakdown: {
      category: string;
      amount: number;
    }[];
  };
  tags: string[];
}

export const sampleTrips: Trip[] = [
  // Upcoming Trips
  {
    id: '1',
    title: 'Paris Adventure',
    destination: 'Paris, France',
    description: 'Experience the magic of Paris with this carefully curated trip that combines iconic landmarks with hidden gems. Perfect for first-time visitors who want to see the best of the City of Light.',
    startDate: new Date('2024-06-15'),
    endDate: new Date('2024-06-22'),
    status: 'upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    photos: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
      'https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f',
      'https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b',
      'https://images.unsplash.com/photo-1541171597116-85cd71100305'
    ],
    location: {
      lat: 48.8566,
      lng: 2.3522,
      address: 'Paris, France'
    },
    itinerary: [
      {
        day: 1,
        activities: [
          {
            time: '09:00',
            activity: 'Eiffel Tower Visit',
            location: 'Champ de Mars'
          },
          {
            time: '13:00',
            activity: 'Lunch at Le Marais',
            location: 'Le Marais District'
          },
          {
            time: '15:00',
            activity: 'Louvre Museum Tour',
            location: 'Rue de Rivoli'
          }
        ]
      },
      {
        day: 2,
        activities: [
          {
            time: '10:00',
            activity: 'Notre-Dame Cathedral',
            location: 'Île de la Cité'
          },
          {
            time: '14:00',
            activity: 'Seine River Cruise',
            location: 'Seine River'
          }
        ]
      }
    ],
    budget: {
      total: 2500,
      currency: 'EUR',
      breakdown: [
        { category: 'Accommodation', amount: 1000 },
        { category: 'Transportation', amount: 300 },
        { category: 'Food & Dining', amount: 600 },
        { category: 'Activities', amount: 400 },
        { category: 'Shopping', amount: 200 }
      ]
    },
    tags: ['Cultural', 'Romantic', 'Historical', 'Food & Wine', 'Art', 'City Break']
  },
  {
    id: '2',
    title: 'Bali Retreat',
    destination: 'Bali, Indonesia',
    description: 'Immerse yourself in the spiritual and natural beauty of Bali. This trip combines relaxation, adventure, and cultural experiences.',
    startDate: new Date('2024-07-10'),
    endDate: new Date('2024-07-20'),
    status: 'upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    photos: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
      'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b',
      'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8',
      'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1'
    ],
    location: {
      lat: -8.4095,
      lng: 115.1889,
      address: 'Bali, Indonesia'
    },
    itinerary: [
      {
        day: 1,
        activities: [
          {
            time: '08:00',
            activity: 'Sunrise Yoga Session',
            location: 'Ubud Yoga House'
          },
          {
            time: '14:00',
            activity: 'Sacred Monkey Forest',
            location: 'Ubud'
          },
          {
            time: '19:00',
            activity: 'Traditional Dance Performance',
            location: 'Ubud Palace'
          }
        ]
      },
      {
        day: 2,
        activities: [
          {
            time: '09:00',
            activity: 'Rice Terrace Walk',
            location: 'Tegalalang'
          },
          {
            time: '15:00',
            activity: 'Spa Treatment',
            location: 'Luxury Spa Resort'
          }
        ]
      }
    ],
    budget: {
      total: 3000,
      currency: 'USD',
      breakdown: [
        { category: 'Accommodation', amount: 1200 },
        { category: 'Transportation', amount: 500 },
        { category: 'Food & Dining', amount: 600 },
        { category: 'Activities', amount: 500 },
        { category: 'Wellness & Spa', amount: 200 }
      ]
    },
    tags: ['Beach', 'Wellness', 'Cultural', 'Nature', 'Relaxation', 'Family Friendly', 'Spiritual']
  },
  {
    id: '3',
    title: 'Tokyo Adventure',
    destination: 'Tokyo, Japan',
    description: 'Discover the perfect blend of tradition and modernity in Tokyo. From ancient temples to futuristic technology, experience it all.',
    startDate: new Date('2024-05-10'),
    endDate: new Date('2024-05-20'),
    status: 'ongoing',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
    photos: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
      'https://images.unsplash.com/photo-1542051841857-5f90071e7989',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
      'https://images.unsplash.com/photo-1504198453319-5ce911bafcde'
    ],
    location: {
      lat: 35.6762,
      lng: 139.6503,
      address: 'Tokyo, Japan'
    },
    itinerary: [
      {
        day: 1,
        activities: [
          {
            time: '09:00',
            activity: 'Senso-ji Temple',
            location: 'Asakusa'
          },
          {
            time: '14:00',
            activity: 'Akihabara Electronics',
            location: 'Akihabara District'
          },
          {
            time: '19:00',
            activity: 'Sushi Dinner',
            location: 'Tsukiji Outer Market'
          }
        ]
      }
    ],
    budget: {
      total: 4000,
      currency: 'USD',
      breakdown: [
        { category: 'Accommodation', amount: 1500 },
        { category: 'Transportation', amount: 800 },
        { category: 'Food & Dining', amount: 1000 },
        { category: 'Activities', amount: 500 },
        { category: 'Shopping', amount: 200 }
      ]
    },
    tags: ['Cultural', 'Modern', 'Food', 'Shopping', 'Technology', 'Urban']
  },

  // Ongoing Trips
  {
    id: '4',
    title: 'Amazon Expedition',
    destination: 'Amazon Rainforest, Brazil',
    description: 'Embark on an unforgettable journey through the Amazon rainforest. Experience the incredible biodiversity and indigenous cultures.',
    startDate: new Date('2024-09-01'),
    endDate: new Date('2024-09-10'),
    status: 'ongoing',
    imageUrl: 'https://images.unsplash.com/photo-1518182170546-07661fd94144',
    photos: [
      'https://images.unsplash.com/photo-1518182170546-07661fd94144',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801',
      'https://images.unsplash.com/photo-1518182170546-07661fd94144',
      'https://images.unsplash.com/photo-1502120492606-fba13c3ddbbf'
    ],
    location: {
      lat: -3.4653,
      lng: -62.2159,
      address: 'Manaus, Brazil'
    },
    itinerary: [
      {
        day: 1,
        activities: [
          {
            time: '08:00',
            activity: 'Rainforest Trek',
            location: 'Amazon Jungle'
          },
          {
            time: '14:00',
            activity: 'River Boat Tour',
            location: 'Amazon River'
          },
          {
            time: '19:00',
            activity: 'Night Wildlife Spotting',
            location: 'Jungle Reserve'
          }
        ]
      }
    ],
    budget: {
      total: 3500,
      currency: 'USD',
      breakdown: [
        { category: 'Accommodation', amount: 1200 },
        { category: 'Transportation', amount: 800 },
        { category: 'Food & Dining', amount: 500 },
        { category: 'Activities', amount: 800 },
        { category: 'Equipment', amount: 200 }
      ]
    },
    tags: ['Adventure', 'Nature', 'Wildlife', 'Eco-Tourism', 'Cultural', 'Unique']
  },
  {
    id: '5',
    title: 'Safari Adventure',
    destination: 'Serengeti, Tanzania',
    description: 'Experience the ultimate African safari in the Serengeti. Witness the great migration and spot the Big Five.',
    startDate: new Date('2024-04-01'),
    endDate: new Date('2024-04-10'),
    status: 'completed',
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801',
    photos: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801',
      'https://images.unsplash.com/photo-1549366021-9f761d450615',
      'https://images.unsplash.com/photo-1534177616072-ef7dc120449d',
      'https://images.unsplash.com/photo-1514125669375-59ee3985d08b'
    ],
    location: {
      lat: -2.1540,
      lng: 34.6857,
      address: 'Serengeti National Park, Tanzania'
    },
    itinerary: [
      {
        day: 1,
        activities: [
          {
            time: '06:00',
            activity: 'Morning Game Drive',
            location: 'Serengeti Plains'
          },
          {
            time: '13:00',
            activity: 'Lunch at Camp',
            location: 'Luxury Safari Camp'
          },
          {
            time: '16:00',
            activity: 'Evening Game Drive',
            location: 'Mara River'
          }
        ]
      }
    ],
    budget: {
      total: 6000,
      currency: 'USD',
      breakdown: [
        { category: 'Accommodation', amount: 2500 },
        { category: 'Transportation', amount: 1500 },
        { category: 'Food & Dining', amount: 800 },
        { category: 'Activities', amount: 1000 },
        { category: 'Equipment', amount: 200 }
      ]
    },
    tags: ['Wildlife', 'Adventure', 'Nature', 'Photography', 'Luxury', 'Unique']
  },

  {
    id: '7',
    title: 'Northern Lights Hunt',
    destination: 'Iceland',
    startDate: new Date('2024-01-05'),
    endDate: new Date('2024-01-15'),
    description: 'Chasing the aurora borealis, visiting ice caves, and relaxing in geothermal springs.',
    status: 'upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1520769945061-0a448c463865',
    photos: [
      'https://images.unsplash.com/photo-1520769945061-0a448c463865',
      'https://images.unsplash.com/photo-1476610182048-b716b8518aae',
      'https://images.unsplash.com/photo-1579033461380-adb47c3eb938',
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7'
    ],
    location: {
      lat: 64.9631,
      lng: -19.0208,
      address: 'Reykjavik, Iceland'
    },
    itinerary: [
      {
        day: 1,
        activities: [
          {
            time: '21:00',
            activity: 'Northern Lights Tour',
            location: 'Thingvellir National Park'
          },
          {
            time: '14:00',
            activity: 'Ice Cave Exploration',
            location: 'Vatnajökull Glacier'
          },
          {
            time: '17:00',
            activity: 'Blue Lagoon Visit',
            location: 'Blue Lagoon Geothermal Spa'
          }
        ]
      }
    ],
    budget: {
      total: 4500,
      currency: 'USD',
      breakdown: [
        { category: 'Accommodation', amount: 1800 },
        { category: 'Transportation', amount: 1000 },
        { category: 'Food & Dining', amount: 800 },
        { category: 'Activities', amount: 700 },
        { category: 'Equipment Rental', amount: 200 }
      ]
    },
    tags: ['Adventure', 'Nature', 'Winter', 'Photography', 'Relaxation', 'Unique']
  },
  {
    id: '8',
    title: 'Morocco Desert Tour',
    destination: 'Morocco',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-02-10'),
    description: 'Exploring the Sahara desert, visiting ancient medinas, and experiencing local culture.',
    status: 'ongoing',
    imageUrl: 'https://images.unsplash.com/photo-1489493887464-892be6d1daae',
    photos: [
      'https://images.unsplash.com/photo-1489493887464-892be6d1daae',
      'https://images.unsplash.com/photo-1548013146-72479768bada',
      'https://images.unsplash.com/photo-1531375300989-00af63cba5cf',
      'https://images.unsplash.com/photo-1597212618440-806262de4f6b'
    ],
    location: {
      lat: 31.6295,
      lng: -5.2933,
      address: 'Merzouga, Morocco'
    },
    itinerary: [
      {
        day: 1,
        activities: [
          {
            time: '06:00',
            activity: 'Desert Sunrise',
            location: 'Sahara Desert'
          },
          {
            time: '11:00',
            activity: 'Camel Trek',
            location: 'Erg Chebbi Dunes'
          },
          {
            time: '19:00',
            activity: 'Traditional Dinner',
            location: 'Berber Camp'
          }
        ]
      }
    ],
    budget: {
      total: 2800,
      currency: 'USD',
      breakdown: [
        { category: 'Accommodation', amount: 1000 },
        { category: 'Transportation', amount: 600 },
        { category: 'Food & Dining', amount: 400 },
        { category: 'Activities', amount: 600 },
        { category: 'Shopping', amount: 200 }
      ]
    },
    tags: ['Desert', 'Cultural', 'Adventure', 'Photography', 'Historical', 'Authentic']
  },
  // Completed Trips
  {
    id: '9',
    title: 'Vietnam Food Tour',
    destination: 'Vietnam',
    startDate: new Date('2024-02-15'),
    endDate: new Date('2024-02-25'),
    description: 'Tasting authentic Vietnamese cuisine, exploring markets, and learning local cooking.',
    status: 'completed',
    imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482',
    photos: [
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482',
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186',
      'https://images.unsplash.com/photo-1583321500900-82807e458f3c',
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9'
    ],
    location: {
      lat: 21.0285,
      lng: 105.8542,
      address: 'Hanoi, Vietnam'
    },
    itinerary: [
      {
        day: 1,
        activities: [
          {
            time: '07:00',
            activity: 'Street Food Breakfast',
            location: 'Old Quarter'
          },
          {
            time: '11:00',
            activity: 'Cooking Class',
            location: 'Hanoi Cooking Centre'
          },
          {
            time: '18:00',
            activity: 'Night Market Tour',
            location: 'Dong Xuan Market'
          }
        ]
      }
    ],
    budget: {
      total: 2000,
      currency: 'USD',
      breakdown: [
        { category: 'Accommodation', amount: 600 },
        { category: 'Transportation', amount: 400 },
        { category: 'Food & Dining', amount: 500 },
        { category: 'Activities', amount: 300 },
        { category: 'Shopping', amount: 200 }
      ]
    },
    tags: ['Food & Wine', 'Cultural', 'Urban', 'Local Experience', 'Markets', 'Authentic']
  }
]; 