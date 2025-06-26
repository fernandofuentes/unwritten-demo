import React, { useEffect, useRef } from 'react';
import Hologram from './Hologram';
import StaticBackground from './StaticBackground';

export default function AboutPageAboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div ref={sectionRef} className="py-24 bg-body overflow-hidden relative">
      <StaticBackground />
      <div className="px-4 lg:px-0 lg:mx-[8%] relative z-10">
        {/* Main About Section */}
        <div className="mb-20">
          <h2 ref={titleRef} className="text-section font-black mb-8 uppercase text-[#00ffff] text-center">
            About Unwritten Agency
          </h2>
          <p ref={el => paragraphRefs.current[0] = el} className="mb-8 text-gray-300 max-w-4xl mx-auto text-center">
            At Unwritten Agency, we're not content with following the status quo. Based in The Woodlands, TX, we're a full-service digital marketing agency dedicated to rewriting the rules of the digital landscape. Our approach is simple: fuse bold creativity with data-driven strategy to help brands not just compete, but truly stand out.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-6 text-[#00ffff] text-center">Our Story</h3>
          <p className="mb-8 text-gray-300 max-w-4xl mx-auto text-center">
            Every brand has a unique story, and we're here to help you tell yours. Born from a desire to break free from cookie-cutter solutions, Unwritten Agency was founded on the principle that creativity should never be confined by convention. We believe that the most memorable brands are built on authentic narratives, daring ideas, and a willingness to defy expectations.
          </p>
        </div>

        {/* Our Approach Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-6 text-[#00ffff] text-center">Our Approach</h3>
          <p className="mb-8 text-gray-300 max-w-4xl mx-auto text-center">
            We blend art with science to craft strategies that deliver real results. Our team of creatives, strategists, and tech wizards collaborates closely with you to:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm">
              <h4 className="text-[#00ffff] font-bold mb-3">Elevate Your Identity</h4>
              <p className="text-gray-300">We build visual and verbal identities that resonate with your audience.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm">
              <h4 className="text-[#00ffff] font-bold mb-3">Craft Immersive Experiences</h4>
              <p className="text-gray-300">From stunning websites to dynamic social media campaigns, we create digital experiences that captivate.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm">
              <h4 className="text-[#00ffff] font-bold mb-3">Drive Measurable Growth</h4>
              <p className="text-gray-300">With targeted digital advertising and strategic insights, we transform bold ideas into tangible success.</p>
            </div>
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-6 text-[#00ffff] text-center">Our Mission</h3>
          <p className="mb-8 text-gray-300 max-w-4xl mx-auto text-center">
            Our mission is to transform potential into performance. We're here to obliterate barriers and set new benchmarks in digital marketing. Every project is a step toward a future where your brand is not only seen—but remembered.
          </p>
        </div>

        {/* Join the Revolution Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6 text-[#00ffff]">Join the Revolution</h3>
          <p className="mb-8 text-gray-300 max-w-4xl mx-auto">
            The future is unwritten, and we're ready to write it with you. Whether you're looking to completely reinvent your brand or fine-tune your digital strategy, Unwritten Agency is your partner in defying the ordinary. Let's break the rules together and create something truly unforgettable.
          </p>
          <button 
            ref={buttonRef}
            className="px-8 py-3 bg-[#00ffff] text-body font-bold rounded hover:bg-opacity-80 transition-colors uppercase"
          >
            START YOUR JOURNEY
          </button>
        </div>
      </div>
    </div>
  );
}