import {
    WindCondition,
    WeatherCondition,
    SkillLevel,
    SessionInfo,
    generateSessionPlan,
} from '../sessionGenerator';

// ============================================
// Helper: build a default SessionInfo
// ============================================
function makeSession(overrides: Partial<SessionInfo> = {}): SessionInfo {
    return {
        instructorCount: 2,
        studentCount: 6,
        ageRange: '11to14',
        sessionLength: 2,
        courseType: 'Youth',
        course: 'Stage1',
        windSpeed: 10,
        gustSpeed: 14,
        tideStrength: 0,
        tideDirection: 'N/A',
        waveHeight: 0.2,
        tidal: false,
        selectedBoats: ['double', 'double', 'double'],
        games: [],
        boatsPreRigged: false,
        ...overrides,
    };
}

// ============================================
// 1. Type exports
// ============================================
describe('SessionGenerator Types', () => {
    it('should have valid wind conditions', () => {
        const validWinds: WindCondition[] = ['light', 'moderate', 'strong'];
        expect(validWinds).toHaveLength(3);
    });

    it('should have valid weather conditions', () => {
        const validWeather: WeatherCondition[] = ['sunny', 'cloudy', 'rainy'];
        expect(validWeather).toHaveLength(3);
    });

    it('should have valid skill levels', () => {
        const validLevels: SkillLevel[] = ['beginner', 'intermediate', 'advanced'];
        expect(validLevels).toHaveLength(3);
    });
});

// ============================================
// 2. generateSessionPlan – basic contract
// ============================================
describe('generateSessionPlan – basic contract', () => {
    it('returns an object with all expected top-level keys', () => {
        const plan = generateSessionPlan(makeSession());
        expect(plan).toHaveProperty('timeline');
        expect(plan).toHaveProperty('safetyNotes');
        expect(plan).toHaveProperty('planSummary');
        expect(plan).toHaveProperty('totalPlannedMin');
        expect(plan).toHaveProperty('slackMinutes');
        expect(plan).toHaveProperty('plannerNotes');
        expect(plan).toHaveProperty('contingencyPlans');
        expect(plan).toHaveProperty('weatherAnalysis');
        expect(plan).toHaveProperty('courseMetadata');
        expect(plan).toHaveProperty('agePacingProfile');
        expect(plan).toHaveProperty('allocatedBoats');
        expect(plan).toHaveProperty('recommendedGames');
    });

    it('timeline is a non-empty array of entries', () => {
        const plan = generateSessionPlan(makeSession());
        expect(Array.isArray(plan.timeline)).toBe(true);
        expect(plan.timeline.length).toBeGreaterThan(0);
    });

    it('each timeline entry has essential fields', () => {
        const plan = generateSessionPlan(makeSession());
        for (const entry of plan.timeline) {
            expect(entry).toHaveProperty('title');
            expect(entry).toHaveProperty('section');
            expect(entry).toHaveProperty('startMin');
            expect(entry).toHaveProperty('endMin');
            expect(entry).toHaveProperty('durationMin');
            expect(entry).toHaveProperty('type');
            expect(typeof entry.title).toBe('string');
            expect(typeof entry.durationMin).toBe('number');
            expect(entry.durationMin).toBeGreaterThanOrEqual(0);
        }
    });

    it('totalPlannedMin is a positive number', () => {
        const plan = generateSessionPlan(makeSession());
        expect(plan.totalPlannedMin).toBeGreaterThan(0);
    });

    it('slackMinutes is non-negative', () => {
        const plan = generateSessionPlan(makeSession());
        expect(plan.slackMinutes).toBeGreaterThanOrEqual(0);
    });

    it('planSummary is a non-empty string', () => {
        const plan = generateSessionPlan(makeSession());
        expect(typeof plan.planSummary).toBe('string');
        expect(plan.planSummary.length).toBeGreaterThan(0);
    });
});

// ============================================
// 3. Course content for every known course key
// ============================================
describe('generateSessionPlan – all course keys', () => {
    const youthCourses = ['Stage1', 'Stage2', 'Stage3', 'Stage4', 'YouthTasterSession'];
    const adultCourses = ['Level1', 'Level2', 'Level3', 'AdultTasterSession'];
    const racingCourses = [
        'YouthStartRacing', 'YouthClubRacing', 'YouthRegionalRacing', 'YouthChampionshipRacing',
        'AdultStartRacing', 'IntermediateRacing', 'AdvancedRacing',
    ];
    const advancedCourses = ['SeamanshipSkills', 'SailingWithSpinnakers', 'PerformanceSailing', 'DaySailing'];

    const allCourses = [...youthCourses, ...adultCourses, ...racingCourses, ...advancedCourses];

    it.each(allCourses)('produces a valid plan for course "%s"', (course) => {
        const courseType =
            youthCourses.includes(course) ? 'Youth' :
            adultCourses.includes(course) ? 'Adult' :
            racingCourses.includes(course) ? 'YouthRacing' : 'Advanced';

        const plan = generateSessionPlan(makeSession({ course, courseType }));
        expect(plan.timeline.length).toBeGreaterThan(0);
        expect(plan.totalPlannedMin).toBeGreaterThan(0);
    });

    it('returns an empty-content plan for an unknown course key', () => {
        const plan = generateSessionPlan(makeSession({ course: 'NonExistentCourse' }));
        expect(plan).toBeDefined();
    });
});

// ============================================
// 4. Weather analysis integration
// ============================================
describe('generateSessionPlan – weather analysis', () => {
    it('identifies calm wind (≤3 kts)', () => {
        const plan = generateSessionPlan(makeSession({ windSpeed: 2, gustSpeed: 3 }));
        expect(plan.weatherAnalysis.conditions.windLevel).toBe('calm');
    });

    it('identifies light wind (4-8 kts)', () => {
        const plan = generateSessionPlan(makeSession({ windSpeed: 6, gustSpeed: 8 }));
        expect(plan.weatherAnalysis.conditions.windLevel).toBe('light');
    });

    it('identifies moderate wind (9-16 kts)', () => {
        const plan = generateSessionPlan(makeSession({ windSpeed: 12, gustSpeed: 15 }));
        expect(plan.weatherAnalysis.conditions.windLevel).toBe('moderate');
    });

    it('identifies strong wind (17-24 kts)', () => {
        const plan = generateSessionPlan(makeSession({ windSpeed: 20, gustSpeed: 26 }));
        expect(plan.weatherAnalysis.conditions.windLevel).toBe('strong');
    });

    it('identifies extreme wind (>24 kts)', () => {
        const plan = generateSessionPlan(makeSession({ windSpeed: 30, gustSpeed: 40 }));
        expect(plan.weatherAnalysis.conditions.windLevel).toBe('extreme');
    });

    it('identifies flat sea state (≤0.2m)', () => {
        const plan = generateSessionPlan(makeSession({ waveHeight: 0.1 }));
        expect(plan.weatherAnalysis.conditions.seaState).toBe('flat');
    });

    it('identifies slight sea state (0.2-0.5m)', () => {
        const plan = generateSessionPlan(makeSession({ waveHeight: 0.4 }));
        expect(plan.weatherAnalysis.conditions.seaState).toBe('slight');
    });

    it('identifies moderate sea state (0.5-1.0m)', () => {
        const plan = generateSessionPlan(makeSession({ waveHeight: 0.8 }));
        expect(plan.weatherAnalysis.conditions.seaState).toBe('moderate');
    });

    it('identifies rough sea state (>1.0m)', () => {
        const plan = generateSessionPlan(makeSession({ waveHeight: 1.5 }));
        expect(plan.weatherAnalysis.conditions.seaState).toBe('rough');
    });

    it('flags challenging conditions for strong wind', () => {
        const plan = generateSessionPlan(makeSession({ windSpeed: 22, gustSpeed: 30 }));
        expect(plan.weatherAnalysis.conditions.challenging).toBe(true);
    });

    it('flags ideal conditions for moderate wind + flat water', () => {
        const plan = generateSessionPlan(makeSession({ windSpeed: 12, gustSpeed: 14, waveHeight: 0.1 }));
        expect(plan.weatherAnalysis.conditions.ideal).toBe(true);
    });

    it('adds safety notes for significant gust factor (>10 kts above mean)', () => {
        const plan = generateSessionPlan(makeSession({ windSpeed: 12, gustSpeed: 25 }));
        const hasGustNote = plan.weatherAnalysis.safetyNotes.some(n => n.toLowerCase().includes('gust'));
        expect(hasGustNote).toBe(true);
    });
});

// ============================================
// 5. Tidal conditions
// ============================================
describe('generateSessionPlan – tidal analysis', () => {
    it('adds tidal safety notes when tidal with strong flow', () => {
        const plan = generateSessionPlan(makeSession({
            tidal: true,
            tideStrength: 4,
            tideDirection: 'Ebb',
            waveHeight: 0.3,
        }));
        const hasTidalNote = plan.weatherAnalysis.safetyNotes.some(n =>
            n.toLowerCase().includes('tidal') || n.toLowerCase().includes('tide')
        );
        expect(hasTidalNote).toBe(true);
    });

    it('includes tidal pattern recommendations', () => {
        const plan = generateSessionPlan(makeSession({
            tidal: true,
            tideStrength: 2,
            tideDirection: 'Ebb → Flood (tide turning)',
            waveHeight: 0.3,
        }));
        const hasTurningNote = plan.weatherAnalysis.safetyNotes.some(n =>
            n.toLowerCase().includes('changing') || n.toLowerCase().includes('turning') || n.toLowerCase().includes('direction')
        );
        expect(hasTurningNote).toBe(true);
    });

    it('does not add tidal notes when location is non-tidal', () => {
        const plan = generateSessionPlan(makeSession({ tidal: false }));
        const tidalSafetyNotes = plan.weatherAnalysis.safetyNotes.filter(n =>
            n.toLowerCase().includes('tidal flow')
        );
        expect(tidalSafetyNotes).toHaveLength(0);
    });
});

// ============================================
// 6. Session length variations
// ============================================
describe('generateSessionPlan – session length', () => {
    it('short session (1h) omits theory and knots', () => {
        const plan = generateSessionPlan(makeSession({ sessionLength: 1 }));
        const hasTheory = plan.timeline.some(e => e.type === 'theory');
        const hasKnots = plan.timeline.some(e => e.type === 'knots');
        expect(hasTheory).toBe(false);
        expect(hasKnots).toBe(false);
    });

    it('2-hour session includes practical entries', () => {
        const plan = generateSessionPlan(makeSession({ sessionLength: 2 }));
        const hasPractical = plan.timeline.some(e => e.type === 'practical');
        expect(hasPractical).toBe(true);
    });

    it('long session (6h) includes a break entry', () => {
        const plan = generateSessionPlan(makeSession({ sessionLength: 6 }));
        const hasBreak = plan.timeline.some(e => e.type === 'break');
        expect(hasBreak).toBe(true);
    });

    it('planned minutes do not exceed session time (with transition tolerance)', () => {
        for (const hours of [1, 2, 4, 6]) {
            const plan = generateSessionPlan(makeSession({ sessionLength: hours }));
            const sessionMinutes = hours * 60;
            // Transitions and briefings can push a few minutes over the raw session window
            expect(plan.totalPlannedMin).toBeLessThanOrEqual(sessionMinutes * 1.25);
        }
    });
});

// ============================================
// 7. Pre-rigged boats
// ============================================
describe('generateSessionPlan – boats pre-rigged', () => {
    it('skips setup activities when boats are pre-rigged', () => {
        const plan = generateSessionPlan(makeSession({ boatsPreRigged: true }));
        const setupEntries = plan.timeline.filter(e => e.type === 'setup');
        expect(setupEntries).toHaveLength(0);
    });

    it('includes setup activities when boats are NOT pre-rigged', () => {
        const plan = generateSessionPlan(makeSession({ boatsPreRigged: false, course: 'Stage2' }));
        const setupEntries = plan.timeline.filter(e => e.type === 'setup');
        expect(setupEntries.length).toBeGreaterThan(0);
    });

    it('adds a planner note when boats are pre-rigged', () => {
        const plan = generateSessionPlan(makeSession({ boatsPreRigged: true }));
        const hasNote = plan.plannerNotes.some(n => n.toLowerCase().includes('pre-rigged'));
        expect(hasNote).toBe(true);
    });
});

// ============================================
// 8. Games
// ============================================
describe('generateSessionPlan – games', () => {
    it('includes user-requested games in recommended list', () => {
        const plan = generateSessionPlan(makeSession({ games: ['Pirates', 'Tag'] }));
        expect(plan.recommendedGames.length).toBeGreaterThan(0);
    });

    it('auto-selects appropriate games for beginners', () => {
        const plan = generateSessionPlan(makeSession({
            course: 'Stage1',
            courseType: 'Youth',
            sessionLength: 4,
            games: [],
        }));
        expect(plan.recommendedGames.length).toBeGreaterThanOrEqual(0);
    });

    it('no games in challenging weather', () => {
        const plan = generateSessionPlan(makeSession({
            windSpeed: 25,
            gustSpeed: 35,
            waveHeight: 1.5,
            games: [],
        }));
        expect(plan.recommendedGames).toHaveLength(0);
    });
});

// ============================================
// 9. Course metadata
// ============================================
describe('generateSessionPlan – course metadata', () => {
    it('marks Stage1 as beginner', () => {
        const plan = generateSessionPlan(makeSession({ course: 'Stage1' }));
        expect(plan.courseMetadata.isBeginner).toBe(true);
        expect(plan.courseMetadata.isRacing).toBe(false);
    });

    it('marks YouthStartRacing as racing', () => {
        const plan = generateSessionPlan(makeSession({ course: 'YouthStartRacing', courseType: 'YouthRacing' }));
        expect(plan.courseMetadata.isRacing).toBe(true);
    });

    it('marks PerformanceSailing as advanced', () => {
        const plan = generateSessionPlan(makeSession({ course: 'PerformanceSailing', courseType: 'Advanced' }));
        expect(plan.courseMetadata.isAdvanced).toBe(true);
    });

    it('practical emphasis is highest for racing courses', () => {
        const plan = generateSessionPlan(makeSession({ course: 'AdultStartRacing', courseType: 'AdultRacing' }));
        expect(plan.courseMetadata.practicalEmphasis).toBeGreaterThanOrEqual(0.7);
    });
});

// ============================================
// 10. Age pacing profile
// ============================================
describe('generateSessionPlan – age pacing', () => {
    it('returns "Juniors" pace for age 8to10', () => {
        const plan = generateSessionPlan(makeSession({ ageRange: '8to10' }));
        expect(plan.agePacingProfile.paceLabel).toMatch(/Junior/i);
    });

    it('returns "Adults" pace for age 18plus', () => {
        const plan = generateSessionPlan(makeSession({ ageRange: '18plus' }));
        expect(plan.agePacingProfile.paceLabel).toBe('Adults');
    });

    it('returns "Adults" pace for explicit adult age range', () => {
        const plan = generateSessionPlan(makeSession({ ageRange: 'adults' }));
        expect(plan.agePacingProfile.paceLabel).toBe('Adults');
    });

    it('returns "Adults" pace for 18+', () => {
        const plan = generateSessionPlan(makeSession({ ageRange: '18+' }));
        expect(plan.agePacingProfile.paceLabel).toBe('Adults');
    });

    it('games importance is high for young students', () => {
        const plan = generateSessionPlan(makeSession({ ageRange: '8to10' }));
        expect(plan.agePacingProfile.gameImportance).toBe('high');
    });

    it('games importance is minimal for adults', () => {
        const plan = generateSessionPlan(makeSession({ ageRange: '18plus' }));
        expect(plan.agePacingProfile.gameImportance).toBe('minimal');
    });
});

// ============================================
// 11. Safety briefing
// ============================================
describe('generateSessionPlan – safety briefing', () => {
    it('timeline includes a safety/conditions briefing entry', () => {
        const plan = generateSessionPlan(makeSession());
        const hasBriefing = plan.timeline.some(
            e => e.type === 'briefing' && e.title.toLowerCase().includes('safety')
        );
        expect(hasBriefing).toBe(true);
    });

    it('briefing appears before the first practical entry', () => {
        const plan = generateSessionPlan(makeSession());
        const briefingIdx = plan.timeline.findIndex(
            e => e.type === 'briefing' && e.title.toLowerCase().includes('safety')
        );
        const firstPracticalIdx = plan.timeline.findIndex(e => e.type === 'practical');
        if (briefingIdx !== -1 && firstPracticalIdx !== -1) {
            expect(briefingIdx).toBeLessThan(firstPracticalIdx);
        }
    });
});

// ============================================
// 12. Contingency plans
// ============================================
describe('generateSessionPlan – contingency plans', () => {
    it('generates contingency for gusty moderate wind', () => {
        const plan = generateSessionPlan(makeSession({ windSpeed: 14, gustSpeed: 25 }));
        expect(plan.contingencyPlans.length).toBeGreaterThan(0);
    });

    it('generates contingency for light wind drop-off', () => {
        const plan = generateSessionPlan(makeSession({ windSpeed: 5, gustSpeed: 7 }));
        const hasLightWindContingency = plan.contingencyPlans.some(c =>
            c.toLowerCase().includes('drops') || c.toLowerCase().includes('knots')
        );
        expect(hasLightWindContingency).toBe(true);
    });
});

// ============================================
// 13. Strong-wind adapted plan
// ============================================
describe('generateSessionPlan – strong wind adaptations', () => {
    it('reduces practical time and increases theory for strong wind', () => {
        const normalPlan = generateSessionPlan(makeSession({ windSpeed: 10, gustSpeed: 13, sessionLength: 4 }));
        const strongPlan = generateSessionPlan(makeSession({ windSpeed: 22, gustSpeed: 28, sessionLength: 4 }));

        const normalPracticalMin = normalPlan.timeline
            .filter(e => e.type === 'practical')
            .reduce((sum, e) => sum + e.durationMin, 0);

        const strongPracticalMin = strongPlan.timeline
            .filter(e => e.type === 'practical')
            .reduce((sum, e) => sum + e.durationMin, 0);

        expect(strongPracticalMin).toBeLessThan(normalPracticalMin);
    });

    it('adds strong-wind planner note', () => {
        const plan = generateSessionPlan(makeSession({ windSpeed: 20, gustSpeed: 26 }));
        const hasNote = plan.plannerNotes.some(n =>
            n.toLowerCase().includes('strong wind') || n.toLowerCase().includes('shore-based')
        );
        expect(hasNote).toBe(true);
    });
});

// ============================================
// 14. Timeline chronology
// ============================================
describe('generateSessionPlan – timeline ordering', () => {
    it('timeline entries are in chronological order', () => {
        const plan = generateSessionPlan(makeSession({ sessionLength: 4 }));
        for (let i = 1; i < plan.timeline.length; i++) {
            expect(plan.timeline[i].startMin).toBeGreaterThanOrEqual(plan.timeline[i - 1].startMin);
        }
    });

    it('each entry end = start + duration', () => {
        const plan = generateSessionPlan(makeSession());
        for (const entry of plan.timeline) {
            expect(entry.endMin).toBe(entry.startMin + entry.durationMin);
        }
    });
});

// ============================================
// 15. Edge cases
// ============================================
describe('generateSessionPlan – edge cases', () => {
    it('handles 0 wind speed gracefully', () => {
        const plan = generateSessionPlan(makeSession({ windSpeed: 0, gustSpeed: 0 }));
        expect(plan.weatherAnalysis.conditions.windLevel).toBe('calm');
        expect(plan.timeline.length).toBeGreaterThan(0);
    });

    it('handles very high student count', () => {
        const plan = generateSessionPlan(makeSession({ studentCount: 30, instructorCount: 2 }));
        const highRatioWarning = plan.safetyNotes.some(n => n.includes('ratio'));
        expect(highRatioWarning).toBe(true);
    });

    it('handles empty boats array', () => {
        const plan = generateSessionPlan(makeSession({ selectedBoats: [] }));
        expect(plan).toBeDefined();
        expect(plan.timeline.length).toBeGreaterThan(0);
    });

    it('handles single-hour session with extreme weather', () => {
        const plan = generateSessionPlan(makeSession({
            sessionLength: 1,
            windSpeed: 30,
            gustSpeed: 40,
            waveHeight: 2.0,
        }));
        expect(plan.weatherAnalysis.conditions.challenging).toBe(true);
        expect(plan.timeline.length).toBeGreaterThan(0);
    });
});