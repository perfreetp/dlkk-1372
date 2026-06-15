import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

interface SectionHeaderProps {
  title: string;
  icon?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, icon, subtitle, action }) => {
  return (
    <View className={styles.sectionHeader}>
      <View className={styles.titleRow}>
        {icon && <Text className={styles.titleIcon}>{icon}</Text>}
        <Text className={styles.title}>{title}</Text>
        {subtitle && <Text className={styles.subtitle}>{subtitle}</Text>}
      </View>
      {action && <View className={styles.action}>{action}</View>}
    </View>
  );
};

export default SectionHeader;
