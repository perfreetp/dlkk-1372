import type { AddOnService, ExpenseItem } from '@/types';

export const addOnServices: AddOnService[] = [
  {
    id: 'srv001',
    name: '基础洗护',
    description: '洗澡、吹干、梳毛、修剪指甲',
    price: 88,
    duration: '约1小时',
    icon: '🛁',
    category: 'grooming'
  },
  {
    id: 'srv002',
    name: '精致洗护',
    description: '深层清洁、护毛、造型修剪',
    price: 168,
    duration: '约2小时',
    icon: '✨',
    category: 'grooming'
  },
  {
    id: 'srv003',
    name: '额外遛弯',
    description: '增加一次30分钟户外遛弯',
    price: 30,
    duration: '30分钟',
    icon: '🐕',
    category: 'walking'
  },
  {
    id: 'srv004',
    name: '长时遛弯',
    description: '60分钟户外遛弯+互动玩耍',
    price: 50,
    duration: '60分钟',
    icon: '🏃',
    category: 'walking'
  },
  {
    id: 'srv005',
    name: '基础训练',
    description: '服从训练、定点排便训练',
    price: 120,
    duration: '45分钟',
    icon: '🎓',
    category: 'training'
  },
  {
    id: 'srv006',
    name: '健康检查',
    description: '体温、体重、皮肤、耳朵检查',
    price: 60,
    icon: '🩺',
    category: 'medical'
  },
  {
    id: 'srv007',
    name: '驱虫服务',
    description: '体内外驱虫（滴剂）',
    price: 80,
    icon: '💊',
    category: 'medical'
  },
  {
    id: 'srv008',
    name: '鲜食加餐',
    description: '鸡胸肉/牛肉鲜食一份',
    price: 25,
    icon: '🍖',
    category: 'other'
  }
];

export const expenseItems: ExpenseItem[] = [
  {
    id: 'exp001',
    name: '豪华大床房',
    type: 'room',
    price: 128,
    quantity: 3,
    unit: '晚',
    date: '2026-06-15'
  },
  {
    id: 'exp002',
    name: '基础洗护',
    type: 'service',
    price: 88,
    quantity: 1,
    unit: '次',
    date: '2026-06-16'
  },
  {
    id: 'exp003',
    name: '额外遛弯',
    type: 'extra',
    price: 30,
    quantity: 2,
    unit: '次',
    date: '2026-06-15'
  },
  {
    id: 'exp004',
    name: '鲜食加餐',
    type: 'extra',
    price: 25,
    quantity: 3,
    unit: '份',
    date: '2026-06-16'
  }
];
