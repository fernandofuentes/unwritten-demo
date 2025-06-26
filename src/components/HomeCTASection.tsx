import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import GalaxyParticles from './GalaxyParticles';

export default function HomeCTASection() {
  return (
    <div className="py-32 bg-body text-white relative overflow-hidden">
      <GalaxyParticles />
      <div className="px-4 lg:px-0 lg:mx-[8%] text-center relative z-10">
        <h2 className="text-section font-black mb-6 uppercase">
          The Future Is Unwritten<br />—Let’s Write It Together
        </h2>
        <p className="max-w-2xl mx-auto mb-12 text-gray-300">
          Don’t let your brand’s story remain untold. We’re UNWRITTEN, the Digital Marketing Agency in The Woodlands, TX that dares to stand apart and break conventions. Your revolution starts with a conversation, and we’re ready to amplify your message across every digital channel.
        </p>
        <button className="group px-10 py-4 bg-[#00ffff] text-body font-bold rounded-lg hover:bg-opacity-80 transition-all duration-300 flex items-center gap-3 mx-auto">
          START YOUR JOURNEY
          <ArrowRightIcon className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
}
