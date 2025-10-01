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
                "Understand personal safety equipment and what to wear (head, hands, feet, body)": 0,
                "Put on personal buoyancy correctly": 0,
                "Assist with rigging a boat": 15,
                "Launch a dinghy and get under way with instruction": 5,
            },
            practical: {
                "Paddle or row": 5,
                "Steer on a reach and go about (reach to reach)": 30,
                "Understand stopping, controlling speed, getting out of irons": 15,
                "Prepare for a tow": 5,
                "Steer when sailing and being towed": 5,
                "Understand importance of staying with boat during capsize": 10
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
                "Secure boat to trolley": 0,
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
                "Launch and recover a small dinghy": 5,
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

export function generateSessionPlan(sessionInfo: SessionInfo) {
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
    } = sessionInfo;

    let safetyNotes: string[] = [];
    let recommendedGames: string[] = [];
    const allocatedBoats = [];
    const courseContent = getCourseContent(course);

    // Safety Checks
    // Safety Checks (optimized)
    if (windSpeed >= 15 || gustSpeed >= 25) {
        safetyNotes.push(courseType === 'Youth'
            ? "High wind conditions. Consider reducing the number of boats and sail area."
            : "High wind conditions. Reduce sail area.");
    }
    if (tidal && tideStrength > 3) {
        safetyNotes.push("Strong tides expected. Ensure all participants are briefed on tidal conditions.");
    }
    if (tidal && waveHeight > 1) {
        safetyNotes.push("Choppy water conditions expected. Ensure all participants are competent swimmers.");
    }
    if (tidal && tideDirection === 'Ebb' && windSpeed > 10) {
        safetyNotes.push("Ebb tide with strong wind. Extra caution advised.");
    }

    //Boat Allocation Logic
    if (selectedBoats.length === 0) {
        safetyNotes.push("No boats selected. Please select at least one type of boat.");
    } else {
        // Map boat types to their default capacities
        const boatCapacities: { [key: string]: number } = {
            smallsingle: 0,
            single: 1,
            double: 2,
            largedouble: 3,
            multi: 4
        };
        const youthBoatCapacities: { [key: string]: number } = {
            smallsingle: 1,
            single: 2,
            double: 3,
            largedouble: 4,
            multi: 6,
        };
        // Calculate total capacity based on selected boats
        const capacities = courseType === 'Youth' ? youthBoatCapacities : boatCapacities;
        let allocated = 0;
        // Allocate as many of the same type of boats as possible (prefer first selected)
        // Allocate boats, removing each selected boat from available list as it's used
        let availableBoats = [...selectedBoats];
        while (allocated < studentCount && availableBoats.length > 0) {
            const boat = availableBoats[0];
            const capacity = capacities[boat.toLowerCase()];
            if (capacity > 0) {
            allocatedBoats.push(boat);
            allocated += capacity;
            }
            // Remove the used boat from the list
            availableBoats.shift();
        }
        if (allocated < studentCount) {
            safetyNotes.push(`Not enough boats selected for ${studentCount} students.`);
        }
    }

    // Suggest games if included and conditions are safe
    if (windSpeed < 15 && tideStrength < 3) {
        if (games.length > 0) {
            recommendedGames = games;
        } else {
            recommendedGames = ['Pirates', 'Tag', 'Follow the Leader'];
        }
    }

    // Get all items with durations
    const setupItems = courseContent.setup || [];
    const packdownItems = courseContent.packdown || [];
    const practicalItems = courseContent.practical || [];
    const theoryItems = courseContent.theory || [];
    const knotItems = courseContent.knots || [];
    const generalSkills = courseContent.general || [];

    // Calculate available time after setup/packdown
    // Calculate total duration of setup items
    const setupTime = setupItems.reduce((sum, item) => sum + item.duration, 0);
    const packdownTime = packdownItems.reduce((sum, item) => sum + item.duration, 0);
    const totalSessionTime = sessionLength * 60;
    const availableTime = totalSessionTime - setupTime - packdownTime;

    // Allocate time based on preference
    const practicalTime = Math.floor(availableTime * 0.70);
    const theoryTime = Math.floor(availableTime * 0.20);
    const knotTime = availableTime - practicalTime - theoryTime;

    // Select activities to fit allocated time
    function selectActivities(items: { name: string, duration: number }[], timeLimit: number) {
        const selected: string[] = [];
        let used = 0;
        for (const item of items) {
            if (used + item.duration <= timeLimit) {
                selected.push(item.name);
                used += item.duration;
            }
        }
        return selected;
    }


    const selectedPractical = selectActivities(practicalItems, practicalTime);
    const selectedTheory = selectActivities(theoryItems, theoryTime);
    const selectedKnots = selectActivities(knotItems, knotTime);

    // Final activity list with timings
    const activitiesWithTimings = [
        { section: "Setup", activities: setupItems.map(item => ({ name: item.name, duration: item.duration })) },
        { section: "Practical", activities: practicalItems.filter(item => selectedPractical.includes(item.name)) },
        { section: "Theory", activities: theoryItems.filter(item => selectedTheory.includes(item.name)) },
        { section: "Knots", activities: knotItems.filter(item => selectedKnots.includes(item.name)) },
        { section: "Packdown", activities: packdownItems.map(item => ({ name: item.name, duration: item.duration })) },
    ];

    // Add timings and general skills to output
    return {
        courseContent,
        allocatedBoats,
        activitiesWithTimings,
        generalSkills,
        safetyNotes,
        recommendedGames,
    };
}
