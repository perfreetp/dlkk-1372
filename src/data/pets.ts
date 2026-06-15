import type { Pet } from '@/types';

export const pets: Pet[] = [
  {
    id: 'pet1',
    name: '豆豆',
    type: 'dog',
    breed: '柯基',
    age: '2岁',
    gender: 'male',
    weight: '12kg',
    avatar: 'https://picsum.photos/id/237/200/200',
    vaccineStatus: true,
    sterilized: true
  },
  {
    id: 'pet2',
    name: '咪咪',
    type: 'cat',
    breed: '英短蓝猫',
    age: '3岁',
    gender: 'female',
    weight: '4.5kg',
    avatar: 'https://picsum.photos/id/718/200/200',
    vaccineStatus: true,
    sterilized: false
  },
  {
    id: 'pet3',
    name: '旺财',
    type: 'dog',
    breed: '金毛',
    age: '5岁',
    gender: 'male',
    weight: '30kg',
    avatar: 'https://picsum.photos/id/659/200/200',
    vaccineStatus: true,
    sterilized: true
  }
];
