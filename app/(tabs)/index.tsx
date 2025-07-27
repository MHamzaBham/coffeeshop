import { router } from 'expo-router';
import { Bell, Coffee, MapPin, Plus, Search, SlidersHorizontal, Star } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const categories = [
  { id: '1', name: 'Cappuccino', active: true, },
  { id: '2', name: 'Coffee', active: false },
  { id: '3', name: 'Espresso', active: false },
  { id: '4', name: 'Chocolate', active: false },
];

const products = [
  {
    id: '1',
    name: 'Cappuccino',
    subtitle: 'With Stevia',
    price: '50,000',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    category: 'Cappuccino',
  },
  {
    id: '2',
    name: 'Cappuccino',
    subtitle: 'With Chocolate',
    price: '50,000',
    image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    category: 'Cappuccino',
  },
  {
    id: '3',
    name: 'Cappuccino',
    subtitle: 'With Oat Milk',
    price: '50,000',
    image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    category: 'Cappuccino',
  },
  {
    id: '4',
    name: 'Cappuccino',
    subtitle: 'With Low Fat Milk',
    price: '50,000',
    image: 'https://images.pexels.com/photos/373639/pexels-photo-373639.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    category: 'Cappuccino',
  },
];

const specialOffers = [
  {
    id: '5',
    name: 'Coffee',
    subtitle: 'With Stevia',
    price: '50,000',
    image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.5,
    favorite: false,
  },
  {
    id: '6',
    name: 'Cappuccino',
    subtitle: 'With Stevia',
    price: '50,000',
    image: 'https://images.pexels.com/photos/373639/pexels-photo-373639.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    favorite: true,
  },
];

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('1');
  const [searchText, setSearchText] = useState('');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderProductCard = ({ item, isHorizontal = false }: { item: any; isHorizontal?: boolean }) => (
    <TouchableOpacity
      style={[styles.productCard, isHorizontal && styles.horizontalCard]}
      onPress={() => {
        animatePress();
        router.push('/product-detail');
      }}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={[styles.productImage, isHorizontal && styles.horizontalImage]} />
        <View style={styles.ratingBadge}>
          <Star size={10} color="#FBBF24" fill="#FBBF24" strokeWidth={0} />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productSubtitle}>{item.subtitle}</Text>
        <View style={styles.priceRow}>
        <Text style={styles.currency}>Rp</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
          <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
            <Plus size={16} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.categoryButton, item.id === activeCategory && styles.activeCategoryButton]}
      onPress={() => setActiveCategory(item.id)}
      activeOpacity={0.8}
    >
      <Text style={[styles.categoryText, item.id === activeCategory && styles.activeCategoryText]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={{ width: 40, height: 40, borderRadius: 100 }}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MapPin size={16} color="#00582F" strokeWidth={2} style={{ marginRight: 8 }} />
            <Text style={styles.greeting}>
              Jakarta, Indonesia
            </Text>
          </View>
          <TouchableOpacity style={styles.notificationButton} activeOpacity={0.8}>
            <Bell size={20} color="#00582F" strokeWidth={2} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
        <Text style={styles.welcomeText}>Good Morning, Yudi</Text>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#00582F" strokeWidth={2} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Coffee..."
              placeholderTextColor="#9CA3AF"
              value={searchText}
              onChangeText={setSearchText}
            />
            <TouchableOpacity style={styles.filterButton} activeOpacity={0.8}>
              <View style={styles.filterLines}>
              <SlidersHorizontal size={22} strokeWidth={3} color="#00582F" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                item.id === activeCategory && styles.activeCategoryButton,
              ]}
              onPress={() => setActiveCategory(item.id)}
              activeOpacity={0.8}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Coffee
                  size={20}
                  color={item.id === activeCategory ? '#fff' : '#C67C4E'}
                  style={{ marginRight: 6 }}
                  strokeWidth={2}
                />
                <Text
                  style={[
                    styles.categoryText,
                    item.id === activeCategory && styles.activeCategoryText,
                  ]}
                >
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        />

        {/* Products Carousel */}
        <FlatList
          data={products}
          renderItem={({ item }) => renderProductCard({ item, isHorizontal: true })}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsGrid}
        />

        {/* Special Offer */}
        <Text style={styles.sectionTitle}>Special Offer</Text>
        <FlatList
          data={specialOffers}
          renderItem={({ item }) => renderProductCard({ item, isHorizontal: true })}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.specialOffersContainer}
        />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },
  location: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
    fontWeight: '400',
  },
  greeting: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2F2D2C',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 100,
    backgroundColor: '#FF6B6B',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 28,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 100,
    paddingHorizontal: 10,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#00582F',
    fontWeight: '400',
  },
  filterButton: {
    width: 52,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterLines: {
    gap: 3,
  },
  filterLine: {
    height: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  welcomeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2F2D2C',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2F2D2C',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingRight: 20,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    marginRight: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  activeCategoryButton: {
    backgroundColor: '#00582F',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2F2D2C',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  productsGrid: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  productRow: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  productCard: {
    width: '25%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  horizontalCard: {
    width: 160,
    marginRight: 12,
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 132,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  horizontalImage: {
    height: 140,
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  productInfo: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2F2D2C',
    marginBottom: 2,
  },
  productSubtitle: {
    fontSize: 12,
    color: '#9B9B9B',
    marginBottom: 8,
  },
  priceRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currency: {
    fontSize: 14,
    fontWeight: '600',
    color: '#424242',
    marginTop: -16,
  },
  productPrice: {
    marginLeft: -16,
    fontSize: 18,
    fontWeight: '800',
    color: '#2F4B4E',
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 100,
    backgroundColor: '#00582F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  specialOffersContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
});