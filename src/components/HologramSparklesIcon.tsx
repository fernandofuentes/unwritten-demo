import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HologramSparklesIcon() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });

    renderer.setSize(800, 800);
    containerRef.current.appendChild(renderer.domElement);

    // Create sparkles group
    const sparklesGroup = new THREE.Group();

    // Create central star
    const createStar = () => {
      const starGroup = new THREE.Group();
      
      // Create star points
      const points = 8;
      const innerRadius = 4;
      const outerRadius = 8;

      for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i * Math.PI) / points;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        const lineGeometry = new THREE.BoxGeometry(0.5, radius, 0.5);
        const edges = new THREE.EdgesGeometry(lineGeometry);
        const lineMaterial = new THREE.LineBasicMaterial({ 
          color: 0x00ffff,
          transparent: true,
          opacity: 0.9
        });
        const line = new THREE.LineSegments(edges, lineMaterial);
        line.position.set(x, y, 0);
        line.rotation.z = angle;
        starGroup.add(line);
      }

      return starGroup;
    };

    const mainStar = createStar();
    sparklesGroup.add(mainStar);

    // Create smaller sparkles
    const createSparkle = (x: number, y: number, size: number) => {
      const sparkleGeometry = new THREE.BoxGeometry(size, size, size);
      const edges = new THREE.EdgesGeometry(sparkleGeometry);
      const material = new THREE.LineBasicMaterial({ 
        color: 0x00ffff,
        transparent: true,
        opacity: 0.9
      });
      const sparkle = new THREE.LineSegments(edges, material);
      sparkle.position.set(x, y, 0);
      return sparkle;
    };

    // Add smaller sparkles around the main star
    const sparkles = [
      createSparkle(-12, 12, 3),
      createSparkle(12, -12, 3),
      createSparkle(-12, -12, 3),
      createSparkle(12, 12, 3)
    ];

    sparkles.forEach(sparkle => sparklesGroup.add(sparkle));

    // Add sparkles group to scene
    scene.add(sparklesGroup);

    // Position camera
    camera.position.z = 40;
    camera.lookAt(0, 0, 0);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate sparkles group
      sparklesGroup.rotation.y += 0.01;

      // Pulse opacity and add wave effect
      const time = Date.now() * 0.001;
      
      // Animate main star
      mainStar.children.forEach((line, index) => {
        const material = line.material as THREE.LineBasicMaterial;
        material.opacity = 0.7 + Math.sin(time * 2 + index * 0.2) * 0.3;
        
        // Color shift effect
        const hue = (time * 0.1 + index * 0.05) % 1;
        const color = new THREE.Color();
        color.setHSL(hue, 1, 0.5);
        material.color = color;
      });

      // Animate smaller sparkles
      sparkles.forEach((sparkle, index) => {
        const material = sparkle.material as THREE.LineBasicMaterial;
        material.opacity = 0.7 + Math.sin(time * 3 + index * 0.5) * 0.3;
        sparkle.rotation.y = time * (index % 2 ? 1 : -1);
        sparkle.rotation.x = time * (index % 2 ? -1 : 1);
      });

      // Add floating motion
      sparklesGroup.position.y = Math.sin(time) * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const size = containerRef.current.offsetWidth;
      renderer.setSize(size, size);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      
      // Cleanup
      mainStar.children.forEach(line => {
        (line.geometry as THREE.BufferGeometry).dispose();
        (line.material as THREE.Material).dispose();
      });
      sparkles.forEach(sparkle => {
        sparkle.geometry.dispose();
        sparkle.material.dispose();
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
    />
  );
}