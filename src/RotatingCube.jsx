import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, MeshTransmissionMaterial } from '@react-three/drei'; // Importation corrigée
import { gsap } from 'gsap';
import Button from './Button';
import Container from './Container';
import BotContainer from './BotContainer';
import * as THREE from 'three';

export default function RotatingCube() {
  const cubeRef = useRef();
  const [rotationState, setRotationState] = useState({ x: 0, y: 0 });
  const [currentFace, setCurrentFace] = useState('front');
  const idleAnimation = useRef(null);
  const throttleTimeout = useRef(false);

  // Refs pour chaque cotés
  const frontContentRefs = useRef([]);
  const topContentRef = useRef();
  const bottomContentRef = useRef();
  const leftContentRef = useRef();
  const rightContentRef = useRef();

  // Mapping de chaque coté, position&rotation
  const faceRotations = {
    front: { x: 0, y: 0 },
    top: { x: -Math.PI / 2, y: 0 },
    bottom: { x: Math.PI / 2, y: 0 },
    left: { x: 0, y: Math.PI / 2 },
    right: { x: 0, y: -Math.PI / 2 },
  };

  // Afficher si highlighté
  useFrame(() => {
    // Rendre visible les boutons de la face avant
    frontContentRefs.current.forEach((ref) => {
      if (ref.current) {
        ref.current.visible = currentFace === 'front';
      }
    });

    // Rendre les faces visible si on est dessus
    if (topContentRef.current) {
      topContentRef.current.visible = currentFace === 'top';
    }
    if (bottomContentRef.current) {
      bottomContentRef.current.visible = currentFace === 'bottom';
    }
    if (leftContentRef.current) {
      leftContentRef.current.visible = currentFace === 'left';
    }
    if (rightContentRef.current) {
      rightContentRef.current.visible = currentFace === 'right';
    }
  });

  // Idle anim (à améliorer pour mimic mieux l'OG)
  const startIdleAnimation = () => {
    if (!idleAnimation.current) {
      idleAnimation.current = gsap.to(cubeRef.current.rotation, {
        y: '-=0.1',
        x: '-=0.1',
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: 'power1.inOut',
      });
    }
  };

  const stopIdleAnimation = () => {
    if (idleAnimation.current) {
      idleAnimation.current.kill();
      idleAnimation.current = null;
    }
  };

  // Tourner vers la target.
  const rotateCube = (targetX, targetY) => {
    stopIdleAnimation();
    gsap.to(cubeRef.current.rotation, {
      x: targetX,
      y: targetY,
      duration: 0.6,
      ease: 'power3.inOut',
      onComplete: () => {
        throttleTimeout.current = false;
        startIdleAnimation();
      },
    });
  };

  // Handler pour les flèches
  const handleKeyDown = (event) => {
    if (throttleTimeout.current) return;
    throttleTimeout.current = true;

    if (currentFace === 'front') {
      let targetFace = '';
      switch (event.key) {
        case 'ArrowUp':
          targetFace = 'bottom';
          break;
        case 'ArrowDown':
          targetFace = 'top';
          break;
        case 'ArrowLeft':
          targetFace = 'left';
          break;
        case 'ArrowRight':
          targetFace = 'right';
          break;
        default:
          throttleTimeout.current = false;
          return;
      }
      const { x: targetX, y: targetY } = faceRotations[targetFace];
      setRotationState({ x: targetX, y: targetY });
      rotateCube(targetX, targetY);
      setCurrentFace(targetFace);
    } else {
      // Retourner à la face de front peu importe la touche.
      const { x: targetX, y: targetY } = faceRotations['front'];
      setRotationState({ x: targetX, y: targetY });
      rotateCube(targetX, targetY);
      setCurrentFace('front');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      stopIdleAnimation();
    };
  }, [currentFace]);

  useEffect(() => {
    startIdleAnimation();
    return () => stopIdleAnimation();
  }, []);

  return (
    <RoundedBox ref={cubeRef} radius={0.075} smoothness={3}>
      <MeshTransmissionMaterial
        backside
        thickness={0}
        anisotropy={0.5}
        iridescence={1}
        iridescenceIOR={1}
        iridescenceThicknessRange={[0, 1400]}
      />
      {/* Gestion des Components, todo : un component par face.*/}
      <Button
        ref={(el) => (frontContentRefs.current[0] = el)}
        position={[0, 0.37, 0.51]}
      >
        Game Play
      </Button>
      <Button
        ref={(el) => (frontContentRefs.current[1] = el)}
        rotation={[0, 0, -Math.PI / 2]}
        position={[0.37, 0, 0.51]}
      >
        Calendar
      </Button>
      <Button
        ref={(el) => (frontContentRefs.current[2] = el)}
        position={[0, -0.37, 0.51]}
      >
        Memory Card
      </Button>
      <Button
        ref={(el) => (frontContentRefs.current[3] = el)}
        rotation={[0, 0, Math.PI / 2]}
        position={[-0.37, 0, 0.51]}
      >
        Options
      </Button>
      <BotContainer
        ref={topContentRef}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, -0.51, 0]}
        nae="Featured Project - Oxypolis"
        description={["My Team's entry at Global Game Jam 2025 (Theme : Bubble), Oxypolis - a farm game where you build a space station and grow it",
        <br/>,<br/>,
        "Check the project ",
        <a href="https://github.com/0yech/Oxypolis">
        here
        </a>]}
        imageUrl="Oxypolis.png"
      >
      </BotContainer>
      <Button
        ref={bottomContentRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.51, 0]}
        link="https://github.com/0yech"
      >
        Github
      </Button>
      <Container
        ref={leftContentRef}
        rotation={[0, -Math.PI / 2, 0]}
        position={[-0.51, 0, 0]}
        nae="Specializing in C @ 42"
        description={["Currently recreating Raytracing C (42 miniRT)",
        <br/>,<br/>,
        "Technologies and languages i've worked with so far :",
        <br/>,<br/>,
        "C, CPP, C#, PHP, Bash, Python & Django, Ruby, JS"]}
        imageUrl="C_Logo.png"
      >
      </Container>
      <Container
        ref={rightContentRef}
        rotation={[0, Math.PI / 2, 0]}
        position={[0.51, 0, 0]}
        nae="Cheyo"
        description={["42 Student in Lausanne, learning C and Low Level enthusiast.",
        <br/>,<br/>,
        "This Portfolio is a recreation of the Gamecube Bios"]}
        imageUrl="cheyo.jpeg"
      >
      </Container>
    </RoundedBox>
  );
}
