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

## Production deployment

Deploy `server/` as a Node web service (for example, on Render) with `npm install`
as the build command and `npm start` as the start command. Set these server
environment variables in the hosting dashboard, never in Git:

```env
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://your-render-service.onrender.com/api/auth/google/callback
JWT_SECRET=a_new_long_random_production_secret
CLIENT_ORIGIN=https://YOUR-GITHUB-USERNAME.github.io
CLIENT_URL=https://YOUR-GITHUB-USERNAME.github.io/job-application-tracker
```

For the frontend, create `client/.env.production` from
`client/.env.production.example` and replace the API URL with your Render web
service URL. GitHub Pages then publishes the Vite build at
`https://YOUR-GITHUB-USERNAME.github.io/job-application-tracker/`.

## Google Cloud redirect URI

Add this redirect URI to your Google OAuth web-client configuration:

`http://localhost:5000/api/auth/google/callback`

Add `http://localhost:5173` as an authorized JavaScript origin.
