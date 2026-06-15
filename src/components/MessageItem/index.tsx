import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import styles from './index.module.scss';
import type { Message } from '@/types';
import classNames from 'classnames';

interface MessageItemProps {
  message: Message;
  onClick?: () => void;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, onClick }) => {
  const typeIconMap: Record<string, string> = {
    system: '🔔',
    service: '✅',
    alert: '⚠️',
    chat: '💬'
  };

  const typeClassMap: Record<string, string> = {
    system: styles.typeSystem,
    service: styles.typeService,
    alert: styles.typeAlert,
    chat: styles.typeChat
  };

  return (
    <View className={styles.messageItem} onClick={onClick}>
      <View className={styles.avatarWrap}>
        {message.type === 'chat' && message.avatar ? (
          <Image className={styles.avatar} src={message.avatar} mode="aspectFill" />
        ) : (
          <View className={classNames(styles.typeIcon, typeClassMap[message.type])}>
            <Text>{typeIconMap[message.type]}</Text>
          </View>
        )}
        {!message.read && <View className={styles.unreadDot} />}
      </View>
      <View className={styles.messageContent}>
        <View className={styles.messageHeader}>
          <Text className={styles.messageTitle}>{message.title}</Text>
          <Text className={styles.messageTime}>{message.time.split(' ')[1]}</Text>
        </View>
        <Text className={styles.messagePreview}>{message.content}</Text>
      </View>
    </View>
  );
};

export default MessageItem;
