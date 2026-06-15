import React from 'react';
import { View, Text, Image, Button } from '@tarojs/components';
import styles from './index.module.scss';
import type { RoomType } from '@/types';

interface RoomCardProps {
  room: RoomType;
  selected?: boolean;
  onSelect?: (room: RoomType) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, selected, onSelect }) => {
  const handleSelect = () => {
    onSelect?.(room);
  };

  return (
    <View className={styles.roomCard} onClick={handleSelect}>
      <Image className={styles.roomImage} src={room.image} mode="aspectFill" />
      <View className={styles.roomContent}>
        <View className={styles.roomHeader}>
          <Text className={styles.roomName}>{room.name}</Text>
          <View className={styles.roomPrice}>
            <Text className={styles.priceValue}>¥{room.price}</Text>
            <Text className={styles.priceUnit}>/晚</Text>
            {room.originalPrice && (
              <Text className={styles.originalPrice}>¥{room.originalPrice}</Text>
            )}
          </View>
        </View>
        <Text className={styles.roomDesc}>{room.description}</Text>
        <Text className={styles.roomSize}>房间面积：{room.size}</Text>
        <View className={styles.features}>
          {room.features.map((feature, index) => (
            <Text key={index} className={styles.featureTag}>
              {feature}
            </Text>
          ))}
        </View>
        <View className={styles.roomFooter}>
          <Text className={styles.stockInfo}>
            剩余 <Text className={styles.stockNum}>{room.stock}</Text> 间
          </Text>
          <Button className={styles.selectBtn} onClick={handleSelect}>
            {selected ? '已选择' : '选择房型'}
          </Button>
        </View>
      </View>
    </View>
  );
};

export default RoomCard;
