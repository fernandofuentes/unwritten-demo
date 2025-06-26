import React, { useEffect, useRef } from 'react';

export default function StaticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set initial canvas size
    const setCanvasSize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      // Get actual dimensions from the parent container
      const { width, height } = container.getBoundingClientRect();
      
      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;
    };

    // Initial size setup
    setCanvasSize();

    // Handle resize
    const resizeObserver = new ResizeObserver(() => {
      setCanvasSize();
    });

    // Observe the canvas parent element
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Animation function
    const animate = () => {
      if (!ctx || canvas.width === 0 || canvas.height === 0) return;

      // Semi-transparent black background for trail effect
      ctx.fillStyle = 'rgba(13, 13, 13, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Generate static
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        // Random noise value
        const noise = Math.random() * 255;
        
        // Apply noise with varying opacity
        const opacity = Math.random() * 0.3; // Reduced opacity for subtler effect
        
        data[i] = data[i + 1] = data[i + 2] = noise;
        data[i + 3] = opacity * 255;
      }

      ctx.putImageData(imageData, 0, 0);
      requestAnimationFrame(animate);
    };

    const animationFrame = requestAnimationFrame(animate);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full opacity-20 mix-blend-screen pointer-events-none"
      style={{ background: '#0d0d0d' }}
    />
  );
}