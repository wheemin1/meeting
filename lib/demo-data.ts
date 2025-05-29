// Demo room data for static export
import { Room } from '@/types';

export const getDemoRoom = (): Room => {
  return {
    id: 'demo-room',
    name: 'Demo Meeting',
    organizer: 'Demo Organizer',
    participants: [],
    createdAt: new Date().toISOString()
  };
};
