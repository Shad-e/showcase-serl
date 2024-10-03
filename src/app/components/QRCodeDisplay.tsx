"use client";

import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

interface QRCodeDisplayProps {
  url: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ url }) => {
  return (
    <a
      href={url} // Link to the project URL
      target="_blank" // Open the link in a new tab
      rel="noopener noreferrer" // Security feature
      className="mt-4 inline-block transition-transform duration-300 ease-in-out transform hover:scale-105" // Added transition for hover effect
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginLeft: '1rem' }} // Adjusted margin-left
    >
      <QRCodeCanvas 
        value={url} 
        size={128} // Set the size of the QR code
        style={{ borderRadius: '8px' }} // Apply rounded corners directly to the QR code
      />
    </a>
  );
};

export default QRCodeDisplay;
