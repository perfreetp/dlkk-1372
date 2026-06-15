import React, { useState } from 'react';
import { View, Text, Image, Button, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { pets } from '@/data/pets';
import { bookings } from '@/data/bookings';
import type { Booking } from '@/types';
import classNames from 'classnames';

type OrderTabType = 'all' | 'inProgress' | 'upcoming' | 'completed';

const MinePage: React.FC = () => {
  const [orderTab, setOrderTab] = useState<OrderTabType>('all');

  const userInfo = {
    name: '张小明',
    avatar: 'https://picsum.photos/id/64/200/200',
    memberLevel: '黄金会员',
    points: 2580
  };

  const orderTabs: { key: OrderTabType; label: string }[] = [
    { key: 'all', label: '全部' },
    { key: 'inProgress', label: '寄养中' },
    { key: 'upcoming', label: '待入住' },
    { key: 'completed', label: '已完成' }
  ];

  const filteredBookings = (() => {
    switch (orderTab) {
      case 'inProgress':
        return bookings.filter(b => b.status === 'inProgress');
      case 'upcoming':
        return bookings.filter(b => b.status === 'pending' || b.status === 'confirmed');
      case 'completed':
        return bookings.filter(b => b.status === 'completed');
      default:
        return bookings;
    }
  })();

  const menuItems = [
    { icon: '💰', label: '费用明细', badge: null, onClick: () => Taro.navigateTo({ url: '/pages/expense/index' }) },
    { icon: '📋', label: '交接单模板', badge: null, onClick: () => {} },
    { icon: '📍', label: '门店地址', badge: null, onClick: () => {} },
    { icon: '🔔', label: '消息通知', badge: null, onClick: () => {} },
    { icon: '❓', label: '帮助中心', badge: null, onClick: () => {} },
    { icon: '⚙️', label: '设置', badge: null, onClick: () => {} }
  ];

  const stats = [
    { value: '12', label: '寄养次数' },
    { value: '3', label: '在养宠物' },
    { value: '4.9', label: '好评评分' }
  ];

  const statusTextMap: Record<string, string> = {
    pending: '待确认',
    confirmed: '已确认',
    inProgress: '寄养中',
    completed: '已完成',
    cancelled: '已取消'
  };

  const handleViewPet = () => {
    Taro.showToast({
      title: '查看宠物档案',
      icon: 'none'
    });
  };

  const handleAddPet = () => {
    Taro.showToast({
      title: '添加宠物',
      icon: 'none'
    });
  };

  const handleOrderAction = (action: string, order: Booking) => {
    Taro.showModal({
      title: action,
      content: `确定要${action}吗？`,
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({
            title: `${action}成功`,
            icon: 'success'
          });
        }
      }
    });
  };

  return (
    <ScrollView className={styles.page} scrollY>
      <View className={styles.header}>
        <View className={styles.userInfo}>
          <Image
            className={styles.avatar}
            src={userInfo.avatar}
            mode="aspectFill"
          />
          <View className={styles.userDetail}>
            <Text className={styles.userName}>{userInfo.name}</Text>
            <View>
              <Text className={styles.memberLevel}>
                👑 {userInfo.memberLevel}
              </Text>
            </View>
            <Text className={styles.points}>
              积分 <Text className={styles.pointsNum}>{userInfo.points}</Text>
            </Text>
          </View>
        </View>
      </View>

      <View className={styles.statsRow}>
        {stats.map((stat, index) => (
          <View key={index} className={styles.statItem}>
            <Text className={styles.statValue}>{stat.value}</Text>
            <Text className={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View className={styles.section}>
        <View className={styles.sectionTitle}>
          <Text>我的宠物</Text>
          <Text className={styles.sectionMore}>管理 →</Text>
        </View>
        <ScrollView className={styles.petList} scrollX>
          {pets.map(pet => (
            <View key={pet.id} className={styles.petCard} onClick={handleViewPet}>
              <Image
                className={styles.petAvatar}
                src={pet.avatar}
                mode="aspectFill"
              />
              <Text className={styles.petName}>{pet.name}</Text>
              <Text className={styles.petBreed}>{pet.breed}</Text>
            </View>
          ))}
          <View className={styles.addPet} onClick={handleAddPet}>
            <Text className={styles.addIcon}>+</Text>
            <Text className={styles.addText}>添加宠物</Text>
          </View>
        </ScrollView>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionTitle}>
          <Text>我的订单</Text>
          <Text className={styles.sectionMore}>全部订单 →</Text>
        </View>

        <View className={styles.orderTabs}>
          {orderTabs.map(tab => (
            <View
              key={tab.key}
              className={classNames(
                styles.orderTab,
                orderTab === tab.key && styles.active
              )}
              onClick={() => setOrderTab(tab.key)}
            >
              {tab.label}
            </View>
          ))}
        </View>

        {filteredBookings.map(booking => {
          const pet = pets.find(p => p.id === booking.petId);
          return (
            <View key={booking.id} className={styles.orderCard}>
              <View className={styles.orderHeader}>
                <View className={styles.orderPet}>
                  <Image
                    className={styles.orderPetAvatar}
                    src={pet?.avatar}
                    mode="aspectFill"
                  />
                  <View>
                    <Text className={styles.orderPetName}>{booking.petName}</Text>
                    <Text className={styles.orderRoom}>{booking.roomName}</Text>
                  </View>
                </View>
                <Text className={classNames(styles.orderStatus, styles[booking.status])}>
                  {statusTextMap[booking.status]}
                </Text>
              </View>
              <View className={styles.orderInfo}>
                <View>
                  <Text className={styles.orderDates}>
                    {booking.checkInDate} → {booking.checkOutDate}
                  </Text>
                  <Text className={styles.orderDays}>共 {booking.days} 晚</Text>
                </View>
                <View className={styles.orderPrice}>
                  <Text className={styles.priceValue}>¥{booking.totalPrice}</Text>
                  <Text className={styles.priceLabel}>预估费用</Text>
                </View>
              </View>
              {(booking.status === 'inProgress' || booking.status === 'confirmed') && (
                <View className={styles.orderActions}>
                  <Button
                    className={styles.actionBtn}
                    onClick={() => handleOrderAction('查看动态', booking)}
                  >
                    查看动态
                  </Button>
                  <Button
                    className={classNames(styles.actionBtn, styles.primary)}
                    onClick={() => handleOrderAction('联系店员', booking)}
                  >
                    联系店员
                  </Button>
                </View>
              )}
            </View>
          );
        })}
      </View>

      <View className={styles.section}>
        <View className={styles.sectionTitle}>
          <Text>更多服务</Text>
        </View>
        <View className={styles.menuCard}>
          {menuItems.map((item, index) => (
            <View key={index} className={styles.menuItem} onClick={item.onClick}>
              <View className={styles.menuIcon}>{item.icon}</View>
              <Text className={styles.menuText}>{item.label}</Text>
              {item.badge && <View className={styles.menuBadge}>{item.badge}</View>}
              <Text className={styles.menuArrow}>›</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default MinePage;
