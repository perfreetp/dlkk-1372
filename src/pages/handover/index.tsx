import React, { useState } from 'react';
import { View, Text, Image, Button, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { pets } from '@/data/pets';
import type { FeedingRecord, Medication, HandoverItem } from '@/types';
import classNames from 'classnames';

const HandoverPage: React.FC = () => {
  const currentPet = pets[0];

  const [feedingSchedule] = useState<FeedingRecord[]>([
    { time: '07:30', foodType: '狗粮（皇家）', amount: '100g', note: '温水泡软' },
    { time: '12:00', foodType: '狗粮+鸡胸肉', amount: '120g', note: '' },
    { time: '18:00', foodType: '狗粮', amount: '100g', note: '吃完再添水' }
  ]);

  const [dietaryRestrictions] = useState('不能吃葡萄、巧克力、洋葱；对海鲜过敏；不能吃太咸的食物');

  const [medications] = useState<Medication[]>([
    { name: '益生菌', dosage: '半包/次', time: '每日两次，饭后', note: '调理肠胃' }
  ]);

  const [walkRequirement] = useState({
    timesPerDay: 3,
    duration: '30分钟/次',
    specialNote: '出门前要戴牵引绳，遇到其他狗狗可能会兴奋，需要拉紧；喜欢捡东西吃，要注意'
  });

  const [specialNotes] = useState('豆豆比较黏人，刚到新环境可能会有点焦虑，多陪陪它就好。晚上睡觉喜欢叼着玩具睡。');

  const [petPhotos] = useState([
    'https://picsum.photos/id/237/300/300',
    'https://picsum.photos/id/659/300/300',
    'https://picsum.photos/id/783/300/300'
  ]);

  const [handoverItems, setHandoverItems] = useState<HandoverItem[]>([
    { id: '1', name: '狗粮（皇家）', category: '食品', quantity: 1, checked: true },
    { id: '2', name: '食盆', category: '用品', quantity: 1, checked: true },
    { id: '3', name: '水盆', category: '用品', quantity: 1, checked: true },
    { id: '4', name: '牵引绳', category: '用品', quantity: 1, checked: true },
    { id: '5', name: '狗狗衣服', category: '用品', quantity: 2, checked: false },
    { id: '6', name: '益生菌', category: '药品', quantity: 1, checked: true },
    { id: '7', name: '毛绒玩具', category: '用品', quantity: 3, checked: false },
    { id: '8', name: '毛巾', category: '用品', quantity: 2, checked: true }
  ]);

  const toggleItem = (id: string) => {
    setHandoverItems(items =>
      items.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const checkedCount = handoverItems.filter(item => item.checked).length;
  const totalCount = handoverItems.length;
  const progress = Math.round((checkedCount / totalCount) * 100);
  const allChecked = checkedCount === totalCount;

  const handleSubmit = () => {
    Taro.showModal({
      title: '提交交接单',
      content: '确认提交交接单？提交后店家将收到通知，到店时可核对。',
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({
            title: '提交成功',
            icon: 'success'
          });
        }
      }
    });
  };

  const handlePreview = () => {
    Taro.showToast({
      title: '预览功能开发中',
      icon: 'none'
    });
  };

  const groupedItems = handoverItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, HandoverItem[]>);

  return (
    <ScrollView className={styles.page} scrollY>
      <View className={styles.header}>
        <Text className={styles.title}>交接单</Text>
        <Text className={styles.subtitle}>详细记录毛孩子的生活习惯，让寄养更放心</Text>
      </View>

      <View className={styles.statusBar}>
        <View className={styles.statusLeft}>
          <View className={classNames(styles.statusDot, allChecked && styles.completed)} />
          <Text className={styles.statusText}>
            {currentPet.name} 的交接单
          </Text>
        </View>
        <Text className={styles.progressText}>
          清单完成 {progress}%
        </Text>
      </View>

      <View className={styles.section}>
        <View className={styles.card}>
          <View className={styles.cardHeader}>
            <Text className={styles.cardTitle}>
              <Text className={styles.cardIcon}>🍽️</Text>
              喂食时间表
            </Text>
            <Button className={styles.editBtn}>编辑</Button>
          </View>
          <View className={styles.feedingList}>
            {feedingSchedule.map((meal, index) => (
              <View key={index} className={styles.feedingItem}>
                <Text className={styles.feedingTime}>{meal.time}</Text>
                <View className={styles.feedingDetails}>
                  <Text className={styles.feedingFood}>{meal.foodType}</Text>
                  <Text className={styles.feedingAmount}>
                    {meal.amount}
                    {meal.note && ` · ${meal.note}`}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          <Button className={styles.addBtn}>+ 添加喂食时间</Button>
        </View>

        <View className={styles.card}>
          <View className={styles.cardHeader}>
            <Text className={styles.cardTitle}>
              <Text className={styles.cardIcon}>⚠️</Text>
              饮食禁忌
            </Text>
            <Button className={styles.editBtn}>编辑</Button>
          </View>
          <Text className={styles.formValue}>{dietaryRestrictions}</Text>
        </View>

        <View className={styles.card}>
          <View className={styles.cardHeader}>
            <Text className={styles.cardTitle}>
              <Text className={styles.cardIcon}>💊</Text>
              药物登记
            </Text>
            <Button className={styles.editBtn}>编辑</Button>
          </View>
          {medications.length > 0 ? (
            medications.map((med, index) => (
              <View key={index} className={styles.medicationItem}>
                <Text className={styles.medIcon}>💊</Text>
                <View className={styles.medInfo}>
                  <Text className={styles.medName}>{med.name}</Text>
                  <Text className={styles.medDetail}>
                    剂量：{med.dosage}
                    {'\n'}
                    时间：{med.time}
                    {med.note && `\n备注：${med.note}`}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text className={styles.emptyValue}>暂无药物</Text>
          )}
          <Button className={styles.addBtn}>+ 添加药物</Button>
        </View>

        <View className={styles.card}>
          <View className={styles.cardHeader}>
            <Text className={styles.cardTitle}>
              <Text className={styles.cardIcon}>🐕</Text>
              散步要求
            </Text>
            <Button className={styles.editBtn}>编辑</Button>
          </View>
          <View className={styles.walkInfo}>
            <View className={styles.walkStat}>
              <Text className={styles.walkValue}>{walkRequirement.timesPerDay}次</Text>
              <Text className={styles.walkLabel}>每日遛弯</Text>
            </View>
            <View className={styles.walkStat}>
              <Text className={styles.walkValue}>{walkRequirement.duration}</Text>
              <Text className={styles.walkLabel}>每次时长</Text>
            </View>
          </View>
          {walkRequirement.specialNote && (
            <View className={styles.formItem}>
              <Text className={styles.formLabel}>特殊说明</Text>
              <Text className={styles.formValue}>{walkRequirement.specialNote}</Text>
            </View>
          )}
        </View>

        <View className={styles.card}>
          <View className={styles.cardHeader}>
            <Text className={styles.cardTitle}>
              <Text className={styles.cardIcon}>📷</Text>
              宠物近期照片
            </Text>
            <Button className={styles.editBtn}>编辑</Button>
          </View>
          <View className={styles.photoGrid}>
            {petPhotos.map((photo, index) => (
              <View key={index} className={styles.photoItem}>
                <Image className={styles.photoImg} src={photo} mode="aspectFill" />
              </View>
            ))}
            <View className={styles.addPhoto}>
              <Text className={styles.addPhotoIcon}>+</Text>
              <Text>添加照片</Text>
            </View>
          </View>
        </View>

        <View className={styles.card}>
          <View className={styles.cardHeader}>
            <Text className={styles.cardTitle}>
              <Text className={styles.cardIcon}>📋</Text>
              交接物品清单
            </Text>
            <Text className={styles.progressText}>
              {checkedCount}/{totalCount}
            </Text>
          </View>
          {Object.entries(groupedItems).map(([category, items]) => (
            <View key={category}>
              <Text className={styles.checklistCategory}>{category}</Text>
              {items.map(item => (
                <View key={item.id} className={styles.checklistItem} onClick={() => toggleItem(item.id)}>
                  <View className={classNames(styles.checkbox, item.checked && styles.checked)}>
                    {item.checked && <Text>✓</Text>}
                  </View>
                  <Text className={styles.itemName}>{item.name}</Text>
                  <Text className={styles.itemQty}>×{item.quantity}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        <View className={styles.card}>
          <View className={styles.cardHeader}>
            <Text className={styles.cardTitle}>
              <Text className={styles.cardIcon}>📝</Text>
              其他注意事项
            </Text>
            <Button className={styles.editBtn}>编辑</Button>
          </View>
          <Text className={styles.formValue}>{specialNotes}</Text>
        </View>
      </View>

      <View className={styles.bottomBar}>
        <Button className={styles.secondaryBtn} onClick={handlePreview}>
          预览
        </Button>
        <Button className={styles.primaryBtn} onClick={handleSubmit}>
          提交交接单
        </Button>
      </View>
    </ScrollView>
  );
};

export default HandoverPage;
