import React, { useState, useMemo } from 'react';
import { View, Text, Button, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import MessageItem from '@/components/MessageItem';
import { messages } from '@/data/messages';
import type { Message } from '@/types';
import classNames from 'classnames';

type CategoryType = 'all' | 'system' | 'service' | 'alert' | 'chat';

const MessagesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [messageList, setMessageList] = useState<Message[]>(messages);

  const categories: { key: CategoryType; label: string }[] = [
    { key: 'all', label: '全部' },
    { key: 'system', label: '系统通知' },
    { key: 'service', label: '服务消息' },
    { key: 'alert', label: '异常提醒' },
    { key: 'chat', label: '店员消息' }
  ];

  const filteredMessages = useMemo(() => {
    if (activeCategory === 'all') {
      return messageList;
    }
    return messageList.filter(msg => msg.type === activeCategory);
  }, [messageList, activeCategory]);

  const unreadCounts = useMemo(() => {
    const counts: Record<string, number> = { all: 0 };
    messageList.forEach(msg => {
      if (!msg.read) {
        counts.all++;
        counts[msg.type] = (counts[msg.type] || 0) + 1;
      }
    });
    return counts;
  }, [messageList]);

  const alertMessages = messageList.filter(msg => msg.type === 'alert' && !msg.read);

  const handleCategoryChange = (category: CategoryType) => {
    setActiveCategory(category);
  };

  const handleMessageClick = (message: Message) => {
    setMessageList(list =>
      list.map(msg =>
        msg.id === message.id ? { ...msg, read: true } : msg
      )
    );

    const typeTextMap: Record<string, string> = {
      system: '系统通知',
      service: '服务消息',
      alert: '异常提醒',
      chat: '店员消息'
    };

    let confirmText = '我知道了';
    let showCancel = false;
    let cancelText = '';

    if (message.type === 'alert') {
      confirmText = '立即联系';
      showCancel = true;
      cancelText = '稍后处理';
    } else if (message.type === 'chat') {
      confirmText = '回复';
      showCancel = true;
      cancelText = '关闭';
    }

    Taro.showModal({
      title: `【${typeTextMap[message.type]}】${message.title}`,
      content: `${message.content}\n\n发送时间：${message.time}`,
      confirmText,
      showCancel,
      cancelText,
      success: (res) => {
        if (res.confirm) {
          if (message.type === 'alert') {
            handleEmergencyContact();
          } else if (message.type === 'chat') {
            Taro.showToast({
              title: '打开聊天窗口...',
              icon: 'none'
            });
          }
        }
      }
    });
  };

  const handleMarkAllRead = () => {
    setMessageList(list =>
      list.map(msg => ({ ...msg, read: true }))
    );
    Taro.showToast({
      title: '已全部标为已读',
      icon: 'success'
    });
  };

  const handleEmergencyContact = () => {
    Taro.showActionSheet({
      itemList: ['拨打紧急电话', '在线联系店员', '查看异常消息详情'],
      success: (res) => {
        if (res.tapIndex === 0) {
          Taro.showToast({
            title: '正在拨打紧急电话...',
            icon: 'none'
          });
        } else if (res.tapIndex === 1) {
          Taro.showToast({
            title: '正在连接店员...',
            icon: 'none'
          });
        } else if (res.tapIndex === 2 && alertMessages.length > 0) {
          handleMessageClick(alertMessages[0]);
        }
      }
    });
  };

  const handleAlertCardClick = () => {
    if (alertMessages.length > 0) {
      handleMessageClick(alertMessages[0]);
    }
  };

  const handleQuickChat = () => {
    Taro.showToast({
      title: '打开聊天窗口',
      icon: 'none'
    });
  };

  return (
    <ScrollView className={styles.page} scrollY>
      <View className={styles.header}>
        <View className={styles.titleRow}>
          <Text className={styles.title}>消息中心</Text>
          <Button className={styles.markRead} onClick={handleMarkAllRead}>
            全部已读
          </Button>
        </View>
        <Text className={styles.unreadCount}>
          您有 <Text className={styles.unreadNum}>{unreadCounts.all}</Text> 条未读消息
        </Text>
      </View>

      {alertMessages.length > 0 && (
        <View className={styles.alertCard} onClick={handleAlertCardClick}>
          <Text className={styles.alertTitle}>
            ⚠️ 异常提醒 · 点击查看详情
          </Text>
          <Text className={styles.alertContent}>
            {alertMessages[0].content}
          </Text>
          <View style={{ display: 'flex', gap: '16rpx' }}>
            <Button
              className={styles.alertBtn}
              onClick={(e) => {
                e.stopPropagation && e.stopPropagation();
                handleEmergencyContact();
              }}
            >
              立即联系店员
            </Button>
            <Button
              className={styles.alertViewBtn}
              onClick={(e) => {
                e.stopPropagation && e.stopPropagation();
                handleAlertCardClick();
              }}
            >
              查看详情
            </Button>
          </View>
        </View>
      )}

      <View className={styles.quickActions}>
        <View className={styles.quickAction} onClick={handleQuickChat}>
          <Text className={styles.quickActionIcon}>💬</Text>
          <Text className={styles.quickActionText}>在线咨询</Text>
          <Text className={styles.quickActionDesc}>店员在线解答</Text>
        </View>
        <View className={styles.quickAction} onClick={handleEmergencyContact}>
          <Text className={styles.quickActionIcon}>📞</Text>
          <Text className={styles.quickActionText}>电话联系</Text>
          <Text className={styles.quickActionDesc}>直接拨打电话</Text>
        </View>
      </View>

      <ScrollView className={styles.categoryTabs} scrollX>
        {categories.map(cat => (
          <View
            key={cat.key}
            className={classNames(
              styles.categoryTab,
              activeCategory === cat.key && styles.active
            )}
            onClick={() => handleCategoryChange(cat.key)}
          >
            {cat.label}
            {unreadCounts[cat.key] > 0 && (
              <View className={styles.tabBadge}>
                {unreadCounts[cat.key]}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View className={styles.sectionHeader}>
        <Text className={styles.sectionTitle}>消息列表</Text>
        <Text className={styles.sectionMore}>共 {filteredMessages.length} 条</Text>
      </View>

      {filteredMessages.length > 0 ? (
        <View className={styles.messageList}>
          {filteredMessages.map(message => (
            <MessageItem
              key={message.id}
              message={message}
              onClick={() => handleMessageClick(message)}
            />
          ))}
        </View>
      ) : (
        <View className={styles.emptyState}>
          <Text className={styles.emptyIcon}>📭</Text>
          <Text className={styles.emptyText}>暂无消息</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default MessagesPage;
