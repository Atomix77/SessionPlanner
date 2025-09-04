import { Image } from 'expo-image';
import { Stack } from 'expo-router';
import { Platform, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { Compass, Waves, Sun, Users, Pi } from "lucide-react"
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
  const [sessionLength, setSessionLength] = useState(1 + ' hour');
  const [courseType, setCourseType] = useState('Youth');
  const [course, setCourse] = useState('Stage1');
  const [windSpeed, setWindSpeed] = useState(10);
  const [gustSpeed, setGustSpeed] = useState(15);
  const [tideStrength, setTideStrength] = useState(5);
  const [tideDirection, setTideDirection] = useState('Ebb');
  const [tidal, setTidal] = useState('No');

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
              <TextInput style={[styles.textBox, { backgroundColor: colorScheme === 'light' ? '#fff' : '#1a1a1a', color: colorScheme === 'light' ? '#000' : '#fff',}]} keyboardType="numeric" value={studentCount.toString()} onChangeText={text => setStudentCount(Number(text))}/>
            </ThemedView>
          </ThemedView>
          <ThemedView style={{width: '50%'}}>
            <ThemedText type="title" style={{ fontSize: 20, fontWeight: '500' }}> Number of Instructors </ThemedText>
            <ThemedView style={{ width: '95%', marginTop: 12 }}>
              <TextInput style={[styles.textBox, { backgroundColor: colorScheme === 'light' ? '#fff' : '#1a1a1a', color: colorScheme === 'light' ? '#000' : '#fff',}]} keyboardType="numeric" value={instructorCount.toString()} onChangeText={text => setInstructorCount(Number(text))}/>
            </ThemedView>
          </ThemedView>
        </ThemedView>
        <ThemedText type="default" style={{ fontSize: 20, fontWeight: '500', marginTop: 12 }}> Age Range</ThemedText>
        <ThemedView style={{ width: '48%', marginTop: 12 }}>
          <Picker selectedValue={selectedAgeRange} onValueChange={(itemValue) => setSelectedAgeRange(itemValue)} style={[styles.textBox , {color: colorScheme === 'light' ? '#000' : '#fff', backgroundColor: colorScheme === 'light' ? '#fff' : '#1a1a1a'}]} dropdownIconColor={colorScheme === 'light' ? '#000' : '#fff'}>
            <Picker.Item label="8 - 10" value="8to10" color={colorScheme === 'light' ? '#000' : '#fff'} />
            <Picker.Item label="11 - 14" value="11to14" color={colorScheme === 'light' ? '#000' : '#fff'} />
            <Picker.Item label="14 - 18" value="14to18" color={colorScheme === 'light' ? '#000' : '#fff'} />
            <Picker.Item label="18+" value="18plus" color={colorScheme === 'light' ? '#000' : '#fff'} />
          </Picker>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.contentContainer}>
        <ThemedText type="title" style={{ fontSize: 24, fontWeight: 'bold' }}> Session Details </ThemedText>
        <ThemedText type="default" style={{ fontSize: 16, color: colorScheme === 'light' ? '#6b7280' : '#6b7280' }}>  Core Session Information </ThemedText>
        <ThemedView style={{ marginTop: 24, display: 'flex', flexDirection: 'row' }}>
          <ThemedView style={{width: '50%'}}>
            <ThemedText type="title" style={{ fontSize: 20, fontWeight: '500' }}> Course Type</ThemedText>
            <ThemedView style={{ width: '95%', marginTop: 12 }}>
              <Picker selectedValue={courseType} onValueChange={(itemValue) => setCourseType(itemValue)} style={[styles.textBox , {color: colorScheme === 'light' ? '#000' : '#fff', backgroundColor: colorScheme === 'light' ? '#fff' : '#1a1a1a'}]} dropdownIconColor={colorScheme === 'light' ? '#000' : '#fff'}>
                <Picker.Item label="Youth" value="Youth" />
                <Picker.Item label="Adult" value="Adult" />
                <Picker.Item label="Advanced" value="Advanced" />
                <Picker.Item label="Race" value="Race" />
              </Picker>
            </ThemedView>
          </ThemedView>

          <ThemedView style={{width: '50%'}}>
            <ThemedText type="default" style={{ fontSize: 20, fontWeight: '500', marginTop: 12 }}> Course</ThemedText>
            <ThemedView style={{ width: '95%', marginTop: 12 }}>
              {(() => {
                let courseOptions: { label: string; value: string }[] = [];
                switch (courseType) {
                  case 'Youth':
                    courseOptions = [
                      { label: "Stage 1", value: "Stage1" },
                      { label: "Stage 2", value: "Stage2" },
                      { label: "Stage 3", value: "Stage3" },
                      { label: "Stage 4", value: "Stage4" },
                      { label: "Taster Session", value: "YouthTasterSession" },
                    ];
                    break;
                  case 'Adult':
                    courseOptions = [
                      { label: "Level 1 - Start Sailing", value: "Level1" },
                      { label: "Level 2 - Basic Skills", value: "Level2" },
                      { label: "Level 3 - Better Sailing", value: "Level3" },
                      { label: "Taster Session", value: "AdultTasterSession" },
                    ];
                    break;
                  case 'Advanced':
                    courseOptions = [
                      { label: "Performance Sailing", value: "PerformanceSailing" },
                      { label: "Seamanship Skills", value: "Seamanship" },
                      { label: "Day Sailing", value: "DaySailing" },
                      { label: "Sailing with Spinnaker", value: "SailingWithSpinnaker" },
                    ];
                    break;
                  case 'Race':
                    courseOptions = [
                      { label: "Start Racing", value: "StartRacing" },
                      { label: "Club Racing", value: "ClubRacing" },
                      { label: "Regional Racing", value: "RegionalRacing" },
                      { label: "Championship Racing", value: "ChampionshipRacing" },
                    ];
                    break;
                  default:
                    courseOptions = [];
                }
                return (
                  <Picker
                    selectedValue={course}
                    onValueChange={(itemValue) => setCourse(itemValue)}
                    style={[styles.textBox , {color: colorScheme === 'light' ? '#000' : '#fff', backgroundColor: colorScheme === 'light' ? '#fff' : '#1a1a1a'}]} dropdownIconColor={colorScheme === 'light' ? '#000' : '#fff'}>
                    {courseOptions.map(opt => (
                      <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                    ))}
                  </Picker>
                );
              })()}
            </ThemedView>
          </ThemedView>
        </ThemedView>
        
        <ThemedText type="title" style={{ fontSize: 20, fontWeight: '500' }}> Session Length </ThemedText>
          <ThemedView style={{ width: '48%', marginTop: 12 }}>
            <Picker selectedValue={sessionLength} onValueChange={(itemValue) => setSessionLength(itemValue)} style={[styles.textBox , {color: colorScheme === 'light' ? '#000' : '#fff', backgroundColor: colorScheme === 'light' ? '#fff' : '#1a1a1a'}]} dropdownIconColor={colorScheme === 'light' ? '#000' : '#fff'}>
              <Picker.Item label="1 hour" value="1hour" />
              <Picker.Item label="2 hours" value="2hours" />
              <Picker.Item label="4 hours" value="4hours" />
              <Picker.Item label="8 hours" value="8hours" />
            </Picker>
          </ThemedView>
      </ThemedView>

      <ThemedView style={styles.contentContainer}>
        <ThemedText type="title" style={{ fontSize: 24, fontWeight: 'bold' }}> Sailing Conditions </ThemedText>
        <ThemedText type="default" style={{ fontSize: 16, color: colorScheme === 'light' ? '#6b7280' : '#6b7280' }}>  Wind and Tide Information </ThemedText>
        <ThemedView style={{ marginTop: 24, display: 'flex', flexDirection: 'row' }}>
          <ThemedView style={{width: '50%'}}>
            <ThemedText type="title" style={{ fontSize: 20, fontWeight: '500' }}> Wind Speed (knots) </ThemedText>
            <ThemedView style={{ width: '95%', marginTop: 12 }}>
              <TextInput style={[styles.textBox, { backgroundColor: colorScheme === 'light' ? '#fff ' : '#1a1a1a', color: colorScheme === 'light' ? '#000' : '#fff',}]} keyboardType="numeric" value={windSpeed.toString()} onChangeText={text => setWindSpeed(Number(text))}/>
            </ThemedView>
          </ThemedView>
          <ThemedView style={{width: '50%'}}>
            <ThemedText type="title" style={{ fontSize: 20, fontWeight: '500' }}> Gust Speed (knots) </ThemedText>
            <ThemedView style={{ width: '95%', marginTop: 12 }}>
              <TextInput style={[styles.textBox, { backgroundColor: colorScheme === 'light' ? '#fff' : '#1a1a1a', color: colorScheme === 'light' ? '#000' : '#fff',}]} keyboardType="numeric" value={gustSpeed.toString()} onChangeText={text => setGustSpeed(Number(text))}/>
            </ThemedView>
          </ThemedView>
        </ThemedView>
        <ThemedView style={{ marginTop: 24 }}>
          <ThemedText type="title" style={{ fontSize: 20, fontWeight: '500' }}> Is the Location Tidal? </ThemedText>
          <ThemedView style={{ width: '48%', marginTop: 12 }}>
            <Picker
              selectedValue={tidal === "No" ? "No" : "Yes"}
              onValueChange={(itemValue) => {
                setTidal(itemValue);
              }}
              style={[styles.textBox , {color: colorScheme === 'light' ? '#000' : '#fff', backgroundColor: colorScheme === 'light' ? '#fff' : '#1a1a1a'}]} dropdownIconColor={colorScheme === 'light' ? '#000' : '#fff'}>
              <Picker.Item label="Yes" value="Yes" />
              <Picker.Item label="No" value="No" />
            </Picker>
          </ThemedView>
        </ThemedView>
        {tidal !== "No" && (
          <ThemedView style={{ marginTop: 24, display: 'flex', flexDirection: 'row' }}>
            <ThemedView style={{width: '50%'}}>
              <ThemedText type="title" style={{ fontSize: 20, fontWeight: '500' }}> Tide Strength (knots) </ThemedText>
              <ThemedView style={{ width: '95%', marginTop: 12 }}>
          <Picker selectedValue={tideStrength} onValueChange={(itemValue) => setTideStrength(itemValue)} style={[styles.textBox , {color: colorScheme === 'light' ? '#000' : '#fff', backgroundColor: colorScheme === 'light' ? '#fff' : '#1a1a1a'}]} dropdownIconColor={colorScheme === 'light' ? '#000' : '#fff'}>
            <Picker.Item label="Slack (0 - 0.5 kts)" value="slack" />
            <Picker.Item label="Light (0.5 - 1.5 kts)" value="light" />
            <Picker.Item label="Moderate (1.5 - 3 kts)" value="moderate" />
            <Picker.Item label="Strong (3 - 5 kts)" value="strong" />
            <Picker.Item label="Spring Tide (5+ kts)" value="spring" />
          </Picker>
              </ThemedView>
            </ThemedView>
            <ThemedView style={{width: '50%'}}>
              <ThemedText type="title" style={{ fontSize: 20, fontWeight: '500' }}> Tide Direction </ThemedText>
              <ThemedView style={{ width: '95%', marginTop: 12 }}>
              <Picker selectedValue={tideDirection} onValueChange={(itemValue) => setTideDirection(itemValue)} style={[styles.textBox , {color: colorScheme === 'light' ? '#000' : '#fff', backgroundColor: colorScheme === 'light' ? '#fff' : '#1a1a1a'}]} dropdownIconColor={colorScheme === 'light' ? '#fff' : '#000'}>
                <Picker.Item label="Ebb (outgoing)" value="Ebb" />
                <Picker.Item label="Flood (incoming)" value="Flood" />
                <Picker.Item label='Slack' value='Slack' />
                <Picker.Item label='Cross Tide' value='Cross' />
              </Picker>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        )}</ThemedView>

      <ThemedView style={styles.contentContainer}>
        <ThemedText type="title" style={{ fontSize: 24, fontWeight: 'bold' }}> Boats and Equipment </ThemedText>
        <ThemedText type="default" style={{ fontSize: 16, color: colorScheme === 'light' ? '#6b7280' : '#6b7280' }}>  Available Boats and Training Equipment </ThemedText>
        <ThemedView style={{ marginTop: 24, display: 'flex', flexDirection: 'row' }}>
          <ThemedView style={{width: '50%'}}>
            <ThemedText type="title" style={{ fontSize: 20, fontWeight: '500' }}> Number of Students </ThemedText>
            <ThemedView style={{ width: '95%', marginTop: 12 }}>
              <TextInput style={[styles.textBox, { backgroundColor: colorScheme === 'light' ? '#fff' : '#1a1a1a', color: colorScheme === 'light' ? '#000' : '#fff',}]} keyboardType="numeric" value={studentCount.toString()} onChangeText={text => setStudentCount(Number(text))}/>
            </ThemedView>
          </ThemedView>
          <ThemedView style={{width: '50%'}}>
            <ThemedText type="title" style={{ fontSize: 20, fontWeight: '500' }}> Number of Instructors </ThemedText>
            <ThemedView style={{ width: '95%', marginTop: 12 }}>
              <TextInput style={[styles.textBox, { backgroundColor: colorScheme === 'light' ? '#fff' : '#1a1a1a', color: colorScheme === 'light' ? '#000' : '#fff',}]} keyboardType="numeric" value={instructorCount.toString()} onChangeText={text => setInstructorCount(Number(text))}/>
            </ThemedView>
          </ThemedView>
        </ThemedView>
        <ThemedText type="default" style={{ fontSize: 20, fontWeight: '500', marginTop: 12 }}> Age Range</ThemedText>
        <ThemedView style={{ width: '48%', marginTop: 12 }}>
          <Picker selectedValue={selectedAgeRange} onValueChange={(itemValue) => setSelectedAgeRange(itemValue)} style={[styles.textBox , {color: colorScheme === 'light' ? '#000' : '#fff', backgroundColor: colorScheme === 'light' ? '#fff' : '#1a1a1a'}]} dropdownIconColor={colorScheme === 'light' ? '#000' : '#fff'}>
            <Picker.Item label="8 - 10" value="8to10" color={colorScheme === 'light' ? '#000' : '#fff'} />
            <Picker.Item label="11 - 14" value="11to14" color={colorScheme === 'light' ? '#000' : '#fff'} />
            <Picker.Item label="14 - 18" value="14to18" color={colorScheme === 'light' ? '#000' : '#fff'} />
            <Picker.Item label="18+" value="18plus" color={colorScheme === 'light' ? '#000' : '#fff'} />
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