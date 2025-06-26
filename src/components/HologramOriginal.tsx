import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

export default function Hologram() {
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

    // Load font and create 3D text
    const loader = new FontLoader();
    const createText = (font: THREE.Font) => {
      const textGeometry = new TextGeometry('', {
        font: font,
        size: 6, // Reduced from 12 to 6 (50% smaller)
        height: 2, // Reduced from 4 to 2 to maintain proportions
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.25, // Reduced from 0.5 to maintain proportions
        bevelSize: 0.15, // Reduced from 0.3 to maintain proportions
        bevelOffset: 0,
        bevelSegments: 5
      });

      textGeometry.center();

      const textMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color(0x00ffff) }
        },
        vertexShader: `
          varying vec2 vUv;
          varying float vElevation;
          uniform float time;
          
          void main() {
            vUv = uv;
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            
            float elevation = sin(modelPosition.x * 2.0 + time) * 0.05;
            elevation += sin(modelPosition.y * 2.0 + time) * 0.05;
            
            modelPosition.z += elevation;
            vElevation = elevation;
            
            gl_Position = projectionMatrix * viewMatrix * modelPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          varying float vElevation;
          
          void main() {
            float alpha = 0.8 + sin(vElevation * 20.0) * 0.2;
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
      });

      const text = new THREE.Mesh(textGeometry, textMaterial);
      text.rotation.x = 0.1; // Slight tilt
      scene.add(text);
      return { mesh: text, material: textMaterial };
    };

    // Create hologram effect
    const geometry = new THREE.IcosahedronGeometry(45, 1);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x00ffff) }
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vElevation;
        uniform float time;
        
        void main() {
          vUv = uv;
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          
          float elevation = sin(modelPosition.x * 5.0 + time) * 0.1;
          elevation += sin(modelPosition.y * 6.0 + time) * 0.1;
          
          modelPosition.z += elevation;
          vElevation = elevation;
          
          gl_Position = projectionMatrix * viewMatrix * modelPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying float vElevation;
        
        void main() {
          float alpha = 0.7 + sin(vElevation * 20.0) * 0.3;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      wireframe: true
    });

    const hologram = new THREE.Mesh(geometry, material);
    scene.add(hologram);

    camera.position.z = 108;

    let text: { mesh: THREE.Mesh, material: THREE.ShaderMaterial } | null = null;

    // Load font and create text
    loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', (font) => {
      text = createText(font);
    });

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      hologram.rotation.x += 0.005;
      hologram.rotation.y += 0.005;

      if (text) {
        text.mesh.rotation.y = hologram.rotation.y;
        text.material.uniforms.time.value += 0.05;
      }

      material.uniforms.time.value += 0.05;

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
      geometry.dispose();
      material.dispose();
      if (text) {
        text.mesh.geometry.dispose();
        text.material.dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
    />
  );
}