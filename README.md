# Image Gallery Website

Next.js public website for browsing and liking images.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file with Firebase and API configuration:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

3. Start the development server:
```bash
npm run dev
```

The website will be available at `http://localhost:3001`

## Features

- Browse all images with sorting options (newest, oldest, most popular)
- Google authentication using Firebase
- Like/unlike images
- View your liked images at `/liked`
- Responsive design
