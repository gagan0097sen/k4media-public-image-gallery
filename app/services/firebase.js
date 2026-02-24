import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Log configuration status
if (typeof window !== 'undefined') {
  console.log('Firebase Config Check:');
  console.log('  ✓ API Key:', firebaseConfig.apiKey ? '✓ Found' : '❌ Missing');
  console.log('  ✓ Auth Domain:', firebaseConfig.authDomain ? '✓ Found' : '❌ Missing');
  console.log('  ✓ Project ID:', firebaseConfig.projectId ? '✓ Found' : '❌ Missing');
  console.log('  ✓ App ID:', firebaseConfig.appId ? '✓ Found' : '❌ Missing');
}

// Validate required config
const requiredFields = ['apiKey', 'authDomain', 'projectId', 'appId'];
const missingFields = requiredFields.filter(field => !firebaseConfig[field]);

if (missingFields.length > 0) {
  console.error('⚠️ Firebase configuration incomplete!');
  console.error('Missing fields:', missingFields);
  console.error('Please check your .env.local file has all NEXT_PUBLIC_FIREBASE_* variables');
}

let app;
let auth;
let db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.error('❌ Firebase initialization error:', error.message);
  console.error('Fix Firebase config before proceeding');
}

export { app, auth, db };
export default app;
