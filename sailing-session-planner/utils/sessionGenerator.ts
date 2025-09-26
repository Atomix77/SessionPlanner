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

function getCourseContent(course: string): string[] {
    const courseContentMap: { [key: string]: CourseSection } = {
        "Stage1": {
            setup: {
                "Understand personal safety equipment and what to wear (head, hands, feet, body)": 5,
                "Put on personal buoyancy correctly": 5,
                "Assist with rigging a boat": 15,
                "Launch a dinghy and get under way with instruction": 5,
            },
            practical: {
                "Paddle or row": 15,
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
                "Secure boat to trolley": 1,
                "Correct stowage of dinghy and gear": 15,
            }
        },
        "Stage2": {
            setup: {
                "Know what to wear for sailing": 5,
                "Choose and correctly adjust buoyancy aid": 5,
                "Put a boat head to wind for rigging": 0,
                "Rig a dinghy": 15,
                "Manoeuvre a trolley safely (clear of boats and overhead cables)": 2,
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
                "Secure boat to trolley": 1,
                "Correct stowage of dinghy and gear": 15,
            },
        },
        "Stage3": {
            setup: {
                "Rig, launch, and recover in a variety of conditions": 5,
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
                "Secure boat to trolley": 1,
                "Correct stowage of dinghy and gear": 15,
            },
        },
        "Stage4": {
            setup: {
                "Rig, launch, and recover in all wind directions": 15,
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
                "Secure boat to trolley": 1,
                "Correct stowage of dinghy and gear": 15,
            },
        }
    };

    const section = courseContentMap[course];
    if (!section) return [];
    // Combine all sections for backward compatibility
    return [
        ...Object.keys(section.practical),
        ...Object.keys(section.theory),
        ...Object.keys(section.general)
    ];
}

// Optionally, export CourseSection if you want to use it elsewhere
export type { CourseSection };
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

    const courseContent = getCourseContent(course);

    // Enhanced rules-based session planning
    let safetyNotes: string[] = [];
    let recommendedGames: string[] = [];
    const allocatedBoats = [];

    // Always include setup and packdown items
    // const setupKeywords = ["rig", "setup", "prepare", "put on personal buoyancy", "launch", "head to wind", "secure boat", "stowage", "trolley", "ashore"];
    // const packdownKeywords = ["recover", "return to beach", "stowage", "pack down", "secure boat", "trolley", "ashore"];

    // const setupItems = courseContent.filter(item =>
    //     setupKeywords.some(keyword => item.toLowerCase().includes(keyword))
    // );
    // const packdownItems = courseContent.filter(item =>
    //     packdownKeywords.some(keyword => item.toLowerCase().includes(keyword))
    // );

    // // Separate practical and theory elements
    // const practicalKeywords = ["sail", "tack", "gybe", "crew", "helm", "man overboard", "mooring", "tow", "triangle", "points of sail", "balance", "trim", "centreboard", "recover", "launch", "rig", "right a capsized", "paddle", "row", "pick up", "come alongside", "reef", "control speed", "stop", "get out of irons"];
    // const theoryKeywords = ["theory", "explain", "understand", "know", "importance", "terminology", "safety", "rules", "weather", "forecast", "beaufort", "no go zone", "wind direction", "equipment", "personal safety", "communication", "hypothermia", "collision", "tide", "buoyage", "chart", "table", "aerodynamics", "irpcs", "synoptic", "spring", "neap"];

    // const practicalItems = courseContent.filter(item =>
    //     practicalKeywords.some(keyword => item.toLowerCase().includes(keyword))
    // );
    // const theoryItems = courseContent.filter(item =>
    //     theoryKeywords.some(keyword => item.toLowerCase().includes(keyword))
    // );

    // Remove duplicates (setup/packdown may overlap with practical/theory)
    // function unique(arr: string[]) {
    //     return Array.from(new Set(arr));
    // }

    //Boat Allocation Logic
    if (selectedBoats.length === 0) {
        safetyNotes.push("No boats selected. Please select at least one type of boat.");
    } else {
        // Map boat types to their default capacities
        const boatCapacities: { [key: string]: number } = {
            single: 1,
            double: 2,
            largedouble: 3,
            multi: 4
        };
        const youthBoatCapacities: { [key: string]: number } = {
            single: 2,
            double: 3,
            largedouble: 4,
            multi: 6,
        };
        // Calculate total capacity based on selected boats
        let totalCapacity = 0;
        if (courseType === 'Youth') {
            if (selectedBoats) {
                let allocated = 0;
                while (allocated < studentCount) {
                    for (let i = 0; i < selectedBoats.length && allocated < studentCount; i++) {
                        const boat = selectedBoats[i];
                        const capacity = youthBoatCapacities[boat.toLowerCase()] || 1;
                        allocatedBoats.push(boat);
                        allocated += capacity;
                    }
                }
                if (allocated < studentCount) {
                    safetyNotes.push(`Not enough boats selected for ${studentCount} students.`);
                    return;
                }
            }
        } else {
            if (selectedBoats) {
                let allocated = 0;
                while (allocated < studentCount) {
                    for (let i = 0; i < selectedBoats.length && allocated < studentCount; i++) {
                        const boat = selectedBoats[i];
                        const capacity = boatCapacities[boat.toLowerCase()] || 1;
                        allocatedBoats.push(boat);
                        allocated += capacity;
                    }
                }
                if (allocated < studentCount) {
                    safetyNotes.push(`Not enough boats selected for ${studentCount} students.`);
                    return;
                }
            }
        }
    }

    // Rule: Suggest games if included and conditions are safe
    if (windSpeed < 15 && tideStrength < 3) {
        if (games.length > 0) {
            recommendedGames = games;
        } else {
            recommendedGames = ['pirates', 'tag', 'follow the leader'];
        }
    }


    // Limit practical and theory items to fit session length
    const availableTime = Math.max(10, (sessionLength*60) - 30); // 30 min for setup/packdown
    const maxActivities = Math.max(1, Math.floor(availableTime / 30));
    const practicalTheorySplit = Math.ceil(maxActivities / 1.5);
    const selectedPractical = practicalItems.slice(0, practicalTheorySplit);
    const selectedTheory = theoryItems.slice(0, maxActivities - practicalTheorySplit);

    // Final activity list: setup, practical, theory, packdown (all unique)
    const activities = unique([
        ...setupItems,
        ...selectedPractical,
        ...selectedTheory,
        ...packdownItems,
    ]);

    return {
        courseContent,
        allocatedBoats,
        sessionInfo,
        activities,
        safetyNotes,
        recommendedGames,
    };
}
