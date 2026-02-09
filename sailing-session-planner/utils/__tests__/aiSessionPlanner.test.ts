// Mock config.ts so its import-time validateEnv() never throws
jest.mock('../config', () => ({
    config: { geminiApiKey: 'test-key-for-jest', environment: 'development' },
}));

import {
    formatActivityTime,
    getActivityColor,
    getActivityIcon,
    generateAISessionPlan,
} from '../aiSessionPlanner';

import type {
    ActivityItem,
    AISessionPlan,
    SessionInfo,
} from '../aiSessionPlanner';

// ============================================
// 1. formatActivityTime
// ============================================
describe('formatActivityTime', () => {
    it('prefixes duration with ~ when not already present', () => {
        expect(formatActivityTime('15 min')).toBe('~15 min');
    });

    it('does not double-prefix when ~ is already present', () => {
        expect(formatActivityTime('~20 min')).toBe('~20 min');
    });

    it('handles empty string', () => {
        expect(formatActivityTime('')).toBe('~');
    });

    it('handles string starting with tilde', () => {
        expect(formatActivityTime('~5-10 min')).toBe('~5-10 min');
    });
});

// ============================================
// 2. getActivityColor
// ============================================
describe('getActivityColor', () => {
    const expectedColors: Record<ActivityItem['type'], string> = {
        setup: '#22c55e',
        practical: '#3b82f6',
        theory: '#8b5cf6',
        knots: '#f59e0b',
        packdown: '#6b7280',
        break: '#ec4899',
        briefing: '#ef4444',
        games: '#10b981',
        transition: '#94a3b8',
    };

    it.each(Object.entries(expectedColors))('returns %s for type "%s"', (type, color) => {
        expect(getActivityColor(type as ActivityItem['type'])).toBe(color);
    });

    it('returns a default color for unknown type', () => {
        const color = getActivityColor('unknown' as ActivityItem['type']);
        expect(typeof color).toBe('string');
        expect(color.startsWith('#')).toBe(true);
    });
});

// ============================================
// 3. getActivityIcon
// ============================================
describe('getActivityIcon', () => {
    const expectedIcons: Record<ActivityItem['type'], string> = {
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

    it.each(Object.entries(expectedIcons))('returns %s for type "%s"', (type, icon) => {
        expect(getActivityIcon(type as ActivityItem['type'])).toBe(icon);
    });

    it('returns a default icon for unknown type', () => {
        const icon = getActivityIcon('unknown' as ActivityItem['type']);
        expect(typeof icon).toBe('string');
    });
});

// ============================================
// 4. ActivityItem interface shape
// ============================================
describe('ActivityItem interface', () => {
    it('can create a valid ActivityItem object', () => {
        const item: ActivityItem = {
            name: 'Safety Briefing',
            approximateDuration: '~10-15 min',
            type: 'briefing',
            teachingNotes: 'Cover weather conditions',
            weatherAdjustments: 'Extend if wind picks up',
        };
        expect(item.name).toBe('Safety Briefing');
        expect(item.type).toBe('briefing');
    });

    it('teachingNotes and weatherAdjustments are optional', () => {
        const item: ActivityItem = {
            name: 'Paddling drills',
            approximateDuration: '~15 min',
            type: 'practical',
        };
        expect(item.teachingNotes).toBeUndefined();
        expect(item.weatherAdjustments).toBeUndefined();
    });
});

// ============================================
// 5. AISessionPlan interface shape
// ============================================
describe('AISessionPlan interface', () => {
    it('can create a complete AISessionPlan object', () => {
        const plan: AISessionPlan = {
            activities: [
                { name: 'Welcome', approximateDuration: '~5 min', type: 'briefing' },
                { name: 'Rigging', approximateDuration: '~20 min', type: 'setup' },
                { name: 'Reach sailing', approximateDuration: '~30 min', type: 'practical' },
            ],
            safetyNotes: ['Check buoyancy aids'],
            planSummary: 'A basic Stage 1 session',
            courseCompletionNotes: 'Covers core objectives',
            weatherConsiderations: 'Moderate wind ideal',
            instructorTips: ['Pair weaker students'],
            estimatedTotalTime: '2 hours',
            priorityActivities: ['Reach sailing'],
            optionalActivities: ['Games'],
        };
        expect(plan.activities).toHaveLength(3);
        expect(plan.safetyNotes).toHaveLength(1);
        expect(plan.priorityActivities).toContain('Reach sailing');
    });
});

// ============================================
// 6. SessionInfo interface shape
// ============================================
describe('SessionInfo (AI planner) interface', () => {
    it('can create a valid SessionInfo object', () => {
        const info: SessionInfo = {
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
            selectedBoats: ['double'],
            games: [],
            boatsPreRigged: false,
        };
        expect(info.instructorCount).toBe(2);
        expect(info.tidal).toBe(false);
    });
});

// ============================================
// 7. generateAISessionPlan (mocked)
// ============================================
describe('generateAISessionPlan – mocked', () => {
    const validPlan = {
        activities: [
            { name: 'Welcome', approximateDuration: '~5 min', type: 'briefing' },
            { name: 'Rigging', approximateDuration: '~20 min', type: 'setup' },
            { name: 'Sailing drills', approximateDuration: '~30 min', type: 'practical' },
        ],
        safetyNotes: ['Check buoyancy aids'],
        planSummary: 'A basic Stage 1 session',
        courseCompletionNotes: 'Covers core objectives',
        weatherConsiderations: 'Light wind ideal',
        instructorTips: ['Keep group close'],
        estimatedTotalTime: '2 hours',
        priorityActivities: ['Sailing drills'],
        optionalActivities: ['Games'],
    };

    const sampleSession: SessionInfo = {
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
        selectedBoats: ['double'],
        games: [],
        boatsPreRigged: false,
    };

    const tidalSession: SessionInfo = {
        ...sampleSession,
        tidal: true,
        tideStrength: 3,
        tideDirection: 'Ebbing',
        waveHeight: 0.8,
    };

    /** Helper: configure the GoogleGenerativeAI mock to return specific text */
    function mockAIResponse(text: string) {
        const { GoogleGenerativeAI } = require('@google/generative-ai');
        GoogleGenerativeAI.mockImplementation(() => ({
            getGenerativeModel: jest.fn().mockReturnValue({
                generateContent: jest.fn().mockResolvedValue({
                    response: { text: () => text },
                }),
            }),
        }));
    }

    /** Helper: configure the GoogleGenerativeAI mock to reject */
    function mockAIError(error: Error) {
        const { GoogleGenerativeAI } = require('@google/generative-ai');
        GoogleGenerativeAI.mockImplementation(() => ({
            getGenerativeModel: jest.fn().mockReturnValue({
                generateContent: jest.fn().mockRejectedValue(error),
            }),
        }));
    }

    it('is exported as a function', () => {
        expect(typeof generateAISessionPlan).toBe('function');
    });

    it('returns a parsed plan when API returns valid JSON', async () => {
        mockAIResponse(JSON.stringify(validPlan));

        const result = await generateAISessionPlan(sampleSession);
        expect(result.activities).toHaveLength(3);
        expect(result.safetyNotes).toContain('Check buoyancy aids');
        expect(result.planSummary).toBe('A basic Stage 1 session');
    });

    it('parses JSON wrapped in markdown code fences', async () => {
        mockAIResponse('```json\n' + JSON.stringify(validPlan) + '\n```');

        const result = await generateAISessionPlan(sampleSession);
        expect(result.activities).toHaveLength(3);
    });

    it('extracts JSON when embedded in other text', async () => {
        mockAIResponse('Here is your plan: ' + JSON.stringify(validPlan) + ' Hope this helps!');

        const result = await generateAISessionPlan(sampleSession);
        expect(result.activities).toHaveLength(3);
    });

    it('throws when API returns non-JSON text', async () => {
        mockAIResponse('I cannot help with that request.');

        await expect(generateAISessionPlan(sampleSession)).rejects.toThrow('Failed to parse AI response');
    });

    it('throws when API returns response missing activities', async () => {
        const badPlan = { ...validPlan, activities: 'not an array' };
        mockAIResponse(JSON.stringify(badPlan));

        await expect(generateAISessionPlan(sampleSession)).rejects.toThrow('missing activities array');
    });

    it('works with tidal session parameters', async () => {
        mockAIResponse(JSON.stringify(validPlan));

        const result = await generateAISessionPlan(tidalSession);
        expect(result.activities).toHaveLength(3);
    });

    it('handles truncated response', async () => {
        mockAIResponse('{"activities": [');

        await expect(generateAISessionPlan(sampleSession)).rejects.toThrow();
    });

    it('rethrows non-SyntaxError errors', async () => {
        mockAIError(new Error('Network failure'));

        await expect(generateAISessionPlan(sampleSession)).rejects.toThrow('Network failure');
    });

    // This test must be LAST — jest.resetModules() clears cached mocks
    it('throws when API key is not configured', async () => {
        jest.doMock('expo-constants', () => ({ expoConfig: { extra: {} } }));
        jest.doMock('../config', () => ({ config: { geminiApiKey: '', environment: 'development' } }));
        jest.resetModules();

        const { generateAISessionPlan: gen } = require('../aiSessionPlanner');
        await expect(gen(sampleSession)).rejects.toThrow('API key not configured');
    });
});
