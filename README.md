# Gmail Login Website

A simple website with Google Gmail OAuth 2.0 login using Express.js and Passport.

## Prerequisites

- Node.js (v14+)
- MongoDB (local or MongoDB Atlas)
- Google Cloud account with OAuth 2.0 credentials

## Setup

### 1. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Go to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. Application type: **Web application**
6. Authorized redirect URI: `http://localhost:3000/auth/google/callback`
7. Copy **Client ID** and **Client Secret**

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
PORT=3000
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
SESSION_SECRET=your_random_session_secret_here
MONGO_URI=mongodb://localhost:27017/gmail_login_db
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start MongoDB

Ensure MongoDB is running locally, or use MongoDB Atlas connection string in `.env`.

### 5. Run the Server

```bash
npm start
```

Open `http://localhost:3000` in your browser.

## How It Works

1. User clicks **Sign in with Gmail**
2. Redirected to Google OAuth consent screen
3. After approval, Google redirects back to `/auth/google/callback`
4. User profile is saved to MongoDB
5. User is redirected to `/dashboard`
6. Session is maintained via `express-session`

## Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/` | GET | Login page |
| `/auth/google` | GET | Redirect to Google OAuth |
| `/auth/google/callback` | GET | Google OAuth callback |
| `/dashboard` | GET | User dashboard (protected) |
| `/api/user` | GET | Current user JSON (protected) |
| `/api/logout` | GET | Logout and redirect to `/` |

## Tech Stack

- **Backend**: Express.js + Passport.js
- **Auth**: `passport-google-oauth20`
- **Database**: MongoDB + Mongoose
- **Sessions**: `express-session`
- **Frontend**: Vanilla HTML/CSS/JS
