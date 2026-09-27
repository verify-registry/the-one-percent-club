# Architecture Map — The 1% Club

## Overview
The 1% Club is a digital private sovereign membership application built with a modular Vanilla JavaScript frontend and an Express.js backend running on Node.js.

## Directory Structure
- `/index.html`: Main application entry point and DOM structure containing navigation, header, hallmark emblems, and layout containers.
- `/app.js`: Core frontend logic managing tabs (Membership, Club, Profile, Boutique), state management, Master Identity Card, chat rooms, and UI interactions.
- `/luxury.js`: Luxury visual effects, 3D tilt/parallax effects, particle systems, and aesthetic enhancements for the obsidian and gold design system.
- `/Audio.js`: Ambient audio and tactile sound effects for premium interactions.
- `/translations.js`: Multilingual support (Arabic / English localization dictionary).
- `/server.js`: Express.js server handling static file distribution and SPA fallback routing.
- `/package.json`: Project manifest and scripts.
- `/metadata.json`: Applet configuration and capability declarations.

## Navigation Architecture
1. Membership (العضوية) — Sovereign Identity & Master Identity Card
2. Club (النادي) — Private Society & Discussion Lounges
3. Profile (الملف) — Personal Dossier & Collectibles
4. Boutique (البوتيك) — Luxury Artifacts Marketplace

## Data Flow & Storage
- Client-side state persisted via localStorage where appropriate.
- Stateless backend serving static assets and dynamic routing on Node.js port 3000.
