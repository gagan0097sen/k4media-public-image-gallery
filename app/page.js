// // 'use client';

// // import { useAuth } from './context/hooks';
// // import { useRouter } from 'next/navigation';
// // import { useEffect } from 'react';
// // import LoginPage from './components/LoginPage';
// // import ImageGallery from './components/ImageGallery';

// // export default function Page() {
// //   const { isAuthenticated, loading } = useAuth();
// //   const router = useRouter();

// //   if (loading) {
// //     return <div style={{ textAlign: 'center', padding: '40px' }}>⏳ Loading...</div>;
// //   }

// //   // Show login page if not authenticated
// //   if (!isAuthenticated) {
// //     return <LoginPage />;
// //   }

// //   // Show image gallery if authenticated
// //   return <ImageGallery />;
// // }


// 'use client';

// import { useAuth } from './context/hooks';
// import LoginPage from './components/LoginPage';
// import ImageGallery from './components/ImageGallery';

// export default function Page() {
//   const { isAuthenticated, loading } = useAuth();

//   if (loading) {
//     return <div style={{ textAlign: 'center', padding: '40px' }}>⏳ Loading...</div>;
//   }

//   // Show login page if not authenticated
//   if (!isAuthenticated) {
//     return <LoginPage />;
//   }

//   // Show image gallery only if authenticated
//   return <ImageGallery />;
// }


// 'use client';

// import { useAuth } from './context/hooks';
// import LoginPage from './components/LoginPage';
// import ImageGallery from './components/ImageGallery';

// export default function Page() {
//   const { isAuthenticated, loading } = useAuth();

//   if (loading) {
//     return <div style={{ textAlign: 'center', padding: '40px' }}>⏳ Loading...</div>;
//   }

//   // Show login page if not authenticated
//   if (!isAuthenticated) {
//     return <LoginPage />;
//   }

//   // Show image gallery only if authenticated
//   return <ImageGallery />;
// }


'use client';

import { useAuth } from "./context/hooks";
import LoginPage from "./components/LoginPage"; ;
import ImageGallery from   "./components/ImageGallery";

export default function Page() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>⏳ Loading...</div>;
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Show image gallery only if authenticated
  return <ImageGallery />;
}

