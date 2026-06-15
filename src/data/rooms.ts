import type { RoomType } from '@/types';

export const roomTypes: RoomType[] = [
  {
    id: 'room1',
    name: '温馨标准间',
    description: '独立空间，舒适温馨，适合中小型犬',
    price: 88,
    originalPrice: 108,
    size: '3㎡',
    features: ['独立空间', '24h监控', '恒温空调', '每日遛弯2次'],
    image: 'https://picsum.photos/id/237/600/400',
    stock: 5
  },
  {
    id: 'room2',
    name: '豪华大床房',
    description: '宽敞舒适，豪华配置，适合中大型犬',
    price: 128,
    originalPrice: 158,
    size: '6㎡',
    features: ['超大空间', '24h监控', '恒温空调', '专属玩具', '每日遛弯3次'],
    image: 'https://picsum.photos/id/659/600/400',
    stock: 3
  },
  {
    id: 'room3',
    name: '猫咪专属房',
    description: '猫咪专属空间，多层猫爬架，安静舒适',
    price: 68,
    originalPrice: 88,
    size: '2㎡',
    features: ['猫咪专属', '多层猫爬架', '24h监控', '恒温空调', '每日梳毛'],
    image: 'https://picsum.photos/id/718/600/400',
    stock: 8
  },
  {
    id: 'room4',
    name: '豪华套房',
    description: '顶级配置，独立小院，专人照料',
    price: 198,
    originalPrice: 258,
    size: '10㎡',
    features: ['独立小院', '专人照料', '24h监控', '恒温空调', '每日遛弯4次', '专属玩具'],
    image: 'https://picsum.photos/id/1025/600/400',
    stock: 2
  },
  {
    id: 'room5',
    name: '经济迷你间',
    description: '经济实惠，干净整洁，适合小型宠物',
    price: 58,
    size: '2㎡',
    features: ['经济实惠', '干净整洁', '24h监控', '恒温空调', '每日遛弯1次'],
    image: 'https://picsum.photos/id/783/600/400',
    stock: 10
  }
];
