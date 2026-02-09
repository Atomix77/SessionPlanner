describe('Config', () => {
    const originalEnv = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...originalEnv };
    });

    afterAll(() => {
        process.env = originalEnv;
    });

    // ============================================
    // 1. Missing API key
    // ============================================
    it('should throw error when GEMINI_API_KEY is missing', () => {
        delete process.env.EXPO_PUBLIC_GEMINI_API_KEY;

        expect(() => {
            jest.isolateModules(() => {
                require('../config');
            });
        }).toThrow('Missing required environment variables');
    });

    it('error message mentions the missing variable name', () => {
        delete process.env.EXPO_PUBLIC_GEMINI_API_KEY;

        try {
            jest.isolateModules(() => {
                require('../config');
            });
        } catch (err: any) {
            expect(err.message).toContain('EXPO_PUBLIC_GEMINI_API_KEY');
        }
    });

    // ============================================
    // 2. Successful config loading
    // ============================================
    it('should load config when all required vars are present', () => {
        process.env.EXPO_PUBLIC_GEMINI_API_KEY = 'test-key';

        const { config } = require('../config');
        expect(config.geminiApiKey).toBe('test-key');
    });

    it('should default to development environment', () => {
        process.env.EXPO_PUBLIC_GEMINI_API_KEY = 'test-key';

        const { config } = require('../config');
        expect(config.environment).toBe('development');
    });

    // ============================================
    // 3. Environment overrides
    // ============================================
    it('should use staging environment when set', () => {
        process.env.EXPO_PUBLIC_GEMINI_API_KEY = 'test-key';
        process.env.EXPO_PUBLIC_ENV = 'staging';

        const { config } = require('../config');
        expect(config.environment).toBe('staging');
    });

    it('should use production environment when set', () => {
        process.env.EXPO_PUBLIC_GEMINI_API_KEY = 'test-key';
        process.env.EXPO_PUBLIC_ENV = 'production';

        const { config } = require('../config');
        expect(config.environment).toBe('production');
    });

    // ============================================
    // 4. Config shape
    // ============================================
    it('config object has exactly the expected keys', () => {
        process.env.EXPO_PUBLIC_GEMINI_API_KEY = 'shape-test';

        const { config } = require('../config');
        expect(Object.keys(config).sort()).toEqual(['environment', 'geminiApiKey']);
    });
});