// 'use client';

// import { useAuth, ProtectedComponent } from '../context/hooks';
// import { imageService } from '../services/api';
// import { useState, useEffect } from 'react';
// import ImageCard from './ImageCard';
// import styles from './LikedImages.module.css';

// export default function LikedImages() {
//   return (
//     <ProtectedComponent>
//       <LikedImagesContent />
//     </ProtectedComponent>
//   );
// }

// function LikedImagesContent() {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchLikedImages();
//   }, []);

//   const fetchLikedImages = async () => {
//     try {
//       setLoading(true);
//       const response = await imageService.getLikedImages();
//       // Backend returns: { success: true, data: [...], message: '...' }
//       const imagesData = response.data.data || [];
//       console.log('💕 Liked images fetched:', imagesData.length);
//       setImages(imagesData);
//       setError('');
//     } catch (err) {
//       const errorMsg = err.response?.data?.message || err.message || 'Failed to load liked images';
//       setError(errorMsg);
//       console.error('Error loading liked images:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUnlike = async (imageId) => {
//     try {
//       await imageService.unlikeImage(imageId);
//       setImages(images.filter(img => img._id !== imageId));
//       console.log('💔 Image removed from likes');
//     } catch (err) {
//       const errorMsg = err.response?.data?.message || 'Unlike failed';
//       console.error('Unlike failed:', errorMsg);
//       setError(errorMsg);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h2>💕 Your Liked Images</h2>

//       {error && <div className={styles.error}>❌ {error}</div>}
//       {loading && <div className={styles.loading}>⏳ Loading...</div>}

//       {!loading && images.length === 0 && (
//         <p className={styles.noImages}>📭 You haven't liked any images yet</p>
//       )}

//       {!loading && images.length > 0 && (
//         <div className={styles.grid}>
//           {images.map((image) => (
//             <div key={image._id} className={styles.cardWrapper}>
//               <ImageCard
//                 image={image}
//                 onUnlike={handleUnlike}
//                 isLiked={true}
//                 isAuthenticated={true}
//               />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


'use client';

import { useAuth, ProtectedComponent } from '../context/hooks';
import { imageService } from '../services/api';
import { useState, useEffect } from 'react';
import ImageCard from './ImageCard';
import styles from './LikedImages.module.css';

export default function LikedImages() {
  return (
    <ProtectedComponent>
      <LikedImagesContent />
    </ProtectedComponent>
  );
}

function LikedImagesContent() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLikedImages();
  }, []);

  const fetchLikedImages = async () => {
    try {
      setLoading(true);
      const response = await imageService.getLikedImages();
      const imagesData = response.data.data || [];
      console.log('💕 Liked images fetched:', imagesData.length);
      setImages(imagesData);
      setError('');
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to load liked images';
      setError(errorMsg);
      console.error('Error loading liked images:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlike = async (imageId) => {
    try {
      await imageService.unlikeImage(imageId);
      setImages(prev => prev.filter(img => img._id !== imageId));
      console.log('💔 Image removed from likes');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Unlike failed';
      console.error('Unlike failed:', errorMsg);
      setError(errorMsg);
    }
  };

  return (
    <div className={styles.container}>
      <h2>💕 Your Liked Images</h2>

      {error && <div className={styles.error}>❌ {error}</div>}
      {loading && <div className={styles.loading}>⏳ Loading...</div>}

      {!loading && images.length === 0 && (
        <p className={styles.noImages}>📭 You haven't liked any images yet</p>
      )}

      {!loading && images.length > 0 && (
        <div className={styles.grid}>
          {images.map((image) => (
            <div key={image._id} className={styles.cardWrapper}>
              <ImageCard
                image={image}
                onUnlike={handleUnlike}
                onLike={() => {}}
                isLiked={true}
                isAuthenticated={true}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

