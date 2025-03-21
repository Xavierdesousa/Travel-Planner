export interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  imageUrl?: string;
  description: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  tags: string[];
} 