import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function GalaxyParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Get container dimensions
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerWidth / containerHeight,
      0.1,
      2000
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: false,
      antialias: true,
      powerPreference: 'high-performance',
    });

    renderer.setClearColor(0x0d0d0d, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1)); // Limit pixel ratio
    renderer.setSize(containerWidth, containerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create text sprite with optimized texture
    const createTextSprite = (text: string) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return null;

      canvas.width = 256; // Reduced from 512
      canvas.height = 64; // Reduced from 128

      context.font = 'bold 24px Poppins'; // Reduced from 36px
      context.fillStyle = '#ffffff';
      context.textAlign = 'center';
      context.fillText(text, canvas.width / 2, canvas.height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.8,
      });

      return new THREE.Sprite(spriteMaterial);
    };

    // Create optimized particles
    const particlesCount = 500; // Reduced from 1000
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: '#ffffff',
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      depthWrite: false, // Improve performance
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Create optimized glowing cube
    const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const edges = new THREE.EdgesGeometry(cubeGeometry);
    const cubeMaterial = new THREE.LineBasicMaterial({ 
      color: 0x00ffff,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });
    
    const glowingCube = new THREE.LineSegments(edges, cubeMaterial);
    scene.add(glowingCube);

    const textSprite = createTextSprite('');
    if (textSprite) {
      textSprite.scale.set(1.2, 0.3, 1);
      scene.add(textSprite);
    }

    camera.position.z = 8;
    camera.position.x = 2;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);

    let lastTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      requestAnimationFrame(animate);

      // Throttle frame rate
      const deltaTime = currentTime - lastTime;
      if (deltaTime < frameInterval) return;
      lastTime = currentTime - (deltaTime % frameInterval);

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      const maxCameraMove = 1;
      const baseX = 2;
      camera.position.x = baseX + targetX * maxCameraMove;
      camera.position.y = targetY * maxCameraMove;
      camera.lookAt(new THREE.Vector3(2, 0, 0));

      const time = currentTime * 0.001;
      const angle = ((time % 20) * (Math.PI * 2)) / 20;

      const xOffset = 5;
      const radius = 3;

      glowingCube.position.set(
        xOffset,
        Math.sin(angle) * radius,
        Math.cos(angle) * radius
      );

      glowingCube.rotation.x += 0.02;
      glowingCube.rotation.y += 0.02;

      cubeMaterial.opacity = 0.7 + Math.sin(time * 2) * 0.3;

      const zPosition = glowingCube.position.z;
      const normalizedZ = (zPosition + radius) / (2 * radius);

      if (textSprite) {
        textSprite.position.set(
          glowingCube.position.x,
          glowingCube.position.y + 0.5,
          glowingCube.position.z
        );
        textSprite.lookAt(camera.position);
        textSprite.material.opacity = 0.8 + Math.sin(time * 2) * 0.2;

        const textScale = 1.2 * (0.8 + 0.4 * normalizedZ);
        textSprite.scale.set(textScale, textScale * 0.25, 1);
      }

      particlesMesh.rotation.y = time * 0.02; // Reduced rotation speed

      renderer.render(scene, camera);
    };

    animate(0);

    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
      renderer.setSize(rect.width, rect.height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      cubeGeometry.dispose();
      edges.dispose();
      cubeMaterial.dispose();
      if (textSprite) {
        textSprite.material.map?.dispose();
        textSprite.material.dispose();
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full h-full"
      style={{
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}