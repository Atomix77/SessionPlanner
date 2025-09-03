import { Image } from 'expo-image';
import { Stack } from 'expo-router';
import { Platform, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { Compass, Waves, Sun, Users } from "lucide-react"
import { Picker } from '@react-native-picker/picker';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [instructorCount, setInstructorCount] = useState(1);
  const [studentCount, setStudentCount] = useState(3);
  const [selectedAgeRange, setSelectedAgeRange] = useState('10to14');

  return (
  <>
    <Stack.Screen options={{ headerShown: false }} />
    <ThemedView style={[styles.container,{ backgroundColor: colorScheme === 'light' ? '#fff' : '#000' }]}>
      <ThemedView style={[styles.bannerContainer, { backgroundColor: colorScheme === 'light' ? '#ffffff' : '#000000' , borderBottomColor: colorScheme === 'light' ? '#e4e4e4' : '#1a1a1aff',}]}>
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.bannerLogo} />
        <ThemedText type="title" style={[styles.bannerTitle, styles.mainBanner]}>SailPlan</ThemedText>
      </ThemedView>

    <ScrollView>
      <ThemedView style={[styles.content, { backgroundColor: colorScheme === 'light' ? '#ffffff' : '#000000', }]}>
        <ThemedView style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: colorScheme === 'light' ? '#ffffff' : '#000000', padding: 0, margin: 0 }}>
          <ThemedText type="title" style={{ fontSize: 36, fontWeight: 'bold' }}> Plan Your Perfect </ThemedText>
          <ThemedText type="title" style={{ fontSize: 36, color: '#087ca3', paddingTop: 5, lineHeight: 36, margin: 0 }}> Sailing Session </ThemedText>
          <ThemedText style={{ fontSize: 20, paddingTop: 8, textAlign: 'center', lineHeight: 30, color: colorScheme === 'light' ? '#6b7280' : '#6b7280', margin: 0 }}>Create tailored sailing lessons based on weather conditions, {'\n'} student experience levels, and available resources with our intelligent planning system.</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.contentContainer}>
        <ThemedText type="title" style={{ fontSize: 24, fontWeight: 'bold' }}> Session Participants </ThemedText>
        <ThemedText type="default" style={{ fontSize: 16, color: colorScheme === 'light' ? '#6b7280' : '#6b7280' }}>  Student and Instructor allocation </ThemedText>
        <ThemedView style={{ marginTop: 24, display: 'flex', flexDirection: 'row' }}>
          <ThemedView style={{width: '50%'}}>
            <ThemedText type="title" style={{ fontSize: 20, fontWeight: '500' }}> Number of Students </ThemedText>
            <ThemedView style={{ width: '95%', marginTop: 12 }}>
              <TextInput style={styles.textBox} keyboardType="numeric" value={studentCount.toString()} onChangeText={text => setStudentCount(Number(text))}/>
            </ThemedView>
          </ThemedView>
          <ThemedView style={{width: '50%'}}>
            <ThemedText type="title" style={{ fontSize: 20, fontWeight: '500' }}> Number of Instructors </ThemedText>
            <ThemedView style={{ width: '95%', marginTop: 12 }}>
              <TextInput style={styles.textBox} keyboardType="numeric" value={instructorCount.toString()} onChangeText={text => setInstructorCount(Number(text))}/>
            </ThemedView>
          </ThemedView>
        </ThemedView>
        <ThemedText type="default" style={{ fontSize: 20, fontWeight: '500', marginTop: 12 }}> Age Range</ThemedText>
        <ThemedView style={{ width: '48%', marginTop: 12 }}>
          <Picker selectedValue={selectedAgeRange} onValueChange={(itemValue) => setSelectedAgeRange(itemValue)} style={styles.textBox} dropdownIconColor={colorScheme === 'light' ? '#000' : '#fff'}>
            <Picker.Item label="8 - 10" value="8to10" />
            <Picker.Item label="11 - 14" value="11to14" />
            <Picker.Item label="14 - 18" value="14to18" />
            <Picker.Item label="18+" value="18plus" />
          </Picker>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.contentContainer}>
        <ThemedText type="title" style={{ fontSize: 24, fontWeight: 'bold' }}> Session Participants </ThemedText>
        <ThemedText type="default" style={{ fontSize: 16, color: colorScheme === 'light' ? '#6b7280' : '#6b7280' }}>  Student and Instructor allocation </ThemedText>
        <ThemedView style={{ marginTop: 24, display: 'flex', flexDirection: 'row' }}>
          <ThemedView style={{width: '50%'}}>
            <ThemedText type="title" style={{ fontSize: 20, fontWeight: '500' }}> Number of Students </ThemedText>
            <ThemedView style={{ width: '95%', marginTop: 12 }}>
              <TextInput style={styles.textBox} keyboardType="numeric" value={studentCount.toString()} onChangeText={text => setStudentCount(Number(text))}/>
            </ThemedView>
          </ThemedView>
          <ThemedView style={{width: '50%'}}>
            <ThemedText type="title" style={{ fontSize: 20, fontWeight: '500' }}> Number of Instructors </ThemedText>
            <ThemedView style={{ width: '95%', marginTop: 12 }}>
              <TextInput style={styles.textBox} keyboardType="numeric" value={instructorCount.toString()} onChangeText={text => setInstructorCount(Number(text))}/>
            </ThemedView>
          </ThemedView>
        </ThemedView>
        <ThemedText type="default" style={{ fontSize: 20, fontWeight: '500', marginTop: 12 }}> Age Range</ThemedText>
        <ThemedView style={{ width: '48%', marginTop: 12 }}>
          <Picker selectedValue={selectedAgeRange} onValueChange={(itemValue) => setSelectedAgeRange(itemValue)} style={styles.textBox} dropdownIconColor={colorScheme === 'light' ? '#000' : '#fff'}>
            <Picker.Item label="8 - 10" value="8to10" />
            <Picker.Item label="11 - 14" value="11to14" />
            <Picker.Item label="14 - 18" value="14to18" />
            <Picker.Item label="18+" value="18plus" />
          </Picker>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.contentContainer}>
        <ThemedText type="title" style={{ fontSize: 24, fontWeight: 'bold' }}> Session Participants </ThemedText>
        <ThemedText type="default" style={{ fontSize: 16, color: colorScheme === 'light' ? '#6b7280' : '#6b7280' }}>  Student and Instructor allocation </ThemedText>
        <ThemedView style={{ marginTop: 24, display: 'flex', flexDirection: 'row' }}>
          <ThemedView style={{width: '50%'}}>
            <ThemedText type="title" style={{ fontSize: 20, fontWeight: '500' }}> Number of Students </ThemedText>
            <ThemedView style={{ width: '95%', marginTop: 12 }}>
              <TextInput style={styles.textBox} keyboardType="numeric" value={studentCount.toString()} onChangeText={text => setStudentCount(Number(text))}/>
            </ThemedView>
          </ThemedView>
          <ThemedView style={{width: '50%'}}>
            <ThemedText type="title" style={{ fontSize: 20, fontWeight: '500' }}> Number of Instructors </ThemedText>
            <ThemedView style={{ width: '95%', marginTop: 12 }}>
              <TextInput style={styles.textBox} keyboardType="numeric" value={instructorCount.toString()} onChangeText={text => setInstructorCount(Number(text))}/>
            </ThemedView>
          </ThemedView>
        </ThemedView>
        <ThemedText type="default" style={{ fontSize: 20, fontWeight: '500', marginTop: 12 }}> Age Range</ThemedText>
        <ThemedView style={{ width: '48%', marginTop: 12 }}>
          <Picker selectedValue={selectedAgeRange} onValueChange={(itemValue) => setSelectedAgeRange(itemValue)} style={styles.textBox} dropdownIconColor={colorScheme === 'light' ? '#000' : '#fff'}>
            <Picker.Item label="8 - 10" value="8to10" />
            <Picker.Item label="11 - 14" value="11to14" />
            <Picker.Item label="14 - 18" value="14to18" />
            <Picker.Item label="18+" value="18plus" />
          </Picker>
        </ThemedView>
      </ThemedView>
      
    </ScrollView>
    </ThemedView>
  </>
  );
}

const styles = StyleSheet.create({
  mainBanner: {
    color: '#087ca3',
  },
  bannerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingTop: 32,
    paddingBottom: 12,
    borderBottomWidth: 2,
  },
  bannerLogo: {
    height: 60,
    width: 60,
  },
  bannerTitle: {
    color: 'white',
    fontSize: 64,
    fontWeight: 'bold',
    paddingVertical: 16,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
    borderWidth: 1,
    borderColor: '#e4e4e4',
    borderRadius: 8,
    alignSelf: 'stretch',
    width: '50%',
    gap: '0px',
    padding: 16,
    marginBottom: 16,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  content: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
    paddingTop: 16,
    paddingBottom: 16,
  },
  textBox: {
    borderWidth: 1,
    borderColor: '#e4e4e4',
    borderRadius: 8,
    padding: 8,
  },

});