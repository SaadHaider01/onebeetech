import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const subheading = subheadingRef.current;
    const cta = ctaRef.current;

    if (section && heading && subheading && cta) {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2 }
      );

      gsap.fromTo(
        subheading,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.5 }
      );

      gsap.fromTo(
        cta,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.8 }
      );

      // Parallax effect
      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: 200,
        opacity: 0.5,
      });
    }
  }, []);

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative pt-20"
    >
      <div className="container mx-auto px-4 text-center">
        <h1 
          ref={headingRef}
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
        >
          <span className="gradient-text">OneBee Tech</span>
          <br />
          <span className="text-white">Creative Digital Solutions</span>
        </h1>
        
        <p 
          ref={subheadingRef}
          className="text-xl md:text-2xl mb-8 text-white/80 max-w-3xl mx-auto"
        >
          Transforming ideas into exceptional digital experiences with cutting-edge technology and creative innovation.
        </p>
        
        <div ref={ctaRef} className="flex justify-center space-x-4">
          <motion.a 
            href="#services" 
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Our Services
          </motion.a>
          <motion.a 
            href="#contact" 
            className="btn btn-outline border-white text-white hover:bg-white hover:text-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <a href="#about">
          <ChevronDown size={32} />
        </a>
      </div>
    </section>
  );
};

export default Hero;