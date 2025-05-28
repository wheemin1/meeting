// Demo room data for static export
import { Room } from '@/types';

export const getDemoRoom = (): Room => {
  return {
    id: 'demo-room',
    name: 'Demo Meeting',
    description: 'This is a demo meeting room for testing purposes',
    participants: [],
    createdAt: new Date().toISOString(),
    timezone: 'Asia/Seoul'
  };
};
