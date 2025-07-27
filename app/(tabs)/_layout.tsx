import { Tabs } from 'expo-router';
import { Heart, Home, ShoppingBag, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#00512C',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          height: 80,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '400',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 0,
          alignItems: 'center',
          justifyContent: 'center',
          height: 70,
          display: 'flex',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ size, color }) => (
            <Home size={24} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: '',
          tabBarIcon: ({ size, color }) => (
            <Heart size={24} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: '',
          tabBarIcon: ({ size, color }) => (
            <ShoppingBag size={24} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ size, color }) => (
            <User size={24} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  );
}