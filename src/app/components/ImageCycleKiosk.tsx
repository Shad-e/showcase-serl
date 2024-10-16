// components/ImageCycler.tsx
'use client'; // Ensure this component runs on the client-side

import React, { useState, useEffect } from 'react';

interface ImageCyclerProps {
  images: string[]; // Array of image URLs
  altText: string; // Alt text for images
}

const ImageCycler: React.FC<ImageCyclerProps> = ({ images, altText }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [images.length]); // Rerun effect if the images array changes

  return (
    <div className='flex items-center justify-center h-full'>
      {images.length > 0 && (
        <div
          className='project-screenshot-wrapper rounded-lg overflow-hidden'
          style={{ width: images.length > 1 ? '400px' : '800px', maxHeight: '80%' }}
        >
          <img
            src={images[currentImageIndex]}
            alt={altText}
            className='project-screenshot rounded-lg object-cover'
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageCycler;
