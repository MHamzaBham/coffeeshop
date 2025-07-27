import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Import the image using the correct relative path
const welcomeImg = require('../assets/images/welcome_img.png');
const welcomeBg = require('../assets/images/welcome_bg.png');

export default function WelcomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#00512C" />
      
      {/* Background Pattern Image */}
      <Image 
        source={welcomeBg} 
        style={styles.backgroundImage} 
        resizeMode="cover" 
      />
      <View style={styles.backgroundOverlay} />
      <View style={styles.content}>
        {/* Coffee Cup Image */}
        <Animated.View style={[
          styles.imageContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}>
          <View style={styles.cupContainer}>
            <Image
              source={welcomeImg}
              style={styles.coffeeImage}
              resizeMode="contain"
            />
          </View>
        </Animated.View>

        {/* Text Content */}
        <Animated.View style={[
          styles.textContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}>
          <Text style={styles.title}>Coffee so good,{'\n'}your taste buds{'\n'}will love it</Text>
          <Text style={styles.subtitle}>
            The best grain, the finest roast, the{'\n'}most powerful flavor.
          </Text>
        </Animated.View>

        {/* Get Started Button */}
        <Animated.View style={[
          styles.buttonContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}>
          <TouchableOpacity 
            style={styles.getStartedButton} 
            onPress={() => router.replace({ pathname: '/(tabs)' })}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B08149',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  content: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  cupContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  coffeeImage: {
    width: 300,
    height: 300,
    transform: [{ scale: 1.5 }],
  },
  cupShadow: {
    position: 'absolute',
    bottom: -20,
    width: 160,
    height: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 80,
    transform: [{ scaleX: 1.2 }],
  },
  packageLabel: {
    position: 'absolute',
    bottom: -25,
    backgroundColor: '#A0522D',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  packageText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 32,
    marginBottom: 60,
  },
  title: {
    marginTop: 10,
    fontSize: 28,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 60,
    fontFamily: 'System',
  },
  buttonContainer: {
    paddingHorizontal: 32,
  },
  getStartedButton: {
    backgroundColor: '#00512C',
    paddingVertical: 20,
    borderRadius: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'System',
  },
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(95, 95, 95, 0.1)', // adjust opacity as needed
    zIndex: 1,
  },
});