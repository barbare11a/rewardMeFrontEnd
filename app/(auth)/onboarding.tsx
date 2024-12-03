import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Welcome to Roary Rewards',
    description: 'Get rewards from your everyday campus visits',
    image: '/Users/barbarella/Downloads/RewardMeFrontEnd/constants/onboarding1.png',
  },
  {
    id: '2',
    title: 'Earn Points',
    description: 'Scan QR code after purchase or participation to earn points',
    image: '/Users/barbarella/Downloads/RewardMeFrontEnd/constants/onboarding2.png',
  },
  {
    id: '3',
    title: 'Get Rewarded',
    description: 'Redeem your points with discounts or freebies at your favorite spots!',
    image: '/Users/barbarella/Downloads/RewardMeFrontEnd/constants/onboarding3.png',
  },
];

export default function Onboarding() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push('/(auth)/signup'); 
    }
  };

  const handleSkip = () => {
    router.push('/(auth)/signup'); 
  };

  const onScrollEnd = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }: { item: typeof slides[0] }) => (
    <View style={[styles.slide, { width }]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <FlatList
        data={slides}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        onMomentumScrollEnd={onScrollEnd} 
      />

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === currentIndex ? Colors.yellow : '#FFFFFF' },
            ]}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>
          {currentIndex === slides.length - 1 ? 'Sign Up' : '→'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey,
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  skipText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#B0B0B0',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  nextButton: {
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
    backgroundColor: Colors.yellow,
    padding: 15,
    borderRadius: 30,
  },
  nextButtonText: {
    color: Colors.tintColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
