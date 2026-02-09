/**
 * Application configuration and environment validation
 */

interface Config {
    geminiApiKey: string;
    environment: 'development' | 'staging' | 'production';
}

const requiredEnvVars = {
    EXPO_PUBLIC_GEMINI_API_KEY: 'Gemini API key is required for AI features',
};

/**
 * Validates that all required environment variables are present
 * @throws Error if any required variables are missing
 */
function validateEnv(): void {
    const missing: string[] = [];

    for (const [key, description] of Object.entries(requiredEnvVars)) {
        if (!process.env[key]) {
        missing.push(`${key}: ${description}`);
        }
    }

    if (missing.length > 0) {
        throw new Error(
        `Missing required environment variables:\n${missing.join('\n')}\n\n` +
        `Please copy .env.example to .env and fill in the required values.`
        );
    }
}

validateEnv();

export const config: Config = {
    geminiApiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY!,
    environment: (process.env.EXPO_PUBLIC_ENV as Config['environment']) || 'development',
};

