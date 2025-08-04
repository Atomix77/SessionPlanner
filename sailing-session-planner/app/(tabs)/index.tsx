import { Image } from 'expo-image';
import { Platform, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const [instructorCount, setInstructorCount] = useState(2);
  const [studentCount, setStudentCount] = useState(2);

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={[styles.bannerContainer, { 
        backgroundColor: colorScheme === 'light' ? '#A1CEDC' : '#1D3D47'
      }]}>
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.bannerLogo}
        />
        <ThemedText type="title" style={styles.bannerTitle}>Navidon</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.content}>
        <ThemedView style={styles.titleContainer}>
            <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <ThemedText type="title">Session Planner</ThemedText>
              <ThemedText>Create a custom teaching plan for your sailing sessions</ThemedText>
            </ThemedView>
        </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ThemedText type="subtitle">Number of Instructors</ThemedText>
        </ThemedView>
        <ThemedView style={styles.counterContainer}>
          <TouchableOpacity 
            style={[styles.counterButton, { backgroundColor: colorScheme === 'light' ? '#A1CEDC' : '#1D3D47' }]}
            onPress={() => setInstructorCount(Math.max(1, instructorCount - 1))}
          >
            <ThemedText style={styles.counterButtonText}>-</ThemedText>
          </TouchableOpacity>
          <ThemedView style={styles.counterDisplay}>
            <ThemedText type="title">{instructorCount}</ThemedText>
          </ThemedView>
          <TouchableOpacity 
            style={[styles.counterButton, { backgroundColor: colorScheme === 'light' ? '#A1CEDC' : '#1D3D47' }]}
            onPress={() => setInstructorCount(Math.min(5, instructorCount + 1))}
          >
            <ThemedText style={styles.counterButtonText}>+</ThemedText>
          </TouchableOpacity>
        </ThemedView>
        <ThemedView style={styles.sliderLabels}>
          <ThemedText style={styles.sliderLabel}>Min: 1</ThemedText>
          <ThemedText style={styles.sliderLabel}>Max: 5</ThemedText>
        </ThemedView>
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ThemedText type="subtitle">Group Size</ThemedText>
        </ThemedView>
        <ThemedView style={styles.counterContainer}>
          <TouchableOpacity 
            style={[styles.counterButton, { backgroundColor: colorScheme === 'light' ? '#A1CEDC' : '#1D3D47' }]}
            onPress={() => setStudentCount(Math.max(1, studentCount - 1))}
          >
            <ThemedText style={styles.counterButtonText}>-</ThemedText>
          </TouchableOpacity>
          <ThemedView style={styles.counterDisplay}>
            <ThemedText type="title">{studentCount}</ThemedText>
          </ThemedView>
          <TouchableOpacity 
            style={[styles.counterButton, { backgroundColor: colorScheme === 'light' ? '#A1CEDC' : '#1D3D47' }]}
            onPress={() => setStudentCount(Math.min(20, studentCount + 1))}
          >
            <ThemedText style={styles.counterButtonText}>+</ThemedText>
          </TouchableOpacity>
        </ThemedView>
        <ThemedView style={styles.sliderLabels}>
          <ThemedText style={styles.sliderLabel}>Min: 1</ThemedText>
          <ThemedText style={styles.sliderLabel}>Max: 20</ThemedText>
        </ThemedView>
      </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  bannerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 16,
  },
  bannerLogo: {
    height: 60,
    width: 60,
  },
  bannerTitle: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginVertical: 10,
  },
  counterButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  counterDisplay: {
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  sliderLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
});
