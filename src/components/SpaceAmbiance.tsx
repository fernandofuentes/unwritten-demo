import React, { useEffect, useRef, useState } from 'react';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';
import { gsap } from 'gsap';

const AMBIANCE_TRACK = {
  name: "Space Rumble",
  url: "https://assets.mixkit.co/active_storage/sfx/2566/2566-preview.mp3"
};

const MATRIX_TEXT = "Enhance Your Experience";

export default function SpaceAmbiance() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wavesRef = useRef<SVGSVGElement>(null);
  const matrixTextRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [matrixChars, setMatrixChars] = useState<string[]>([]);
  const [showMatrix, setShowMatrix] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    const text = MATRIX_TEXT.split('');
    setMatrixChars(text);

    const scrambleText = () => {
      if (!showMatrix) return;
      const newChars = text.map((char, index) => {
        if (Math.random() < 0.1) {
          return chars[Math.floor(Math.random() * chars.length)];
        }
        return char;
      });
      setMatrixChars(newChars);
    };

    const interval = setInterval(scrambleText, 100);

    const resetInterval = setInterval(() => {
      if (showMatrix) {
        setMatrixChars(text);
      }
    }, 2000);

    const handleScroll = () => {
      if (window.scrollY > 200 && showMatrix) {
        fadeOutMatrix();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      clearInterval(resetInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showMatrix]);

  const fadeOutMatrix = () => {
    if (matrixTextRef.current) {
      gsap.to(matrixTextRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => setShowMatrix(false)
      });
    }
  };

  useEffect(() => {
    if (buttonRef.current && isPlaying) {
      gsap.killTweensOf(buttonRef.current);
      
      gsap.to(buttonRef.current, {
        rotation: 360,
        duration: 2,
        repeat: -1,
        ease: "none"
      });

      if (wavesRef.current) {
        const waves = wavesRef.current.querySelectorAll('circle');
        waves.forEach((wave, index) => {
          gsap.fromTo(wave,
            {
              scale: 1,
              opacity: 0.8
            },
            {
              scale: 3,
              opacity: 0,
              duration: 2,
              repeat: -1,
              ease: "power1.out",
              delay: index * 0.4
            }
          );
        });
      }
    } else {
      gsap.killTweensOf(buttonRef.current);
      if (wavesRef.current) {
        const waves = wavesRef.current.querySelectorAll('circle');
        waves.forEach(wave => {
          gsap.killTweensOf(wave);
          gsap.set(wave, { scale: 1, opacity: 0 });
        });
      }
      gsap.to(buttonRef.current, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
        fadeOutMatrix();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="relative flex items-center gap-4">
        {showMatrix && (
          <div 
            ref={matrixTextRef}
            className="text-white text-xs font-mono whitespace-nowrap opacity-70"
            style={{ 
              textShadow: '0 0 5px #ffffff',
              letterSpacing: '1px'
            }}
          >
            {matrixChars.map((char, index) => (
              <span 
                key={index}
                style={{
                  display: 'inline-block',
                  animation: `flicker ${Math.random() * 2 + 1}s infinite`
                }}
              >
                {char}
              </span>
            ))}
          </div>
        )}
        <div className="relative">
          <svg
            ref={wavesRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 pointer-events-none"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="8" fill="none" stroke="#FFFF00" strokeWidth="1" />
            <circle cx="50" cy="50" r="8" fill="none" stroke="#FFFF00" strokeWidth="1" />
            <circle cx="50" cy="50" r="8" fill="none" stroke="#FFFF00" strokeWidth="1" />
          </svg>
          <button
            ref={buttonRef}
            onClick={togglePlay}
            className="bg-[#FFFF00] text-body p-3 rounded-full hover:bg-opacity-80 transition-all duration-300 relative"
            style={{
              transformOrigin: 'center',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label={isPlaying ? 'Mute space ambiance' : 'Play space ambiance'}
            title={AMBIANCE_TRACK.name}
          >
            {isPlaying ? (
              <SpeakerWaveIcon className="w-6 h-6" />
            ) : (
              <SpeakerXMarkIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        className="hidden"
        src={AMBIANCE_TRACK.url}
      >
        Your browser does not support the audio element.
      </audio>
      <style>
        {`
          @keyframes flicker {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
        `}
      </style>
    </div>
  );
}