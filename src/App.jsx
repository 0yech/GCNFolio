import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import RotatingCube from './RotatingCube';
import Navbar from './Navbar';
import './navbar.css';

export default function App() {
  return (
    <>
      <Navbar />
      <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [0, 0.5, 4], fov: 25 }}>
        <color attach="background" args={['#000006']} />
        <RotatingCube />
        <Environment preset="city" />
      </Canvas>
    </>
  );
}
