import React, { useState } from 'react';
import { View, Text, Image, Button, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import DailyRecordCard from '@/components/DailyRecordCard';
import { dailyRecords } from '@/data/records';
import { pets } from '@/data/pets';
import { bookings } from '@/data/bookings';
import classNames from 'classnames';

const UpdatesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'records' | 'photos'>('records');
  const currentPet = pets[0];
  const currentBooking = bookings.find(b => b.status === 'inProgress');
  const records = dailyRecords.filter(r => r.bookingId === currentBooking?.id);

  const todayRecord = records[0];
  const historyRecords = records.slice(1);

  const moodTextMap: Record<string, string> = {
    happy: '今天心情很好😊',
    normal: '今天状态稳定😐',
    sad: '今天有点不开心😢',
    anxious: '今天稍微有些焦虑😰'
  };

  const appetiteTextMap: Record<string, string> = {
    good: '胃口很好',
    normal: '食欲正常',
    poor: '胃口稍差'
  };

  const handleAddService = (service: string) => {
    Taro.showModal({
      title: `追加${service}`,
      content: `确认追加${service}服务？店员会尽快安排。`,
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({
            title: '已提交申请',
            icon: 'success'
          });
        }
      }
    });
  };

  const handleContact = () => {
    Taro.showActionSheet({
      itemList: ['电话联系', '在线聊天', '紧急联系'],
      success: (res) => {
        const actions = ['电话联系中...', '正在打开聊天...', '正在拨打紧急电话...'];
        Taro.showToast({
          title: actions[res.tapIndex],
          icon: 'none'
        });
      }
    });
  };

  return (
    <ScrollView className={styles.page} scrollY>
      <View className={styles.header}>
        <View className={styles.petInfo}>
          <Image
            className={styles.petAvatar}
            src={currentPet.avatar}
            mode="aspectFill"
          />
          <View className={styles.petDetail}>
            <Text className={styles.petName}>{currentPet.name}</Text>
            <Text className={styles.bookingInfo}>
              {currentBooking?.roomName} · 入住第 {records.length} 天
            </Text>
          </View>
          <View className={styles.daysBadge}>寄养中</View>
        </View>
      </View>

      <View className={styles.tabs}>
        <View
          className={classNames(styles.tabItem, activeTab === 'records' && styles.active)}
          onClick={() => setActiveTab('records')}
        >
          每日记录
        </View>
        <View
          className={classNames(styles.tabItem, activeTab === 'photos' && styles.active)}
          onClick={() => setActiveTab('photos')}
        >
          照片视频
        </View>
      </View>

      <View className={styles.content}>
        {activeTab === 'records' ? (
          <View>
            {todayRecord ? (
              <View>
                <View className={styles.sectionTitle}>
                  <Text>📋 今日日报 · {todayRecord.date}</Text>
                  <Text style={{ fontSize: '22rpx', color: '#86909c', fontWeight: 'normal' }}>
                    更新于 {todayRecord.createTime.split(' ')[1]}
                  </Text>
                </View>

                <View className={styles.todaySummary}>
                  <View className={styles.moodRow}>
                    <Text className={styles.moodEmoji}>
                      {todayRecord.mood === 'happy' ? '😊' : todayRecord.mood === 'normal' ? '😐' : todayRecord.mood === 'sad' ? '😢' : '😰'}
                    </Text>
                    <Text className={styles.moodText}>
                      {moodTextMap[todayRecord.mood]} · {appetiteTextMap[todayRecord.appetite]} · 饮水{todayRecord.waterIntake}
                    </Text>
                  </View>

                  <View className={styles.summaryGrid}>
                    <View className={styles.summaryItem}>
                      <Text className={styles.summaryIcon}>🍖</Text>
                      <Text className={styles.summaryValue}>{todayRecord.meals.length}餐</Text>
                      <Text className={styles.summaryLabel}>已喂食</Text>
                    </View>
                    <View className={styles.summaryItem}>
                      <Text className={styles.summaryIcon}>💩</Text>
                      <Text className={styles.summaryValue}>{todayRecord.poopTimes}次</Text>
                      <Text className={styles.summaryLabel}>排便</Text>
                    </View>
                    <View className={styles.summaryItem}>
                      <Text className={styles.summaryIcon}>�</Text>
                      <Text className={styles.summaryValue}>{todayRecord.peeTimes}次</Text>
                      <Text className={styles.summaryLabel}>排尿</Text>
                    </View>
                    <View className={styles.summaryItem}>
                      <Text className={styles.summaryIcon}>�🚶</Text>
                      <Text className={styles.summaryValue}>{todayRecord.walkTimes}次</Text>
                      <Text className={styles.summaryLabel}>遛弯</Text>
                    </View>
                  </View>

                  <View className={styles.todaySection}>
                    <Text className={styles.todaySectionTitle}>
                      <Text className={styles.todaySectionIcon}>🍽️</Text>
                      饮食记录
                    </Text>
                    <View className={styles.mealList}>
                      {todayRecord.meals.map((meal, index) => (
                        <View key={index} className={styles.mealItem}>
                          <Text className={styles.mealTime}>{meal.time}</Text>
                          <View className={styles.mealContent}>
                            <Text className={styles.mealFood}>{meal.foodType}</Text>
                            {meal.note && <Text className={styles.mealNote}>{meal.note}</Text>}
                          </View>
                          <Text className={styles.mealAmount}>{meal.amount}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  <View className={styles.todaySection}>
                    <Text className={styles.todaySectionTitle}>
                      <Text className={styles.todaySectionIcon}>💩</Text>
                      排泄情况
                    </Text>
                    <View className={styles.poopInfo}>
                      <View className={styles.poopItem}>
                        <Text className={styles.poopValue}>{todayRecord.poopTimes} 次</Text>
                        <Text className={styles.poopLabel}>排便</Text>
                      </View>
                      <View className={styles.poopItem}>
                        <Text className={styles.poopValue}>{todayRecord.peeTimes} 次</Text>
                        <Text className={styles.poopLabel}>排尿</Text>
                      </View>
                      <View className={styles.poopItem}>
                        <Text className={styles.poopValue}>{todayRecord.poopStatus}</Text>
                        <Text className={styles.poopLabel}>便便状态</Text>
                      </View>
                    </View>
                  </View>

                  {todayRecord.photos.length > 0 && (
                    <View className={styles.todaySection}>
                      <Text className={styles.todaySectionTitle}>
                        <Text className={styles.todaySectionIcon}>📷</Text>
                        今日照片
                      </Text>
                      <View className={styles.photoPreview}>
                        {todayRecord.photos.slice(0, 3).map((photo, index) => (
                          <Image
                            key={index}
                            className={styles.photoPreviewItem}
                            src={photo}
                            mode="aspectFill"
                          />
                        ))}
                        {todayRecord.photos.length > 3 && (
                          <View className={styles.photoMore}>
                            +{todayRecord.photos.length - 3} 张
                          </View>
                        )}
                      </View>
                    </View>
                  )}

                  {todayRecord.notes && (
                    <View className={styles.todaySection}>
                      <Text className={styles.todaySectionTitle}>
                        <Text className={styles.todaySectionIcon}>📝</Text>
                        店员备注
                      </Text>
                      <Text className={styles.todayNotes}>{todayRecord.notes}</Text>
                    </View>
                  )}
                </View>
              </View>
            ) : (
              <View className={styles.emptyState}>
                <Text className={styles.emptyIcon}>📋</Text>
                <Text className={styles.emptyText}>暂无今日记录</Text>
              </View>
            )}

            {historyRecords.length > 0 && (
              <View>
                <View className={styles.sectionTitle}>
                  <Text>📜 历史记录</Text>
                  <Text style={{ fontSize: '24rpx', color: '#86909c', fontWeight: 'normal' }}>
                    共 {historyRecords.length} 条
                  </Text>
                </View>

                {historyRecords.map(record => (
                  <DailyRecordCard key={record.id} record={record} />
                ))}
              </View>
            )}
          </View>
        ) : (
          <View>
            <View className={styles.photoSection}>
              <Text className={styles.photoTitle}>全部照片</Text>
              <ScrollView className={styles.photoScroll} scrollX enableFlex>
                {records.map(record =>
                  record.photos.map((photo, index) => (
                    <View key={`${record.id}-${index}`} className={styles.photoCard}>
                      <Image
                        className={styles.photoImg}
                        src={photo}
                        mode="aspectFill"
                      />
                      <View className={styles.photoDesc}>
                        <Text className={styles.photoDate}>{record.date}</Text>
                        <Text className={styles.photoNote}>{record.notes}</Text>
                      </View>
                    </View>
                  ))
                )}
              </ScrollView>
            </View>
          </View>
        )}
      </View>

      <View className={styles.serviceBar}>
        <Button
          className={styles.serviceBtn}
          onClick={() => handleAddService('洗护')}
        >
          <Text className={styles.serviceIcon}>🛁</Text>
          <Text className={styles.serviceText}>追加洗护</Text>
        </Button>
        <Button
          className={styles.serviceBtn}
          onClick={() => handleAddService('遛弯')}
        >
          <Text className={styles.serviceIcon}>🐕</Text>
          <Text className={styles.serviceText}>追加遛弯</Text>
        </Button>
        <Button className={styles.contactBtn} onClick={handleContact}>
          联系店员
        </Button>
      </View>
    </ScrollView>
  );
};

export default UpdatesPage;
