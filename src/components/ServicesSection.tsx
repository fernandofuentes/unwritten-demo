import React from 'react';
import StaticBackground from './StaticBackground';
import {
  SparklesIcon,
  CodeBracketIcon,
  ChatBubbleBottomCenterTextIcon,
  RocketLaunchIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

export default function ServicesSectionTest() {
  return (
    <section
      className="py-24 bg-body overflow-hidden relative"
      aria-labelledby="services-title"
    >
      <StaticBackground />

      <div className="px-4 lg:px-0 lg:mx-[8%] relative z-10">
         <p className="mb-6 uppercase text-center text-[#FF00FF]">
            Unwritten
          </p>
        <h2
          id="services-title"
          className="text-section font-black mb-16 uppercase text-white text-center"
        >
          SERVICES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {/* Branding & Identity */}
          <a
            href="/branding-and-identity"
            className="group p-8 bg-white/5 backdrop-blur-sm rounded-lg shadow-xl 
                       flex flex-col items-center text-center hover:bg-white/10 hover:shadow-2xl 
                       transition-all duration-500 border border-white/10 hover:-translate-y-2 
                       hover:scale-105 relative overflow-hidden"
            aria-labelledby="service-branding-design"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#00ffff]/0 via-[#00ffff]/5 to-[#00ffff]/0 
                         opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
            />
            <div
              className="w-16 h-16 mb-6 transition-all duration-500 text-white 
                         group-hover:text-[#00ffff] group-hover:scale-110 group-hover:rotate-[360deg]"
              aria-hidden="true"
            >
              <SparklesIcon className="w-full h-full" />
            </div>
            <h3
              id="service-branding-design"
              className="text-xl font-bold mb-4 text-white uppercase relative"
            >
              <span
                className="bg-left-bottom bg-gradient-to-r from-[#00ffff] to-[#00ffff] 
                           bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] 
                           transition-all duration-500"
              >
                Branding & Identity
              </span>
            </h3>
            <p className="text-gray-300 text-sm transform transition-all duration-500 group-hover:text-white">
              Your brand is more than a logo—it's your story, your promise, and your power. We fuse design, strategy, and storytelling to create a visual identity that not only stands out but resonates deeply with your audience.
            </p>
          </a>

          {/* Web Design & Development */}
          <a
            href="/web-design-and-development"
            className="group p-8 bg-white/5 backdrop-blur-sm rounded-lg shadow-xl 
                       flex flex-col items-center text-center hover:bg-white/10 hover:shadow-2xl 
                       transition-all duration-500 border border-white/10 hover:-translate-y-2 
                       hover:scale-105 relative overflow-hidden"
            aria-labelledby="service-web-development-ux"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#00ffff]/0 via-[#00ffff]/5 to-[#00ffff]/0 
                         opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
            />
            <div
              className="w-16 h-16 mb-6 transition-all duration-500 text-white 
                         group-hover:text-[#00ffff] group-hover:scale-110 group-hover:rotate-[360deg]"
              aria-hidden="true"
            >
              <CodeBracketIcon className="w-full h-full" />
            </div>
            <h3
              id="service-web-development-ux"
              className="text-xl font-bold mb-4 text-white uppercase relative"
            >
              <span
                className="bg-left-bottom bg-gradient-to-r from-[#00ffff] to-[#00ffff] 
                           bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] 
                           transition-all duration-500"
              >
                Web Design & Development
              </span>
            </h3>
            <p className="text-gray-300 text-sm transform transition-all duration-500 group-hover:text-white">
              A website is your digital storefront. We build immersive, responsive sites that captivate visitors, drive engagement, and convert traffic into loyal customers. With cutting-edge design and seamless functionality, your online presence will truly be unforgettable.
            </p>
          </a>

          {/* Social Media & Content */}
          <a
            href="/social-media-and-content"
            className="group p-8 bg-white/5 backdrop-blur-sm rounded-lg shadow-xl 
                       flex flex-col items-center text-center hover:bg-white/10 hover:shadow-2xl 
                       transition-all duration-500 border border-white/10 hover:-translate-y-2 
                       hover:scale-105 relative overflow-hidden"
            aria-labelledby="service-social-media-content"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#00ffff]/0 via-[#00ffff]/5 to-[#00ffff]/0 
                         opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
            />
            <div
              className="w-16 h-16 mb-6 transition-all duration-500 text-white 
                         group-hover:text-[#00ffff] group-hover:scale-110 group-hover:rotate-[360deg]"
              aria-hidden="true"
            >
              <ChatBubbleBottomCenterTextIcon className="w-full h-full" />
            </div>
            <h3
              id="service-social-media-content"
              className="text-xl font-bold mb-4 text-white uppercase relative"
            >
              <span
                className="bg-left-bottom bg-gradient-to-r from-[#00ffff] to-[#00ffff] 
                           bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] 
                           transition-all duration-500"
              >
                Social Media & Content
              </span>
            </h3>
            <p className="text-gray-300 text-sm transform transition-all duration-500 group-hover:text-white">
              In a universe of endless digital chatter, your voice needs to shine. We create engaging, scroll-stopping content and social strategies that spark conversations and build communities around your brand, ensuring your message gets heard even above the loudest competitors.
            </p>
          </a>

          {/* Digital Advertising & Strategy */}
          <a
            href="/digital-advertising-and-strategy"
            className="group p-8 bg-white/5 backdrop-blur-sm rounded-lg shadow-xl 
                       flex flex-col items-center text-center hover:bg-white/10 hover:shadow-2xl 
                       transition-all duration-500 border border-white/10 hover:-translate-y-2 
                       hover:scale-105 relative overflow-hidden"
            aria-labelledby="service-digital-advertising-strategy"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#00ffff]/0 via-[#00ffff]/5 to-[#00ffff]/0 
                         opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
            />
            <div
              className="w-16 h-16 mb-6 transition-all duration-500 text-white 
                         group-hover:text-[#00ffff] group-hover:scale-110 group-hover:rotate-[360deg]"
              aria-hidden="true"
            >
              <RocketLaunchIcon className="w-full h-full" />
            </div>
            <h3
              id="service-digital-advertising-strategy"
              className="text-xl font-bold mb-4 text-white uppercase relative"
            >
              <span
                className="bg-left-bottom bg-gradient-to-r from-[#00ffff] to-[#00ffff] 
                           bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] 
                           transition-all duration-500"
              >
                Digital Advertising & Strategy
              </span>
            </h3>
            <p className="text-gray-300 text-sm transform transition-all duration-500 group-hover:text-white">
              Say goodbye to guesswork. Our data-driven advertising campaigns put your brand front and center. From PPC to retargeting, we leverage precise analytics to engineer strategies that deliver measurable results—and dominate your market.
            </p>
          </a>

          {/* Consulting & Growth */}
          <a
            href="/consulting-and-growth"
            className="group p-8 bg-white/5 backdrop-blur-sm rounded-lg shadow-xl 
                       flex flex-col items-center text-center hover:bg-white/10 hover:shadow-2xl 
                       transition-all duration-500 border border-white/10 hover:-translate-y-2 
                       hover:scale-105 relative overflow-hidden"
            aria-labelledby="service-consulting-growth"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#00ffff]/0 via-[#00ffff]/5 to-[#00ffff]/0 
                         opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
            />
            <div
              className="w-16 h-16 mb-6 transition-all duration-500 text-white 
                         group-hover:text-[#00ffff] group-hover:scale-110 group-hover:rotate-[360deg]"
              aria-hidden="true"
            >
              <ChartBarIcon className="w-full h-full" />
            </div>
            <h3
              id="service-consulting-growth"
              className="text-xl font-bold mb-4 text-white uppercase relative"
            >
              <span
                className="bg-left-bottom bg-gradient-to-r from-[#00ffff] to-[#00ffff] 
                           bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] 
                           transition-all duration-500"
              >
                Consulting & Growth
              </span>
            </h3>
            <p className="text-gray-300 text-sm transform transition-all duration-500 group-hover:text-white">
              Every brand has untapped potential waiting to be unleashed. Our expert consulting services provide the guidance, innovation, and actionable insights you need to scale new heights. Let's break boundaries and transform potential into performance.
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}