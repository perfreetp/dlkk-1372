import type { Booking } from '@/types';

export const bookings: Booking[] = [
  {
    id: 'bk001',
    petId: 'pet1',
    petName: '豆豆',
    roomId: 'room2',
    roomName: '豪华大床房',
    checkInDate: '2026-06-15',
    checkOutDate: '2026-06-18',
    days: 3,
    status: 'inProgress',
    totalPrice: 424,
    createTime: '2026-06-10 14:30'
  },
  {
    id: 'bk002',
    petId: 'pet2',
    petName: '咪咪',
    roomId: 'room3',
    roomName: '猫咪专属房',
    checkInDate: '2026-06-20',
    checkOutDate: '2026-06-25',
    days: 5,
    status: 'confirmed',
    totalPrice: 340,
    createTime: '2026-06-12 09:15'
  },
  {
    id: 'bk003',
    petId: 'pet3',
    petName: '旺财',
    roomId: 'room1',
    roomName: '温馨标准间',
    checkInDate: '2026-06-01',
    checkOutDate: '2026-06-05',
    days: 4,
    status: 'completed',
    totalPrice: 352,
    createTime: '2026-05-28 16:45'
  },
  {
    id: 'bk004',
    petId: 'pet1',
    petName: '豆豆',
    roomId: 'room4',
    roomName: '豪华套房',
    checkInDate: '2026-07-01',
    checkOutDate: '2026-07-07',
    days: 6,
    status: 'pending',
    totalPrice: 1188,
    createTime: '2026-06-14 10:20'
  }
];
