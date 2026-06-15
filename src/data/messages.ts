import type { Message } from '@/types';

export const messages: Message[] = [
  {
    id: 'msg001',
    type: 'service',
    title: '豆豆已安全入住',
    content: '您的宠物豆豆已于今天上午10:30成功入住豪华大床房，状态良好，请放心。',
    time: '2026-06-15 10:35',
    read: true,
    bookingId: 'bk001'
  },
  {
    id: 'msg002',
    type: 'alert',
    title: '⚠️ 饮食异常提醒',
    content: '豆豆今天早上食欲稍差，只吃了一半的量。已安排店员关注，如有其他情况会及时联系您。',
    time: '2026-06-17 09:20',
    read: false,
    bookingId: 'bk001'
  },
  {
    id: 'msg003',
    type: 'system',
    title: '新日报已更新',
    content: '豆豆的6月16日日报已更新，点击查看今日的饮食、排便和活动情况。',
    time: '2026-06-16 21:05',
    read: true,
    bookingId: 'bk001'
  },
  {
    id: 'msg004',
    type: 'system',
    title: '预约确认通知',
    content: '您的预约（咪咪 6月20日-6月25日）已确认，期待为您服务！',
    time: '2026-06-12 10:00',
    read: true,
    bookingId: 'bk002'
  },
  {
    id: 'msg005',
    type: 'service',
    title: '洗护服务已完成',
    content: '旺财的洗护服务已完成，毛发清洁柔顺，指甲已修剪，状态良好。',
    time: '2026-06-03 15:30',
    read: true,
    bookingId: 'bk003'
  },
  {
    id: 'msg006',
    type: 'chat',
    title: '店员小李',
    content: '您好，豆豆今天状态很好，和小伙伴玩得很开心哦～',
    time: '2026-06-15 14:20',
    read: true,
    avatar: 'https://picsum.photos/id/64/100/100',
    bookingId: 'bk001'
  }
];
