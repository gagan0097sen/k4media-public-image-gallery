
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


