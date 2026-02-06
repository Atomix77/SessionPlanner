import { GoogleGenerativeAI } from '@google/generative-ai';
import Constants from 'expo-constants';

// Types
export interface SessionInfo {
    instructorCount: number;
    studentCount: number;
    ageRange: string;
    sessionLength: number;
    courseType: string;
    course: string;
    windSpeed: number;
    gustSpeed: number;
    tideStrength: number;
    tideDirection: string;
    waveHeight: number;
    tidal: boolean;
    selectedBoats: string[];
    games: string[];
    boatsPreRigged: boolean;
}

export interface ActivityItem {
    name: string;
    approximateDuration: string;
    type: 'setup' | 'practical' | 'theory' | 'knots' | 'packdown' | 'break' | 'briefing' | 'games' | 'transition';
    teachingNotes?: string;
    weatherAdjustments?: string;
}

export interface AISessionPlan {
    activities: ActivityItem[];
    safetyNotes: string[];
    planSummary: string;
    courseCompletionNotes: string;
    weatherConsiderations: string;
    instructorTips: string[];
    estimatedTotalTime: string;
    priorityActivities: string[];
    optionalActivities: string[];
}

// RYA Course Content for AI Context
const RYA_COURSE_CONTENT = `
## RYA Youth Sailing Scheme

### Stage 1 - Introduction
**Setup:**
- Assist with rigging a boat

**Practical Skills (Essential):**
- Paddle or row
- Steer on a reach and go about (reach to reach)
- Understand stopping, controlling speed, getting out of irons
- Prepare for a tow and steer when sailing and being towed
- Understand importance of staying with boat during capsize

**Theory:**
- Name basic parts of a boat (hull, mast, rudder, tiller, centreboard, sheets)
- Knowledge of wind direction

**Knots:**
- Figure of eight knot
- Reef knot

**General Competencies:**
- Be confident in water wearing buoyancy aid
- Be a responsive crew under instruction
- Call for assistance
- Action to assist those needing help
- Understand effect of basic boat controls

**Packdown:**
- Correct stowage of dinghy and gear

### Stage 2 - Basic Skills
**Setup:**
- Know what to wear for sailing
- Choose and correctly adjust buoyancy aid
- Put a boat head to wind for rigging
- Rig a dinghy
- Manoeuvre a trolley safely

**Practical Skills (Essential):**
- Control speed and stop by lying-to
- Get out of irons
- Go about (close reach to close reach)
- Sail a shallow triangle across the wind under supervision (gybing optional)
- Understand returning to a beach or pontoon
- Be scooped in during capsize recovery OR right one type of dinghy

**Theory:**
- Understand five essentials (sail setting, balance, trim, course made good, centreboard)
- Understand the No Go Zone
- Understand windward, leeward, and gybe
- Know spars and rigging
- Know parts of the sail
- Know sail controls and foils
- Know offshore and onshore winds
- Understand port/starboard rule
- Understand several ways of finding wind direction
- Importance of telling someone ashore
- Dangers of man-made hazards (power lines, weirs)

**Knots:**
- Round turn and two half hitches
- Reef knot

### Stage 3 - Intermediate
**Setup:**
- Rig, launch, and recover in a variety of conditions
- Reef a dinghy ashore according to weather conditions

**Practical Skills (Essential):**
- Sail on all points of sailing on a triangular course
- Tack upwind and Gybe from a training run
- Right a capsized dinghy as helm/crew
- Come alongside a moored boat
- Prepare for and take up tow from power craft
- Pick up a mooring
- Recover a man overboard

**Theory:**
- Understand racing course and starting procedure
- Understand points of sailing
- Understand how a sail works (basic aerodynamics)
- Use terminology afloat
- Advice for inland sailors going coastal
- Importance of personal safety and informing ashore
- Dangers of hypothermia and importance of correct clothing
- Understand Sail Safe - The 7 Common Senses
- Know port/starboard, windward boat, overtaking boat rules
- Know how to obtain a weather forecast
- Understand Beaufort Wind Scale
- Know when to reef
- Know boat buoyancy
- Know basic safety equipment

**Knots:**
- Bowline
- Clove hitch
- Rolling hitch

### Stage 4 - Advanced
**Setup:**
- Rig, launch, and recover in all wind directions
- Set up a boat for conditions using rigging/sail controls

**Practical Skills (Essential):**
- Recover a man overboard
- Right a capsized dinghy as helm/crew
- Return to a beach, jetty, or mooring safely in any wind direction

**Theory:**
- Knowledge of IRPCS (collision regulations)
- Knowledge of Beaufort Scale
- Knowledge of synoptic charts
- Knowledge of tidal ebb and flow
- Knowledge of spring and neap tides
- How to recover from total inversion
- Considerations for coastal sailing
- Applying IRPCS afloat
- IALA buoyage
- Using tide tables
- Finding direction of tidal streams

**Knots:**
- Figure of eight, Reef knot, Bowline, Clove hitch, Rolling hitch, Sheet bend

### Adult Level 1 - Start Sailing
**Rigging:**
- Basic rigging, parts of the sail, sail controls and foils
- Wind awareness ashore

**Sailing Techniques:**
- Wind awareness afloat
- Reaching - sailing across the wind
- Stopping - Lying-to
- Controlling speed
- Getting out of irons
- Tacking - turning front of boat through wind
- Sailing upwind
- The Five Essentials
- Sailing downwind
- Gybing - turning back of boat through wind from training run
- Good communication when manoeuvring (double-handers)
- Basic capsize recovery (optional)

**Theory - Sailing Background:**
- Know importance of personal safety, clothing, and buoyancy
- Awareness of other water users
- Basic rules of the road: avoid collision, power/sail, port/starboard, overtaking boat, windward boat
- Visual methods of attracting attention

**Theory - Meteorology:**
- Awareness of onshore and offshore winds
- Sources of weather information and relevance
- Effects on sailing location
- Beaufort Scale
- Conditions appropriate to ability and sailing location

**Theory - Emergency Equipment:**
- Potential hazards and risks of on-board fuel
- Stowage and use of fire extinguishers

**Ropework:**
- Figure of eight knot
- Round turn and two half hitches
- Secure rope to a cleat

**Launching and Recovery:**
- Secure boat on trolley
- Wheeling trolley clear of boats and overhead cables
- Launching and leaving shore
- Coming ashore and recovery

### Adult Level 2 - Basic Skills
**Rigging:**
- How to rig according to weather conditions
- Reefing ashore

**Sailing Techniques:**
- Leaving and returning to beach, jetty, or mooring
- Coming alongside a moored boat
- Sailing in close company
- Performing man-overboard recovery
- Awareness of lee-shore dangers
- The Five Essentials
- Tacking upwind, showing refined skill, losing minimal ground
- Gybing in controlled manner while sailing downwind
- Good communication when manoeuvring (double-handers)
- Awareness of other water users
- Sail around short course using all points of sail
- Right capsized boat using one method, knowledge of another

**Theory - Meteorology:**
- Sources of relevant weather, inshore forecasts and interpretation
- Beaufort Wind Scale
- When to reef
- How to understand a simple synoptic chart

**Theory - Sailing Background:**
- Boat storage ashore, launching, and recovery
- Basic rules of the road: avoid collisions, power/sail, port/starboard, windward boat, overtaking boat

**Theory - Coastal Waters:**
- Tide tables, tidal sequence of springs and neaps, ebb and flow
- Speed over ground with/against tidal flow
- Effect of wind direction and tidal flow on sailing conditions
- Importance of informing someone ashore, dangers of sailing alone
- How to access local information and advice for sea sailing

**Racing:**
- Understands course and starting procedure

**Ropework:**
- Bowline
- Clove hitch
- Reef knot

**General Knowledge:**
- Self-reliance and basic equipment
- Visual methods of attracting attention
- Points of sailing and the 'No-go Zone'
- How a sail works
- How a sailing boat moves (basic theory)

### Adult Level 3 - Better Sailing
**Rigging:**
- Use rig and sail controls for different weather conditions and sea states
- Check spinnaker rigged correctly (if fitted)

**Sailing Techniques:**
- Leave and return to shore, jetty, or mooring (windward and leeward shore)
- Recover man overboard effectively
- Use sail tell-tales effectively
- Reef a sail when required
- Demonstrate a 'dry capsize'
- Understand how to avoid inversion
- Sail using efficient application of Five Essentials
- Tack maintaining boat speed and balance, upwind
- Gybe maintaining boat speed and balance
- Good use of crew to best effect
- Understand timing of manoeuvres

**Theory - Sailing Background (IRPCS):**
- Apply IRPCS to other sailing vessels
- IRPCS applied to power-driven vessels
- Following or crossing narrow channels
- Action by stand-on vessel

**Theory - Sailing Theory:**
- Basic sail-control knowledge to change sail shape and power
- Points of sailing
- The Five Essentials

**Theory - Meteorology:**
- Basic terminology including Beaufort Scale
- How to obtain a weather forecast
- How to interpret a basic synoptic chart
- Awareness of changing weather conditions

**Additional Modules:**
- Seamanship: Anchoring in various conditions, sailing in adverse conditions
- Race: Simplified World Sailing Racing Rules, start and finish simple race, course selection
- Day Sailing: Basic chart orientation, cardinal/lateral buoyage, bearings and distances, tide tables, pre-planned routes
- Spinnaker: Basic introduction to handling as crew or helm, rig, hoist, drop
- Performance Skills: Trapeze intro (optional), better hiking technique

## Advanced Courses

### Seamanship Skills
- Leave and return to beach, jetty or mooring in various conditions
- Heave to, reef afloat, MOB recovery
- Towing, anchoring, sailing backwards
- IRPCS, weather interpretation, tidal awareness

### Sailing with Spinnakers
- Rig spinnaker and trapeze
- Hoist, gybe, and drop spinnaker
- Capsize recovery with spinnaker
- Racing courses and apparent wind

### Performance Sailing
- Efficient sailing on all points in varied conditions
- Wind shifts and gust utilisation
- Advanced capsize recovery
- Synoptic chart interpretation

### Day Sailing
- Plan and execute a day sail
- Navigation and pilotage
- Anchor and mooring techniques
- Weather and tide considerations

## Youth Racing Courses (from RYA Youth Sailing Scheme)

### Youth Start Racing
**Prerequisite:** Level 2/Stage 3 or above

**Starts:**
- Understand a timed start sequence
- Correctly start from the correct side
- Show and hold a close hauled course to the correct layline
- Understand when to tack for best results at the start

**Speed:**
- Use the Five Essentials effectively
- Hold an upright/flat trim to boat
- Tack and gybe and trim to suit course/mark

**Boat Handling:**
- Tack whilst upwind in a range of conditions
- Understand importance of heel and trim in all conditions
- Understand effect of boat handling on boat speed
- Recover from a capsize with time

**Strategy:**
- Source and use an appropriate weather forecast
- Understand what is a suitable wind strength to race in
- Appropriate technique for approaching and rounding windward mark
- MOB recovery to Level 2 standard

**Tactics:**
- Round a mark correctly
- Recognise headers and lifts
- Knowledge of difference between Col Regs at Sea and RRS
- Perform a sailing penalty (720 and 360 turns)
- Understand COLREGS and the rules

### Youth Club Racing
**Starts:**
- Understand the bias and identify the correct side
- Create and protect a gap
- Knowledge of strategy for where to start

**Speed:**
- Use tuning guide appropriate to boat
- Set rig to different conditions
- Use and adjust guide appropriately

**Boat Handling:**
- Use flat trap, keep boat flat, fly by effectively
- Demonstrate importance of consistent tacks and gybes for boat speed
- Consistently make all round manoeuvres at the home club

**Strategy:**
- Understand effect of water current on a course
- Build up map of the course and wind
- Understand how local area and wind trend affect course
- Understand key tide, rig and wind around course
- Understanding ECs/IRPCS Section C of the RRS

**Tactics:**
- Understand importance of clear air and how to judge interference
- Appropriately apply Racing Rules of Sailing
- Actions to keep safe, avoid another boat

### Youth Regional Racing
**Starts:**
- Prepare and protect a space to start
- Create a plan with time
- Post-race analysis

**Speed:**
- Understand differences between set up for different rigs
- Alter the rig whilst racing to suit conditions
- Account settings and adapt/prepare to suit conditions

**Boat Handling:**
- Know all manoeuvres used for range of winds/different starting conditions
- Demonstrate principle for selecting boat controls and when to use them
- Demonstrate recovery from a capsize in different conditions

**Strategy:**
- Develop a strategy that accounts for wind and tide during races
- Take on the conditions and course laid, adapt plan to race
- Skills and techniques needed to analyse at regional/national level

**Tactics:**
- Identify the races and judge the outcome
- Understand importance of clear lanes
- Know set of relevant rules
- Demonstrate using right of way against another boat
- Demonstrate sailing tight with another boat

### Youth Championship Racing
**Personalised Training** - Run by RYA Race Coach Level 3, minimum 50 hours

**Starts:**
- Recover the situation and adjust the start where most applicable
- Use strategies and can recover when this goes wrong

**Speed:**
- Understand how to use a tuning guide
- Analyse video and boat/race analysis to refine and improve
- Perform from slow manoeuvres how to sail in different conditions

**Boat Handling:**
- Demonstrate high levels of boat control
- Take advantage of boat controls to suit conditions
- Demonstrate to optimum form a start when this goes wrong

**Strategy:**
- Develop, plan, and adapt strategy to take into account of a race
- Show consistent boat speed throughout

**Tactics:**
- Know where all relevant rules are and how to apply them to better effect
- Analyse sailing and modes to improve
- Understand when to race aggressively vs conservatively
- Secure the best outcome through tactical decisions

## Adult Racing Courses

### Adult Start Racing
**Physical and Mental Preparation:**
- Food as fuel
- Keeping hydrated
- Confidence building

**Boat Preparation:**
- Basic tuning
- Knowledge of class tuning guides

**Boat Handling:**
- Basic roll tack
- Making best use of the Five Essentials
- Crew work (double-handers only)
- Mark rounding
- Laylines
- Hiking

**Boat Speed:**
- Altering sail controls
- Understanding how course and wind affect boat speed upwind and downwind
- Trimming for conditions

**Teamwork (for double-handers):**
- Understands requirements to develop a good partnership

**Strategy and Meteorology:**
- Source and understand a simple weather forecast
- Knowledge of clear air, gusts and lulls

**Racing Rules:**
- Basic understanding of Racing Rules of Sailing Part 2, Section A
- Rule 11 - Windward boat
- Rule 10 - Port/Starboard
- Rule 12 - Clear ahead/clear astern
- Rule 13 - Tacking

**Tactics:**
- Knowledge of basic boat-to-boat situations
- Basics of starting

**Starts:**
- Knowledge of timelines
- Demonstrate the basics of starting

**Other:**
- Introduction to local club racing

### Adult Intermediate Racing
**Mental and Physical Preparation:**
- Pre-session physical preparation - warm up
- Pre-session mental preparation - goals, clear headspace

**Boat Preparation:**
- Check all fittings
- Sail settings for conditions

**Boat Speed:**
- Point of sail
- Boat handling
- Boat trim
- Sail trim

**Boat Handling:**
- Roll tack
- Roll gybe
- Mark roundings

**Strategy and Meteorology:**
- Introduction to wind awareness
- Wind patterns

**Teamwork (for double-handers):**
- Communication
- Crew work

**Racing Rules:**
- Simplified Part 2 When Boats Meet
- Rule 10 (Port/Starboard)
- Rule 11 (Windward/Leeward)
- Rule 12 (Same tack, not overlapped)
- Rule 13 (While tacking)
- Rule 18 (Mark room - introduction)

**Tactics:**
- Basic fleet racing situations

**Starts:**
- Introduction
- Starting strategy
- Timing
- Positioning

### Adult Advanced Racing
**Mental and Physical Preparation:**
- Pre-session physical preparation - warm up, fitness awareness
- Pre-session mental preparation - goals, visualisation, focus

**Boat Preparation:**
- Advanced rig tuning for conditions
- All equipment checks

**Boat Speed:**
- VMG optimisation
- Different modes for conditions
- Advanced sail trim

**Boat Handling:**
- Advanced roll tacks and gybes
- Complex mark roundings
- Boat handling under pressure

**Tactics:**
- Controlling opponents
- Breaking cover
- Lee bow technique
- Match racing situations

**Racing Rules:**
- Full Racing Rules of Sailing in depth
- Rule 14 (Avoiding contact)
- Rule 15 (Acquiring right of way)
- Rule 16 (Changing course)
- Rule 18 (Mark room - advanced situations)
- Rule 19 (Room to pass an obstruction)
- Rule 20 (Room to tack at an obstruction)
- Protest procedures and hearings

**Strategy and Meteorology:**
- Wind patterns (persistent shifts, oscillations)
- Synoptic charts
- Local effects
- Tidal strategy

**Teamwork:**
- Communication under pressure
- Team coordination

**Starts:**
- Advanced strategy
- Front row execution
- Time and distance calculations

## Taster Sessions

### Youth Taster Session
- Experience being on the water in a dinghy
- Try steering the boat
- Feel the wind in the sails
- Basic boat familiarisation
- Fun and confidence building (1-2 hours max)

### Adult Taster Session
- Experience sailing across the wind
- Try controlling tiller and mainsheet
- Experience a tack
- Basic boat orientation
- Decide if sailing is for you (1-2 hours max)
`;

const SYSTEM_PROMPT = `You are an expert RYA (Royal Yachting Association) sailing instructor and session planner. Your task is to create a comprehensive sailing session plan that:

1. **Prioritises Safety**: Always consider weather conditions and participant capabilities
2. **Ensures Course Completion**: If time allows, include all required elements for the course
3. **Adapts to Conditions**: Modify activities based on wind, tide, and other factors
4. **Considers Age Groups**: Adjust pacing and complexity for different ages
5. **Maximises Learning**: Balance practical water time with essential theory

${RYA_COURSE_CONTENT}

## Planning Guidelines

### Time Allocation (approximate)
- Short sessions (1-2 hours): Focus on 2-3 key practical skills, minimal theory
- Medium sessions (3-4 hours): Full practical program with theory block
- Long sessions (6+ hours): Complete course coverage with breaks

### Weather Considerations
- Wind >15 knots or gusts >25 knots: Reduce sail area, consider shore-based activities
- Strong tide + wind: Extra caution, ensure swimming competency
- Light wind (<5 knots): Focus on technique, add games to maintain engagement

### Instructor Ratios
- Ideal: 1 instructor per 4-6 students
- Maximum: 1 instructor per 8 students (experienced groups only)
- High wind/young groups: 1 instructor per 3-4 students

### Boat Allocation
- Youth (8-14): 2 per single hander, 3-4 per double
- Youth (14-18): 1 per single hander, 2 per double
- Adults: 1 per single hander, 2 per double

### Session Structure
1. Welcome & Safety Briefing
2. Rigging/Setup (unless pre-rigged)
3. On-water practical blocks
4. Theory (shore-based, often after warming up from water)
5. Additional practical application
6. Games (if time and conditions allow)
7. Packdown & Debrief

IMPORTANT: Provide approximate durations as ranges (e.g., "~15-20 min") since actual timing varies based on group capability and conditions.

Respond ONLY with valid JSON matching this exact structure:
{
  "activities": [
    {
      "name": "Activity name",
      "approximateDuration": "~X-Y min",
      "type": "setup|practical|theory|knots|packdown|break|briefing|games|transition",
      "teachingNotes": "Tips for instructors",
      "weatherAdjustments": "How to adapt if conditions change"
    }
  ],
  "safetyNotes": ["Important safety considerations"],
  "planSummary": "Brief overview of the session focus",
  "courseCompletionNotes": "What course elements will/won't be covered and why",
  "weatherConsiderations": "How current conditions affect the plan",
  "instructorTips": ["Practical tips for running this session"],
  "estimatedTotalTime": "X hours Y minutes",
  "priorityActivities": ["Must-complete activities for course progression"],
  "optionalActivities": ["Can be skipped if time is short"]
}`;

function buildUserPrompt(sessionInfo: SessionInfo): string {
    const {
        instructorCount,
        studentCount,
        ageRange,
        sessionLength,
        courseType,
        course,
        windSpeed,
        gustSpeed,
        tideStrength,
        tideDirection,
        waveHeight,
        tidal,
        selectedBoats,
        games,
        boatsPreRigged,
    } = sessionInfo;

    const ageRangeMap: Record<string, string> = {
        '8to10': '8-10 years old',
        '11to14': '11-14 years old',
        '14to18': '14-18 years old',
        '18plus': 'Adults (18+)',
    };

    const boatTypeMap: Record<string, string> = {
        'smallSingle': 'Small Single Hander (e.g., Optimist)',
        'single': 'Single Hander (e.g., Laser)',
        'double': 'Double Hander (e.g., RS Feva)',
        'largeDouble': 'Large Double Hander (e.g., Wayfarer)',
        'multi': 'Multi-crew (e.g., RS Venture)',
    };

    const courseNameMap: Record<string, string> = {
        'Stage1': 'Youth Stage 1 - Introduction',
        'Stage2': 'Youth Stage 2 - Basic Skills',
        'Stage3': 'Youth Stage 3 - Intermediate',
        'Stage4': 'Youth Stage 4 - Advanced',
        'YouthTasterSession': 'Youth Taster Session',
        'YouthStartRacing': 'Youth Start Racing',
        'YouthClubRacing': 'Youth Club Racing',
        'YouthRegionalRacing': 'Youth Regional Racing',
        'YouthChampionshipRacing': 'Youth Championship Racing',
        'Level1': 'Adult Level 1 - Start Sailing',
        'Level2': 'Adult Level 2 - Basic Skills',
        'Level3': 'Adult Level 3 - Better Sailing',
        'AdultTasterSession': 'Adult Taster Session',
        'AdultStartRacing': 'Adult Start Racing',
        'IntermediateRacing': 'Adult Intermediate Racing',
        'AdvancedRacing': 'Adult Advanced Racing',
        'SeamanshipSkills': 'Seamanship Skills',
        'SailingWithSpinnakers': 'Sailing with Spinnakers',
        'PerformanceSailing': 'Performance Sailing',
        'DaySailing': 'Day Sailing',
    };

    const boats = selectedBoats.map(b => boatTypeMap[b] || b).join(', ') || 'Not specified';
    const requestedGames = games.filter(g => g.trim()).join(', ') || 'None specified';

    return `
## Session Request

**Participants:**
- Students: ${studentCount}
- Instructors: ${instructorCount}
- Age Range: ${ageRangeMap[ageRange] || ageRange}

**Course:**
- Type: ${courseType}
- Course: ${courseNameMap[course] || course}
- Session Length: ${sessionLength} hour(s)

**Weather Conditions:**
- Wind Speed: ${windSpeed} knots
- Gust Speed: ${gustSpeed} knots
- Tidal Location: ${tidal ? 'Yes' : 'No'}
${tidal ? `- Tide Strength: ${tideStrength}
- Tide Direction: ${tideDirection}
- Wave Height: ${waveHeight}m` : ''}

**Resources:**
- Available Boats: ${boats}
- Boats Pre-rigged: ${boatsPreRigged ? 'Yes' : 'No'}
- Requested Games/Activities: ${requestedGames}

Please create a detailed session plan that:
1. Covers as many course requirements as time allows
2. Prioritises practical on-water time
3. Includes appropriate safety briefings
4. Accounts for the weather conditions
5. Is suitable for the age group
6. Provides approximate timing ranges for flexibility

Remember to respond with valid JSON only.`;
}

export async function generateAISessionPlan(sessionInfo: SessionInfo): Promise<AISessionPlan> {
    const apiKey = Constants.expoConfig?.extra?.geminiApiKey || process.env.EXPO_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey) {
        throw new Error('Gemini API key not configured. Please set EXPO_PUBLIC_GEMINI_API_KEY in your environment.');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
        model: 'gemini-2.5-flash',
        generationConfig: {
            temperature: 0.7,
            topP: 0.9,
            maxOutputTokens: 16384,
            responseMimeType: 'application/json',
        },
    });

    const userPrompt = buildUserPrompt(sessionInfo);
    
    // Combine system prompt and user request into a single prompt
    const fullPrompt = `${SYSTEM_PROMPT}\n\n---\n\n${userPrompt}`;
    
    try {
        const result = await model.generateContent(fullPrompt);

        const response = await result.response;
        const text = response.text();
        
        // Try direct parse first (responseMimeType should give clean JSON)
        let plan: AISessionPlan | null = null;
        let parseError: string | null = null;
        
        try {
            plan = JSON.parse(text) as AISessionPlan;
        } catch (e) {
            parseError = e instanceof Error ? e.message : 'Unknown parse error';
            // Fallback: extract JSON from markdown code blocks
            const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
            if (jsonMatch) {
                try {
                    plan = JSON.parse(jsonMatch[1].trim()) as AISessionPlan;
                } catch { /* continue to next fallback */ }
            }
            
            if (!plan) {
                // Last resort: find first { to last }
                const start = text.indexOf('{');
                const end = text.lastIndexOf('}');
                if (start !== -1 && end > start) {
                    try {
                        plan = JSON.parse(text.substring(start, end + 1)) as AISessionPlan;
                    } catch { /* all parse attempts failed */ }
                }
            }
        }
        
        if (!plan) {
            // Check if response was truncated (no closing brace)
            const trimmed = text.trim();
            const isTruncated = trimmed.length > 0 && !trimmed.endsWith('}');
            const hint = isTruncated
                ? 'Response appears truncated — the AI output was cut off.'
                : `Parse error: ${parseError}`;
            console.error('AI response (first 500 chars):', text.substring(0, 500));
            throw new SyntaxError(hint);
        }
        
        // Validate required fields
        if (!plan.activities || !Array.isArray(plan.activities)) {
            throw new Error('Invalid response: missing activities array');
        }
        
        return plan;
    } catch (error) {
        if (error instanceof SyntaxError) {
            const detail = error.message || 'Unknown';
            throw new Error(`Failed to parse AI response (${detail}). Please try again.`);
        }
        throw error;
    }
}

// Helper function to convert AI plan to display-friendly format
export function formatActivityTime(duration: string): string {
    return duration.startsWith('~') ? duration : `~${duration}`;
}

export function getActivityColor(type: ActivityItem['type']): string {
    const colors: Record<ActivityItem['type'], string> = {
        setup: '#22c55e',      // green
        practical: '#3b82f6',  // blue
        theory: '#8b5cf6',     // purple
        knots: '#f59e0b',      // amber
        packdown: '#6b7280',   // gray
        break: '#ec4899',      // pink
        briefing: '#ef4444',   // red
        games: '#10b981',      // emerald
        transition: '#94a3b8', // slate
    };
    return colors[type] || '#6b7280';
}

export function getActivityIcon(type: ActivityItem['type']): string {
    const icons: Record<ActivityItem['type'], string> = {
        setup: '🔧',
        practical: '⛵',
        theory: '📚',
        knots: '🪢',
        packdown: '📦',
        break: '☕',
        briefing: '📋',
        games: '🎮',
        transition: '➡️',
    };
    return icons[type] || '📌';
}
