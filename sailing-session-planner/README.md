# SailPlan — Sailing Session Planner

A mobile application built with React Native and Expo that helps sailing instructors create tailored lesson plans based on weather conditions, student experience levels, and available resources — powered by AI via the Google Gemini API.

## Features

- **AI-Powered Planning** — Uses Google Gemini AI to generate intelligent, context-aware session plans with teaching tips and weather adaptations.
- **RYA Course Content** — Built-in curriculum data for the RYA Youth and Adult Sailing Schemes, including Youth Stages 1–4, Adult Levels 1–3, Advanced courses, and Racing courses (see [Supported Courses](#supported-courses)).
- **Weather-Aware** — Considers wind speed, gusts, tide strength/direction, and wave height for safer planning.
- **Flexible Inputs** — Configure instructor/student counts, age ranges (8–10, 11–14, 14–18, 18+), session length, boat types (Single/Double handers, Multi-crew), and games.
- **Approximate Timing** — Activities show flexible duration ranges (e.g., "~15–20 min") to accommodate real-world variations.
- **Rule-Based Fallback** — Automatic fallback to a deterministic planner if the AI is unavailable or no API key is configured.
- **Dark/Light Mode** — Automatically adapts to the device's colour scheme.
- **Cross-Platform** — Runs on iOS, Android, and the web via Expo.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Expo](https://expo.dev) (SDK 53) / React Native 0.79 |
| Language | [TypeScript](https://www.typescriptlang.org/) 5.8 |
| Navigation | [Expo Router](https://docs.expo.dev/router/introduction/) (file-based routing) |
| AI | [Google Gemini](https://ai.google.dev/) (`@google/generative-ai`) |
| UI Icons | [Lucide React](https://lucide.dev/) |
| Testing | Jest + React Testing Library |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or yarn
- Google Gemini API key (get one at [Google AI Studio](https://makersuite.google.com/app/apikey)) — optional, the app falls back to the rule-based planner without one

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/SessionPlanner.git
   cd SessionPlanner/sailing-session-planner
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and add your Gemini API key:
   ```env
   EXPO_PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npx expo start
   ```

### Running the App

After starting the development server you can open the app in:

- [Expo Go](https://expo.dev/go) — scan the QR code on your phone (quickest option)
- [Android Emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- Web browser — press `w` in the terminal

## Scripts

All scripts are run from inside `sailing-session-planner/`.

| Command | Description |
|---|---|
| `npm start` | Start the Expo dev server |
| `npm run android` | Start on Android |
| `npm run ios` | Start on iOS |
| `npm run web` | Start in the browser |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests with Jest |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |

## Project Structure

```
sailing-session-planner/
├── app/                        # Screens & routing (Expo Router)
│   ├── index.tsx               # Main session planner screen
│   ├── _layout.tsx             # Root layout with theme provider
│   └── (tabs)/                 # Tab-based navigation
├── components/                 # Reusable UI components
├── constants/                  # Theme colours and constants
├── hooks/                      # Custom React hooks (colour scheme, theme)
├── utils/
│   ├── aiSessionPlanner.ts     # AI-powered plan generation (Gemini)
│   ├── sessionGenerator.ts     # Rule-based plan generation
│   └── config.ts               # Environment / API key validation
├── assets/                     # Fonts and images
└── scripts/                    # Project maintenance scripts
```

## Supported Courses

### Youth Courses
- Stage 1 — Introduction to sailing basics
- Stage 2 — Basic boat handling skills
- Stage 3 — Intermediate sailing techniques
- Stage 4 — Advanced sailing competencies
- Taster Session

### Adult Courses
- Level 1 — Start Sailing
- Level 2 — Basic Skills
- Level 3 — Better Sailing
- Taster Session

### Advanced Courses
- Seamanship Skills
- Sailing with Spinnakers
- Performance Sailing
- Day Sailing

### Racing
- Start Racing (Youth & Adult)
- Club Racing
- Regional Racing
- Championship Racing

## Testing

Tests live alongside source code in `__tests__/` directories. The project enforces a minimum 50 % coverage threshold across branches, functions, lines, and statements.

```bash
npm test
npm run test:coverage
```

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [RYA Sailing Scheme](https://www.rya.org.uk/)
