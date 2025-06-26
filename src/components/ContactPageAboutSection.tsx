import React, { useRef, useState } from 'react';
import Hologram from './Hologram';
import StaticBackground from './StaticBackground';
import emailjs from '@emailjs/browser';

export default function ContactPageAboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
    budget: ''
  });
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      // Replace these with your actual EmailJS credentials
      const result = await emailjs.sendForm(
        'YOUR_SERVICE_ID', // Get this from EmailJS dashboard
        'YOUR_TEMPLATE_ID', // Get this from EmailJS dashboard
        formRef.current!,
        'YOUR_PUBLIC_KEY' // Get this from EmailJS dashboard
      );

      if (result.text === 'OK') {
        setStatus({
          type: 'success',
          message: 'Thank you! We\'ll be in touch soon.'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: '',
          budget: ''
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Oops! Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={sectionRef} className="py-24 bg-body overflow-hidden relative">
      <StaticBackground />
      <div className="px-4 lg:px-0 lg:mx-[8%] flex flex-col lg:flex-row gap-20 items-center relative z-10">
        <div className="w-full lg:w-1/2">
          <Hologram />
        </div>
        <div className="w-full lg:w-1/2">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-[#00ffff]/20">
            <h2 className="text-2xl font-black mb-6 uppercase text-[#00ffff] text-center lg:text-left">
              Get Your Free Consultation
            </h2>
            <p className="mb-8 text-gray-300 text-center lg:text-left">
              Ready to transform your digital presence? Fill out the form below, and let's start crafting your success story together.
            </p>
            
            {status.type && (
              <div 
                className={`mb-6 p-4 rounded-lg ${
                  status.type === 'success' 
                    ? 'bg-[#00ffff]/10 text-[#00ffff]' 
                    : 'bg-red-500/10 text-red-400'
                }`}
              >
                {status.message}
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-[#00ffff] text-sm font-semibold mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-[#00ffff]/20 rounded-lg text-white focus:outline-none focus:border-[#00ffff] transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[#00ffff] text-sm font-semibold mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-[#00ffff]/20 rounded-lg text-white focus:outline-none focus:border-[#00ffff] transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-[#00ffff] text-sm font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-[#00ffff]/20 rounded-lg text-white focus:outline-none focus:border-[#00ffff] transition-colors"
                  placeholder="(123) 456-7890"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-[#00ffff] text-sm font-semibold mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-[#00ffff]/20 rounded-lg text-white focus:outline-none focus:border-[#00ffff] transition-colors"
                  placeholder="Your Company"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-[#00ffff] text-sm font-semibold mb-2">
                  Service Interest *
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-[#00ffff]/20 rounded-lg text-white focus:outline-none focus:border-[#00ffff] transition-colors"
                >
                  <option value="" className="bg-body">Select a Service</option>
                  <option value="branding" className="bg-body">Branding & Identity</option>
                  <option value="web-design" className="bg-body">Web Design & Development</option>
                  <option value="digital-advertising" className="bg-body">Digital Advertising & Strategy</option>
                  <option value="social-media" className="bg-body">Social Media & Content</option>
                  <option value="consulting" className="bg-body">Consulting & Growth</option>
                </select>
              </div>

              <div>
                <label htmlFor="budget" className="block text-[#00ffff] text-sm font-semibold mb-2">
                  Project Budget
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-[#00ffff]/20 rounded-lg text-white focus:outline-none focus:border-[#00ffff] transition-colors"
                >
                  <option value="" className="bg-body">Select Budget Range</option>
                  <option value="5k-10k" className="bg-body">$5,000 - $10,000</option>
                  <option value="10k-25k" className="bg-body">$10,000 - $25,000</option>
                  <option value="25k-50k" className="bg-body">$25,000 - $50,000</option>
                  <option value="50k+" className="bg-body">$50,000+</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-[#00ffff] text-sm font-semibold mb-2">
                  Tell Us About Your Project *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-[#00ffff]/20 rounded-lg text-white focus:outline-none focus:border-[#00ffff] transition-colors resize-none"
                  placeholder="Share your project goals and challenges..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-8 py-4 bg-[#00ffff] text-body font-bold rounded hover:bg-opacity-80 transition-colors uppercase flex items-center justify-center gap-2 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-body" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  'Submit Request'
                )}
              </button>

              <p className="text-gray-400 text-sm text-center">
                * Required fields
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}