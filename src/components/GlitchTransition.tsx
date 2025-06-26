import React, { useEffect, useRef } from 'react';

export default function GlitchTransition() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create glitch lines
    const createGlitchLine = () => {
      const line = document.createElement('div');
      line.className = 'glitch-line';
      const height = Math.random() * 2 + 1; // Random height between 1-3px
      const duration = Math.random() * 0.4 + 0.2; // Random duration between 0.2-0.6s
      const delay = Math.random() * 2; // Random delay between 0-2s
      
      line.style.cssText = `
        position: absolute;
        left: 0;
        width: 100%;
        height: ${height}px;
        background: #00ffff;
        opacity: 0;
        transform: translateX(-100%);
        animation: glitch ${duration}s ${delay}s infinite linear;
      `;
      
      return line;
    };

    // Add multiple glitch lines
    for (let i = 0; i < 10; i++) {
      container.appendChild(createGlitchLine());
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[2px] bg-[#00ffff]/10">
      <div ref={containerRef} className="absolute inset-0 overflow-hidden">
        <style>
          {`
            @keyframes glitch {
              0% {
                transform: translateX(-100%);
                opacity: 0;
              }
              10% {
                opacity: 0.8;
              }
              40% {
                opacity: 0.4;
              }
              70% {
                opacity: 0.6;
              }
              90% {
                opacity: 0.2;
              }
              100% {
                transform: translateX(100%);
                opacity: 0;
              }
            }
          `}
        </style>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-body via-transparent to-body" />
    </div>
  );
}