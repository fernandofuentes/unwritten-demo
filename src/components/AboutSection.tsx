import React, { useEffect, useRef } from 'react';
import Hologram from './Hologram';
import StaticBackground from './StaticBackground';

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div ref={sectionRef} className="py-24 bg-body overflow-hidden relative">
      <StaticBackground />
      <div className="px-4 lg:px-0 lg:mx-[8%] flex flex-col lg:flex-row gap-20 items-center relative z-10">
        <div className="w-full lg:w-1/2">
          <Hologram />
        </div>
        <div ref={contentRef} className="w-full lg:w-1/2 text-white text-center lg:text-left">
          <h1 className="text-section font-black mb-6 uppercase text-[#00ffff]">
            Your Leading Digital Marketing Agency in The Woodlands, TX
          </h1>
          <p className="mb-6 uppercase text-[#FF00FF]">
            Think outside the sphere.
          </p>
          <p ref={el => paragraphRefs.current[0] = el} className="mb-8 text-gray-300">
            Looking to dominate the online space? UNWRITTEN is a trailblazing Digital Marketing Agency in The Woodlands, TX, ready to help your brand make an unforgettable impact. We don’t just follow trends—we forge our own path. Our playground is the digital frontier, and our fuel is unstoppable innovation. Forget cookie-cutter campaigns; we craft one-of-a-kind experiences that demand attention.
          </p>
          <div className="flex justify-center lg:justify-start">
            <button 
              ref={buttonRef}
              className="px-8 py-3 bg-[#00ffff] text-body font-bold rounded hover:bg-opacity-80 transition-colors uppercase"
            >
              LEARN OUR PROCESS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}