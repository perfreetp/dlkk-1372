import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import styles from './index.module.scss';
import type { DailyRecord } from '@/types';

interface DailyRecordCardProps {
  record: DailyRecord;
}

const DailyRecordCard: React.FC<DailyRecordCardProps> = ({ record }) => {
  const moodEmoji = {
    happy: '😊',
    normal: '😐',
    sad: '😢',
    anxious: '😰'
  };

  const appetiteEmoji = {
    good: '🍖',
    normal: '🍽️',
    poor: '🥣'
  };

  return (
    <View className={styles.recordCard}>
      <View className={styles.recordHeader}>
        <View>
          <Text className={styles.recordDate}>{record.date}</Text>
          <Text className={styles.recordTime}> · 更新于 {record.createTime.split(' ')[1]}</Text>
        </View>
        <View className={styles.recordStatus}>
          <View className={styles.statusItem}>
            <Text className={styles.statusIcon}>{moodEmoji[record.mood]}</Text>
          </View>
          <View className={styles.statusItem}>
            <Text className={styles.statusIcon}>{appetiteEmoji[record.appetite]}</Text>
          </View>
        </View>
      </View>

      <View className={styles.recordBody}>
        <View className={styles.recordSection}>
          <Text className={styles.sectionTitle}>
            <Text className={styles.sectionIcon}>🍴</Text>
            饮食记录
          </Text>
          {record.meals.map((meal, index) => (
            <View key={index} className={styles.mealItem}>
              <Text className={styles.mealTime}>{meal.time}</Text>
              <View className={styles.mealInfo}>
                <Text className={styles.mealFood}>{meal.foodType}</Text>
                {meal.note && <Text className={styles.mealNote}>{meal.note}</Text>}
              </View>
              <Text className={styles.mealAmount}>{meal.amount}</Text>
            </View>
          ))}
        </View>

        <View className={styles.recordSection}>
          <Text className={styles.sectionTitle}>
            <Text className={styles.sectionIcon}>📊</Text>
            今日数据
          </Text>
          <View className={styles.statsGrid}>
            <View className={styles.statItem}>
              <Text className={styles.statValue}>{record.walkTimes}</Text>
              <Text className={styles.statLabel}>遛弯次数</Text>
            </View>
            <View className={styles.statItem}>
              <Text className={styles.statValue}>{record.poopTimes}</Text>
              <Text className={styles.statLabel}>排便次数</Text>
            </View>
            <View className={styles.statItem}>
              <Text className={styles.statValue}>{record.peeTimes}</Text>
              <Text className={styles.statLabel}>排尿次数</Text>
            </View>
          </View>
        </View>

        {record.photos.length > 0 && (
          <View className={styles.recordSection}>
            <Text className={styles.sectionTitle}>
              <Text className={styles.sectionIcon}>📷</Text>
              今日照片
            </Text>
            <View className={styles.photos}>
              {record.photos.map((photo, index) => (
                <Image
                  key={index}
                  className={styles.photo}
                  src={photo}
                  mode="aspectFill"
                />
              ))}
            </View>
          </View>
        )}

        {record.notes && (
          <View className={styles.recordSection}>
            <Text className={styles.sectionTitle}>
              <Text className={styles.sectionIcon}>📝</Text>
              店员备注
            </Text>
            <Text className={styles.recordNotes}>{record.notes}</Text>
          </View>
        )}
      </View>

      <View className={styles.recordFooter}>
        <Text className={styles.staffInfo}>
          🧑💼 记录员：{record.createdBy}
        </Text>
      </View>
    </View>
  );
};

export default DailyRecordCard;
