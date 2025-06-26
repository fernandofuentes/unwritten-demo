import React, { useState, useEffect, useRef } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');
  const navRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'Services', 
      path: '/services',
      dropdown: [
        { name: 'Branding & Identity', path: '/branding-and-identity' },
        { name: 'Web Design & Development', path: '/web-design-and-development' },
        { name: 'Digital Advertising & Strategy', path: '/digital-advertising-and-strategy' },
        { name: 'Social Media & Content', path: '/social-media-and-content' },
        { name: 'Consulting & Growth', path: '/consulting-and-growth' }
      ]
    },
    { name: 'About', path: '/about' },
    { name: 'Contact Us', path: '/contact' }
  ];

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isLinkActive = (path: string) => {
    if (path === '/') {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };

  const isServicesActive = () => {
    return navLinks[1].dropdown?.some(item => currentPath.startsWith(item.path));
  };

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 py-8">
      <div className="flex justify-between items-center px-12">
        <a href="/" className="font-black overflow-hidden relative text-xl lg:text-2xl text-white transition-colors duration-300">
          <div className="flex items-center">
            <span className="letter-rotate inline-block transform">U</span>
            <span className="letter-hidden inline-block">NWRITTEN&nbsp;</span>
            <span className="letter-rotate inline-block transform">A</span>
            <span className="letter-hidden inline-block">GENCY</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-8">
          {navLinks.map((link) => {
            if (link.dropdown) {
              return (
                <div 
                  key={link.name}
                  ref={servicesRef}
                  className="relative group"
                >
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className="relative text-white transition-colors duration-300 font-normal"
                  >
                    {link.name}
                    <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#00ffff] transition-all duration-300 ${isServicesActive() ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </button>
                  {isServicesOpen && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-[#0d0d0d] border border-[#00ffff]/20 rounded-lg shadow-xl">
                      {link.dropdown.map((item) => (
                        <a
                          key={item.name}
                          href={item.path}
                          className={`block px-4 py-3 text-white hover:bg-[#00ffff]/10 transition-colors duration-300 ${isLinkActive(item.path) ? 'bg-[#00ffff]/10' : ''}`}
                          onClick={() => setIsServicesOpen(false)}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <a
                key={link.name}
                href={link.path}
                className="relative group text-white transition-colors duration-300 font-normal"
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#00ffff] transition-all duration-300 ${isLinkActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </a>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 text-white z-[60]"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-1 bg-white transition-all duration-300 transform ${
            isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
          }`}></span>
          <span className={`w-6 h-1 bg-white transition-all duration-300 ${
            isMenuOpen ? 'opacity-0' : ''
          }`}></span>
          <span className={`w-6 h-1 bg-white transition-all duration-300 transform ${
            isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
          }`}></span>
        </button>

        {/* Mobile Menu */}
        <div 
          className={`fixed top-0 right-0 w-1/2 h-screen bg-[#00ffff] transform transition-all duration-300 shadow-2xl z-50 ${
            isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
          }`}
        >
          <div className="h-full flex flex-col justify-center px-16">
            {navLinks.map((link, index) => {
              if (link.dropdown) {
                return (
                  <div key={link.name} className="py-4">
                    <div className="text-2xl font-bold text-body mb-2">{link.name}</div>
                    <div className="pl-4">
                      {link.dropdown.map((item) => (
                        <a
                          key={item.name}
                          href={item.path}
                          className={`block py-2 text-lg text-body/70 hover:text-body transition-colors duration-300 ${isLinkActive(item.path) ? 'text-body' : ''}`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <a
                  key={link.name}
                  href={link.path}
                  className={`block py-4 text-2xl font-bold text-body hover:text-body/70 transition-colors duration-300 transform ${
                    isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-[50px] opacity-0'
                  } ${isLinkActive(link.path) ? 'text-body' : 'text-body/70'}`}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 0.1}s` : '0s'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
    </nav>
  );
}