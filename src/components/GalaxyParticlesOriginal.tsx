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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(containerWidth, containerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create text sprite
    const createTextSprite = (text: string) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return null;

      canvas.width = 512;
      canvas.height = 128;

      context.font = 'bold 36px Poppins';
      context.fillStyle = '#ffffff';
      context.textAlign = 'center';
      context.fillText(text, canvas.width / 2, canvas.height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.8,
      });

      return new THREE.Sprite(spriteMaterial);
    };

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
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
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Create glowing particle
    const glowGeometry = new THREE.BufferGeometry();
    const glowVertices = new Float32Array(3);
    glowGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(glowVertices, 3)
    );

    const glowMaterial = new THREE.PointsMaterial({
      size: 0.5,
      color: '#00ffff',
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const glowingParticle = new THREE.Points(glowGeometry, glowMaterial);
    scene.add(glowingParticle);

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
      // Get container position
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      // Calculate mouse position relative to container
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      targetX += (mouseX - targetX) * 0.005;
      targetY += (mouseY - targetY) * 0.005;

      const maxCameraMove = 1;
      const baseX = 2;
      camera.position.x = baseX + targetX * maxCameraMove;
      camera.position.y = targetY * maxCameraMove;
      camera.lookAt(new THREE.Vector3(2, 0, 0));

      const time = Date.now() * 0.001;

      const angle = ((time % 20) * (Math.PI * 2)) / 20;

      const xOffset = 5;
      const radius = 3;
      const glowPos = glowingParticle.geometry.attributes.position
        .array as Float32Array;

      glowPos[0] = xOffset;
      glowPos[1] = Math.sin(angle) * radius;
      glowPos[2] = Math.cos(angle) * radius;

      const baseSize = 0.5;
      const minSize = 0.2;
      const zPosition = glowPos[2];
      const normalizedZ = (zPosition + radius) / (2 * radius);
      const dynamicSize = baseSize * (minSize + (1 - minSize) * normalizedZ);
      glowMaterial.size = dynamicSize;

      if (textSprite) {
        textSprite.position.set(glowPos[0], glowPos[1] + 0.5, glowPos[2]);
        textSprite.lookAt(camera.position);
        textSprite.material.opacity = 0.8 + Math.sin(time * 2) * 0.2;

        const textScale = 1.2 * (0.8 + 0.4 * normalizedZ);
        textSprite.scale.set(textScale, textScale * 0.25, 1);
      }

      glowingParticle.geometry.attributes.position.needsUpdate = true;

      particlesMesh.rotation.y = time * 0.03;

      renderer.render(scene, camera);
    };

    animate();

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
      glowGeometry.dispose();
      glowMaterial.dispose();
      if (textSprite) {
        textSprite.material.map?.dispose();
        textSprite.material.dispose();
      }
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
