import React from 'react';

export default function MissionStatementSection() {
  return (
    <div className="flex flex-col-reverse lg:flex-row">
      {/* Left side with magenta background and content */}
      <div className="w-full lg:w-1/2 bg-[#FF00FF] py-24">
        <div className="px-4 lg:px-16 max-w-2xl mx-auto lg:ml-auto text-center lg:text-left">
          <h2 className="text-section font-black mb-10 uppercase text-body">
            OUR MISSION
          </h2>
          <p className="text-body">
            We exist to obliterate barriers and rewrite the rules of digital marketing. By pairing audacious creativity with future-focused strategies, we take brands from ordinary to unstoppable—turning bold ideas into tangible, jaw-dropping results.
          </p>
        </div>
      </div>
      
      {/* Right side with image */}
      <div className="w-full lg:w-1/2 min-h-[300px] lg:min-h-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop")'
      }}>
        <div className="w-full h-full bg-gradient-to-r from-[#FF00FF]/50 to-transparent" />
      </div>
    </div>
  );
}