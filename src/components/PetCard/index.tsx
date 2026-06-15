import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import styles from './index.module.scss';
import type { Pet } from '@/types';

interface PetCardProps {
  pet: Pet;
  selected?: boolean;
  onClick?: () => void;
}

const PetCard: React.FC<PetCardProps> = ({ pet, selected, onClick }) => {
  const genderText = pet.gender === 'male' ? '♂ 公' : '♀ 母';

  return (
    <View className={styles.petCard} onClick={onClick}>
      <Image className={styles.petAvatar} src={pet.avatar} mode="aspectFill" />
      <View className={styles.petInfo}>
        <Text className={styles.petName}>{pet.name}</Text>
        <Text className={styles.petDesc}>
          {pet.breed} · {pet.age} · {pet.weight}
        </Text>
        <View className={styles.petTags}>
          <Text className={styles.petTag}>{genderText}</Text>
          {pet.vaccineStatus && <Text className={styles.petTag}>已免疫</Text>}
          {pet.sterilized && <Text className={styles.petTag}>已绝育</Text>}
        </View>
      </View>
      {selected && <View className={styles.selectedBadge}>✓</View>}
    </View>
  );
};

export default PetCard;
