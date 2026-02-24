// 'use client';

// import { useState, useEffect } from 'react';
// import styles from './ImageCard.module.css';

// export default function ImageCard({ image, onLike, onUnlike, isLiked = false, isAuthenticated = false }) {
//   const [likeCount, setLikeCount] = useState(image.likeCount || 0);
//   const [unlikeCount, setUnlikeCount] = useState(image.unlikeCount || 0);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // Update counts when image prop changes
//     setLikeCount(image.likeCount || 0);
//     setUnlikeCount(image.unlikeCount || 0);
//   }, [image.likeCount, image.unlikeCount]);

//   const handleLikeClick = async () => {
//     if (!isAuthenticated) {
//       alert('Please login to like images');
//       return;
//     }

//     try {
//       setLoading(true);
//       await onLike(image._id);
//     } catch (error) {
//       console.error('Error liking:', error);
//       alert('Failed to like. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUnlikeClick = async () => {
//     if (!isAuthenticated) {
//       alert('Please login to unlike images');
//       return;
//     }

//     try {
//       setLoading(true);
//       await onUnlike(image._id);
//     } catch (error) {
//       console.error('Error unliking:', error);
//       alert('Failed to unlike. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.card}>
//       <div className={styles.imageContainer}>
//         <img
//           src={image.imageUrl || image.image || image.image_url}
//           alt={image.title}
//           className={styles.image}
//           onError={(e) => {
//             e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
//           }}
//         />
//       </div>
//       <div className={styles.info}>
//         <h3 className={styles.title}>{image.title}</h3>
//         {image.description && (
//           <p className={styles.description}>{image.description}</p>
//         )}
//         <div className={styles.meta}>
//           <small className={styles.uploadedBy}>
//             By: {image.uploadedBy?.name || 'Admin'}
//           </small>
//           <small className={styles.date}>
//             {new Date(image.createdAt).toLocaleDateString()}
//           </small>
//         </div>
//         <div className={styles.likeSection}>
//           <button
//             onClick={handleLikeClick}
//             disabled={loading || !isAuthenticated || isLiked}
//             className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
//             title={isAuthenticated ? (isLiked ? 'Already liked' : 'Like this image') : 'Login to like'}
//           >
//             <span className={styles.heart}>{isLiked ? '❤️' : '🤍'}</span>
//             <span className={styles.count}>{likeCount}</span>
//           </button>
//           <span className={styles.likeText}>{likeCount === 1 ? '1 Like' : `${likeCount} Likes`}</span>
//         </div>

//         <div className={styles.unlikeSection}>
//           <button
//             onClick={handleUnlikeClick}
//             disabled={loading || !isAuthenticated || !isLiked}
//             className={`${styles.unlikeButton} ${isLiked ? styles.unlikeable : ''}`}
//             title={isAuthenticated ? (isLiked ? 'Unlike this image' : 'Like image first to unlike') : 'Login to unlike'}
//           >
//             <span className={styles.heart}>{isLiked ? '💔' : '🖤'}</span>
//             <span className={styles.count}>{unlikeCount}</span>
//           </button>
//           <span className={styles.unlikeText}>{unlikeCount === 1 ? '1 Unlike' : `${unlikeCount} Unlikes`}</span>
//         </div>
//       </div>
//     </div>
//   );
// }



'use client';

import { useState, useEffect } from 'react';
import styles from './ImageCard.module.css';

export default function ImageCard({ image, onLike, onUnlike, isLiked = false, isAuthenticated = false }) {
  const [likeCount, setLikeCount] = useState(image.likeCount || 0);
  const [unlikeCount, setUnlikeCount] = useState(image.unlikeCount || 0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLikeCount(image.likeCount || 0);
    setUnlikeCount(image.unlikeCount || 0);
  }, [image.likeCount, image.unlikeCount]);

  const handleLikeClick = async () => {
    if (!isAuthenticated) {
      alert('Please login to like images');
      return;
    }
    if (loading || isLiked) return;
    try {
      setLoading(true);
      await onLike(image._id);
    } catch (error) {
      console.error('Error liking:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlikeClick = async () => {
    if (!isAuthenticated) {
      alert('Please login to unlike images');
      return;
    }
    if (loading || !isLiked) return;
    try {
      setLoading(true);
      await onUnlike(image._id);
    } catch (error) {
      console.error('Error unliking:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={image.imageUrl || image.image || image.image_url}
          alt={image.title}
          className={styles.image}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
          }}
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{image.title}</h3>
        {image.description && (
          <p className={styles.description}>{image.description}</p>
        )}
        <div className={styles.meta}>
          <small className={styles.uploadedBy}>
            By: {image.uploadedBy?.name || 'Admin'}
          </small>
          <small className={styles.date}>
            {new Date(image.createdAt).toLocaleDateString()}
          </small>
        </div>

        <div className={styles.likeSection}>
          <button
            onClick={handleLikeClick}
            disabled={loading || !isAuthenticated || isLiked}
            className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
            title={isAuthenticated ? (isLiked ? 'Already liked' : 'Like this image') : 'Login to like'}
          >
            <span className={styles.heart}>{isLiked ? '❤️' : '🤍'}</span>
            <span className={styles.count}>{likeCount}</span>
          </button>
          <span className={styles.likeText}>{likeCount === 1 ? '1 Like' : `${likeCount} Likes`}</span>
        </div>

        <div className={styles.unlikeSection}>
          <button
            onClick={handleUnlikeClick}
            disabled={loading || !isAuthenticated || !isLiked}
            className={`${styles.unlikeButton} ${isLiked ? styles.unlikeable : ''}`}
            title={isAuthenticated ? (isLiked ? 'Unlike this image' : 'Like image first to unlike') : 'Login to unlike'}
          >
            <span className={styles.heart}>{isLiked ? '💔' : '🖤'}</span>
            <span className={styles.count}>{unlikeCount}</span>
          </button>
          <span className={styles.unlikeText}>{unlikeCount === 1 ? '1 Unlike' : `${unlikeCount} Unlikes`}</span>
        </div>
      </div>
    </div>
  );
}

