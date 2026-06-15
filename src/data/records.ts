import type { DailyRecord } from '@/types';

export const dailyRecords: DailyRecord[] = [
  {
    id: 'dr001',
    date: '2026-06-15',
    bookingId: 'bk001',
    petId: 'pet1',
    mood: 'happy',
    appetite: 'good',
    meals: [
      { time: '08:00', foodType: '狗粮', amount: '100g', note: '全部吃完' },
      { time: '12:30', foodType: '狗粮+鸡胸肉', amount: '120g', note: '很喜欢吃' },
      { time: '18:00', foodType: '狗粮', amount: '100g', note: '吃完了' }
    ],
    waterIntake: '约500ml',
    poopTimes: 2,
    poopStatus: '软硬适中',
    peeTimes: 4,
    walkTimes: 3,
    notes: '豆豆今天状态很好，早上和下午各遛了一次，和其他小伙伴玩得很开心。中午加餐了鸡胸肉，吃得很香。',
    photos: [
      'https://picsum.photos/id/237/400/300',
      'https://picsum.photos/id/659/400/300',
      'https://picsum.photos/id/1025/400/300'
    ],
    createTime: '2026-06-15 20:30',
    createdBy: '小李'
  },
  {
    id: 'dr002',
    date: '2026-06-16',
    bookingId: 'bk001',
    petId: 'pet1',
    mood: 'happy',
    appetite: 'good',
    meals: [
      { time: '07:30', foodType: '狗粮', amount: '100g', note: '全部吃完' },
      { time: '12:00', foodType: '狗粮', amount: '100g', note: '吃完了' },
      { time: '17:30', foodType: '狗粮+罐头', amount: '130g', note: '吃得很香' }
    ],
    waterIntake: '约450ml',
    poopTimes: 2,
    poopStatus: '正常',
    peeTimes: 5,
    walkTimes: 3,
    notes: '豆豆第二天已经完全适应了，早上在院子里跑了好久，精力很充沛。晚上给它加了半个罐头，吃得津津有味。',
    photos: [
      'https://picsum.photos/id/783/400/300',
      'https://picsum.photos/id/1062/400/300'
    ],
    createTime: '2026-06-16 21:00',
    createdBy: '小李'
  },
  {
    id: 'dr003',
    date: '2026-06-17',
    bookingId: 'bk001',
    petId: 'pet1',
    mood: 'normal',
    appetite: 'normal',
    meals: [
      { time: '08:00', foodType: '狗粮', amount: '100g', note: '吃了一半' },
      { time: '13:00', foodType: '狗粮+蛋黄', amount: '100g', note: '吃完了' },
      { time: '18:30', foodType: '狗粮', amount: '100g', note: '全部吃完' }
    ],
    waterIntake: '约400ml',
    poopTimes: 1,
    poopStatus: '偏软',
    peeTimes: 4,
    walkTimes: 2,
    notes: '今天豆豆胃口稍微差了一点，早上没吃完。可能是天气有点热，下午让它在空调房休息了很久。晚上恢复正常了。',
    photos: [
      'https://picsum.photos/id/1074/400/300'
    ],
    createTime: '2026-06-17 20:15',
    createdBy: '小李'
  }
];
