import React, { forwardRef } from 'react';
import { Html } from '@react-three/drei';
import './Container.css';

const Container = forwardRef(({ nae, description, imageUrl = 'https://via.placeholder.com/80', position, rotation }, ref) => {  return (
    <Html
      ref={ref}
      position={position}
      rotation={rotation}
      transform         // /!\ let's it within 3d objects
      scale={0.1}       // Counter fullscreen glitch
      occlude           // Object stays hidden when another one is highlighted
    >
      <div className="profile-card">
        <img src={imageUrl} className="profile-image"/>
        <h3 className="profile-name">{nae}</h3>
        <p className="profile-description">{description}</p>
      </div>
    </Html>
  );
});

export default Container;
