# Booking App Prototype

A mobile-first booking system prototype built with React Native (Expo) and SQLite.

## Overview

Built a mobile-focused booking system prototype in ~6.5 hours using React Native (Expo) with local SQLite database and clean architecture.

## Tech Stack

- **Mobile Framework**: React Native (Expo)
- **Backend/API**: Local SQLite with `expo-sqlite`
- **State Management**: React Context API
- **Persistence**: AsyncStorage for user login sessions

## Features

- Email/password authentication
- List of hospitals with details
- View hospital services/tests
- Book an appointment
- Basic validation and error handling
- Offline-first (SQLite database)

## Documentation and Decisions

### Stack & Decisions

- React Native (Expo) chosen for rapid cross-platform development.
- expo-sqlite used for local, offline-capable database.
- AsyncStorage used for login session persistence.

### API & Data Structure

- Custom hooks (`useAuth`, `useHospitals`, `useServices`) manage loading, error, and DB operations.
- `db.ts` handles:
  - Initializing database and tables
  - Seeding mock hospitals, services, and users if empty

## Project Structure

- `/components/UI` → Reusable UI components
- `/constants` → Mock data for hospitals and services
- `/contexts` → Authentication context
- `/db` → Database setup and seeding
- `/hooks` → Custom API and logic hooks
- `/screens` → All application screens


## Error Handling

- Loading spinners during API fetches.
- Error alerts for user feedback and console logs for debugging.

## Assumptions

- Single user session (no reset password, OTP, etc.).
- App remains usable offline after installation.
- Focused on clean UX over full production-level flows.

## 🚀 How to Run

1. **Clone the repo**.

2. **Install dependencies**:
   ```bash
   npm install
   npm run start
3. Open the app using:
   - Expo Go (on your phone)
   - OR an iOS/Android simulator.


## 🔐 Login Credentials
Use the following to log in:

- Email: mamamun1999@gmail.com

- Password: password@

Or simply register a new account from the app.
