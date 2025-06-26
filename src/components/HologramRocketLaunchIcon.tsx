import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HologramRocketLaunchIcon() {
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

    // Create rocket group
    const rocketGroup = new THREE.Group();

    // Create rocket body
    const createRocketBody = () => {
      const bodyGeometry = new THREE.CylinderGeometry(2, 3, 12, 8);
      const edges = new THREE.EdgesGeometry(bodyGeometry);
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0x00ffff,
        transparent: true,
        opacity: 0.9
      });
      const body = new THREE.LineSegments(edges, lineMaterial);
      return { mesh: body, geometry: bodyGeometry, edges };
    };

    // Create rocket nose cone
    const createNoseCone = () => {
      const coneGeometry = new THREE.ConeGeometry(2, 4, 8);
      const edges = new THREE.EdgesGeometry(coneGeometry);
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0x00ffff,
        transparent: true,
        opacity: 0.9
      });
      const cone = new THREE.LineSegments(edges, lineMaterial);
      return { mesh: cone, geometry: coneGeometry, edges };
    };

    // Create rocket fins
    const createFin = () => {
      const finShape = new THREE.Shape();
      finShape.moveTo(0, 0);
      finShape.lineTo(4, -2);
      finShape.lineTo(4, -4);
      finShape.lineTo(0, -1);
      finShape.lineTo(0, 0);

      const finGeometry = new THREE.ShapeGeometry(finShape);
      const edges = new THREE.EdgesGeometry(finGeometry);
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0x00ffff,
        transparent: true,
        opacity: 0.9
      });
      const fin = new THREE.LineSegments(edges, lineMaterial);
      return { mesh: fin, geometry: finGeometry, edges };
    };

    // Create and position rocket parts
    const rocketBody = createRocketBody();
    const noseCone = createNoseCone();
    noseCone.mesh.position.y = 8;
    
    const fins = [];
    for (let i = 0; i < 4; i++) {
      const fin = createFin();
      fin.mesh.rotation.y = (Math.PI / 2) * i;
      fin.mesh.position.y = -6;
      fins.push(fin);
      rocketGroup.add(fin.mesh);
    }

    rocketGroup.add(rocketBody.mesh);
    rocketGroup.add(noseCone.mesh);

    // Create particle trail
    const particlesCount = 100;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesPositions = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlesPositions[i] = (Math.random() - 0.5) * 4;
      particlesPositions[i + 1] = (Math.random() - 0.5) * 20 - 10;
      particlesPositions[i + 2] = (Math.random() - 0.5) * 4;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.2,
      transparent: true,
      opacity: 0.6
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    rocketGroup.add(particles);

    // Add rocket group to scene
    scene.add(rocketGroup);

    // Position camera
    camera.position.z = 40;
    camera.position.y = 0;
    camera.lookAt(0, 0, 0);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate rocket
      rocketGroup.rotation.y += 0.01;

      // Pulse opacity and add effects
      const time = Date.now() * 0.001;
      
      // Animate rocket parts
      [rocketBody, noseCone, ...fins].forEach((part, index) => {
        const material = part.mesh.material as THREE.LineBasicMaterial;
        material.opacity = 0.7 + Math.sin(time * 2 + index * 0.2) * 0.3;
        
        // Color shift effect
        const hue = (time * 0.1 + index * 0.05) % 1;
        const color = new THREE.Color();
        color.setHSL(hue, 1, 0.5);
        material.color = color;
      });

      // Animate particles
      const positions = particlesGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += 0.1;
        if (positions[i + 1] > 10) {
          positions[i + 1] = -10;
        }
      }
      particlesGeometry.attributes.position.needsUpdate = true;
      
      // Add floating motion
      rocketGroup.position.y = Math.sin(time) * 0.5;

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
      [rocketBody, noseCone, ...fins].forEach(part => {
        part.geometry.dispose();
        part.edges.dispose();
        part.mesh.material.dispose();
      });
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
    />
  );
}