import { Bell, ChevronRight, CreditCard, Heart, CircleHelp as HelpCircle, LogOut, MapPin, Settings, ShoppingBag } from 'lucide-react-native';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const menuItems = [
  { id: '1', title: 'My Orders', icon: ShoppingBag, color: '#C67C4E' },
  { id: '2', title: 'My Favorites', icon: Heart, color: '#EF4444' },
  { id: '3', title: 'Payment Methods', icon: CreditCard, color: '#10B981' },
  { id: '4', title: 'Delivery Address', icon: MapPin, color: '#3B82F6' },
  { id: '5', title: 'Notifications', icon: Bell, color: '#F59E0B' },
  { id: '6', title: 'Settings', icon: Settings, color: '#6B7280' },
  { id: '7', title: 'Help & Support', icon: HelpCircle, color: '#8B5CF6' },
];

export default function ProfileScreen() {
  const renderMenuItem = (item: any) => (
    <TouchableOpacity key={item.id} style={styles.menuItem} activeOpacity={0.8}>
      <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
        <item.icon size={20} color={item.color} strokeWidth={2} />
      </View>
      <Text style={styles.menuText}>{item.title}</Text>
      <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
              }}
              style={styles.avatar}
            />
            <View style={styles.onlineIndicator} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Yudi Setiawan</Text>
            <Text style={styles.userEmail}>yudi.setiawan@email.com</Text>
          </View>
          <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map(renderMenuItem)}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8}>
          <LogOut size={20} color="#EF4444" strokeWidth={2} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2F2D2C',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#9B9B9B',
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#00512C',
    borderRadius: 20,
  },
  editText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2F2D2C',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9B9B9B',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#F1F1F1',
    marginHorizontal: 20,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F9F9F9',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#2F2D2C',
    fontWeight: '400',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
});