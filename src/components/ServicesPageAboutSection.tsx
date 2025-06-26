import React, { useEffect, useRef } from 'react';
import Hologram from './Hologram';
import StaticBackground from './StaticBackground';

export default function ServicesPageAboutSection() {
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
          <h2 ref={titleRef} className="text-section font-black mb-6 uppercase text-[#00ffff]">
            Our Services
          </h2>
          <p ref={el => paragraphRefs.current[0] = el} className="mb-8 text-gray-300">
            At Unwritten Agency, we don’t just follow trends—we create them. As a leading Digital Marketing Agency in The Woodlands, TX, we harness creativity, innovation, and data-driven insights to transform your brand into a digital powerhouse. Explore our comprehensive suite of services designed to break through the noise and propel your business into the spotlight.
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