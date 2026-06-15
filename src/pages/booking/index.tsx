import React, { useState, useMemo } from 'react';
import { View, Text, Image, Button, ScrollView, Picker } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import RoomCard from '@/components/RoomCard';
import { pets } from '@/data/pets';
import { roomTypes } from '@/data/rooms';
import { bookings } from '@/data/bookings';
import type { Pet, RoomType } from '@/types';
import classNames from 'classnames';
import dayjs from 'dayjs';

const BookingPage: React.FC = () => {
  const [selectedPet, setSelectedPet] = useState<Pet>(pets[0]);
  const [selectedRoom, setSelectedRoom] = useState<RoomType>(roomTypes[0]);
  const [checkInDate, setCheckInDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [checkOutDate, setCheckOutDate] = useState(dayjs().add(3, 'day').format('YYYY-MM-DD'));

  const days = useMemo(() => {
    const start = dayjs(checkInDate);
    const end = dayjs(checkOutDate);
    const diff = end.diff(start, 'day');
    return diff > 0 ? diff : 1;
  }, [checkInDate, checkOutDate]);

  const totalPrice = useMemo(() => {
    return selectedRoom.price * days;
  }, [selectedRoom, days]);

  const currentBooking = bookings.find(b => b.status === 'inProgress');
  const currentInStorePet = pets.find(p => p.id === currentBooking?.petId) || pets[0];

  const handleSelectPet = (pet: Pet) => {
    setSelectedPet(pet);
  };

  const handleSelectRoom = (room: RoomType) => {
    setSelectedRoom(room);
  };

  const handleCheckInChange = (e: any) => {
    const value = e.detail.value;
    setCheckInDate(value);
    if (dayjs(value).isAfter(dayjs(checkOutDate))) {
      setCheckOutDate(dayjs(value).add(1, 'day').format('YYYY-MM-DD'));
    }
  };

  const handleCheckOutChange = (e: any) => {
    const value = e.detail.value;
    if (dayjs(value).isBefore(dayjs(checkInDate))) {
      Taro.showToast({
        title: '离店日期不能早于入住日期',
        icon: 'none'
      });
      return;
    }
    setCheckOutDate(value);
  };

  const handleSubmit = () => {
    Taro.showModal({
      title: '预约确认',
      content: `确认预约 ${selectedPet.name} 的 ${selectedRoom.name}，入住 ${checkInDate}，离店 ${checkOutDate}，共 ${days} 晚，预估费用 ¥${totalPrice}？`,
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({
            title: '预约成功',
            icon: 'success'
          });
        }
      }
    });
  };

  const handleViewCurrent = () => {
    Taro.switchTab({
      url: '/pages/updates/index'
    });
  };

  const formatDate = (dateStr: string) => {
    const date = dayjs(dateStr);
    return {
      date: date.format('MM/DD'),
      weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.day()]
    };
  };

  const checkIn = formatDate(checkInDate);
  const checkOut = formatDate(checkOutDate);

  return (
    <ScrollView className={styles.page} scrollY>
      <View className={styles.header}>
        <Text className={styles.greeting}>您好 👋</Text>
        <Text className={styles.subGreeting}>给毛孩子选个温馨的小窝吧</Text>

        <View className={styles.quickActions}>
          <Button className={styles.quickBtn} onClick={() => {}}>
            <Text className={styles.quickIcon}>📅</Text>
            <Text className={styles.quickText}>我的预约</Text>
          </Button>
          <Button className={styles.quickBtn} onClick={() => {}}>
            <Text className={styles.quickIcon}>🐾</Text>
            <Text className={styles.quickText}>宠物档案</Text>
          </Button>
        </View>
      </View>

      {currentBooking && (
        <View className={styles.section}>
          <View className={styles.currentBooking}>
            <View className={styles.bookingStatus}>
              <View className={styles.bookingPet}>
                <Image
                  className={styles.bookingPetAvatar}
                  src={currentInStorePet.avatar}
                  mode="aspectFill"
                />
                <View>
                  <Text className={styles.bookingPetName}>{currentBooking.petName}</Text>
                  <Text className={styles.bookingRoom}>{currentBooking.roomName}</Text>
                </View>
              </View>
              <Text className={styles.statusTag}>寄养中</Text>
            </View>
            <View className={styles.bookingDates}>
              <Text>入住 {currentBooking.checkInDate}</Text>
              <Text>离店 {currentBooking.checkOutDate}</Text>
            </View>
            <Button className={styles.bookingBtn} onClick={handleViewCurrent}>
              查看在店动态 →
            </Button>
          </View>
        </View>
      )}

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>
          <Text className={styles.sectionIcon}>🐱</Text>
          选择宠物
        </Text>
        <ScrollView className={styles.petSelector} scrollX>
          {pets.map(pet => (
            <View
              key={pet.id}
              className={classNames(styles.petItem, selectedPet.id === pet.id && styles.selected)}
              onClick={() => handleSelectPet(pet)}
            >
              <Image
                className={styles.petItemAvatar}
                src={pet.avatar}
                mode="aspectFill"
              />
              <Text className={styles.petItemName}>{pet.name}</Text>
              <Text className={styles.petItemBreed}>{pet.breed}</Text>
            </View>
          ))}
          <View className={styles.addPet}>
            <Text className={styles.addIcon}>+</Text>
            <Text className={styles.addText}>添加宠物</Text>
          </View>
        </ScrollView>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>
          <Text className={styles.sectionIcon}>📅</Text>
          寄养日期
          <Text style={{ fontSize: '22rpx', color: '#86909c', fontWeight: 'normal', marginLeft: '12rpx' }}>
            点击日期可修改
          </Text>
        </Text>
        <View className={styles.dateCard}>
          <View className={styles.dateRow}>
            <Picker
              mode="date"
              value={checkInDate}
              start={dayjs().format('YYYY-MM-DD')}
              onChange={handleCheckInChange}
            >
              <View className={styles.dateItem}>
                <Text className={styles.dateLabel}>入住日期</Text>
                <Text className={styles.dateValue}>{checkIn.date}</Text>
                <Text className={styles.dateSub}>{checkIn.weekday}</Text>
              </View>
            </Picker>
            <View className={styles.dateDivider}>
              <Text className={styles.dateArrow}>→</Text>
              <View>
                <Text className={styles.daysBadge}>共 {days} 晚</Text>
              </View>
            </View>
            <Picker
              mode="date"
              value={checkOutDate}
              start={dayjs(checkInDate).add(1, 'day').format('YYYY-MM-DD')}
              onChange={handleCheckOutChange}
            >
              <View className={styles.dateItem}>
                <Text className={styles.dateLabel}>离店日期</Text>
                <Text className={styles.dateValue}>{checkOut.date}</Text>
                <Text className={styles.dateSub}>{checkOut.weekday}</Text>
              </View>
            </Picker>
          </View>
        </View>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>
          <Text className={styles.sectionIcon}>🏠</Text>
          选择房型
        </Text>
        {roomTypes.map(room => (
          <RoomCard
            key={room.id}
            room={room}
            selected={selectedRoom.id === room.id}
            onSelect={handleSelectRoom}
          />
        ))}
      </View>

      <View className={styles.bottomBar}>
        <View className={styles.priceInfo}>
          <Text className={styles.priceLabel}>预估费用</Text>
          <Text className={styles.priceValue}>
            ¥{totalPrice}
            <Text className={styles.unit}> / {days}晚</Text>
          </Text>
        </View>
        <Button className={styles.submitBtn} onClick={handleSubmit}>
          立即预约
        </Button>
      </View>
    </ScrollView>
  );
};

export default BookingPage;
