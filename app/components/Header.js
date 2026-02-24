// 'use client';

// import { useEffect, useState } from 'react';
// import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
// import { useRouter, usePathname } from 'next/navigation';
// import { auth } from '../services/firebase';
// import { authService } from '../services/api';
// import { useAuth } from '../context/hooks';
// import styles from './Header.module.css';

// export default function Header() {
//   const { user, login, logout, isAuthenticated } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const pathname = usePathname();

//   const handleGoogleLogin = async () => {
//     try {
//       setLoading(true);
//       console.log('🔐 Initiating Google Sign-In...');
      
//       if (!auth) {
//         throw new Error('Firebase not initialized. Check your Firebase configuration.');
//       }

//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       const firebaseToken = await result.user.getIdToken();

//       console.log('🔑 Firebase token obtained');

//       // Send token to backend
//       const response = await authService.googleLogin(firebaseToken);
//       console.log('📱 Backend response:', response.data);

//       // Backend returns: { success: true, data: { user: {...}, token: '...' }, message: '...' }
//       const userData = response.data.data;
//       if (userData && userData.user && userData.token) {
//         login(userData.user, userData.token);
//         console.log('✅ Login successful');
//         alert('✅ Login successful! Welcome ' + userData.user.name);
//       } else {
//         throw new Error('Invalid login response from server');
//       }
//     } catch (error) {
//       console.error('❌ Login failed:', error);
//       let errorMsg = 'Login failed. Please try again.';
      
//       if (error.code === 'auth/configuration-not-found') {
//         errorMsg = '❌ Firebase is not configured. Admin must set up Firebase credentials.';
//       } else if (error.code === 'auth/popup-closed-by-user') {
//         errorMsg = 'Login cancelled.';
//       } else if (error.response?.data?.message) {
//         errorMsg = error.response.data.message;
//       } else if (error.message) {
//         errorMsg = error.message;
//       }
      
//       alert(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       logout();
//       router.push('/');
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   const isActive = (path) => pathname === path;

//   return (
//     <header className={styles.header}>
//       <div className={styles.container}>
//         <h1 onClick={() => router.push('/')}>📸 Image Gallery</h1>
//         <nav className={styles.nav}>
//           {isAuthenticated ? (
//             <>
//               <div className={styles.links}>
//                 <button
//                   onClick={() => router.push('/')}
//                   className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
//                 >
//                   Feed
//                 </button>
//                 <button
//                   onClick={() => router.push('/liked')}
//                   className={`${styles.navLink} ${isActive('/liked') ? styles.active : ''}`}
//                 >
//                   My Likes
//                 </button>
//               </div>
//               <div className={styles.userSection}>
//                 <span className={styles.userName}>👤 {user?.name}</span>
//                 <button onClick={handleLogout} className={styles.button}>
//                   Logout
//                 </button>
//               </div>
//             </>
//           ) : null}
//         </nav>
//       </div>
//     </header>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import { auth } from '../services/firebase';
import { useAuth } from '../context/hooks';
import styles from './Header.module.css';

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      if (auth) {
        await signOut(auth);
      }
      logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      // Still logout from app even if firebase signout fails
      logout();
      router.push('/');
    }
  };

  const isActive = (path) => pathname === path;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>📸 Image Gallery</h1>
        <nav className={styles.nav}>
          {isAuthenticated ? (
            <>
              <div className={styles.links}>
                <button
                  onClick={() => router.push('/')}
                  className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
                >
                  Feed
                </button>
                <button
                  onClick={() => router.push('/liked')}
                  className={`${styles.navLink} ${isActive('/liked') ? styles.active : ''}`}
                >
                  My Likes
                </button>
              </div>
              <div className={styles.userSection}>
                <span className={styles.userName}>👤 {user?.name}</span>
                <button onClick={handleLogout} className={styles.button}>
                  Logout
                </button>
              </div>
            </>
          ) : null}
        </nav>
      </div>
    </header>
  );
}

