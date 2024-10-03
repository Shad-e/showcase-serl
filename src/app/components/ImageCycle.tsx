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
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [images.length]); // Rerun effect if the images array changes

  return (
    <div className='project-screenshot-wrapper mr-4 rounded-lg overflow-hidden' style={{ width: '400px', height: 'auto' }}>
      <img
        src={images[currentImageIndex]}
        alt={altText}
        className='project-screenshot rounded-lg object-cover w-full h-auto'
      />
    </div>
  );
};

export default ImageCycler;
