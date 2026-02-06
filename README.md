# SailPlan - Sailing Session Planner

A mobile application built with React Native and Expo that helps sailing instructors create tailored lesson plans based on weather conditions, student experience levels, and available resources. **Now powered by Google Gemini AI** for intelligent, context-aware session planning.

## Features

- **AI-Powered Planning** - Uses Google Gemini AI to generate intelligent, context-aware session plans with teaching tips and weather adaptations
- **RYA Course Content** - Supports Youth Stages 1-4, Adult Levels 1-3, Advanced courses (Seamanship Skills, Spinnakers, Performance Sailing, Day Sailing), and Racing courses
- **Weather-Aware** - Considers wind speed, gusts, tide strength/direction, and wave height for safer planning
- **Flexible Inputs**:
  - Instructor and student counts
  - Age ranges (8-10, 11-14, 14-18, 18+)
  - Session length configuration
  - Boat type selection (Single/Double handers, Multi-crew)
  - Games and activities integration
- **Approximate Timing** - Activities show flexible duration ranges (e.g., "~15-20 min") to accommodate real-world variations
- **Fallback Planning** - Automatic fallback to deterministic planner if AI is unavailable
- **Dark/Light Mode** - Supports system theme preferences

## Tech Stack

- [Expo](https://expo.dev) - React Native framework
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based routing
- [React Native](https://reactnative.dev) - Cross-platform mobile development
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Google Generative AI](https://ai.google.dev/) - Gemini AI for intelligent planning
- [Lucide React](https://lucide.dev/) - Icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Expo CLI
- Google Gemini API key (get one at [Google AI Studio](https://makersuite.google.com/app/apikey))

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
   ```
   EXPO_PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npx expo start
   ```

### Running the App

After starting the development server, you can open the app in:

- [Expo Go](https://expo.dev/go) - Scan the QR code with the Expo Go app on your phone
- [Android Emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/)
- Web browser - Press `w` in the terminal

## Project Structure

```
sailing-session-planner/
├── app/                    # App screens (file-based routing)
│   ├── index.tsx          # Main session planner screen
│   └── _layout.tsx        # Root layout
├── components/            # Reusable UI components
├── constants/             # App constants (colors, etc.)
├── hooks/                 # Custom React hooks
├── utils/
│   ├── aiSessionPlanner.ts # AI-powered session planning with Gemini
│   └── sessionGenerator.ts # Fallback deterministic planner
└── assets/               # Images and fonts
```

## Supported Courses

### Youth Courses
- Stage 1 - Introduction to sailing basics
- Stage 2 - Basic boat handling skills
- Stage 3 - Intermediate sailing techniques
- Stage 4 - Advanced sailing competencies
- Taster Session

### Adult Courses
- Level 1 - Start Sailing
- Level 2 - Basic Skills
- Level 3 - Better Sailing
- Taster Session

### Advanced Courses
- Seamanship Skills
- Sailing with Spinnakers
- Performance Sailing
- Day Sailing

### Racing
- Start Racing
