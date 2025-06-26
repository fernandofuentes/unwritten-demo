import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HologramCodeBracketIcon() {
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

    // Create icon group
    const iconGroup = new THREE.Group();

    // Create left bracket
    const createBracket = (x: number, isLeft: boolean) => {
      const bracketGroup = new THREE.Group();
      
      // Vertical line
      const verticalGeometry = new THREE.BoxGeometry(1, 12, 1);
      const edges = new THREE.EdgesGeometry(verticalGeometry);
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0x00ffff,
        transparent: true,
        opacity: 0.9
      });
      const verticalLine = new THREE.LineSegments(edges, lineMaterial);
      verticalLine.position.set(x, 0, 0);
      bracketGroup.add(verticalLine);

      // Top angle
      const topAngleGroup = new THREE.Group();
      const topGeometry = new THREE.BoxGeometry(4, 1, 1);
      const topEdges = new THREE.EdgesGeometry(topGeometry);
      const topLine = new THREE.LineSegments(topEdges, lineMaterial);
      topLine.position.set(isLeft ? x + 2 : x - 2, 5.5, 0);
      topAngleGroup.add(topLine);
      bracketGroup.add(topAngleGroup);

      // Bottom angle
      const bottomAngleGroup = new THREE.Group();
      const bottomGeometry = new THREE.BoxGeometry(4, 1, 1);
      const bottomEdges = new THREE.EdgesGeometry(bottomGeometry);
      const bottomLine = new THREE.LineSegments(bottomEdges, lineMaterial);
      bottomLine.position.set(isLeft ? x + 2 : x - 2, -5.5, 0);
      bottomAngleGroup.add(bottomLine);
      bracketGroup.add(bottomAngleGroup);

      return {
        group: bracketGroup,
        geometries: [verticalGeometry, topGeometry, bottomGeometry],
        edges: [edges, topEdges, bottomEdges]
      };
    };

    // Create left and right brackets
    const leftBracket = createBracket(-8, true);
    const rightBracket = createBracket(8, false);

    // Add brackets to icon group
    iconGroup.add(leftBracket.group);
    iconGroup.add(rightBracket.group);

    // Create code symbol (slash)
    const slashGeometry = new THREE.BoxGeometry(1, 14, 1);
    const slashEdges = new THREE.EdgesGeometry(slashGeometry);
    const slashMaterial = new THREE.LineBasicMaterial({ 
      color: 0x00ffff,
      transparent: true,
      opacity: 0.9
    });
    const slash = new THREE.LineSegments(slashEdges, slashMaterial);
    slash.rotation.z = Math.PI / 4;
    iconGroup.add(slash);

    // Add icon group to scene
    scene.add(iconGroup);

    // Position camera
    camera.position.z = 40;
    camera.lookAt(0, 0, 0);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate icon group
      iconGroup.rotation.y += 0.01;

      // Pulse opacity and add wave effect
      const time = Date.now() * 0.001;
      const materials = [leftBracket.group, rightBracket.group, slash].map(
        obj => obj.material as THREE.LineBasicMaterial
      );

      materials.forEach((material, index) => {
        if (material) {
          material.opacity = 0.7 + Math.sin(time * 2 + index * 0.5) * 0.3;
          
          // Color shift effect
          const hue = (time * 0.1 + index * 0.1) % 1;
          const color = new THREE.Color();
          color.setHSL(hue, 1, 0.5);
          material.color = color;
        }
      });

      // Add floating motion
      iconGroup.position.y = Math.sin(time) * 0.5;

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
      
      // Cleanup geometries and materials
      [...leftBracket.geometries, ...rightBracket.geometries, slashGeometry].forEach(
        geometry => geometry.dispose()
      );
      [...leftBracket.edges, ...rightBracket.edges, slashEdges].forEach(
        edges => edges.dispose()
      );
      [leftBracket.group, rightBracket.group, slash].forEach(obj => {
        if (obj.material) (obj.material as THREE.Material).dispose();
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