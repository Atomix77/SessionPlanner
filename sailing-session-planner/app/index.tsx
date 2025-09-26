import { Image } from 'expo-image';
import { Stack } from 'expo-router';
import { Platform, StyleSheet, ScrollView, TouchableOpacity, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import { Compass, Goal, Users, Wind, Sailboat, Info } from "lucide-react"
import { Picker } from '@react-native-picker/picker';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';

import { generateSessionPlan } from '../utils/sessionGenerator';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [instructorCount, setInstructorCount] = useState(1);
  const [studentCount, setStudentCount] = useState(3);
  const [ageRange, setAgeRange] = useState('10to14');
  const [sessionLength, setSessionLength] = useState(1 + ' hour');
  const [courseType, setCourseType] = useState('Youth');
  const [course, setCourse] = useState('Stage1');
  const [windSpeed, setWindSpeed] = useState(10);
  const [gustSpeed, setGustSpeed] = useState(15);
  const [tideStrength, setTideStrength] = useState(5);
  const [tideDirection, setTideDirection] = useState('Ebb');
  const [waveHeight, setWaveHeight] = useState('0');
  const [tidal, setTidal] = useState('No');
  const boatOptions = [
            { label: 'Single Hander', value: 'single' },
            { label: 'Double Hander', value: 'double' },
            { label: 'Large Double Hander', value: 'largeDouble' },
            { label: 'Multi-Crew', value: 'multi' },
          ];
  const [selectedBoats, setSelectedBoats] = useState<string[]>([]);
  const toggleBoat = (boat: string) => {
    setSelectedBoats(prev =>
      prev.includes(boat)
        ? prev.filter(b => b !== boat)
        : [...prev, boat]
    );
  };
  const [games, setGames] = useState('');
  const [sessionPlan, setSessionPlan] = useState<any>(null);


  return (
  <>
    <Stack.Screen options={{ headerShown: false }} />
    <ThemedView style={[styles.container,{ backgroundColor: colorScheme === 'light' ? '#fff' : '#000' }]}>
      <ThemedView style={[styles.bannerContainer, { backgroundColor: colorScheme === 'light' ? '#ffffff' : '#000000' , borderBottomColor: colorScheme === 'light' ? '#e4e4e4' : '#1a1a1aff',}]}>
        <Compass size={48} color="#087ca3"/>
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
        <ThemedView style={[{ display: 'flex', flexDirection: 'row', alignItems: 'center' }]}>
          <Users size={32} color={colorScheme === 'light' ? '#087ca3' : '#0ea5e9'} style={{ backgroundColor: colorScheme === 'light' ? '#ffffff' : '#151718', padding: 4, borderWidth: 2 }} />
          <ThemedText type="title" style={{ fontSize: 24, fontWeight: 'bold' }}> Session Participants </ThemedText>
        </ThemedView>
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
          <Picker selectedValue={ageRange} onValueChange={(itemValue) => setAgeRange(itemValue)} style={[styles.textBox , {color: colorScheme === 'light' ? '#000' : '#fff', backgroundColor: colorScheme === 'light' ? '#fff' : '#1a1a1a'}]} dropdownIconColor={colorScheme === 'light' ? '#000' : '#fff'}>
            <Picker.Item label="8 - 10" value="8to10" color={colorScheme === 'light' ? '#000' : '#fff'} />
            <Picker.Item label="11 - 14" value="11to14" color={colorScheme === 'light' ? '#000' : '#fff'} />
            <Picker.Item label="14 - 18" value="14to18" color={colorScheme === 'light' ? '#000' : '#fff'} />
            <Picker.Item label="18+" value="18plus" color={colorScheme === 'light' ? '#000' : '#fff'} />
          </Picker>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.contentContainer}>
        <ThemedView style={[{ display: 'flex', flexDirection: 'row', alignItems: 'center' }]}>
          <Info size={32} color={colorScheme === 'light' ? '#087ca3' : '#0ea5e9'} style={{ backgroundColor: colorScheme === 'light' ? '#ffffff' : '#151718', padding: 4, borderWidth: 2 }} />
          <ThemedText type="title" style={{ fontSize: 24, fontWeight: 'bold' }}> Session Details </ThemedText>
        </ThemedView>
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
              <Picker.Item label="1 Day" value="6hours" />
              <Picker.Item label="2 Days" value="12hours" />
            </Picker>
          </ThemedView>
      </ThemedView>

      <ThemedView style={styles.contentContainer}>
        <ThemedView style={[{ display: 'flex', flexDirection: 'row', alignItems: 'center' }]}>
          <Wind size={32} color={colorScheme === 'light' ? '#087ca3' : '#0ea5e9'} style={{ backgroundColor: colorScheme === 'light' ? '#ffffff' : '#151718', padding: 4, borderWidth: 2 }} />
          <ThemedText type="title" style={{ fontSize: 24, fontWeight: 'bold' }}> Sailing Conditions </ThemedText>
        </ThemedView>
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
              <Picker.Item label="No" value="No" />
              <Picker.Item label="Yes" value="Yes" />
            </Picker>
          </ThemedView>
        </ThemedView>
        {tidal !== "No" && (
          <ThemedView style={{ marginTop: 24, display: 'flex', flexDirection: 'row' }}>
            <ThemedView style={{width: '33%'}}>
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
            <ThemedView style={{width: '33%'}}>
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
            <ThemedView style={{width: '33%'}}>
              <ThemedText type="title" style={{ fontSize: 20, fontWeight: '500' }}> Wave Height (metres)</ThemedText>
                <ThemedView style={{ width: '95%', marginTop: 12 }}>
                  <TextInput
                    style={[styles.textBox, { backgroundColor: colorScheme === 'light' ? '#fff' : '#1a1a1a', color: colorScheme === 'light' ? '#000' : '#fff', }]}
                    keyboardType="decimal-pad"
                    value={waveHeight}
                    onChangeText={text => {
                      // Accept only valid decimal numbers or empty string
                      const sanitized = text.replace(',', '.');
                      if (/^\d*\.?\d*$/.test(sanitized) || sanitized === '') {
                        setWaveHeight(sanitized);
                      }
                    }}
                    inputMode="decimal"
                    placeholder="e.g. 0.5"
                    maxLength={5}
                  />
                </ThemedView>
            </ThemedView>
          </ThemedView>
        )}</ThemedView>

      <ThemedView style={styles.contentContainer}>
        <ThemedView style={[{ display: 'flex', flexDirection: 'row', alignItems: 'center' }]}>
          <Sailboat size={32} color={colorScheme === 'light' ? '#087ca3' : '#0ea5e9'} style={{ backgroundColor: colorScheme === 'light' ? '#ffffff' : '#151718', padding: 4, borderWidth: 2 }} />
          <ThemedText type="title" style={{ fontSize: 24, fontWeight: 'bold' }}> Boats and Equipment </ThemedText>
        </ThemedView>
        <ThemedText type="default" style={{ fontSize: 16, color: colorScheme === 'light' ? '#6b7280' : '#6b7280' }}>  Available Boats and Training Equipment </ThemedText>
        <ThemedText type="default" style={{ fontSize: 20, fontWeight: '500', marginTop: 12 }}> Available Boats</ThemedText>
        <ThemedView style={{ width: '100%', marginTop: 12 }}>
          <ThemedView style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {boatOptions.map(opt => {
              const count = selectedBoats.filter(b => b === opt.value).length;
              return (
                <ThemedView key={opt.value} style={{ alignItems: 'center', marginRight: 12, marginBottom: 8 }}>
                  <Pressable
                    onPress={() => toggleBoat(opt.value)}
                    style={[
                      styles.button,
                      {
                        borderColor: count > 0 ? '#087ca3' : '#e4e4e4',
                        backgroundColor: count > 0
                          ? (colorScheme === 'light' ? '#e6f7ff' : '#003a4d')
                          : (colorScheme === 'light' ? '#fff' : '#1a1a1a')
                      }
                    ]}
                  >
                    <ThemedText style={{
                      color: count > 0 ? '#087ca3' : (colorScheme === 'light' ? '#000' : '#fff'),
                      fontWeight: count > 0 ? 'bold' : 'normal'
                    }}>
                      {opt.label}
                    </ThemedText>
                  </Pressable>
                  <ThemedView style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                    <Pressable
                      onPress={() => {
                        setSelectedBoats(prev => prev.filter((b, i) => {
                          // Remove only one instance from the end
                          if (b === opt.value && prev.lastIndexOf(opt.value) === i) return false;
                          return true;
                        }));
                      }}
                      disabled={count === 0}
                      style={{
                        paddingHorizontal: 8,
                        opacity: count === 0 ? 0.4 : 1
                      }}
                    >
                      <ThemedText style={{ fontSize: 20, color: '#087ca3' }}>−</ThemedText>
                    </Pressable>
                    <ThemedText style={{ minWidth: 18, textAlign: 'center', fontSize: 16 }}>{count}</ThemedText>
                    <Pressable
                      onPress={() => setSelectedBoats(prev => [...prev, opt.value])}
                      style={{ paddingHorizontal: 8 }}
                    >
                      <ThemedText style={{ fontSize: 20, color: '#087ca3' }}>+</ThemedText>
                    </Pressable>
                  </ThemedView>
                </ThemedView>
              );
            })}
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.contentContainer}>
        <ThemedView style={[{ display: 'flex', flexDirection: 'row', alignItems: 'center' }]}>
          <Goal size={32} color={colorScheme === 'light' ? '#087ca3' : '#0ea5e9'} style={{ backgroundColor: colorScheme === 'light' ? '#ffffff' : '#151718', padding: 4, borderWidth: 2 }} />
          <ThemedText type="title" style={{ fontSize: 24, fontWeight: 'bold' }}> Games & Activities </ThemedText>
        </ThemedView>
        <ThemedText type="default" style={{ fontSize: 16, color: colorScheme === 'light' ? '#6b7280' : '#6b7280' }}>  Suggest games or activities to include in your session </ThemedText>
        <ThemedText type="default" style={{ fontSize: 20, fontWeight: '500', marginTop: 12 }}> Games to Play </ThemedText>
        <ThemedView style={{ width: '100%', marginTop: 12 }}>
          <TextInput style={[ styles.textBox,{ backgroundColor: colorScheme === 'light' ? '#fff' : '#1a1a1a', color: colorScheme === 'light' ? '#000' : '#fff', minHeight: 48}]} placeholder="E.g. Pirates, Tag, Relay Race..." placeholderTextColor={colorScheme === 'light' ? '#6b7280' : '#a3a3a3'}
            multiline
            numberOfLines={3}
            value={games}
            onChangeText={setGames}
          />
        </ThemedView>
      </ThemedView>
      <Pressable
        style={({ pressed }) => [[styles.mainButton],{backgroundColor: pressed? (colorScheme === 'light' ? '#087ca3' : '#005073') : (colorScheme === 'light' ? '#0ea5e9' : '#087ca3')}]}
        onPress={() => {
          const sessionInfo = {
            instructorCount,
            studentCount,
            ageRange,
            sessionLength: parseInt(sessionLength),
            courseType,
            course,
            windSpeed,
            gustSpeed,
            tideStrength: tidal === "No" ? 0 : tideStrength,
            tideDirection: tidal === "No" ? "N/A" : tideDirection,
            waveHeight: parseFloat(waveHeight) || 0,
            tidal: tidal === "Yes",
            selectedBoats,
            games: games.split(',').map(g => g.trim()).filter(g => g.length > 0),
          };
          const plan = generateSessionPlan(sessionInfo);
          console.log('Generated Plan:', plan);
          setSessionPlan(plan);
        }}
      >
        <ThemedText style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
          Generate Session Plan
        </ThemedText>
      </Pressable>

      {sessionPlan && (
        <ThemedView style={[styles.contentContainer, { marginTop: 16 }]}> 
          <ThemedText type="title" style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}>
            Session Plan
          </ThemedText>
          <ThemedText style={{ fontWeight: 'bold', marginTop: 8 }}>Boats:</ThemedText>
          {sessionPlan.boats && sessionPlan.boats.length > 0 ? (
            sessionPlan.boats.map((boat: string, idx: number) => (
              <ThemedText key={idx} style={{ marginLeft: 8, color: '#2980b9' }}>• {boat}</ThemedText>
            ))
          ) : (
            <ThemedText style={{ marginLeft: 8 }}>No boats selected.</ThemedText>
          )}
          <ThemedText style={{ fontWeight: 'bold', marginTop: 8 }}>Activities:</ThemedText>
          {sessionPlan.activities && sessionPlan.activities.length > 0 ? (
            sessionPlan.activities.map((activity: string, idx: number) => (
              <ThemedText key={idx} style={{ marginLeft: 8, marginBottom: 2 }}>• {activity}</ThemedText>
            ))
          ) : (
            <ThemedText style={{ marginLeft: 8 }}>No activities selected.</ThemedText>
          )}
          {sessionPlan.safetyNotes && sessionPlan.safetyNotes.length > 0 && (
            <>
              <ThemedText style={{ fontWeight: 'bold', marginTop: 8 }}>Safety Notes:</ThemedText>
              {sessionPlan.safetyNotes.map((note: string, idx: number) => (
                <ThemedText key={idx} style={{ marginLeft: 8, color: '#e67e22' }}>• {note}</ThemedText>
              ))}
            </>
          )}
          {sessionPlan.recommendedGames && sessionPlan.recommendedGames.length > 0 && (
            <>
              <ThemedText style={{ fontWeight: 'bold', marginTop: 8 }}>Games:</ThemedText>
              {sessionPlan.recommendedGames.map((game: string, idx: number) => (
                <ThemedText key={idx} style={{ marginLeft: 8, color: '#16a085' }}>• {game}</ThemedText>
              ))}
            </>
          )}
        </ThemedView>
      )}
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
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    marginRight: 8,
    marginBottom: 8,
  },
  mainButton: {
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  }

});