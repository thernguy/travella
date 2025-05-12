# Travelog App

## Overview
This app allows users to create and manage travel logs, as well as chat with other users in real-time. Users can add travel entries with location, photos, and journal notes. They can also search for and chat with other users, with real-time message updates.

## Core Features

### Travel Log
- **Create and Save Entries:**
  - Users can create travel logs with **location** (via GPS or manual entry), **photos** (camera or gallery upload), and **journal notes** (text input).
- **Feed View:**
  - Logs are displayed in a beautiful feed, with the most recent entries shown at the top.
- **Data Storage:**
  - Travel log data is stored in **Firebase Firestore** and uploaded images are stored in **Cloudinary**.

### Real-Time Chat
- **User Search & Chat:**
  - Users can search for others and start 1-on-1 chats.
  - **Online/Offline Status:** User presence is tracked in real-time.
- **Persistent Messages:**
  - All messages are saved in **Firebase Firestore**, ensuring they persist across sessions.
- **Real-Time Updates:**
  - Messages update in real-time using **Firebase Firestore** real-time listeners.

## Tech Stack
- **React Native (Expo):** For building cross-platform mobile apps.
- **Firebase (Firestore):** Used for user authentication, storing travel logs, and handling real-time chat messages.
- **Cloudinary:** For storing and serving images uploaded by users.
  
### Why These Tech Choices?
- **Firebase Firestore** was chosen for its ease of use, scalability, and built-in support for real-time updates, which are crucial for both the travel log and chat features.
- **Cloudinary** is used for image storage because of its reliability, speed, and free tier that fits our needs.
- **Expo** provides a fast, simple setup for React Native apps, and the **Expo Camera** component is perfect for integrating camera functionality without requiring native code changes.

## Setup

1. Clone the repo:

```bash
git clone https://github.com/thernguy/travella
cd travella

2. Install dependencies:

```bash
npm install
```

3. Run the app:

```bash
npm start
```
4. Open the app in an emulator or on a physical device using the Expo Go app.
5. Create a new account or log in with:
   - Username: test@gmail.com
   - Password: password
   2nd account to test Chat:
    - Username: musk@spacex.com
    - Password: password
6. Start creating travel logs and chatting with other users!

## NOTE: The app was optimized for iOS, so previewing on iOS simulator would be better. 