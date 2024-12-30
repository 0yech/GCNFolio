import React from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const Button = React.forwardRef(({ children, color = 'white', link, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      color={color}
      material-side={THREE.FrontSide}
      onPointerOver={() => ref.current && ref.current.material.color.set('orange')}
      onPointerOut={() => ref.current && ref.current.material.color.set(color)}
      onClick={() => link && window.open(link, '_blank')}
      font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZs.woff"
      anchorY="middle"
      anchorX="center"
      fontSize={0.09}
      {...props}
    >
      {children}
    </Text>
  );
});

export default Button;
