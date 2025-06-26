import React, { useEffect, useRef } from 'react';
import HologramChatBubble from './HologramChatBubble';
import StaticBackground from './StaticBackground';

export default function SocialMediaContentPageAboutSection() {
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
          <HologramChatBubble />
        </div>
        <div ref={contentRef} className="w-full lg:w-1/2 text-white text-center lg:text-left">
          <h2 ref={titleRef} className="text-section font-black mb-6 uppercase text-[#00ffff]">
            About Our Social Media & Content Services
          </h2>
          <p ref={el => paragraphRefs.current[0] = el} className="mb-8 text-gray-300">
            We understand that content is king and community is queen. At Unwritten Agency, we develop compelling content and strategic social media campaigns that connect with your audience, build authentic relationships, and drive lasting engagement.
          </p>
          <div className="flex justify-center lg:justify-start">
            <button 
              ref={buttonRef}
              className="px-8 py-3 bg-[#00ffff] text-body font-bold rounded hover:bg-opacity-80 transition-colors uppercase"
            >
              EXPLORE OUR CONTENT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}