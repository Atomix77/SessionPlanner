// Extend expect with jest-native matchers (if available)
try {
    require('@testing-library/jest-native/extend-expect');
} catch (_) {}

// Mock expo-constants
jest.mock('expo-constants', () => ({
    expoConfig: {
        extra: {},
    },
}));

// Mock expo-font
jest.mock('expo-font', () => ({
    loadAsync: jest.fn(),
    isLoaded: jest.fn(() => true),
}));

// Mock expo-asset
jest.mock('expo-asset', () => ({
    Asset: {
        loadAsync: jest.fn(),
    },
}));

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper', () => ({}), { virtual: true });

// Mock Google Generative AI for testing
jest.mock('@google/generative-ai', () => ({
    GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
        getGenerativeModel: jest.fn().mockReturnValue({
        generateContent: jest.fn().mockResolvedValue({
            response: {
            text: () => 'Mock AI response',
            },
        }),
        }),
    })),
}));