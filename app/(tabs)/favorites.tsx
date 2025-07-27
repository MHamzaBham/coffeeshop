import { Heart, Plus } from 'lucide-react-native';
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

const favoriteItems = [
  {
    id: '1',
    name: 'Cappuccino',
    subtitle: 'With Stevia',
    price: 'Rp 50,000',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Cappuccino',
    subtitle: 'With Chocolate',
    price: 'Rp 50,000',
    image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
  },
];

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState(favoriteItems);

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const renderFavoriteItem = ({ item }: { item: any }) => (
    <View style={styles.favoriteCard}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.heartButton} 
          onPress={() => removeFavorite(item.id)}
          activeOpacity={0.8}
        >
          <Heart size={20} color="#EF4444" fill="#EF4444" strokeWidth={2} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
          <Plus size={16} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorite</Text>
      </View>
      
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Heart size={64} color="#E5E7EB" strokeWidth={1} />
          <Text style={styles.emptyTitle}>No Favorites Yet</Text>
          <Text style={styles.emptySubtitle}>
            Start adding your favorite coffee items to see them here
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
    paddingBottom: 100,
  },
  favoriteCard: {
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
    width: 60,
    height: 60,
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
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#C67C4E',
  },
  actions: {
    alignItems: 'center',
    gap: 8,
  },
  heartButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#00512C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2F2D2C',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#9B9B9B',
    textAlign: 'center',
    lineHeight: 20,
  },
});