import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HologramChartBarIcon() {
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

    // Create chart bars group
    const chartGroup = new THREE.Group();

    // Create bars with different heights
    const createBar = (height: number, x: number) => {
      const barGeometry = new THREE.BoxGeometry(2, height, 2);
      const edges = new THREE.EdgesGeometry(barGeometry);
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0x00ffff,
        transparent: true,
        opacity: 0.9
      });
      const bar = new THREE.LineSegments(edges, lineMaterial);
      bar.position.set(x, height/2, 0);
      return { mesh: bar, geometry: barGeometry, edges };
    };

    // Create 4 bars with different heights
    const bars = [
      createBar(10, -7),  // First bar
      createBar(20, -2),  // Second bar
      createBar(15, 3),   // Third bar
      createBar(25, 8)    // Fourth bar
    ];

    // Add bars to group
    bars.forEach(bar => chartGroup.add(bar.mesh));

    // Add chart group to scene
    scene.add(chartGroup);

    // Position camera
    camera.position.z = 50;
    camera.position.y = 10;
    camera.lookAt(0, 10, 0);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate chart group
      chartGroup.rotation.y += 0.01;

      // Pulse opacity and color
      const time = Date.now() * 0.001;
      bars.forEach(bar => {
        const material = bar.mesh.material as THREE.LineBasicMaterial;
        material.opacity = 0.7 + Math.sin(time * 2) * 0.3;
        
        // Color shift effect
        const hue = (time * 0.1) % 1;
        const color = new THREE.Color();
        color.setHSL(hue, 1, 0.5);
        material.color = color;
      });

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
      bars.forEach(bar => {
        bar.geometry.dispose();
        bar.edges.dispose();
        bar.mesh.material.dispose();
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