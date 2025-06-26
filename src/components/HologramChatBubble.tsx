import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HologramChatBubble() {
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

    // Create thumbs up group
    const thumbsUpGroup = new THREE.Group();

    // Create thumb shape
    const createThumb = () => {
      // Main thumb cylinder
      const thumbGeometry = new THREE.CylinderGeometry(1.5, 1.5, 6, 8);
      const thumbEdges = new THREE.EdgesGeometry(thumbGeometry);
      const thumbMaterial = new THREE.LineBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.9
      });
      const thumb = new THREE.LineSegments(thumbEdges, thumbMaterial);
      thumb.rotation.z = Math.PI / 4;
      thumb.position.y = 2;
      
      return { mesh: thumb, geometry: thumbGeometry, edges: thumbEdges };
    };

    // Create palm shape
    const createPalm = () => {
      const palmGeometry = new THREE.BoxGeometry(4, 8, 2);
      const palmEdges = new THREE.EdgesGeometry(palmGeometry);
      const palmMaterial = new THREE.LineBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.9
      });
      const palm = new THREE.LineSegments(palmEdges, palmMaterial);
      palm.position.y = -2;
      
      return { mesh: palm, geometry: palmGeometry, edges: palmEdges };
    };

    // Create finger joints
    const createFingerJoint = (x: number, y: number, rotation: number) => {
      const jointGeometry = new THREE.BoxGeometry(1, 2, 1);
      const jointEdges = new THREE.EdgesGeometry(jointGeometry);
      const jointMaterial = new THREE.LineBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.9
      });
      const joint = new THREE.LineSegments(jointEdges, jointMaterial);
      joint.position.set(x, y, 0);
      joint.rotation.z = rotation;
      
      return { mesh: joint, geometry: jointGeometry, edges: jointEdges };
    };

    // Create and add thumb
    const thumb = createThumb();
    thumbsUpGroup.add(thumb.mesh);

    // Create and add palm
    const palm = createPalm();
    thumbsUpGroup.add(palm.mesh);

    // Create and add finger joints
    const joints = [
      createFingerJoint(-1.5, -4, Math.PI / 6),
      createFingerJoint(-0.5, -5, Math.PI / 6),
      createFingerJoint(0.5, -5.5, Math.PI / 6),
      createFingerJoint(1.5, -5, Math.PI / 6)
    ];
    joints.forEach(joint => thumbsUpGroup.add(joint.mesh));

    // Add glow effect
    const glowGeometry = new THREE.SphereGeometry(12, 32, 32);
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x00ffff) }
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float time;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(color, intensity * (0.5 + sin(time * 2.0) * 0.2));
        }
      `,
      transparent: true,
      side: THREE.BackSide
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    thumbsUpGroup.add(glow);

    // Add thumbs up group to scene
    scene.add(thumbsUpGroup);

    // Position camera
    camera.position.z = 40;
    camera.lookAt(0, 0, 0);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate thumbs up group
      thumbsUpGroup.rotation.y += 0.01;

      // Pulse opacity and add wave effect
      const time = Date.now() * 0.001;
      
      // Update glow effect
      (glow.material as THREE.ShaderMaterial).uniforms.time.value = time;

      // Animate thumb and palm
      [thumb, palm, ...joints].forEach((part, index) => {
        const material = part.mesh.material as THREE.LineBasicMaterial;
        material.opacity = 0.7 + Math.sin(time * 2 + index * 0.2) * 0.3;
        
        // Color shift effect
        const hue = (time * 0.1 + index * 0.05) % 1;
        const color = new THREE.Color();
        color.setHSL(hue, 1, 0.5);
        material.color = color;
      });

      // Add floating motion
      thumbsUpGroup.position.y = Math.sin(time) * 0.5;

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
      [thumb, palm, ...joints].forEach(part => {
        part.geometry.dispose();
        part.edges.dispose();
        part.mesh.material.dispose();
      });
      glowGeometry.dispose();
      glowMaterial.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
    />
  );
}