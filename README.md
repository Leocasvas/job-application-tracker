# Job Application Tracker

A full-stack application tracker with Google OAuth, a job-status board, search/filtering, notes, interview dates, and email-ready reminder data.

## Structure

- `client/` — React + Vite dashboard
- `server/` — Express REST API, MongoDB, Google OAuth, JWT authentication

## Setup

1. Repair or install the current Node.js LTS distribution so `npm --version` succeeds.
2. Copy `server/.env.example` to `server/.env` and fill in the values.
3. Install dependencies and start both apps:

```powershell
cd server
npm install
npm run dev
```

In another terminal:

```powershell
cd client
npm install
npm run dev
```

Open `http://localhost:5173`.

## Google Cloud redirect URI

Add this redirect URI to your Google OAuth web-client configuration:

`http://localhost:5000/api/auth/google/callback`

Add `http://localhost:5173` as an authorized JavaScript origin.
