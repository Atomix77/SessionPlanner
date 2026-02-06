import { Image } from 'expo-image';
import { Stack } from 'expo-router';
import { Platform, StyleSheet, ScrollView, TouchableOpacity, TextInput, Pressable, Switch, ActivityIndicator, Alert } from 'react-native';
import { useState } from 'react';
import { Compass, Goal, Users, Wind, Sailboat, Info, AlertCircle, CheckCircle, Clock, BookOpen, Anchor } from "lucide-react"
import { Picker } from '@react-native-picker/picker';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';

import { generateAISessionPlan, AISessionPlan, getActivityColor, getActivityIcon } from '../utils/aiSessionPlanner';
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
  const tideDirectionLabels: Record<string, string> = {
    'Ebb': 'Ebb (outgoing) throughout',
    'Flood': 'Flood (incoming) throughout',
    'Slack': 'Slack / negligible flow',
    'EbbToSlack': 'Ebb → Slack (outgoing, easing)',
    'EbbToFlood': 'Ebb → Flood (tide turning, outgoing to incoming)',
    'SlackToEbb': 'Slack → Ebb (building outgoing)',
    'SlackToFlood': 'Slack → Flood (building incoming)',
    'FloodToSlack': 'Flood → Slack (incoming, easing)',
    'FloodToEbb': 'Flood → Ebb (tide turning, incoming to outgoing)',
    'Cross': 'Cross tide (perpendicular to wind)',
  };
  const [waveHeight, setWaveHeight] = useState('0');
  const [tidal, setTidal] = useState('No');
  const boatOptions = [
            { label: 'Small Single Hander', value: 'smallSingle' },
            { label: 'Single Hander', value: 'single' },
            { label: 'Double Hander', value: 'double' },
            { label: 'Large Double Hander', value: 'largeDouble' },
            { label: 'Multi-Crew', value: 'multi' },
          ];
  const [selectedBoats, setSelectedBoats] = useState<string[]>([]);
  const [boatsPreRigged, setBoatsPreRigged] = useState(false);
  const toggleBoat = (boat: string) => {
    setSelectedBoats(prev =>
      prev.includes(boat)
        ? prev.filter(b => b !== boat)
        : [...prev, boat]
    );
  };
  const [games, setGames] = useState('');
  const [sessionPlan, setSessionPlan] = useState<AISessionPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatMinutes = (mins: number): string => {
    if (!Number.isFinite(mins) || mins < 0) return '00:00';
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const formatRangeLabel = (start: number, end: number): string => {
    const startLabel = formatMinutes(start);
    const endLabel = formatMinutes(end);
    return `${startLabel} - ${endLabel}`;
  };

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

        <ThemedView style={{ marginTop: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <ThemedText style={{ fontSize: 18, fontWeight: '500' }}>Boats pre-rigged?</ThemedText>
          <Switch
            value={boatsPreRigged}
            onValueChange={setBoatsPreRigged}
            trackColor={{ false: colorScheme === 'light' ? '#d1d5db' : '#374151', true: colorScheme === 'light' ? '#7dd3fc' : '#0ea5e9' }}
            thumbColor={boatsPreRigged ? '#087ca3' : (colorScheme === 'light' ? '#f9fafb' : '#f3f4f6')}
          />
        </ThemedView>
        <ThemedText style={{ marginTop: 6, color: colorScheme === 'light' ? '#6b7280' : '#9ca3af' }}>
          Enable if boats are already rigged so setup focuses on quick safety inspections.
        </ThemedText>
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
              <Picker selectedValue={courseType} onValueChange={(itemValue) => {
                setCourseType(itemValue);
                // Reset course to first valid option for the new course type
                const firstCourseMap: Record<string, string> = {
                  'Youth': 'Stage1',
                  'YouthRacing': 'YouthStartRacing',
                  'Adult': 'Level1',
                  'AdultRacing': 'AdultStartRacing',
                  'Advanced': 'PerformanceSailing',
                };
                setCourse(firstCourseMap[itemValue] || 'Stage1');
              }} style={[styles.textBox , {color: colorScheme === 'light' ? '#000' : '#fff', backgroundColor: colorScheme === 'light' ? '#fff' : '#1a1a1a'}]} dropdownIconColor={colorScheme === 'light' ? '#000' : '#fff'}>
                <Picker.Item label="Youth" value="Youth" />
                <Picker.Item label="Youth Racing" value="YouthRacing" />
                <Picker.Item label="Adult" value="Adult" />
                <Picker.Item label="Adult Racing" value="AdultRacing" />
                <Picker.Item label="Advanced" value="Advanced" />
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
                  case 'YouthRacing':
                    courseOptions = [
                      { label: "Start Racing", value: "YouthStartRacing" },
                      { label: "Club Racing", value: "YouthClubRacing" },
                      { label: "Regional Racing", value: "YouthRegionalRacing" },
                      { label: "Championship Racing", value: "YouthChampionshipRacing" },
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
                  case 'AdultRacing':
                    courseOptions = [
                      { label: "Start Racing", value: "AdultStartRacing" },
                      { label: "Intermediate Racing", value: "IntermediateRacing" },
                      { label: "Advanced Racing", value: "AdvancedRacing" },
                    ];
                    break;
                  case 'Advanced':
                    courseOptions = [
                      { label: "Performance Sailing", value: "PerformanceSailing" },
                      { label: "Seamanship Skills", value: "SeamanshipSkills" },
                      { label: "Day Sailing", value: "DaySailing" },
                      { label: "Sailing with Spinnakers", value: "SailingWithSpinnakers" },
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
                <Picker.Item label="Ebb (outgoing) throughout" value="Ebb" />
                <Picker.Item label="Flood (incoming) throughout" value="Flood" />
                <Picker.Item label="Slack / negligible flow" value="Slack" />
                <Picker.Item label="Ebb → Slack (easing)" value="EbbToSlack" />
                <Picker.Item label="Ebb → Flood (tide turning)" value="EbbToFlood" />
                <Picker.Item label="Slack → Ebb (building out)" value="SlackToEbb" />
                <Picker.Item label="Slack → Flood (building in)" value="SlackToFlood" />
                <Picker.Item label="Flood → Slack (easing)" value="FloodToSlack" />
                <Picker.Item label="Flood → Ebb (tide turning)" value="FloodToEbb" />
                <Picker.Item label="Cross tide" value="Cross" />
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
                      const sanitised = text.replace(',', '.');
                      if (/^\d*\.?\d*$/.test(sanitised) || sanitised === '') {
                        setWaveHeight(sanitised);
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
        style={({ pressed }) => [[styles.mainButton],{backgroundColor: pressed? (colorScheme === 'light' ? '#087ca3' : '#005073') : (colorScheme === 'light' ? '#0ea5e9' : '#087ca3'), opacity: isGenerating ? 0.7 : 1}]}
        disabled={isGenerating}
        onPress={async () => {
          // Convert tide strength string to number
          const tideStrengthMap: Record<string, number> = {
            'slack': 0,
            'light': 1,
            'moderate': 2,
            'strong': 4,
            'spring': 6,
          };
          
          const sessionInfo = {
            instructorCount,
            studentCount,
            ageRange,
            sessionLength: parseInt(sessionLength),
            courseType,
            course,
            windSpeed,
            gustSpeed,
            tideStrength: tidal === "No" ? 0 : (tideStrengthMap[tideStrength] ?? 0),
            tideDirection: tidal === "No" ? "N/A" : (tideDirectionLabels[tideDirection] || tideDirection),
            waveHeight: parseFloat(waveHeight) || 0,
            tidal: tidal === "Yes",
            selectedBoats,
            games: games.split(',').map(g => g.trim()).filter(g => g.length > 0),
            boatsPreRigged,
          };
          
          setIsGenerating(true);
          setError(null);
          setSessionPlan(null);
          
          try {
            const plan = await generateAISessionPlan(sessionInfo);
            console.log('Session Plan:', plan);
            setSessionPlan(plan);
          } catch (err) {
            console.error('Session Plan generation failed:', err);
            const errorMessage = err instanceof Error ? err.message : 'Failed to generate plan';
            setError(errorMessage);
            // Fallback to deterministic planner
            try {
              const fallbackPlan = generateSessionPlan(sessionInfo);
              console.log('Fallback Plan:', fallbackPlan);
              // Convert fallback plan to AI format for display
              setSessionPlan({
                activities: fallbackPlan.timeline.map((item: any) => ({
                  name: item.title,
                  approximateDuration: `~${item.durationMin} min`,
                  type: item.type,
                  teachingNotes: item.instructions,
                })),
                safetyNotes: fallbackPlan.safetyNotes,
                planSummary: fallbackPlan.planSummary + ' (Generated using fallback planner)',
                courseCompletionNotes: 'Generated using fallback planner due to an error.',
                weatherConsiderations: fallbackPlan.weatherAnalysis
                  ? [
                      `Wind: ${fallbackPlan.weatherAnalysis.conditions.windLevel}, Sea: ${fallbackPlan.weatherAnalysis.conditions.seaState}`,
                      ...fallbackPlan.weatherAnalysis.recommendations,
                      ...fallbackPlan.weatherAnalysis.adaptations,
                    ].filter(Boolean).join('. ')
                  : '',
                instructorTips: [
                  ...(fallbackPlan.plannerNotes || []),
                  ...(fallbackPlan.contingencyPlans || []).map((c: string) => `📋 ${c}`),
                ],
                estimatedTotalTime: `${Math.floor(fallbackPlan.totalPlannedMin / 60)}h ${fallbackPlan.totalPlannedMin % 60}m`,
                priorityActivities: [],
                optionalActivities: [],
              });
            } catch (fallbackErr) {
              console.error('Fallback also failed:', fallbackErr);
            }
          } finally {
            setIsGenerating(false);
          }
        }}
      >
        {isGenerating ? (
          <ThemedView style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
            <ActivityIndicator color="#fff" style={{ marginRight: 8 }} />
            <ThemedText style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
              Generating Session Plan...
            </ThemedText>
          </ThemedView>
        ) : (
          <ThemedText style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
            Generate Session Plan
          </ThemedText>
        )}
      </Pressable>
      
      {error && (
        <ThemedView style={[styles.contentContainer, { marginTop: 16, borderColor: '#ef4444', backgroundColor: colorScheme === 'light' ? '#fef2f2' : '#450a0a' }]}>
          <ThemedView style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent' }}>
            <AlertCircle size={20} color="#ef4444" />
            <ThemedText style={{ marginLeft: 8, color: '#ef4444', fontWeight: 'bold' }}>Session Plan Generation Failed</ThemedText>
          </ThemedView>
          <ThemedText style={{ marginTop: 8, color: colorScheme === 'light' ? '#991b1b' : '#fca5a5' }}>{error}</ThemedText>
          <ThemedText style={{ marginTop: 4, color: colorScheme === 'light' ? '#6b7280' : '#9ca3af', fontStyle: 'italic' }}>Using fallback planner instead.</ThemedText>
        </ThemedView>
      )}
      {sessionPlan && (
      <ThemedView style={[styles.contentContainer, { marginTop: 16 }]}> 
        <ThemedView style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, backgroundColor: 'transparent' }}>
          <CheckCircle size={28} color="#22c55e" />
          <ThemedText type="title" style={{ fontSize: 22, fontWeight: 'bold', marginLeft: 8 }}>
            Session Plan
          </ThemedText>
        </ThemedView>

        {/* Summary */}
        {sessionPlan.planSummary && (
          <ThemedView style={{ backgroundColor: colorScheme === 'light' ? '#f0f9ff' : '#0c2d48', padding: 12, borderRadius: 8, marginBottom: 16 }}>
            <ThemedText style={{ fontStyle: 'italic', color: colorScheme === 'light' ? '#0369a1' : '#7dd3fc' }}>
              {sessionPlan.planSummary}
            </ThemedText>
          </ThemedView>
        )}

        {/* Estimated Time */}
        {sessionPlan.estimatedTotalTime && (
          <ThemedView style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, backgroundColor: 'transparent' }}>
            <Clock size={18} color={colorScheme === 'light' ? '#6b7280' : '#9ca3af'} />
            <ThemedText style={{ marginLeft: 8, color: colorScheme === 'light' ? '#6b7280' : '#9ca3af' }}>
              Estimated Duration: {sessionPlan.estimatedTotalTime}
            </ThemedText>
          </ThemedView>
        )}

        {/* Weather Considerations */}
        {sessionPlan.weatherConsiderations && (
          <ThemedView style={{ backgroundColor: colorScheme === 'light' ? '#fffbeb' : '#422006', padding: 12, borderRadius: 8, marginBottom: 16 }}>
            <ThemedView style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent' }}>
              <Wind size={18} color="#f59e0b" />
              <ThemedText style={{ fontWeight: 'bold', marginLeft: 8, color: '#f59e0b' }}>Weather Considerations</ThemedText>
            </ThemedView>
            <ThemedText style={{ marginTop: 8, color: colorScheme === 'light' ? '#92400e' : '#fcd34d' }}>
              {sessionPlan.weatherConsiderations}
            </ThemedText>
          </ThemedView>
        )}

        {/* Activities Timeline */}
        <ThemedView style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, backgroundColor: 'transparent' }}>
          <BookOpen size={20} color={colorScheme === 'light' ? '#087ca3' : '#0ea5e9'} />
          <ThemedText style={{ fontWeight: 'bold', marginLeft: 8, fontSize: 18 }}>Session Activities</ThemedText>
        </ThemedView>
        
        {sessionPlan.activities && sessionPlan.activities.length > 0 ? (
          sessionPlan.activities.map((activity, idx) => {
            const activityColor = getActivityColor(activity.type);
            const activityIcon = getActivityIcon(activity.type);

            return (
              <ThemedView key={idx} style={{ 
                marginVertical: 6, 
                padding: 12, 
                backgroundColor: colorScheme === 'light' ? '#fafafa' : '#1a1a1a',
                borderRadius: 8,
                borderLeftWidth: 4,
                borderLeftColor: activityColor,
              }}>
                <ThemedView style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'transparent' }}>
                  <ThemedView style={{ flexDirection: 'row', alignItems: 'center', flex: 1, backgroundColor: 'transparent' }}>
                    <ThemedText style={{ fontSize: 18, marginRight: 8 }}>{activityIcon}</ThemedText>
                    <ThemedText style={{ fontWeight: '600', color: activityColor, flex: 1 }}>
                      {activity.name}
                    </ThemedText>
                  </ThemedView>
                  <ThemedView style={{ 
                    backgroundColor: activityColor + '20', 
                    paddingHorizontal: 8, 
                    paddingVertical: 4, 
                    borderRadius: 12 
                  }}>
                    <ThemedText style={{ fontSize: 12, color: activityColor, fontWeight: '500' }}>
                      {activity.approximateDuration}
                    </ThemedText>
                  </ThemedView>
                </ThemedView>
                {activity.teachingNotes && (
                  <ThemedText style={{ marginTop: 8, marginLeft: 26, color: colorScheme === 'light' ? '#4b5563' : '#9ca3af', fontSize: 14 }}>
                    💡 {activity.teachingNotes}
                  </ThemedText>
                )}
                {activity.weatherAdjustments && (
                  <ThemedText style={{ marginTop: 4, marginLeft: 26, color: '#f59e0b', fontSize: 13, fontStyle: 'italic' }}>
                    🌤️ {activity.weatherAdjustments}
                  </ThemedText>
                )}
              </ThemedView>
            );
          })
        ) : (
          <ThemedText style={{ marginLeft: 8 }}>No activities planned.</ThemedText>
        )}

        {/* Priority Activities */}
        {sessionPlan.priorityActivities && sessionPlan.priorityActivities.length > 0 && (
          <ThemedView style={{ marginTop: 16, backgroundColor: 'transparent' }}>
            <ThemedText style={{ fontWeight: 'bold', marginBottom: 8, color: '#22c55e' }}>✅ Priority Activities (Must Complete)</ThemedText>
            {sessionPlan.priorityActivities.map((activity, idx) => (
              <ThemedText key={idx} style={{ marginLeft: 8, color: colorScheme === 'light' ? '#166534' : '#86efac' }}>
                • {activity}
              </ThemedText>
            ))}
          </ThemedView>
        )}

        {/* Optional Activities */}
        {sessionPlan.optionalActivities && sessionPlan.optionalActivities.length > 0 && (
          <ThemedView style={{ marginTop: 12, backgroundColor: 'transparent' }}>
            <ThemedText style={{ fontWeight: 'bold', marginBottom: 8, color: '#6b7280' }}>⏭️ Optional (If Time Permits)</ThemedText>
            {sessionPlan.optionalActivities.map((activity, idx) => (
              <ThemedText key={idx} style={{ marginLeft: 8, color: colorScheme === 'light' ? '#6b7280' : '#9ca3af' }}>
                • {activity}
              </ThemedText>
            ))}
          </ThemedView>
        )}

        {/* Course Completion Notes */}
        {sessionPlan.courseCompletionNotes && (
          <ThemedView style={{ marginTop: 16, padding: 12, backgroundColor: colorScheme === 'light' ? '#f0fdf4' : '#052e16', borderRadius: 8 }}>
            <ThemedView style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent' }}>
              <Anchor size={18} color="#22c55e" />
              <ThemedText style={{ fontWeight: 'bold', marginLeft: 8, color: '#22c55e' }}>Course Completion Notes</ThemedText>
            </ThemedView>
            <ThemedText style={{ marginTop: 8, color: colorScheme === 'light' ? '#166534' : '#86efac' }}>
              {sessionPlan.courseCompletionNotes}
            </ThemedText>
          </ThemedView>
        )}

        {/* Safety Notes */}
        {sessionPlan.safetyNotes && sessionPlan.safetyNotes.length > 0 && (
          <ThemedView style={{ marginTop: 16, padding: 12, backgroundColor: colorScheme === 'light' ? '#fef2f2' : '#450a0a', borderRadius: 8 }}>
            <ThemedText style={{ fontWeight: 'bold', marginBottom: 8, color: '#ef4444' }}>⚠️ Safety Notes</ThemedText>
            {sessionPlan.safetyNotes.map((note, idx) => (
              <ThemedText key={idx} style={{ marginLeft: 8, color: colorScheme === 'light' ? '#991b1b' : '#fca5a5', marginBottom: 4 }}>
                • {note}
              </ThemedText>
            ))}
          </ThemedView>
        )}

        {/* Instructor Tips */}
        {sessionPlan.instructorTips && sessionPlan.instructorTips.length > 0 && (
          <ThemedView style={{ marginTop: 16, padding: 12, backgroundColor: colorScheme === 'light' ? '#faf5ff' : '#2e1065', borderRadius: 8 }}>
            <ThemedText style={{ fontWeight: 'bold', marginBottom: 8, color: '#8b5cf6' }}>💡 Instructor Tips</ThemedText>
            {sessionPlan.instructorTips.map((tip, idx) => (
              <ThemedText key={idx} style={{ marginLeft: 8, color: colorScheme === 'light' ? '#6b21a8' : '#c4b5fd', marginBottom: 4 }}>
                • {tip}
              </ThemedText>
            ))}
          </ThemedView>
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