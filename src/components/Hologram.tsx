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
    const camera = new THREE.PerspectiveCamera(85, 1, 0.1, 1000);
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
        size: 6,
        height: 2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.25,
        bevelSize: 0.15,
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
      text.rotation.x = 0.1;
      scene.add(text);
      return { mesh: text, material: textMaterial };
    };

    // Create main hologram sphere
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

    // Create cube with edges only
    const moonGroup = new THREE.Group();
    const moonGeometry = new THREE.BoxGeometry(12, 12, 12);
    const edges = new THREE.EdgesGeometry(moonGeometry);
    const moonMaterial = new THREE.LineBasicMaterial({
      color: 0xff00ff,
      transparent: true,
      opacity: 0.9
    });

    const moon = new THREE.LineSegments(edges, moonMaterial);
    
    // Position moon in orbit
    moon.position.set(65, 0, 0);
    moonGroup.add(moon);
    scene.add(moonGroup);

    // Adjust camera position
    camera.position.set(0, 20, 120);
    camera.lookAt(0, 0, 0);

    let text: { mesh: THREE.Mesh, material: THREE.ShaderMaterial } | null = null;

    // Load font and create text
    loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', (font) => {
      text = createText(font);
    });

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Rotate main hologram
      hologram.rotation.x += 0.005;
      hologram.rotation.y += 0.005;

      // Rotate moon group around center with slight tilt
      moonGroup.rotation.y = time;
      moonGroup.rotation.x = Math.PI * 0.1; // Add slight tilt to orbit
      
      // Moon's self-rotation
      moon.rotation.y += 0.02;
      moon.rotation.x += 0.01;

      // Pulse opacity
      moonMaterial.opacity = 0.7 + Math.sin(time * 2) * 0.3;

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
      moonGeometry.dispose();
      edges.dispose();
      moonMaterial.dispose();
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