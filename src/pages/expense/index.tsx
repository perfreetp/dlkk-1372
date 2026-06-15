import React, { useState, useMemo } from 'react';
import { View, Text, Button, ScrollView, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { expenseItems, addOnServices } from '@/data/services';
import { bookings } from '@/data/bookings';
import { pets } from '@/data/pets';
import type { ExpenseItem, AddOnService } from '@/types';

const ExpensePage: React.FC = () => {
  const [items, setItems] = useState<ExpenseItem[]>(expenseItems);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const currentBooking = bookings.find(b => b.status === 'inProgress');
  const currentPet = pets[0];

  const totalAmount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const roomFee = useMemo(() => {
    return items
      .filter(item => item.type === 'room')
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const serviceFee = useMemo(() => {
    return items
      .filter(item => item.type === 'service')
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const extraFee = useMemo(() => {
    return items
      .filter(item => item.type === 'extra')
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const typeIconMap: Record<string, string> = {
    room: '🏠',
    service: '✨',
    extra: '🎁'
  };

  const handleAddService = (service: AddOnService) => {
    Taro.showModal({
      title: `追加${service.name}`,
      content: `确认追加${service.name}服务？价格 ¥${service.price}/次`,
      success: (res) => {
        if (res.confirm) {
          setItems(prev => [
            ...prev,
            {
              id: `extra-${Date.now()}`,
              name: service.name,
              type: 'extra',
              price: service.price,
              quantity: 1,
              unit: '次',
              date: new Date().toISOString().split('T')[0]
            }
          ]);
          setSelectedServices(prev => [...prev, service.id]);
          Taro.showToast({
            title: '追加成功',
            icon: 'success'
          });
        }
      }
    });
  };

  const handleExtension = () => {
    Taro.showActionSheet({
      itemList: ['延期 1 天', '延期 2 天', '延期 3 天', '自定义延期'],
      success: (res) => {
        const days = res.tapIndex < 3 ? res.tapIndex + 1 : 0;
        if (days > 0) {
          Taro.showModal({
            title: '延期申请',
            content: `确认申请延期 ${days} 天？房费将增加 ¥${currentBooking ? currentBooking.totalPrice / currentBooking.days * days : 0}`,
            success: (modalRes) => {
              if (modalRes.confirm) {
                Taro.showToast({
                  title: '申请已提交',
                  icon: 'success'
                });
              }
            }
          });
        } else {
          Taro.showToast({
            title: '请联系店员',
            icon: 'none'
          });
        }
      }
    });
  };

  const handlePay = () => {
    Taro.showModal({
      title: '确认支付',
      content: `确认支付 ¥${totalAmount} 吗？`,
      confirmText: '确认支付',
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({
            title: '支付成功',
            icon: 'success'
          });
        }
      }
    });
  };

  const groupedItems = items.reduce((acc, item) => {
    const typeName = { room: '房费', service: '服务费', extra: '额外消费' }[item.type];
    if (!acc[typeName]) {
      acc[typeName] = [];
    }
    acc[typeName].push(item);
    return acc;
  }, {} as Record<string, ExpenseItem[]>);

  return (
    <ScrollView className={styles.page} scrollY>
      <View className={styles.header}>
        <Text className={styles.totalLabel}>当前待支付</Text>
        <View className={styles.totalAmount}>
          <Text className={styles.currency}>¥</Text>
          {totalAmount}
        </View>
        <Text className={styles.bookingInfo}>
          {currentPet.name} · {currentBooking?.roomName}
        </Text>
      </View>

      <View className={styles.summaryCard}>
        <View className={styles.summaryRow}>
          <Text className={styles.summaryLabel}>房费</Text>
          <Text className={styles.summaryValue}>¥{roomFee}</Text>
        </View>
        <View className={styles.summaryRow}>
          <Text className={styles.summaryLabel}>服务费</Text>
          <Text className={styles.summaryValue}>¥{serviceFee}</Text>
        </View>
        <View className={styles.summaryRow}>
          <Text className={styles.summaryLabel}>额外消费</Text>
          <Text className={styles.summaryValue}>¥{extraFee}</Text>
        </View>
        <View className={styles.summaryRow}>
          <Text className={styles.summaryLabel}>合计</Text>
          <Text className={styles.summaryTotal}>¥{totalAmount}</Text>
        </View>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>
          <Text>
            <Text className={styles.sectionIcon}>📋</Text>
            费用明细
          </Text>
          <Text style={{ fontSize: '24rpx', color: '#86909c', fontWeight: 'normal' }}>
            共 {items.length} 项
          </Text>
        </Text>

        {Object.entries(groupedItems).map(([category, categoryItems]) => (
          <View key={category} className={styles.expenseList} style={{ marginBottom: '24rpx' }}>
            <View className={styles.categoryTitle}>{category}</View>
            {categoryItems.map(item => (
              <View key={item.id} className={styles.expenseItem}>
                <View className={styles.expenseIcon}>
                  {typeIconMap[item.type]}
                </View>
                <View className={styles.expenseInfo}>
                  <Text className={styles.expenseName}>{item.name}</Text>
                  <Text className={styles.expenseDesc}>
                    {item.date || '寄养期间'}
                  </Text>
                </View>
                <View className={styles.expensePrice}>
                  <Text className={styles.priceNum}>¥{item.price * item.quantity}</Text>
                  <Text className={styles.priceQty}>
                    {item.price} × {item.quantity}{item.unit}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>

      <View className={`${styles.section} ${styles.addServiceSection}`}>
        <Text className={styles.sectionTitle}>
          <Text>
            <Text className={styles.sectionIcon}>➕</Text>
            追加服务
          </Text>
        </Text>
        <View className={styles.serviceGrid}>
          {addOnServices.slice(0, 4).map(service => (
            <View key={service.id} className={styles.serviceCard}>
              <Text className={styles.serviceIcon}>{service.icon}</Text>
              <Text className={styles.serviceName}>{service.name}</Text>
              <Text className={styles.serviceDesc}>{service.description}</Text>
              <Text className={styles.servicePrice}>
                ¥{service.price}
                <Text className={styles.unit}>/{service.duration || '次'}</Text>
              </Text>
              <Button
                className={styles.addBtn}
                onClick={() => handleAddService(service)}
              >
                {selectedServices.includes(service.id) ? '已追加' : '+ 追加'}
              </Button>
            </View>
          ))}
        </View>
      </View>

      <View className={`${styles.section} ${styles.extensionSection}`}>
        <Text className={styles.sectionTitle}>
          <Text>
            <Text className={styles.sectionIcon}>📅</Text>
            延期申请
          </Text>
        </Text>
        <View className={styles.extensionCard}>
          <Text className={styles.extensionTitle}>
            📆 需要延长寄养时间？
          </Text>
          <Text className={styles.extensionDesc}>
            如果需要延长寄养时间，可以随时申请延期。
            我们会根据房间可用性为您安排。
          </Text>
          <Button className={styles.extensionBtn} onClick={handleExtension}>
            申请延期
          </Button>
        </View>
      </View>

      <View className={styles.bottomBar}>
        <View className={styles.bottomPrice}>
          <Text className={styles.bottomPriceLabel}>待支付金额</Text>
          <View className={styles.bottomPriceValue}>
            <Text className={styles.unit}>¥</Text>
            {totalAmount}
          </View>
        </View>
        <Button className={styles.payBtn} onClick={handlePay}>
          去支付
        </Button>
      </View>
    </ScrollView>
  );
};

export default ExpensePage;
