import { router } from 'expo-router';
import { ArrowLeft, Heart, Star } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const cupSizes = [
  { id: '1', name: 'Small', active: true },
  { id: '2', name: 'Medium', active: false },
  { id: '3', name: 'Large', active: false },
];

const sugarLevels = [
  { id: '1', name: 'No Sugar', active: true },
  { id: '2', name: 'Low', active: false },
  { id: '3', name: 'Medium', active: false },
];

export default function ProductDetailScreen() {
  const [selectedSize, setSelectedSize] = useState('1');
  const [selectedSugar, setSelectedSugar] = useState('1');
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const heartAnim = useRef(new Animated.Value(1)).current;

  const handleBack = () => {
    router.back();
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    Animated.sequence([
      Animated.timing(heartAnim, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(heartAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleAddToCart = () => {
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
    
    console.log('Added to cart:', { selectedSize, selectedSugar, quantity });
  };

  const renderSelector = (
    items: any[],
    selectedId: string,
    onSelect: (id: string) => void,
    title: string
  ) => (
    <View style={styles.selectorContainer}>
      <Text style={styles.selectorTitle}>{title}</Text>
      <View style={styles.selectorOptions}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.selectorButton,
              item.id === selectedId && styles.activeSelectorButton,
            ]}
            onPress={() => onSelect(item.id)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.selectorText,
                item.id === selectedId && styles.activeSelectorText,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.8}>
              <ArrowLeft size={20} color="#00582F" strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.heartButton}
              onPress={handleFavorite}
              activeOpacity={0.8}
            >
              <Animated.View style={{ transform: [{ scale: heartAnim }] }}>
                <Heart
                  size={20}
                  color={isFavorite ? '#00582F' : '#00582F'}
                  fill={isFavorite ? '#00582F' : 'none'}
                  strokeWidth={2}
                />
              </Animated.View>
            </TouchableOpacity>
          </View>

          {/* Product Image with overlay content */}
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800',
              }}
              style={styles.productImage}
            />
            
            {/* Overlay content on image */}
            <View style={styles.overlayContent}>
              <View style={styles.productTitleContainer}>
                <Text style={styles.productName}>Cappuccino</Text>
                <Text style={styles.productSubtitle}>With Sugar</Text>
              </View>
              
              <View style={styles.ratingBadge}>
                <Star size={16} color="#FFFFFF" fill="#FFFFFF" strokeWidth={0} />
                <Text style={styles.ratingText}>4.8</Text>
              </View>
            </View>
          </View>

          <View style={styles.contentSection}>
            {renderSelector(cupSizes, selectedSize, setSelectedSize, 'Cup Size')}

            {renderSelector(sugarLevels, selectedSugar, setSelectedSugar, 'Level Sugar')}

            <View style={styles.aboutContainer}>
              <Text style={styles.aboutTitle}>About</Text>
              <Text style={styles.aboutText} numberOfLines={showFullDescription ? undefined : 3}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Text>
              <TouchableOpacity onPress={() => setShowFullDescription(!showFullDescription)}>
                <Text style={styles.readMore}>
                  {showFullDescription ? 'Read Less' : 'Read More'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Fixed Add to Cart Button */}
      <View style={styles.fixedButtonContainer}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart} activeOpacity={0.8}>
          <Text style={styles.addToCartText}>Add to cart</Text>
          <Text style={styles.separator}>|</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.currency}>Rp </Text>
            <Text style={styles.priceText}>50,000</Text>
          </View>
        </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Add padding to prevent content from being hidden behind fixed button
  },
  header: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  heartButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    position: 'relative',
    height: 350,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlayContent: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  productTitleContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  productSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  contentSection: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -25,
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 30,
    minHeight: '100%',
  },
  selectorContainer: {
    marginBottom: 24,
  },
  selectorTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2F2D2C',
    marginBottom: 12,
  },
  selectorOptions: {
    flexDirection: 'row',
    gap: 10,
  },
  selectorButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    minWidth: 80,
    alignItems: 'center',
  },
  activeSelectorButton: {
    backgroundColor: '#00582F',
  },
  selectorText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  activeSelectorText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  aboutContainer: {
    marginBottom: 30,
  },
  aboutTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2F2D2C',
    marginBottom: 4,
  },
  aboutText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 8,
  },
  readMore: {
    color: '#2F7D32',
    fontWeight: '600',
    fontSize: 14,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 30,
  },
  addToCartButton: {
    backgroundColor: '#00582F',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2F7D32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 12,
  },
  separator: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.7,
    marginRight: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currency: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});