import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AboutScene from '../components/three/AboutScene';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textContent = textRef.current;
    const canvas = canvasRef.current;

    if (section && textContent && canvas) {
      // Animate text content on scroll
      gsap.fromTo(
        textContent.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'center center',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate 3D canvas on scroll
      gsap.fromTo(
        canvas,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'center center',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section relative bg-white/90 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div ref={canvasRef} className="h-[400px] relative">
            <AboutScene />
          </div>
          
          <div ref={textRef}>
            <motion.h2 
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-secondary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              About <span className="text-primary">OneBee Tech</span>
            </motion.h2>
            
            <motion.p 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              At OneBee Tech, we are a dynamic team of creative professionals dedicated to delivering exceptional digital solutions that help businesses thrive in the digital landscape.
            </motion.p>
            
            <motion.p 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Founded with a vision to transform how businesses connect with their audience, we combine technical expertise with creative innovation to craft digital experiences that stand out.
            </motion.p>
            
            <motion.div 
              className="grid grid-cols-2 gap-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                <p className="font-semibold">Innovative Solutions</p>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                <p className="font-semibold">Expert Team</p>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                <p className="font-semibold">Client-Focused</p>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                <p className="font-semibold">Quality Delivery</p>
              </div>
            </motion.div>
            
            <motion.a 
              href="#services" 
              className="btn btn-primary inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Our Services
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;