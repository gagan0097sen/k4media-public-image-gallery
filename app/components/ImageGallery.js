

'use client';

import { useState, useEffect } from 'react';
import { imageService } from '../services/api';
import { useAuth } from '../context/hooks';
import ImageCard from './ImageCard';
import styles from './ImageGallery.module.css';

export default function ImageGallery() {
  const { isAuthenticated } = useAuth();
  const [images, setImages] = useState([]);
  const [likedImageIds, setLikedImageIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchImages();
  }, [sortBy]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchLikedImageIds();
    }
  }, [isAuthenticated]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await imageService.getImages(sortBy);
      const imagesData = response.data.data || [];
      console.log('📸 Images fetched:', imagesData.length);
      setImages(imagesData);
      setError('');
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to load images';
      setError(errorMsg);
      console.error('Error fetching images:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLikedImageIds = async () => {
    try {
      const response = await imageService.getLikedImages();
      const likedImages = response.data.data || [];
      const ids = new Set(likedImages.map(img => img._id));
      setLikedImageIds(ids);
      console.log('💕 Liked image IDs loaded:', ids.size);
    } catch (err) {
      console.error('Error fetching liked image ids:', err);
    }
  };

  const handleLike = async (imageId) => {
    try {
      const response = await imageService.likeImage(imageId);
      const likeCount = response.data.data?.likeCount || 0;
      const unlikeCount = response.data.data?.unlikeCount || 0;
      setImages(prev => prev.map(img =>
        img._id === imageId ? { ...img, likeCount, unlikeCount } : img
      ));
      setLikedImageIds(prev => new Set([...prev, imageId]));
      console.log('❤️ Image liked:', imageId);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Like failed';
      console.error('Like failed:', errorMsg);
      if (err.response?.status !== 400) {
        setError(errorMsg);
      }
    }
  };

  const handleUnlike = async (imageId) => {
    try {
      const response = await imageService.unlikeImage(imageId);
      const likeCount = response.data.data?.likeCount || 0;
      const unlikeCount = response.data.data?.unlikeCount || 0;
      setImages(prev => prev.map(img =>
        img._id === imageId ? { ...img, likeCount, unlikeCount } : img
      ));
      setLikedImageIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(imageId);
        return newSet;
      });
      console.log('💔 Image unliked:', imageId);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Unlike failed';
      console.error('Unlike failed:', errorMsg);
      if (err.response?.status !== 400) {
        setError(errorMsg);
      }
    }
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.controls}>
        <h2>📷 Image Feed</h2>
        <div className={styles.sortButtons}>
          <button
            onClick={() => setSortBy('newest')}
            className={sortBy === 'newest' ? styles.active : ''}
            title="Show newest images first"
          >
            🆕 Newest First
          </button>
          <button
            onClick={() => setSortBy('oldest')}
            className={sortBy === 'oldest' ? styles.active : ''}
            title="Show oldest images first"
          >
            ⏰ Oldest First
          </button>
          <button
            onClick={() => setSortBy('popular')}
            className={sortBy === 'popular' ? styles.active : ''}
            title="Show most liked images"
          >
            🔥 Most Popular
          </button>
        </div>
      </div>

      {error && <div className={styles.error}>❌ {error}</div>}
      {loading && <div className={styles.loading}>⏳ Loading images...</div>}

      {!loading && images.length === 0 && (
        <div className={styles.noImages}>📭 No images available</div>
      )}

      {!loading && images.length > 0 && (
        <div className={styles.grid}>
          {images.map((image) => (
            <ImageCard
              key={image._id}
              image={image}
              onLike={handleLike}
              onUnlike={handleUnlike}
              isLiked={likedImageIds.has(image._id)}
              isAuthenticated={isAuthenticated}
            />
          ))}
        </div>
      )}
    </div>
  );
}

