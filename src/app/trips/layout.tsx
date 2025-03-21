'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { sampleTrips } from '@/data/sampleTrips';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function TripsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Only run prefetching for trip detail pages
    if (pathname.startsWith('/trips/')) {
      const currentId = pathname.split('/').pop();
      const currentIndex = sampleTrips.findIndex((t) => t.id === currentId);

      // Prefetch previous and next trips
      if (currentIndex > 0) {
        router.prefetch(`/trips/${sampleTrips[currentIndex - 1].id}`);
      }
      if (currentIndex < sampleTrips.length - 1) {
        router.prefetch(`/trips/${sampleTrips[currentIndex + 1].id}`);
      }
    }
  }, [pathname, router]);

  return (
    <>
      <Navbar />
      {children}
    </>
  );
} 