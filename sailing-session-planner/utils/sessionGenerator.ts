interface SessionInfo {
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

type CourseSection = {
    setup: { [activity: string]: number };
    practical: { [activity: string]: number };
    theory: { [topic: string]: number };
    knots: { [knot: string]: number };
    general: string[];
    packdown: { [activity: string]: number };
}
function getCourseContent(course: string): {
    setup: { name: string; duration: number }[];
    practical: { name: string; duration: number }[];
    theory: { name: string; duration: number }[];
    knots: { name: string; duration: number }[];
    general: string[];
    packdown: { name: string; duration: number }[];
} {
    const courseContentMap: { [key: string]: CourseSection } = {
        "Stage1": {
            setup: {
                // "Understand personal safety equipment and what to wear (head, hands, feet, body)": 0,
                // "Put on personal buoyancy correctly": 0,
                "Assist with rigging a boat": 15,
                // "Launch a dinghy and get under way with instruction": 5,
            },
            practical: {
                "Paddle or row": 10,
                "Steer on a reach and go about (reach to reach)": 60,
                "Understand stopping, controlling speed, getting out of irons": 30,
                "Prepare for a tow and steer when sailing and being towed": 15,
                "Understand importance of staying with boat during capsize": 15,
            },
            theory: {
                "Name basic parts of a boat (hull, mast, rudder, tiller, centreboard, sheets)": 15,
                "Knowledge of wind direction": 5,
            },
            knots: {
                "Tie a figure of eight knot": 5,
                "Tie a reef knot": 5,
            },
            general: [
                "Be confident in water wearing buoyancy aid",
                "Be a responsive crew under instruction",
                "Call for assistance",
                "Action to assist those needing help",
                "Understand effect of basic boat controls",
            ],
            packdown: {
                // "Secure boat to trolley": 0,
                "Correct stowage of dinghy and gear": 15,
            }
        },
        "Stage2": {
            setup: {
                "Know what to wear for sailing": 0,
                "Choose and correctly adjust buoyancy aid": 0,
                "Put a boat head to wind for rigging": 0,
                "Rig a dinghy": 15,
                "Manoeuvre a trolley safely (clear of boats and overhead cables)": 0,
                // "Launch and recover a small dinghy": 5,
            },
            practical: {
                "Control speed and stop by lying-to": 15,
                "Get out of irons": 15,
                "Go about (close reach to close reach)": 30,
                "Sail a shallow triangle across the wind under supervision (gybing optional)": 30,
                "Understand returning to a beach or pontoon": 30,
                "Be scooped in during capsize recovery OR right one type of dinghy": 15,
            },
            theory: {
                "Understand five essentials": 15,
                "Understand the No Go Zone": 5,
                "Understand windward, leeward, and gybe": 5,
                "Know spars and rigging": 5,
                "Know parts of the sail": 5,
                "Know sail controls and foils": 10,
                "Know offshore and onshore winds": 5,
                "Understand port/starboard rule": 10,
                "Understand several ways of finding wind direction": 5,
                "Importance of telling someone ashore": 2,
                "Dangers of man-made hazards (power lines, weirs)": 2,
            },
            knots: {
                "Tie a round turn and two half hitches": 5,
                "Tie a reef knot": 5,
            },
            general: [
                "Crew a boat effectively",
            ],
            packdown: {
                "Secure boat to trolley": 0,
                "Correct stowage of dinghy and gear": 15,
            },
        },
        "Stage3": {
            setup: {
                "Rig, launch, and recover in a variety of conditions": 10,
                "Reef a dinghy ashore according to weather conditions": 5,
            },
            practical: {
                "Sail on all points of sail on a triangular course": 30,
                "Tack upwind  and Gybe from a training run": 30,
                "Right a capsized dinghy as helm/crew": 15,
                "Come alongside a moored boat": 15,
                "Prepare for and take up tow from power craft": 15,
                "Pick up a mooring": 15,
                "Recover a man overboard": 30,
            },
            theory: {
                "Understand racing course and starting procedure": 15,
                "Understand points of sailing": 15,
                "Understand how a sail works (basic aerodynamics)": 15,
                "Use terminology afloat (windward, leeward, bear away, luff up)": 5,
                "Advice for inland sailors going coastal": 5,
                "Importance of personal safety and informing ashore": 5,
                "Dangers of hypothermia and importance of correct clothing": 5,
                "Understand Sail Safe - The 7 Common Senses": 15,
                "Know port/starboard, windward boat, overtaking boat rules": 15,
                "Know how to obtain a weather forecast": 5,
                "Understand Beaufort Wind Scale": 5,
                "Know when to reef": 5,
                "Know boat buoyancy": 5,
                "Know basic safety equipment (anchor, paddle, bailer)": 5
            },
            knots: {
                "Tie a bowline": 5,
                "Tie a clove hitch": 5,
                "Tie a rolling hitch": 5,
            },
            general: [
                "Demonstrate the five essentials (sail setting, balance, trim, course made good, centreboard)",
                "Importance of communication aboard",
                "Know importance of personal safety equipment",
            ],
            packdown: {
                "Recover a dinghy ashore": 5,
                "Secure boat to trolley": 0,
                "Correct stowage of dinghy and gear": 10,
            },
        },
        "Stage4": {
            setup: {
                "Rig, launch, and recover in all wind directions": 10,
                "Set up a boat for conditions using rigging/sail controls (mast rake, reefing etc.)": 5,
            },
            practical: {
                "Recover a man overboard": 30,
                "Right a capsized dinghy as helm/crew": 15,
                "Return to a beach, jetty, or mooring safely in any wind direction": 30,
            },
            theory: {
                "Knowledge of IRPCS (collision regulations)": 15,
                "Knowledge of Beaufort Scale": 5,
                "Knowledge of synoptic charts": 5,
                "Knowledge of tidal ebb and flow": 5,
                "Knowledge of spring and neap tides": 5,
                "How to recover from total inversion": 5,
                "Considerations for coastal sailing": 5,
                "Applying IRPCS afloat": 5,
                "IALA buoyage": 5,
                "Using tide tables": 5,
                "Finding direction of tidal streams": 5
            },
            knots: {
                "Tie a figure of eight knot": 5,
                "Tie a reef knot": 5,
                "Tie a bowline": 5,
                "Tie a clove hitch": 5,
                "Tie a rolling hitch": 5,
                "Tie a sheet bend": 5,
            },
            general: [
                "Demonstrate five essentials as helm and crew afloat (including tell-tales)",
                "Demonstrate Stage 3 sailing techniques in a crewed boat",
                "Communicate effectively as helm and crew",
            ],
            packdown: {
                "Recover a dinghy ashore": 5,
                "Secure boat to trolley": 0,
                "Correct stowage of dinghy and gear": 10,
            },
        },
        "YouthTasterSession": {
            setup: {
                "Introduction to personal buoyancy and fitting": 5,
                "Basic boat familiarisation": 10,
            },
            practical: {
                "Experience being on the water in a dinghy": 30,
                "Try steering the boat": 20,
                "Experience the feeling of the wind in the sails": 15,
                "Have a go at basic boat controls": 15,
            },
            theory: {
                "What is sailing? Basic introduction": 5,
                "Name 3-4 parts of the boat": 5,
                "Which way is the wind blowing?": 5,
            },
            knots: {
                "Tie a figure of eight knot (optional)": 5,
            },
            general: [
                "Have fun and enjoy the experience",
                "Gain confidence on the water",
                "Understand basic safety awareness",
            ],
            packdown: {
                "Help put equipment away": 10,
            },
        },
        "Level1": {
            setup: {
                "Basic rigging, parts of the sail, sail controls and foils": 15,
                "Has wind awareness ashore": 5,
            },
            practical: {
                "Wind awareness afloat": 15,
                "Reaching - sailing across the wind": 30,
                "Stopping - Lying-to": 10,
                "Controlling speed": 15,
                "Getting out of irons": 10,
                "Tacking - turning the front of the boat through the wind": 25,
                "Sailing upwind": 20,
                "The Five Essentials": 20,
                "Sailing downwind": 20,
                "Gybing - turning the back of the boat through the wind, from a training run": 25,
                "The importance of good communication when manoeuvring (double-handers)": 5,
                "Can perform a basic capsize recovery, and understands the importance of staying with the boat (Optional)": 20,
            },
            theory: {
                "Knows the importance of personal safety, clothing, and buoyancy": 5,
                "An awareness of other water users": 5,
                "Basic rules of the road - avoid a collision at all costs, power/sail, port/starboard, overtaking boat, windward boat": 10,
                "Visual methods of attracting attention": 5,
                "Has an awareness of onshore and offshore winds": 5,
                "Sources of weather information and their relevance": 5,
                "Effects on sailing location": 5,
                "Beaufort Scale": 5,
                "Conditions appropriate to ability and sailing location": 5,
                "Potential hazards and risks of on-board fuel": 5,
                "Stowage and use of fire extinguishers": 5,
            },
            knots: {
                "Tie a figure of eight knot, round turn and two half hitches, and secure a rope to a cleat": 10,
            },
            general: [
                "Secure a boat on the trolley",
                "Wheeling a trolley clear of other boats and overhead cables",
                "Launching and leaving the shore",
                "Coming ashore and recovery of a boat",
            ],
            packdown: {
                "Coming ashore and recovery of a boat": 10,
                "Secure boat on the trolley": 5,
            },
        },
        "Level2": {
            setup: {
                "How to rig according to weather conditions": 10,
                "Reefing ashore": 10,
            },
            practical: {
                "Leaving and returning to a beach, jetty, or mooring": 25,
                "Coming alongside a moored boat": 15,
                "Sailing in close company": 15,
                "Performing a man-overboard recovery": 25,
                "Is aware of lee-shore dangers": 10,
                "The Five Essentials": 15,
                "Can tack while sailing upwind, showing refined skill, losing minimal ground": 20,
                "Can gybe in a controlled manner while sailing downwind": 20,
                "Shows good communication when manoeuvring (double-handers)": 5,
                "Understands and shows awareness of other water users": 5,
                "Can sail around a short course using all points of sail and crewing skills": 30,
                "Can right a capsized boat using one method of righting, and has knowledge of at least one other": 20,
            },
            theory: {
                "Sources of relevant weather, inshore forecasts, and their interpretation": 10,
                "The Beaufort Wind Scale": 5,
                "When to reef": 5,
                "How to understand a simple synoptic chart": 10,
                "Boat storage ashore, launching, and recovery": 5,
                "Basic rules of the road: avoid collisions at all costs, power/sail, port/starboard, windward boat, overtaking boat": 10,
                "Tide tables, tidal sequence of springs and neaps, ebb and flow": 10,
                "Speed over ground with/against tidal flow": 5,
                "The effect of wind direction and tidal flow on sailing conditions": 10,
                "The importance of informing someone ashore, and the dangers of sailing alone": 5,
                "How to access local information and advice for sea sailing": 5,
            },
            knots: {
                "Can tie a bowline, clove hitch, and reef knot": 10,
            },
            general: [
                "Understands the course and starting procedure (may be covered as onshore teaching)",
                "Self-reliance and basic equipment",
                "Visual methods of attracting attention",
                "Has knowledge of the points of sailing and the 'No-go Zone'",
                "How a sail works",
                "How a sailing boat moves (basic theory)",
            ],
            packdown: {
                "Boat storage ashore, launching, and recovery": 10,
            },
        },
        "Level3": {
            setup: {
                "Understands how to use rig and sail controls to prepare the boat according to different weather conditions and sea states": 10,
                "Can check a spinnaker is rigged correctly (if fitted)": 5,
            },
            practical: {
                "Leave and return to a shore, jetty, or mooring (including windward and leeward shore in light conditions)": 25,
                "Recover a man overboard effectively": 25,
                "Use the sail tell-tales effectively": 15,
                "Reef a sail when required": 15,
                "Demonstrate a 'dry capsize'": 15,
                "Understand how to avoid inversion": 10,
                "Sail using efficient and skilful application of the Five Essentials": 20,
                "Tack - maintaining boat speed and balance, upwind": 20,
                "Gybe - maintaining boat speed and balance": 20,
                "Show good use of crew and to best effect (where applicable)": 15,
                "Understand when, and the importance of, timing manoeuvres": 10,
            },
            theory: {
                "The IRPCS, and can apply them to other sailing vessels": 10,
                "The IRPCS applied to power-driven vessels": 5,
                "Following or crossing narrow channels": 5,
                "Action by stand-on vessel": 5,
                "Basic sail-control knowledge to change the sail shape and power": 10,
                "The points of sailing": 5,
                "The Five Essentials": 10,
                "Basic meteorology terminology, including the Beaufort Scale": 10,
                "How to obtain a weather forecast": 5,
                "How to interpret a basic synoptic chart": 10,
                "Awareness of changing weather conditions": 5,
            },
            knots: {},
            general: [
                "Can demonstrate anchoring in various conditions",
                "Introduction to sailing in adverse conditions (centreboardless, rudderless sailing)",
                "Has knowledge of the 'simplified World Sailing Racing Rules of Sailing'",
                "Can start and finish a simple race",
                "Choose the best route to sail around a course, depending on conditions (using the Five Essentials)",
                "Basic chart orientation - including cardinal and lateral buoyage systems",
                "Can take bearings and measure distances on a chart",
                "Understands the effect of tide and wind direction on sailing conditions",
                "Can use a local tide table",
                "Can follow a pre-planned route",
                "Basic introduction to spinnaker handling as crew or helm, including rig, hoist, and drop",
                "Basic introduction to trapeze with instructor on the helm (Optional - boat-dependant)",
                "Introduction to better hiking technique",
            ],
            packdown: {
                "Efficient boat recovery and storage": 10,
            },
        },
        "AdultTasterSession": {
            setup: {
                "Introduction to personal buoyancy and fitting": 5,
                "Basic boat orientation": 10,
            },
            practical: {
                "Experience sailing across the wind": 25,
                "Try steering with the tiller": 20,
                "Try controlling speed with the mainsheet": 15,
                "Experience a tack (turning the boat)": 15,
            },
            theory: {
                "What makes a boat sail?": 5,
                "Basic boat parts (hull, mast, sail, rudder)": 5,
                "Wind direction awareness": 5,
            },
            knots: {},
            general: [
                "Enjoy a taste of sailing",
                "Build confidence on the water",
                "Decide if you want to learn more",
            ],
            packdown: {
                "Help store equipment": 5,
            },
        },
        "SeamanshipSkills": {
            setup: {
                "Rig, launch, and recover in all wind directions": 10,
            },
            practical: {
                "Can leave and return to beach, jetty or mooring (windward shore, leeward shore)": 10,
                "Heave to": 5,
                "Reef afloat": 5,
                "Recover MOB": 30,
                "Be towed": 5,
                "Anchor": 5,
                "Sail backwards": 10,
                "Knows how to prepare road trailer and secure ashore": 5,
            },
            theory: {
                "Understands sailing terminology (windward, leeward, abeam, forward, aft, ahead, astern, to weather, downwind, amidships, quarter, pinching, sailing by the lee, luff, bear away, planing, gybe, sternway, broaching)": 10,
                "Knows and can apply Sail Safe: The 7 Common Senses": 5,
                "Knows and can quote International Regulations for Preventing Collisions at Sea (IRPCS)": 10,
                "Meeting other sailing vessels": 5,
                "Meeting power-driven vessels": 5,
                "Following or crossing narrow channels": 5,
                "Action by stand-on vessel": 5,
                "Knows how to recover from total inversion": 10,
                "Knows sources of information on weather patterns for the day": 5,
                "Can interpret forecasts and understand local effect": 10,
                "Aware of Beaufort Scale and changing weather conditions": 10,
                "Can use local tide tables (coastal)": 10,
                "Understands Rule of Twelfths and is aware of tidal streams (coastal)": 5,
                "Has a basic understanding of charts and important symbols (coastal)": 10,
            },
            knots: {
                "Can tie a fisherman’s bend and sheet bend": 5,
                "Can do heat sealing & whipping": 10,
            },
            general: [
                "Sail in adverse circumstances",
                "Capable of practical application of skills in coastal waters (if appropriate)",
            ],
            packdown: {
                "Correct stowage of dinghy and gear": 10,
            },
        },
        "SailingWithSpinnakers": {
            setup: {
                "Can rig boats including spinnakers and trapeze (where fitted)": 15,
                "Understands how to launch boats with open transoms/racks": 5,
            },
            practical: {
                "Hoist spinnaker": 30,
                "Gybe with spinnaker": 30,
                "Drop spinnaker": 30,
                "Understands and can sail best course downwind": 30,
                "Perform capsize recovery with spinnaker": 15,
                "Knows how to recover from inversion": 10,
            },
            theory: {
                "Has knowledge of racing courses for type of boat": 5,
                "Understands the concept of apparent wind": 5,
                "Understands the effect of hull shapes on performance": 5,
                "Knows sources of information and applies rig set-up for different conditions": 5
            },
            knots: {},
            general: [
                "Sail as crew or helm using equipment to advantage",
            ],
            packdown: {
                "Correct stowage of dinghy and gear": 10,
            },
        },
        "PerformanceSailing": {
            setup: {
                "Can rig any type of boat, including spinnaker and trapeze (if equipped)": 15,
            },
            practical: {
                "Can sail efficiently on all points of sailing in a variety of conditions, symmetric or asymmetric spinnakers (where possible)": 60,
                "Can spot and use wind shifts and gusts to effect best course up/downwind": 30,
                "Can perform capsize recovery with spinnaker": 15,
                "Knows how to recover from total inversion": 10,
            },
            theory: {
                "Understands how to make use of wind variations and tidal eddies": 15,
                "Understands hull shape and rig types including their effect on performance": 10,
                "Understands planing and effect of rails": 15,
                "Knows sources of information on weather patterns for the day": 10,
                "Understands high- and low-pressure systems and simple interpretation of synoptic charts": 15,
                "Has awareness of changing weather conditions": 10,
            },
            knots: {},
            general: [
                "Can sail efficiently on all points of sailing in a variety of conditions, symmetric or asymmetric spinnakers (where possible)"
            ],
            packdown: {
                "Correct stowage of dinghy and gear": 10,
            },
        },
        "DaySailing": {
            setup: {
                "Can prepare and equip a boat for a day sail or short journey including safety and navigation equipment, clothing, and food":  30,
                "Can stow gear correctly": 10,
            },
            practical: {
                "Can plan and undertake a day sail including consideration of pilotage/navigation and collision avoidance": 30,
                "Can use anchor or moor to effect lee shore landing and departure": 30,
                "Is able to self-rescue following total inversion": 15,
            },
            theory: {
                "Can plan a day sail or short journey in coastal waters": 15,
                "Knows publications such as charts and tide tables": 15,
                "Understands navigation instruments": 15,
                "Knows use of GPS": 10,
                "Understands tidal heights and streams": 10,
                "Understands Rule of Twelfths": 10,
                "Can make decision making including planning alternatives": 10,
                "Understands magnetic compass: variation and deviation": 10,
                "Can use transits and bearings to steer and position fix": 10,
                "Can record position and dead reckoning": 10,
                "Understands chart work": 10,
                "Knows sources of information on weather patterns": 10,
                "Understands high- and low-pressure systems": 10,
                "Has awareness of changing weather conditions": 10,
                "Understands simple synoptic charts": 10
            },
            knots: {},
            general: [
                "Understands how to improvise in the event of gear failure",
                "Has knowledge of boat handling in strong winds and difficult conditions (practical where possible)",
            ],
            packdown: {
                "Correct stowage of dinghy and gear": 20,
            },
        },
        StartRacing: {
            setup: {},
            practical: {
                "Can identify a start line and start from the correct side.": 15,
                "Can slow the boat and accelerate to cross the line within 10 seconds after the start signal.": 30,
                "Understands the procedure if over the line at the start.": 15,
                "Understands the significance of port/starboard and windward/leeward.": 10,
                "Understands the use of heel and trim to aid steering.": 10,
                "Can tack and gybe in a range of conditions.": 15,
                "Can recover from a capsize with little assistance.": 15,
                "Can perform an MOB recovery to Level 2 standard.": 20,
                "Can hold an effective close-hauled course upwind.": 15,
            },
            theory: {
                "Understands a basic start sequence.": 5,
                "Understands how to round a mark.": 5,
                "Can recognise headers and lifts.": 5,
                "Has knowledge of the difference between the International Regulations for Preventing Collisions at Sea (IRPCS) and the Racing Rules of Sailing (RRS).": 15,
                "Understands other rules as shown.": 5,
                "Can source and use an appropriate weather forecast.": 5,
                "Understands what a suitable wind strength is to race in.": 5
            },
            knots: {},
            general: [
                "Can use the five essentials effectively.",
                "Can keep the boat upright using the toe straps to sit out and can trim the sail to aid this.",
            ],
            packdown: {
                "Understands an appropriate technique to approach and land when coming ashore, on lee shores, weather shores, or slipways.": 15,
            },
        },
        // Adult Racing Courses (from RYA Adult Sailing Scheme)
        "AdultStartRacing": {
            setup: {
                "Physical preparation - food as fuel, keeping hydrated": 5,
                "Mental preparation - confidence building": 5,
                "Basic tuning": 10,
                "Knowledge of class tuning guides": 5,
            },
            practical: {
                "Basic roll tack": 20,
                "Making best use of the Five Essentials": 25,
                "Crew work (double-handers)": 20,
                "Mark rounding": 20,
                "Laylines": 15,
                "Hiking": 15,
                "Altering sail controls for boat speed": 20,
                "Understanding how course and wind affect boat speed upwind and downwind": 20,
                "Trimming for conditions": 15,
                "Demonstrate the basics of starting": 25,
                "Knowledge of timelines for starts": 15,
            },
            theory: {
                "Racing Rules of Sailing Part 2, Section A - basic understanding": 20,
                "Rule 11 - Windward boat": 10,
                "Rule 10 - Port/Starboard": 10,
                "Rule 12 - Clear ahead/clear astern": 10,
                "Rule 13 - Tacking": 10,
                "Basic boat-to-boat tactical situations": 15,
                "Source and understand a simple weather forecast": 10,
                "Knowledge of clear air, gusts and lulls": 10,
            },
            knots: {},
            general: [
                "Designed to give confidence, skills and knowledge to take part in racing",
                "Introduction to local club racing",
                "Prerequisite: mastered practical skills from previous levels",
                "Understands requirements to develop a good partnership (double-handers)",
            ],
            packdown: {
                "Debrief and race analysis": 10,
                "Boat storage": 10,
            },
        },
        "IntermediateRacing": {
            setup: {
                "Pre-session mental preparation - goals, clear headspace": 5,
                "Boat preparation - check all fittings, sail settings": 15,
            },
            practical: {
                "Boat speed - point of sail, boat handling, boat trim, sail trim": 30,
                "Boat handling - roll tack, roll gybe, mark roundings": 30,
                "Starts - introduction, starting strategy, timing, positioning": 35,
                "Tactics - basic fleet racing situations": 25,
                "Introduction to strategy and wind awareness": 20,
                "Teamwork - communication, crew work (for double-handers)": 15,
            },
            theory: {
                "Simplified racing rules - Part 2 When Boats Meet": 20,
                "Rule 10 - Port/Starboard": 10,
                "Rule 11 - Windward/Leeward": 10,
                "Rule 12 - Same tack, not overlapped": 5,
                "Rule 13 - While tacking": 5,
                "Rule 18 - Mark room (introduction)": 15,
                "Basic meteorology for racing - wind patterns, shifts": 15,
                "Understanding course boards and signals": 10,
                "Penalty turns (720 and 360)": 5,
            },
            knots: {},
            general: [
                "Understands the importance of physical and mental preparation",
                "Can prepare boat for racing conditions",
                "Developing boat speed skills",
                "Developing boat handling skills",
                "Understanding basic strategy",
                "Introduction to racing rules",
                "Developing starting technique",
                "Understanding basic tactics",
                "Working as part of a team (double-handers)",
            ],
            packdown: {
                "Debrief and learning review": 10,
                "Boat storage and maintenance check": 10,
            },
        },
        "AdvancedRacing": {
            setup: {
                "Pre-session mental preparation - goals, visualisation, focus": 10,
                "Advanced boat preparation - rig tuning for conditions": 20,
            },
            practical: {
                "Advanced boat speed - VMG optimisation, modes": 35,
                "Advanced boat handling - advanced roll tacks/gybes, complex mark roundings": 35,
                "Starts - advanced strategy, front row execution, time and distance": 40,
                "Advanced tactics - controlling opponents, breaking cover, lee bow": 30,
                "Advanced strategy - wind patterns, persistent shifts, oscillations": 30,
                "Meteorology applied to racing venues": 20,
                "Advanced teamwork - communication under pressure": 20,
            },
            theory: {
                "Racing Rules of Sailing in depth": 25,
                "Rule 14 - Avoiding contact": 10,
                "Rule 15 - Acquiring right of way": 10,
                "Rule 16 - Changing course": 10,
                "Rule 18 - Mark room (advanced situations)": 15,
                "Rule 19 - Room to pass an obstruction": 10,
                "Rule 20 - Room to tack at an obstruction": 10,
                "Advanced meteorology - synoptic charts, local effects": 20,
                "Protest procedures and hearings": 15,
                "Understanding class rules and measurement": 10,
            },
            knots: {},
            general: [
                "High level physical and mental preparation",
                "Expert boat preparation and rig tuning",
                "Excellent boat speed in all conditions",
                "Highly refined boat handling",
                "Full command of racing rules",
                "Advanced starting technique",
                "Sophisticated tactical decision making",
                "Strategic race planning",
                "Effective teamwork under pressure",
            ],
            packdown: {
                "Detailed debrief and performance analysis": 15,
                "Equipment maintenance schedule": 10,
            },
        },
        // Youth Racing Courses (from RYA Youth Sailing Scheme)
        "YouthStartRacing": {
            setup: {
                "Rig boat for racing conditions": 10,
                "Check all fittings and controls": 5,
            },
            practical: {
                "Starts: Understand a timed start sequence": 15,
                "Starts: Correctly start from the correct side": 20,
                "Starts: Show and hold a close hauled course to the correct layline": 20,
                "Starts: Understand when to tack for best results at the start": 15,
                "Speed: Use the Five Essentials effectively": 20,
                "Speed: Hold an upright/flat trim to boat": 15,
                "Speed: Tack and gybe and trim to suit course/mark": 20,
                "Boat Handling: Tack whilst upwind in a range of conditions": 25,
                "Boat Handling: Understand importance of heel and trim in all conditions": 15,
                "Boat Handling: Understand effect of boat handling on boat speed": 15,
                "Boat Handling: Recover from a capsize with time": 20,
                "Tactics: Round a mark correctly": 15,
                "Tactics: Recognise headers and lifts": 20,
                "Tactics: Perform a sailing penalty (720 and 360 turns)": 15,
            },
            theory: {
                "Strategy: Source and use an appropriate weather forecast": 10,
                "Strategy: Understand what is a suitable wind strength to race in": 5,
                "Strategy: Appropriate technique for approaching and rounding windward mark": 10,
                "Knowledge of the difference between Col Regs at Sea and RRS": 10,
                "Understand COLREGS and the rules at shows": 10,
                "Can perform an MOB recovery to Level 2 standard": 10,
            },
            knots: {},
            general: [
                "Take part in club racing series",
                "Prerequisite: Level 2/Stage 3 or above",
                "Has knowledge of Racing Rules of Sailing",
            ],
            packdown: {
                "Debrief on race performance": 10,
                "Boat storage": 10,
            },
        },
        "YouthClubRacing": {
            setup: {
                "Use tuning guide appropriate to boat being used": 10,
                "Set rig to different conditions": 10,
            },
            practical: {
                "Starts: Understand the bias and can identify the correct side": 15,
                "Starts: Create and protect a gap": 20,
                "Starts: Has knowledge of strategy for where to start": 15,
                "Speed: Use and adjust guide appropriately": 15,
                "Boat Handling: Use flat trap, keep boat flat, fly by effectively": 20,
                "Boat Handling: Demonstrate importance of consistent tacks and gybes for boat speed": 25,
                "Boat Handling: Consistently make all round manoeuvres at the home club": 20,
                "Tactics: Understand importance of clear air and how to judge interference": 20,
                "Tactics: Appropriately apply Racing Rules of Sailing, sail/racing rules": 20,
                "Tactics: Actions to keep safe, avoid another boat": 15,
            },
            theory: {
                "Strategy: Understand effect of water current on a course": 10,
                "Strategy: Build up map of the course and wind": 10,
                "Strategy: Understand how local area and wind trend affect course": 10,
                "Strategy: Understand key tide, rig and wind around course": 10,
                "Understanding ECs/IRPCS Section C of the RRS": 15,
                "Knowledge of sail protection": 5,
            },
            knots: {},
            general: [
                "Regularly participates in club racing",
                "Attend club training",
                "Try a club race",
                "RYA Youth Junior Championships",
            ],
            packdown: {
                "Post-race analysis": 10,
                "Boat storage and maintenance": 10,
            },
        },
        "YouthRegionalRacing": {
            setup: {
                "Alter the rig whilst racing to suit conditions": 15,
                "Understand differences between set up for different rigs": 10,
                "Account settings and adapt/prepare to suit conditions": 10,
            },
            practical: {
                "Starts: Prepare and protect a space to start": 20,
                "Starts: Create a plan with time": 15,
                "Speed: Understand differences between set up for different rigs": 15,
                "Boat Handling: Know all manoeuvres used for range of winds/different starting conditions": 25,
                "Boat Handling: Demonstrate principle for selecting boat controls and when to use them": 20,
                "Boat Handling: Demonstrate recovery from a capsize in different conditions": 20,
                "Tactics: Identify the races and judge the outcome of the race": 15,
                "Tactics: Understand importance of clear lanes and how they affect outcome": 15,
                "Tactics: Know set of relevant rules at RYS": 15,
                "Tactics: Demonstrate using right of way against another boat": 20,
                "Tactics: Demonstrate sailing tight with another boat": 20,
            },
            theory: {
                "Strategy: Develop a strategy that accounts for wind and tide during races": 15,
                "Strategy: Take on the conditions and course laid, adapt plan to race": 15,
                "Strategy: Conditions to be achieved for best results": 10,
                "Post-race analysis skills": 10,
            },
            knots: {},
            general: [
                "Looking to develop skills to adapt to changing conditions",
                "Skills and techniques needed to analyse at regional/national level",
                "Post-race analysis capability",
            ],
            packdown: {
                "Detailed post-race analysis and notes": 15,
                "Equipment maintenance": 10,
            },
        },
        "YouthChampionshipRacing": {
            setup: {
                "Advanced rig setup for championship conditions": 20,
                "Pre-race boat preparation": 15,
            },
            practical: {
                "Starts: Recover the situation and adjust the start where most applicable": 25,
                "Starts: Use strategies and can recover when this goes wrong": 25,
                "Speed: Understand how to use a tuning guide": 15,
                "Speed: Analyse video and boat/race analysis to refine and improve": 20,
                "Speed: Perform from slow manoeuvres how to sail in different conditions": 20,
                "Boat Handling: Demonstrate high levels of boat control": 30,
                "Boat Handling: Take advantage of boat controls to suit conditions": 25,
                "Boat Handling: Demonstrate to optimum form a start when this goes wrong": 20,
                "Tactics: Know where all relevant rules are and how to apply them to better effect": 20,
                "Tactics: Analyse sailing and modes to improve": 20,
                "Tactics: Understand when to race aggressively vs conservatively": 20,
                "Tactics: Secure the best outcome through tactical decisions": 20,
            },
            theory: {
                "Strategy: Develop, plan, and adapt strategy to take into account of a race": 20,
                "Strategy: Show consistent boat speed throughout": 15,
                "Advanced Racing Rules knowledge": 20,
                "Championship campaign management": 15,
            },
            knots: {},
            general: [
                "More personalised training than a course",
                "Requires direct syllabus-based approach",
                "Takes into consideration needs of the sailor",
                "Run by RYA Race Coach Level 3",
                "Minimum 50 hours training",
                "Expected to participate regularly in open meetings",
                "National/international events",
                "RYA Youth/Junior Championships",
            ],
            packdown: {
                "Championship debrief and data analysis": 20,
                "Equipment check and maintenance schedule": 15,
            },
        },
    };

    const section = courseContentMap[course];
    if (!section) return {
        setup: [],
        practical: [],
        theory: [],
        knots: [],
        general: [],
        packdown: []
    };

    // Return items and their durations for each section
    return {
        setup: Object.entries(section.setup).map(([name, duration]) => ({ name, duration })),
        practical: Object.entries(section.practical).map(([name, duration]) => ({ name, duration })),
        theory: Object.entries(section.theory).map(([name, duration]) => ({ name, duration })),
        knots: Object.entries(section.knots).map(([name, duration]) => ({ name, duration })),
        general: section.general,
        packdown: Object.entries(section.packdown).map(([name, duration]) => ({ name, duration })),
    };
}
type TimelineEntry = {
    title: string;
    section: string;
    startMin: number;
    endMin: number;
    durationMin: number;
    type: 'setup' | 'practical' | 'theory' | 'knots' | 'packdown' | 'transition' | 'break' | 'briefing' | 'debrief' | 'buffer' | 'games';
    instructions?: string;
    notes?: string[];
};

function buildDetailedTimeline(
    sections: { section: string; activities: { name: string; duration: number }[] }[],
    totalSessionMinutes: number,
    generalSkills: string[],
    safetyNotes: string[]
): { timeline: TimelineEntry[]; totalPlannedMin: number; slackMinutes: number } {
    const timeline: TimelineEntry[] = [];
    let currentMin = 0;

    const addEntry = (
        title: string,
        sectionLabel: string,
        durationMin: number,
        type: TimelineEntry['type'],
        instructions?: string,
        notes?: string[]
    ) => {
        const safeDuration = Math.max(0, Math.round(durationMin));
        const entry: TimelineEntry = {
            title,
            section: sectionLabel,
            startMin: currentMin,
            endMin: currentMin + safeDuration,
            durationMin: safeDuration,
            type,
            instructions,
            notes,
        };
        timeline.push(entry);
        currentMin += safeDuration;
    };

    const sectionInstruction: Record<string, { type: TimelineEntry['type']; intro: string }> = {
        Setup: { type: "setup", intro: "Rig equipment and prepare for the session." },
        Practical: { type: "practical", intro: "Coach on-water skills and reinforce confidence." },
        Theory: { type: "theory", intro: "Run a focused classroom discussion linked to today’s drills." },
        Knots: { type: "knots", intro: "Hands-on knot work tied to real scenarios." },
        Packdown: { type: "packdown", intro: "Guide students through structured packdown and gear checks." },
        Break: { type: "break", intro: "Lunch break: rehydrate, eat, warm up, and regroup before the next phase." },
        Games: { type: "games", intro: "Run fun, engaging sailing games to reinforce skills and maintain energy levels." },
        Briefing: { type: "briefing", intro: "Deliver a focused briefing covering safety, objectives, and conditions." },
        Debrief: { type: "debrief", intro: "Facilitate reflection on the session, celebrate achievements, and set goals." },
    };

    const defaultDurations: Partial<Record<TimelineEntry['type'], number>> = {
        setup: 0,
        theory: 10,
        practical: 15,
        knots: 10,
        packdown: 0,
        break: 15,
        games: 10,
        briefing: 10,
        debrief: 10,
    };

    const getTransition = (from: string | null, to: string): { title: string; duration: number; instructions: string } | null => {
        if (!from || from === to) return null;
        if (to === "Setup") {
            return {
                title: "Gear Up & Prepare",
                duration: 15,
                instructions: "Put on the required gear and ensure you’re properly equipped for the session.",
            };
        }
        if (from === "Setup" && to === "Practical") {
            return {
                title: "Rigging Check & Launch",
                duration: 5,
                instructions: "Check rig settings, buddy pairs, and launch in sequence.",
            };
        }
        if (from === "Practical" && to === "Break") {
            return {
                title: "Towel Off & Classroom Reset",
                duration: 5,
                instructions: "Secure boats, dry off, and regroup indoors for the de-briefing.",
            };
        }
        if (from === "Theory" && to === "Practical") {
            return {
                title: "Apply Theory On-Water",
                duration: 5,
                instructions: "Gather kit, head to the boats, and set up for the next drill.",
            };
        }
        if (to === "Break") {
            return {
                title: "Gear Down & Pause",
                duration: 5,
                instructions: "Secure boats, hydrate, and regroup before the break activities.",
            };
        }
        if (from === "Break" && to === "Theory") {
            return {
                title: "Regroup Indoors",
                duration: 5,
                instructions: "Head inside, settle groups, and prepare materials for the theory segment.",
            };
        }
        if (from === "Break" && to === "Knots") {
            return {
                title: "Set Up Knot Stations",
                duration: 5,
                instructions: "Lay out ropes, assign partners, and brief the next activity focus.",
            };
        }
        if (from === "Break" && to === "Practical") {
            return {
                title: "Re-launch & Warm Up",
                duration: 5,
                instructions: "Check rigs, refresh safety points, and head back on the water.",
            };
        }
        if (from === "Practical" && to === "Packdown") {
            return {
                title: "Return to Shore",
                duration: 10,
                instructions: "Land safely and prepare boats for de-rigging.",
            };
        }
        if (to === "Packdown") {
            return {
                title: "Transition to Packdown",
                duration: 5,
                instructions: "Gather as a group, assign packdown roles, and prepare cleaning gear.",
            };
        }
        // Games transitions
        if (to === "Games") {
            return {
                title: "Set Up Games",
                duration: 3,
                instructions: "Brief the group on game rules and set up any required equipment.",
            };
        }
        if (from === "Games" && to === "Practical") {
            return {
                title: "Games to Drills",
                duration: 3,
                instructions: "Transition from games back to focused practical drills.",
            };
        }
        // Briefing/Debrief transitions
        if (to === "Briefing") {
            return {
                title: "Gather for Briefing",
                duration: 2,
                instructions: "Assemble the group for the session briefing.",
            };
        }
        if (to === "Debrief") {
            return {
                title: "Gather for Debrief",
                duration: 3,
                instructions: "Bring the group together for session reflection and feedback.",
            };
        }
        return null;
    };

    type SectionBlock = { section: string; activities: { name: string; duration: number }[] };

    const sectionQueue: SectionBlock[] = sections
        .map(block => ({
            section: block.section,
            activities: block.activities.map(activity => ({
                name: activity.name,
                duration: activity.duration,
            })),
        }))
        .filter(block => block.activities.length > 0);

    const computeDuration = (activityDuration: number, metaType: TimelineEntry['type']): number => {
        if (activityDuration && activityDuration > 0) {
            return activityDuration;
        }
        const fallback = defaultDurations[metaType];
        return typeof fallback === "number" ? fallback : 0;
    };

    let previousSection: string | null = null;
    let breakInserted = false
    let safetyBriefingInserted = false;
    let afterBreakActive = false;
    let postBreakPracticalAdded = false;

    const addTransitionFrom = (from: string | null, to: string) => {
        const transition = getTransition(from, to);
        if (transition) {
            addEntry(
                transition.title,
                "Transition",
                transition.duration,
                "transition",
                transition.instructions
            );
        }
    };

    const maybeAddSafetyBriefing = () => {
        if (safetyBriefingInserted) return;
        const briefingDuration = Math.min(15, Math.max(5, Math.max(safetyNotes.length, 1) * 5));
        addEntry(
            "Safety & Conditions Briefing",
            "Briefing",
            briefingDuration,
            "briefing",
            "Review weather, tides, launching plan, and emergency actions before heading out.",
            safetyNotes
        );
        safetyBriefingInserted = true;
    };

    const maybeInsertBreak = (remainingActivities: { name: string; duration: number }[]): boolean => {
        if (breakInserted) return false;
        const breakThreshold = totalSessionMinutes <= 240 ? 120 : 150;
        if (currentMin < breakThreshold) return false;

        breakInserted = true;
        const breakDuration = totalSessionMinutes <= 240 ? 30 : 60;
        const breakBlock: SectionBlock = {
            section: "Break",
            activities: [{ name: "Mid-Session Break", duration: breakDuration }],
        };

        const queuedAfterCurrent = sectionQueue.splice(0);
        const theoryBlocks: SectionBlock[] = [];
        const knotBlocks: SectionBlock[] = [];
        const otherBlocks: SectionBlock[] = [];

        for (const queued of queuedAfterCurrent) {
            if (queued.activities.length === 0) continue;
            if (queued.section === "Theory") {
                theoryBlocks.push(queued);
            } else if (queued.section === "Knots") {
                knotBlocks.push(queued);
            } else {
                otherBlocks.push(queued);
            }
        }

        const reordered: SectionBlock[] = [breakBlock, ...theoryBlocks, ...knotBlocks];

        if (remainingActivities.length > 0) {
            reordered.push({
                section: "Practical",
                activities: remainingActivities.map(activity => ({ ...activity })),
            });
        }

        reordered.push(...otherBlocks);
        sectionQueue.push(...reordered);
        return true;
    };

    const maybeQueuePostBreakPractical = () => {
        if (!afterBreakActive || postBreakPracticalAdded) {
            return;
        }

        const hasMoreTheoryOrKnots = sectionQueue.some(item =>
            (item.section === "Theory" || item.section === "Knots") && item.activities.length > 0
        );
        if (hasMoreTheoryOrKnots) {
            return;
        }

        const upcomingPractical = sectionQueue.some(item => item.section === "Practical" && item.activities.length > 0);
        if (upcomingPractical) {
            return;
        }

        const queuedDuration = sectionQueue.reduce(
            (sum, queued) => sum + queued.activities.reduce((acc, activity) => acc + (activity.duration || 0), 0),
            0
        );
        const availableMinutes = Math.max(0, totalSessionMinutes - currentMin - queuedDuration);
        const targetDuration = totalSessionMinutes >= 360 ? 45 : totalSessionMinutes >= 300 ? 35 : 25;
        const extraDuration = Math.min(targetDuration, availableMinutes);

        if (extraDuration >= 10) {
            sectionQueue.unshift({
                section: "Practical",
                activities: [{ name: "Consolidation On-Water Drills", duration: extraDuration }],
            });
            postBreakPracticalAdded = true;
        }
    };

    while (sectionQueue.length > 0) {
        const block = sectionQueue.shift()!;
        if (block.activities.length === 0) {
            continue;
        }

        const metaConfig = sectionInstruction[block.section];
        const metaType: TimelineEntry['type'] = metaConfig?.type ?? "practical";
        const intro = metaConfig?.intro ?? `Lead the ${block.section.toLowerCase()} block.`;

        if (block.section === "Practical") {
            maybeAddSafetyBriefing();
            addTransitionFrom(previousSection, "Practical");

            const lastEntry = timeline[timeline.length - 1];
            if (!lastEntry || lastEntry.title !== "Rigging Check & Launch") {
                addEntry(
                    "Rigging Check & Launch",
                    "Transition",
                    5,
                    "transition",
                    "Check rig tension, buddy pairs, and launch in sequence."
                );
            }

            for (let idx = 0; idx < block.activities.length; idx++) {
                const activity = block.activities[idx];
                const duration = computeDuration(activity.duration, metaType);
                const instructions = idx === 0
                    ? `${intro} Focus on developing practical sailing skills and confidence during ${activity.name}.`
                    : `Focus on developing practical sailing skills and confidence during ${activity.name}.`;
                addEntry(activity.name, block.section, duration, metaType, instructions);

                if (afterBreakActive) {
                    postBreakPracticalAdded = true;
                    afterBreakActive = false;
                }

                const remainingActivities = block.activities.slice(idx + 1);
                const breakTriggered = maybeInsertBreak(remainingActivities);
                if (breakTriggered) {
                    break;
                }
            }

            maybeInsertBreak([]);
        } else {
            if (block.section === "Break") {
                addTransitionFrom(previousSection, "Break");
                afterBreakActive = true;
                postBreakPracticalAdded = false;
            } else {
                addTransitionFrom(previousSection, block.section);
            }

            block.activities.forEach((activity, idx) => {
                const duration = computeDuration(activity.duration, metaType);
                let instructions = "";
                if (block.section === "Theory" || block.section === "Knots") {
                    instructions = idx === 0
                    ? `${intro} Focus on developing practical sailing skills and confidence during ${activity.name}.`
                    : `Focus on developing practical sailing skills and confidence during ${activity.name}.`;
                } else if (block.section === "Break") {
                    instructions = idx === 0
                        ? `${intro} Focus on relaxation and recovery during this break.`
                        : `Focus on relaxation and recovery during this break.`;
                } else if (block.section === "Games") {
                    instructions = idx === 0
                        ? `${intro} ${activity.name} - keep energy high and reinforce skills through play.`
                        : `Next game: ${activity.name} - maintain engagement and fun.`;
                } else if (block.section === "Briefing") {
                    instructions = idx === 0
                        ? `${intro} Cover ${activity.name} clearly and concisely.`
                        : `Continue briefing: ${activity.name}.`;
                } else if (block.section === "Debrief") {
                    instructions = idx === 0
                        ? `${intro} Review ${activity.name} and encourage student reflection.`
                        : `Continue debrief: ${activity.name}.`;
                }
                addEntry(activity.name, block.section, duration, metaType, instructions);
            });

            if ((block.section === "Theory" || block.section === "Knots") && afterBreakActive) {
                maybeQueuePostBreakPractical();
            }

            if (block.section === "Packdown") {
                afterBreakActive = false;
            }
        }

        previousSection = block.section;
    }

    const totalPlannedMin = currentMin;
    const slackMinutes = Math.max(totalSessionMinutes - totalPlannedMin, 0);

    return { timeline, totalPlannedMin, slackMinutes };
}

function createPlanSummary(
    practical: { name: string; duration: number }[],
    theory: { name: string; duration: number }[],
    knots: { name: string; duration: number }[],
    recommendedGames: string[],
    slackMinutes: number
): string {
    const practicalTotal = practical.reduce((sum, item) => sum + item.duration, 0);
    const theoryTotal = theory.reduce((sum, item) => sum + item.duration, 0);
    const knotTotal = knots.reduce((sum, item) => sum + item.duration, 0);

    const practicalFocus = practical.length > 0
        ? practical.slice(0, 3).map(item => item.name).join(', ')
        : 'core boat handling skills';
    const theoryFocus = theory.length > 0 ? theory.map(item => item.name.toLowerCase()).join(', ') : null;
    const knotFocus = knots.length > 0 ? knots.map(item => item.name.toLowerCase()).join(', ') : null;

    const parts: string[] = [];

    // Opening summary with time breakdown
    parts.push(`Primary focus on ${practicalFocus} (${practicalTotal} min on-water).`);

    if (theoryFocus) {
        parts.push(`Theory reinforces ${theoryFocus} (${theoryTotal} min).`);
    }
    if (knotFocus) {
        parts.push(`Knot workshop covers ${knotFocus} (${knotTotal} min).`);
    }
    if (!theoryFocus && !knotFocus) {
        parts.push('Condensed schedule maximises water time for the full slot.');
    }

    // Games
    if (recommendedGames.length > 0) {
        parts.push(`Games planned: ${recommendedGames.join(', ')}.`);
    }

    // Buffer time analysis
    if (slackMinutes >= 15) {
        parts.push(`${slackMinutes} min buffer available — extend practicals, add games, or allow extra debrief.`);
    } else if (slackMinutes >= 5) {
        parts.push(`${slackMinutes} min buffer for overrun flexibility.`);
    } else {
        parts.push('Tightly packed session — monitor timing closely.');
    }

    return parts.join(' ');
}

// ============================================
// Intelligence Systems
// ============================================

function analyseWeatherConditions(sessionInfo: SessionInfo): {
    conditions: {
        windLevel: 'calm' | 'light' | 'moderate' | 'strong' | 'extreme';
        seaState: 'flat' | 'slight' | 'moderate' | 'rough';
        challenging: boolean;
        ideal: boolean;
    };
    safetyNotes: string[];
    recommendations: string[];
    adaptations: string[];
} {
    const { windSpeed, gustSpeed, waveHeight, tidal, tideStrength, tideDirection } = sessionInfo;

    const windLevel: 'calm' | 'light' | 'moderate' | 'strong' | 'extreme' =
        windSpeed <= 3 ? 'calm'
        : windSpeed <= 8 ? 'light'
        : windSpeed <= 16 ? 'moderate'
        : windSpeed <= 24 ? 'strong'
        : 'extreme';

    const seaState: 'flat' | 'slight' | 'moderate' | 'rough' =
        waveHeight <= 0.2 ? 'flat'
        : waveHeight <= 0.5 ? 'slight'
        : waveHeight <= 1.0 ? 'moderate'
        : 'rough';

    const challenging = windLevel === 'strong' || windLevel === 'extreme' || seaState === 'rough';
    const ideal = (windLevel === 'light' || windLevel === 'moderate') && (seaState === 'flat' || seaState === 'slight');

    const safetyNotes: string[] = [];
    const recommendations: string[] = [];
    const adaptations: string[] = [];

    // Wind analysis
    if (windLevel === 'calm') {
        recommendations.push("Very light winds - consider paddle drills and technique work.");
        adaptations.push("Extend shore-based activities; plan paddling exercises.");
    } else if (windLevel === 'light') {
        recommendations.push("Good learning conditions with light winds.");
    } else if (windLevel === 'moderate') {
        recommendations.push("Moderate wind - excellent for skill development.");
    } else if (windLevel === 'strong') {
        safetyNotes.push(`Strong winds (${windSpeed} kts). Consider reef or smaller sails. Close monitoring required.`);
        adaptations.push("Shorten sailing legs; increase rescue cover; consider reefed sails.");
    } else {
        safetyNotes.push(`Extreme winds (${windSpeed} kts). Consider postponement or shore-only activities.`);
        adaptations.push("Move all activities ashore. Theory and knot sessions only.");
    }

    // Gust factor
    const gustFactor = gustSpeed - windSpeed;
    if (gustFactor > 10) {
        safetyNotes.push(`Significant gust factor (${gustFactor} kts above mean). Expect sudden power increases.`);
        adaptations.push("Brief students on gust response. Ensure mainsheet can be released quickly.");
    } else if (gustFactor > 5) {
        safetyNotes.push(`Moderate gusts (${gustSpeed} kts). Students should be prepared for wind changes.`);
    }

    // Tide analysis
    if (tidal) {
        if (tideStrength > 3) {
            safetyNotes.push(`Strong tidal flow (${tideStrength}/5). Account for drift in all exercises.`);
            adaptations.push("Use transit marks; shorten course boundaries; maintain closer proximity.");
        } else if (tideStrength > 1) {
            safetyNotes.push(`Moderate tide (${tideStrength}/5). Factor into course layout.`);
        }

        // Tidal pattern advice
        const dir = tideDirection.toLowerCase();
        const isTurning = dir.includes('→') || dir.includes('to');
        const isEasing = dir.includes('easing') || dir.includes('slack');
        const isBuilding = dir.includes('building');

        if (isTurning) {
            safetyNotes.push(`Tide changing direction during session (${tideDirection}). Brief students on shifting current — course layout will need adjustment mid-session.`);
            adaptations.push("Re-assess course marks and launch point at the tide turn. Brief students before and after the change.");
        }
        if (isEasing) {
            recommendations.push(`Tide easing during session (${tideDirection}). Conditions should improve — plan more ambitious activities for later.`);
        } else if (isBuilding) {
            safetyNotes.push(`Tide building during session (${tideDirection}). Conditions will become more challenging — front-load practical water time.`);
            adaptations.push("Schedule shore-based activities for later when tidal flow is strongest.");
        }

        recommendations.push(`Tidal pattern: ${tideDirection}. Plan upwind/uptide launches where possible.`);
    }

    // Wave analysis
    if (seaState === 'moderate') {
        safetyNotes.push(`Moderate swell (${waveHeight}m). Brief on wave riding techniques.`);
    } else if (seaState === 'rough') {
        safetyNotes.push(`Rough seas (${waveHeight}m). Shore-based activities recommended for beginners.`);
    }

    return { conditions: { windLevel, seaState, challenging, ideal }, safetyNotes, recommendations, adaptations };
}

function getCourseMetadata(course: string, courseType: string): {
    practicalEmphasis: number;
    theoryEmphasis: number;
    knotsEmphasis: number;
    isBeginner: boolean;
    isAdvanced: boolean;
    isRacing: boolean;
} {
    const racingCourses = [
        'YouthStartRacing', 'YouthClubRacing', 'YouthRegionalRacing', 'YouthChampionshipRacing',
        'AdultStartRacing', 'IntermediateRacing', 'AdvancedRacing',
    ];
    const beginnerCourses = ['Stage1', 'Stage2', 'Level1', 'Level2', 'TasterChild', 'TasterAdult'];
    const advancedCourses = [
        'Seamanship', 'Spinnakers', 'PerformanceSailing', 'DaySailing',
        'AdvancedRacing', 'YouthChampionshipRacing', 'YouthRegionalRacing',
    ];

    const isRacing = racingCourses.includes(course) || courseType.toLowerCase().includes('racing');
    const isBeginner = beginnerCourses.includes(course);
    const isAdvanced = advancedCourses.includes(course);

    // Course-specific time distribution ratios
    let practicalEmphasis = 0.65;
    let theoryEmphasis = 0.20;
    let knotsEmphasis = 0.15;

    if (isRacing) {
        practicalEmphasis = 0.75;
        theoryEmphasis = 0.20;
        knotsEmphasis = 0.05;
    } else if (isAdvanced) {
        practicalEmphasis = 0.70;
        theoryEmphasis = 0.20;
        knotsEmphasis = 0.10;
    } else if (isBeginner) {
        practicalEmphasis = 0.55;
        theoryEmphasis = 0.25;
        knotsEmphasis = 0.20;
    }

    return {
        practicalEmphasis,
        theoryEmphasis,
        knotsEmphasis,
        isBeginner,
        isAdvanced,
        isRacing,
    };
}

function getAgePacingProfile(ageRange: string): {
    attentionSpan: number;
    breakFrequency: number;
    gameImportance: 'high' | 'medium' | 'minimal';
    paceLabel: string;
    maxContinuousPractical: number;
} {
    const normalisedAge = ageRange.toLowerCase().trim();

    if (normalisedAge.includes('6') || normalisedAge.includes('7') || normalisedAge.includes('8') || normalisedAge === 'under 8' || normalisedAge === '6-8') {
        return { attentionSpan: 15, breakFrequency: 45, gameImportance: 'high', paceLabel: 'Young Juniors', maxContinuousPractical: 20 };
    }
    if (normalisedAge.includes('9') || normalisedAge.includes('10') || normalisedAge.includes('11') || normalisedAge === '8-12' || normalisedAge === '9-12') {
        return { attentionSpan: 20, breakFrequency: 60, gameImportance: 'high', paceLabel: 'Juniors', maxContinuousPractical: 30 };
    }
    if (normalisedAge.includes('12') || normalisedAge.includes('13') || normalisedAge.includes('14') || normalisedAge.includes('15') || normalisedAge === '12-16' || normalisedAge === '13-16') {
        return { attentionSpan: 25, breakFrequency: 75, gameImportance: 'medium', paceLabel: 'Teens', maxContinuousPractical: 40 };
    }
    if (normalisedAge.includes('16') || normalisedAge.includes('17') || normalisedAge === '16-18' || normalisedAge === '16+') {
        return { attentionSpan: 30, breakFrequency: 90, gameImportance: 'medium', paceLabel: 'Older Teens', maxContinuousPractical: 50 };
    }
    // Adults
    return { attentionSpan: 40, breakFrequency: 120, gameImportance: 'minimal', paceLabel: 'Adults', maxContinuousPractical: 60 };
}

function allocateBoatsIntelligently(
    studentCount: number,
    instructorCount: number,
    selectedBoats: string[],
    courseType: string,
    ageRange: string,
    courseMeta: { isRacing: boolean; isBeginner: boolean; isAdvanced: boolean }
): {
    allocatedBoats: string;
    adequateBoats: boolean;
    allocationNotes: string[];
} {
    const totalBoats = selectedBoats.length;
    const ratio = studentCount / Math.max(instructorCount, 1);
    const allocationNotes: string[] = [];

    // Determine ideal ratio based on context
    const idealRatio = courseMeta.isBeginner ? 4
        : courseMeta.isRacing ? 6
        : courseMeta.isAdvanced ? 5
        : 6;

    if (ratio > idealRatio + 2) {
        allocationNotes.push(`⚠ High student-to-instructor ratio (${ratio.toFixed(1)}:1). Consider additional safety cover.`);
    }

    // Determine if boats are adequate
    const singleHandedBoats = selectedBoats.filter(b =>
        b.toLowerCase().includes('topper') || b.toLowerCase().includes('laser') ||
        b.toLowerCase().includes('optimist') || b.toLowerCase().includes('pico') ||
        b.toLowerCase().includes('ilca') || b.toLowerCase().includes('aero') ||
        b.toLowerCase().includes('rs tera') || b.toLowerCase().includes('byte')
    );
    const doubleHandedBoats = selectedBoats.filter(b =>
        b.toLowerCase().includes('rs feva') || b.toLowerCase().includes('rs venture') ||
        b.toLowerCase().includes('wayfarer') || b.toLowerCase().includes('firefly') ||
        b.toLowerCase().includes('2000') || b.toLowerCase().includes('mirror') ||
        b.toLowerCase().includes('enterprise') || b.toLowerCase().includes('rs zest')
    );

    const singleSlots = singleHandedBoats.length;
    const doubleSlots = doubleHandedBoats.length * 2;
    const totalSlots = singleSlots + doubleSlots + (totalBoats - singleHandedBoats.length - doubleHandedBoats.length);
    const adequateBoats = totalSlots >= studentCount;

    if (!adequateBoats) {
        allocationNotes.push(`⚠ ${totalSlots} boat slots for ${studentCount} students. Rotation system recommended.`);
    }

    // Build allocation string
    const parts: string[] = [];
    if (singleHandedBoats.length > 0) {
        parts.push(`${singleHandedBoats.length} single-hander${singleHandedBoats.length > 1 ? 's' : ''}`);
    }
    if (doubleHandedBoats.length > 0) {
        parts.push(`${doubleHandedBoats.length} double-hander${doubleHandedBoats.length > 1 ? 's' : ''}`);
    }
    const others = totalBoats - singleHandedBoats.length - doubleHandedBoats.length;
    if (others > 0) {
        parts.push(`${others} other boat${others > 1 ? 's' : ''}`);
    }

    const allocatedBoats = parts.length > 0
        ? `${parts.join(', ')} (${totalSlots} total slots for ${studentCount} students)`
        : `${totalBoats} boat${totalBoats !== 1 ? 's' : ''} for ${studentCount} students`;

    if (courseMeta.isBeginner) {
        allocationNotes.push("Beginner setup: Prioritise double-handers for paired learning where available.");
    }
    if (courseMeta.isRacing) {
        allocationNotes.push("Racing setup: Ensure equal class boats where possible for fair fleet racing.");
    }

    return { allocatedBoats, adequateBoats, allocationNotes };
}

export function generateSessionPlan(sessionInfo: SessionInfo) {
    const {
        instructorCount,
        studentCount,
        ageRange,
        sessionLength,
        courseType,
        course,
        selectedBoats,
        games,
        boatsPreRigged,
    } = sessionInfo;

    // ============================================
    // PHASE 1: Enhanced Intelligence Gathering
    // ============================================
    
    const weather = analyseWeatherConditions(sessionInfo);
    const courseMeta = getCourseMetadata(course, courseType);
    const agePacing = getAgePacingProfile(ageRange);
    const boatAllocation = allocateBoatsIntelligently(
        studentCount,
        instructorCount,
        selectedBoats,
        courseType,
        ageRange,
        courseMeta
    );

    // Aggregate all intelligent notes
    let safetyNotes: string[] = [...weather.safetyNotes, ...boatAllocation.allocationNotes];
    let plannerNotes: string[] = [...weather.recommendations, ...weather.adaptations];
    const courseContent = getCourseContent(course);
    const userSelectedGames = games.map(g => g.trim()).filter(g => g.length > 0);

    // ============================================
    // PHASE 2: Dynamic Time Allocation
    // ============================================
    
    const totalSessionTime = sessionLength * 60;
    const isShortSession = sessionLength <= 2;
    const isLongSession = sessionLength >= 4;

    // Get source content
    let setupItems = (courseContent.setup || []).map(item => ({ ...item }));
    const packdownItems = (courseContent.packdown || []).map(item => ({ ...item }));
    let practicalItems = (courseContent.practical || []).map(item => ({ ...item }));
    let theoryItems = (courseContent.theory || []).map(item => ({ ...item }));
    let knotItems = (courseContent.knots || []).map(item => ({ ...item }));
    const generalSkills = courseContent.general || [];

    // Pre-rigged boats optimisation
    if (boatsPreRigged && setupItems.length > 0) {
        setupItems = [];
        plannerNotes.push("✓ Boats pre-rigged: Maximising water time, safety checks integrated into briefing.");
    }

    // Weather-based activity adjustments
    if (weather.conditions.challenging) {
        // Reduce practical complexity in challenging conditions
        practicalItems = practicalItems.slice(0, Math.ceil(practicalItems.length * 0.7));
        plannerNotes.push("⚠ Challenging conditions: Reduced activity complexity, focusing on core essential skills.");
    }

    if (weather.conditions.windLevel === 'light') {
        // In light wind, reduce theory time, maximise practical
        plannerNotes.push("Light wind strategy: Extended practical sessions for technique refinement.");
    }

    // Short session optimisation
    if (isShortSession) {
        theoryItems = [];
        knotItems = [];
        plannerNotes.push("Short session optimisation: Pure practical focus, theory deferred to longer sessions.");
    }

    // Calculate sophisticated time allocation
    const setupTime = setupItems.reduce((sum, item) => sum + item.duration, 0);
    const packdownTime = packdownItems.reduce((sum, item) => sum + item.duration, 0);
    const fixedTime = setupTime + packdownTime;
    const flexibleTime = Math.max(0, totalSessionTime - fixedTime);

    // Course-specific time distribution
    const practicalRatio = courseMeta.practicalEmphasis;
    const theoryRatio = courseMeta.theoryEmphasis;
    const knotsRatio = courseMeta.knotsEmphasis;

    let practicalTime = Math.floor(flexibleTime * practicalRatio);
    let theoryTime = Math.floor(flexibleTime * theoryRatio);
    let knotTime = Math.floor(flexibleTime * knotsRatio);

    // Adjust for weather
    if (weather.conditions.windLevel === 'strong') {
        const practicalReduction = Math.floor(practicalTime * 0.3);
        practicalTime -= practicalReduction;
        theoryTime += practicalReduction;
        plannerNotes.push("Strong wind adjustment: Increased shore-based time for safety.");
    }

    // ============================================
    // PHASE 3: Intelligent Activity Selection
    // ============================================

    function selectProgressiveActivities(
        items: { name: string; duration: number }[],
        timeLimit: number,
        priority: 'beginner' | 'intermediate' | 'advanced'
    ): { name: string; duration: number }[] {
        if (items.length === 0) return [];
        
        const selected: { name: string; duration: number }[] = [];
        let remaining = timeLimit;

        // Progressive selection: prioritise foundational skills for beginners
        const sorted = priority === 'beginner' 
            ? items // Keep original order for beginners (assumedly progressive)
            : priority === 'advanced'
            ? [...items].reverse() // Advanced courses might benefit from reverse order
            : items; // Intermediate uses natural order

        for (const activity of sorted) {
            if (remaining <= 0) break;
            
            const duration = Math.min(activity.duration, remaining);
            const label = duration < activity.duration 
                ? `${activity.name} (focused)` 
                : activity.name;
            
            selected.push({ name: label, duration });
            remaining -= duration;
        }

        return selected;
    }

    const skillPriority = courseMeta.isBeginner ? 'beginner' 
                        : courseMeta.isAdvanced ? 'advanced' 
                        : 'intermediate';

    const selectedPractical = selectProgressiveActivities(practicalItems, practicalTime, skillPriority);
    const selectedTheory = theoryTime > 0 ? selectProgressiveActivities(theoryItems, theoryTime, skillPriority) : [];
    const selectedKnots = knotTime > 0 ? selectProgressiveActivities(knotItems, knotTime, skillPriority) : [];

    // ============================================
    // PHASE 4: Enhanced Game Selection
    // ============================================

    const intelligentGameSelection = () => {
        const defaultGames = {
            beginner: ['Pirates', 'Follow the Leader', 'Port & Starboard'],
            intermediate: ['Tag', 'Windward/Leeward Race', 'Figure Eight'],
            advanced: ['Match Racing', 'Tactical Drills', 'Starting Practice'],
            racing: ['Starting Drills', 'Mark Rounding Practice', 'Fleet Positioning'],
        };

        if (userSelectedGames.length > 0) {
            return userSelectedGames;
        }

        if (weather.conditions.challenging || !agePacing || agePacing.gameImportance === 'minimal') {
            return [];
        }

        if (courseMeta.isRacing) return defaultGames.racing.slice(0, 2);
        if (courseMeta.isBeginner) return defaultGames.beginner.slice(0, 2);
        if (courseMeta.isAdvanced) return defaultGames.advanced.slice(0, 2);
        return defaultGames.intermediate.slice(0, 2);
    };

    const recommendedGames = intelligentGameSelection();
    const baseGameDuration = agePacing.attentionSpan / 2; // Half attention span per game

    // ============================================
    // PHASE 5: Build Enhanced Timeline
    // ============================================

    const sessionBlocks: { section: string; activities: { name: string; duration: number }[] }[] = [];

    // Add main sections
    if (setupItems.length > 0) {
        sessionBlocks.push({ section: "Setup", activities: setupItems });
    }
    if (selectedPractical.length > 0) {
        sessionBlocks.push({ section: "Practical", activities: selectedPractical });
    }
    if (selectedTheory.length > 0) {
        sessionBlocks.push({ section: "Theory", activities: selectedTheory });
    }
    if (selectedKnots.length > 0) {
        sessionBlocks.push({ section: "Knots", activities: selectedKnots });
    }

    if (packdownItems.length > 0) {
        sessionBlocks.push({ section: "Packdown", activities: packdownItems });
    }

    // Build timeline with enhanced intelligence
    const timelineResult = buildDetailedTimeline(
        sessionBlocks,
        totalSessionTime,
        generalSkills,
        safetyNotes
    );
    let { timeline, totalPlannedMin, slackMinutes } = timelineResult;

    // ============================================
    // PHASE 6: Intelligent Game Injection
    // ============================================

    const scheduledGames: { title: string; duration: number }[] = [];
    
    if (recommendedGames.length > 0 && !weather.conditions.challenging) {
        const packdownStartIndex = timeline.findIndex(entry => 
            entry.section === "Packdown"
        );
        
        if (packdownStartIndex > 0) {
            const preGames = timeline.slice(0, packdownStartIndex);
            const postGames = timeline.slice(packdownStartIndex);
            const gamesStart = preGames[preGames.length - 1]?.endMin || 0;
            const gamesWindow = Math.min(
                recommendedGames.length * baseGameDuration,
                Math.max(0, totalSessionTime - gamesStart - postGames.reduce((sum, e) => sum + e.durationMin, 0))
            );

            const gameEntries: TimelineEntry[] = [];
            let cursor = gamesStart;

            for (const game of recommendedGames) {
                const remaining = gamesWindow - (cursor - gamesStart);
                if (remaining < 5) break;

                const duration = Math.min(baseGameDuration, remaining);
                gameEntries.push({
                    title: game,
                    section: "Games",
                    startMin: cursor,
                    endMin: cursor + duration,
                    durationMin: duration,
                    type: 'games',
                    instructions: `Fun drill: ${game} - reinforces core skills through engaging gameplay.`,
                });
                scheduledGames.push({ title: game, duration });
                cursor += duration;
            }

            if (gameEntries.length > 0) {
                const adjustedPost = postGames.map(entry => ({
                    ...entry,
                    startMin: cursor,
                    endMin: cursor + entry.durationMin,
                }));
                cursor += adjustedPost.reduce((sum, e) => sum + e.durationMin, 0);

                timeline = [...preGames, ...gameEntries, ...adjustedPost];
                totalPlannedMin = cursor;
                slackMinutes = Math.max(0, totalSessionTime - totalPlannedMin);
            }
        }
    }

    // ============================================
    // PHASE 7: Contingency Planning
    // ============================================

    const contingencyPlans: string[] = [];

    if (weather.conditions.windLevel === 'moderate' && sessionInfo.gustSpeed > sessionInfo.windSpeed + 7) {
        contingencyPlans.push("If wind exceeds 18 knots: Reduce fleet size, implement buddy system, move to sheltered water.");
    }

    if (sessionInfo.tidal && sessionInfo.tideStrength > 2) {
        contingencyPlans.push("If tide strengthens: Shorten course boundaries, maintain closer instructor proximity.");
    }

    if (weather.conditions.windLevel === 'light') {
        contingencyPlans.push("If wind drops below 3 knots: Transition to paddle drills, rigging workshops, or theory sessions.");
    }

    if (!boatAllocation.adequateBoats) {
        contingencyPlans.push("Insufficient boats: Implement rotation system with shore-based skill stations during wait times.");
    }

    if (contingencyPlans.length > 0) {
        plannerNotes.push("📋 Contingency plans prepared for changing conditions.");
    }

    // ============================================
    // PHASE 8: Generate Enhanced Summary
    // ============================================

    const recommendedGamesDisplay = scheduledGames.map(g => `${g.title} (${g.duration} min)`);
    const planSummary = createPlanSummary(
        selectedPractical,
        selectedTheory,
        selectedKnots,
        recommendedGamesDisplay,
        slackMinutes
    );

    // ============================================
    // Return Enhanced Plan
    // ============================================

    return {
        allocatedBoats: boatAllocation.allocatedBoats,
        timeline,
        safetyNotes,
        recommendedGames: recommendedGamesDisplay,
        planSummary,
        totalPlannedMin,
        slackMinutes,
        plannerNotes,
        contingencyPlans, // NEW
        weatherAnalysis: weather, // NEW
        courseMetadata: courseMeta, // NEW
        agePacingProfile: agePacing, // NEW
    };
}
