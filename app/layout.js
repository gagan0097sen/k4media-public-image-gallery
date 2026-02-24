


'use client';

import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import './layout.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}


