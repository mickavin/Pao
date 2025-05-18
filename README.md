Pao – Health Companion App (WebView version)
Pao is a privacy-first, gamified health tracking application designed to help patients follow their treatments, report symptoms, and contribute to better healthcare — all in a respectful and anonymous way.

This repository contains the Next.js web base of the application, built to be wrapped inside a React Native WebView, enabling a unified deployment across iOS, Android, and web platforms.

Demo Link
https://meduka-health-app-5.vercel.app/

Features
Daily check-in (medication taken, mood, symptoms, etc.)
Visualized health metrics and progression graphs
Access to 15,000+ medications (DataGouv integration)
AI assistant (powered by OpenAI) for treatment-related questions
Simplified drug notices with accessibility options (audio, large text)
Privacy settings with granular consent
Anonymized data logging via Solana blockchain
Authentication via embedded wallet, no email/password
Tech Stack
Next.js – main frontend framework (React-based)
React Native WebView – used to wrap this Next.js app into native iOS & Android apps
OpenAI – for natural language AI support
DataGouv France – medication database (open data)
Solana – blockchain layer for anonymized, verifiable data
Embedded Wallet – user authentication without personal data
Usage
This app is intended to run as a progressive web app (PWA) or inside a React Native WebView.
You can test it in any browser, or use it as the content layer of your React Native mobile shell.

Development
npm install
npm run dev
--- or ---
yarn
yarn dev
Build (for production)
npm run build
npm start
--- or ---
yarn build
yarn start
How to integrate into a React Native wrapper
In your React Native app:

import React from 'react';
import { WebView } from 'react-native-webview';

export default function MedukaApp() {
  return (
    <WebView
      source={{ uri: 'https://your-deployed-meduka-url.app' }}
      style={{ flex: 1 }}
    />
  );
}
Use Expo for easy cross-platform deployment (iOS & Android).

Roadmap

[x] MVP: Web interface and full feature set

[ ] Beta testing on mobile (via WebView)

[ ] Native integrations for push notifications and offline use

[ ] Token-based reward system (HealthFi)

License This project is under active development and is not yet open source. If you are a health organization, research team, or potential partner, please contact us directly.
