import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CyberDivider() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 120, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });

    renderer.setSize(window.innerWidth, 120);
    containerRef.current.appendChild(renderer.domElement);

    // Create grid material
    const gridMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, 120) }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        varying vec2 vUv;

        void main() {
          vec2 pos = vUv * 2.0 - 1.0;
          pos.x *= resolution.x / resolution.y;

          float grid = 0.0;
          
          // Horizontal lines
          float hLines = abs(sin(pos.y * 50.0 + time));
          hLines = smoothstep(0.95, 1.0, hLines);
          
          // Vertical lines
          float vLines = abs(sin(pos.x * 50.0 + time * 0.5));
          vLines = smoothstep(0.95, 1.0, vLines);
          
          grid = max(hLines, vLines);
          
          // Pulse effect
          float pulse = sin(time * 2.0) * 0.5 + 0.5;
          grid *= pulse * 0.5 + 0.5;

          vec3 color = vec3(0.0, 1.0, 1.0); // Cyan color
          gl_FragColor = vec4(color * grid, grid);
        }
      `,
      transparent: true
    });

    // Create plane geometry
    const geometry = new THREE.PlaneGeometry(20, 2);
    const plane = new THREE.Mesh(geometry, gridMaterial);
    scene.add(plane);

    camera.position.z = 2;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      gridMaterial.uniforms.time.value += 0.05;
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth;
      renderer.setSize(width, 120);
      gridMaterial.uniforms.resolution.value.x = width;
      camera.aspect = width / 120;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      gridMaterial.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[120px] bg-body overflow-hidden">
      <div 
        ref={containerRef} 
        className="absolute top-0 left-0 w-full h-full"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-body via-transparent to-body opacity-50" />
    </div>
  );
}