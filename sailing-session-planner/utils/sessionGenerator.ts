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
    };

    const defaultDurations: Partial<Record<TimelineEntry['type'], number>> = {
        setup: 0,
        theory: 10,
        practical: 15,
        knots: 10,
        packdown: 0,
        break: 15,
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
    const practicalFocus = practical.length > 0
        ? practical.slice(0, 2).map(item => item.name).join(', ')
        : 'core boat handling skills';
    const theoryFocus = theory.length > 0 ? theory[0].name.toLowerCase() : null;
    const knotFocus = knots.length > 0 ? knots[0].name.toLowerCase() : null;
    const funElement = recommendedGames.length > 0 ? recommendedGames[0] : null;

    const parts: string[] = [
        `Primary focus on ${practicalFocus}.`,
    ];

    if (theoryFocus) {
        parts.push(`Theory block reinforces ${theoryFocus}.`);
    }
    if (knotFocus) {
        parts.push(`Knot workshop covers ${knotFocus}.`);
    }
    if (!theoryFocus && !knotFocus) {
        parts.push('Condensed schedule keeps the group on the water for the full slot.');
    }

    if (funElement) {
        parts.push(`Planned games: ${funElement}.`);
    }
    if (slackMinutes >= 5) {
        parts.push(`Includes ${slackMinutes} minutes of adaptable buffer time.`);
    }

    return parts.join(' ');
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
        boatsPreRigged,
    } = sessionInfo;

    let safetyNotes: string[] = [];
    let recommendedGames: string[] = [];
    const allocatedBoats: string[] = [];
    const plannerNotes: string[] = [];
    const courseContent = getCourseContent(course);
    const userSelectedGames = games.map(g => g.trim()).filter(g => g.length > 0);

    if (windSpeed >= 15 || gustSpeed >= 25) {
        safetyNotes.push("High wind: reduce sail area and boat numbers.");
    }
    if (tidal && tideStrength > 3) {
        safetyNotes.push("Strong tide: ensure all are competent swimmers.");
    }
    if (tidal && waveHeight > 1) {
        safetyNotes.push("Choppy water: brief on tidal conditions.");
    }
    if (tidal && tideDirection === 'Ebb' && windSpeed > 10) {
        safetyNotes.push("Ebb tide + wind: extra caution advised.");
    }

    if (selectedBoats.length === 0) {
        safetyNotes.push("No boats selected. Please select at least one type of boat.");
    } else {
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
        const capacities = courseType === 'Youth' ? youthBoatCapacities : boatCapacities;
        let allocated = 0;
        let availableBoats = [...selectedBoats];
        while (allocated < studentCount && availableBoats.length > 0) {
            const boat = availableBoats[0];
            const capacity = capacities[boat.toLowerCase()];
            if (capacity > 0) {
                allocatedBoats.push(boat);
                allocated += capacity;
            }
            availableBoats.shift();
        }
        if (allocated < studentCount) {
            safetyNotes.push(`Not enough boats selected for ${studentCount} students.`);
        }
    }

    const defaultLongSessionGames = ['Pirates', 'Tag', 'Follow the Leader'];
    const baseGameDuration = sessionLength >= 4 ? 20 : sessionLength >= 3 ? 15 : 10;

    // Suggest games if included and conditions are safe
    if (windSpeed < 15 && tideStrength < 3 && sessionLength >= 120) {
        if (userSelectedGames.length > 0) {
            recommendedGames = [...userSelectedGames];
        } else {
            recommendedGames = [...defaultLongSessionGames];
        }
    }
    if (recommendedGames.length === 0 && userSelectedGames.length > 0) {
        recommendedGames = [...userSelectedGames];
    }
    if (sessionLength > 2 && recommendedGames.length === 0) {
        recommendedGames = userSelectedGames.length > 0
            ? [...userSelectedGames]
            : [...defaultLongSessionGames];
    }

    function selectSequencedActivities(
        items: { name: string; duration: number }[],
        timeLimit: number,
        options?: { ensureAtLeast?: number }
    ): { name: string; duration: number }[] {
        const minCount = options?.ensureAtLeast ?? 0;
        const sanitized = items.map(item => ({
            name: item.name,
            duration: item.duration && item.duration > 0 ? item.duration : 5,
        }));
        if (sanitized.length === 0) {
            return Array.from({ length: minCount }, (_, idx) => ({
                name: `Instructor-led focus block ${idx + 1}`,
                duration: 0,
            }));
        }
        const selected: { name: string; duration: number }[] = [];
        let remaining = Math.max(0, timeLimit);

        for (const activity of sanitized) {
            if (remaining <= 0 && selected.length >= minCount) {
                break;
            }

            if (remaining <= 0) {
                selected.push({ name: `${activity.name} (overview)`, duration: 0 });
                continue;
            }

            const take = Math.min(activity.duration, remaining);
            const label = take < activity.duration ? `${activity.name} (condensed)` : activity.name;
            selected.push({ name: label, duration: take });
            remaining -= take;
        }

        if (selected.length < minCount) {
            const deficit = minCount - selected.length;
            for (let i = selected.length; i < selected.length + deficit; i++) {
                const item = sanitized[i % sanitized.length] ?? { name: `Skill Focus ${i + 1}`, duration: 0 };
                selected.push({ name: `${item.name} (overview)`, duration: 0 });
            }
        }

        return selected;
    }

    // Get all items with durations
    const setupSource = courseContent.setup || [];
    let setupItems = setupSource.map(item => ({ ...item }));
    if (boatsPreRigged && setupItems.length > 0) {
        setupItems = [];
        plannerNotes.push("Boats pre-rigged: setup stage skipped; fold safety checks into the initial briefing.");
    }

    const packdownItems = courseContent.packdown || [];
    let practicalItems = (courseContent.practical || []).map(item => ({ ...item }));
    let theoryItems = (courseContent.theory || []).map(item => ({ ...item }));
    let knotItems = (courseContent.knots || []).map(item => ({ ...item }));
    const generalSkills = courseContent.general || [];

    const isShortSession = sessionLength <= 2;
    const isLongSession = sessionLength > 2;
    if (isShortSession) {
        theoryItems = [];
        knotItems = [];
        plannerNotes.push("Session under 2 hours: prioritised practical coaching, theory and knots deferred.");
    }

    // Calculate available time after setup/packdown
    const setupTime = setupItems.reduce((sum, item) => sum + item.duration, 0);
    const packdownTime = packdownItems.reduce((sum, item) => sum + item.duration, 0);
    const totalSessionTime = sessionLength * 60;
    const availableTime = totalSessionTime - setupTime - packdownTime;

    // Dynamic time allocation based on available activities
    const sectionCount = [practicalItems, theoryItems, knotItems].filter(arr => arr.length > 0).length;
    let practicalTime: number;
    let theoryTime: number;
    let knotTime: number;

    if (isShortSession) {
        practicalTime = Math.max(availableTime, 0);
        theoryTime = 0;
        knotTime = 0;
    } else {
        practicalTime = sectionCount ? Math.floor(availableTime * (practicalItems.length > 0 ? 0.6 : 0)) : 0;
        theoryTime = sectionCount ? Math.floor(availableTime * (theoryItems.length > 0 ? 0.25 : 0)) : 0;
        knotTime = availableTime - practicalTime - theoryTime;
    }

    // Pick varied activities
    const selectedPractical = selectSequencedActivities(practicalItems, practicalTime, { ensureAtLeast: 2 });
    const selectedTheory = theoryTime > 0 && theoryItems.length > 0
        ? selectSequencedActivities(theoryItems, theoryTime, { ensureAtLeast: 1 })
        : [];
    const selectedKnots = knotTime > 0 && knotItems.length > 0
        ? selectSequencedActivities(knotItems, knotTime, { ensureAtLeast: 1 })
        : [];

    const activitiesWithTimings = [
        { section: "Setup", activities: setupItems.map(item => ({ name: item.name, duration: item.duration })) },
        { section: "Practical", activities: selectedPractical },
        { section: "Theory", activities: selectedTheory },
        { section: "Knots", activities: selectedKnots },
        { section: "Packdown", activities: packdownItems.map(item => ({ name: item.name, duration: item.duration })) },
    ].filter(block => block.activities.length > 0);

    const timelineResult = buildDetailedTimeline(
        activitiesWithTimings,
        totalSessionTime,
        generalSkills,
        safetyNotes
    );
    let { timeline, totalPlannedMin, slackMinutes } = timelineResult;

    const gamesToSchedule = isLongSession
        ? (recommendedGames.length > 0 ? recommendedGames : userSelectedGames)
        : userSelectedGames;
    const shouldScheduleGames = gamesToSchedule.length > 0 && (isLongSession || userSelectedGames.length > 0);
    const scheduledGames: { title: string; duration: number }[] = [];

    if (shouldScheduleGames && timeline.some(entry => entry.section === "Practical" || entry.type === "practical")) {
        const isPackdownPhaseEntry = (entry: TimelineEntry) =>
            entry.section === "Packdown" ||
            entry.type === "packdown" ||
            /packdown|return to shore/i.test(entry.title);

        const packdownStartIndex = timeline.findIndex(isPackdownPhaseEntry);
        const prePackdown = packdownStartIndex === -1 ? [...timeline] : timeline.slice(0, packdownStartIndex);
        const packdownEntries = packdownStartIndex === -1 ? [] : timeline.slice(packdownStartIndex);
        const prePackdownEnd = prePackdown.length > 0 ? prePackdown[prePackdown.length - 1].endMin : 0;
        const packdownDurationTotal = packdownEntries.reduce((sum, entry) => sum + entry.durationMin, 0);
        let gameWindow = Math.max(0, totalSessionTime - packdownDurationTotal - prePackdownEnd);

        const gamesEntries: TimelineEntry[] = [];
        let currentStart = prePackdownEnd;
        const trimmedGames: string[] = [];

        gamesToSchedule.forEach((game) => {
            if (gameWindow <= 0) {
                trimmedGames.push(game);
                return;
            }

            const duration = Math.min(baseGameDuration, gameWindow);
            if (duration <= 0) {
                trimmedGames.push(game);
                return;
            }

            gamesEntries.push({
                title: game,
                section: "Games",
                startMin: currentStart,
                endMin: currentStart + duration,
                durationMin: duration,
                type: 'games',
                instructions: `Practice essentials skills with ${game} to have fun and reinforce teamwork.`,
            });
            scheduledGames.push({ title: game, duration });
            currentStart += duration;
            gameWindow = Math.max(0, gameWindow - duration);
        });

        if (gamesEntries.length > 0) {
            let cursor = currentStart;
            const adjustedPackdown = packdownEntries.map(entry => {
                const adjusted: TimelineEntry = {
                    ...entry,
                    startMin: cursor,
                    endMin: cursor + entry.durationMin,
                };
                cursor += entry.durationMin;
                return adjusted;
            });

            timeline = [...prePackdown, ...gamesEntries, ...adjustedPackdown];
            totalPlannedMin = cursor;
            slackMinutes = Math.max(totalSessionTime - totalPlannedMin, 0);
        }

        if (trimmedGames.length > 0) {
            plannerNotes.push(`Games ${trimmedGames.join(', ')} listed as optional cool-downs if time allows at the finish.`);
        }
        if (scheduledGames.length > 0) {
            if (trimmedGames.length === 0 && isLongSession && userSelectedGames.length === 0 && recommendedGames.length > 0) {
                plannerNotes.push("Added default long-session games to keep energy up before packdown.");
            }
            plannerNotes.push("Games scheduled to close the on-water block before returning to shore.");
        }
    }

    const recommendedGamesDisplay = scheduledGames.map(game => `${game.title} (${game.duration} min)`);

    const planSummary = createPlanSummary(
        selectedPractical,
        selectedTheory,
        selectedKnots,
        recommendedGamesDisplay,
        slackMinutes
    );

    // Add timings and general skills to output
    return {
        allocatedBoats,
        timeline,
        safetyNotes,
        recommendedGames: recommendedGamesDisplay,
        planSummary,
        totalPlannedMin,
        slackMinutes,
        plannerNotes,
    };
}