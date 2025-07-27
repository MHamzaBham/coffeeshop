import { Minus, Plus, Trash2 } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const cartItems = [
  {
    id: '1',
    name: 'Cappuccino',
    subtitle: 'With Stevia',
    price: 50000,
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
    quantity: 2,
    size: 'Medium',
  },
  {
    id: '2',
    name: 'Coffee',
    subtitle: 'With Chocolate',
    price: 45000,
    image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400',
    quantity: 1,
    size: 'Large',
  },
];

export default function CartScreen() {
  const [cart, setCart] = useState(cartItems);

  const updateQuantity = (id: string, change: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={styles.cartCard}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
        <Text style={styles.itemSize}>Size: {item.size}</Text>
        <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.removeButton} 
          onPress={() => removeItem(item.id)}
          activeOpacity={0.8}
        >
          <Trash2 size={16} color="#EF4444" strokeWidth={2} />
        </TouchableOpacity>
        <View style={styles.quantityControls}>
          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={() => updateQuantity(item.id, -1)}
            activeOpacity={0.8}
          >
            <Minus size={16} color="#9CA3AF" strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={() => updateQuantity(item.id, 1)}
            activeOpacity={0.8}
          >
            <Plus size={16} color="#9CA3AF" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cart</Text>
      </View>
      
      {cart.length > 0 ? (
        <>
          <FlatList
            data={cart}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
          
          <View style={styles.bottomContainer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total Price</Text>
              <Text style={styles.totalPrice}>{formatPrice(getTotalPrice())}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton} activeOpacity={0.8}>
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
          <Text style={styles.emptySubtitle}>
            Add some delicious coffee to get started
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2F2D2C',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  cartCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2F2D2C',
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#9B9B9B',
    marginBottom: 2,
  },
  itemSize: {
    fontSize: 12,
    color: '#9B9B9B',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00512C',
  },
  actions: {
    alignItems: 'center',
    gap: 12,
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EDEDED',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2F2D2C',
    minWidth: 20,
    textAlign: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: '#F1F1F1',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    color: '#2F2D2C',
    fontWeight: '400',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: '#00512C',
  },
  checkoutButton: {
    backgroundColor: '#00512C',
    paddingVertical: 20,
    borderRadius: 40,
    alignItems: 'center',
    shadowColor: '#00512C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2F2D2C',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#9B9B9B',
    textAlign: 'center',
    lineHeight: 20,
  },
});