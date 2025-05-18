import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServiceCard from '../components/ServiceCard';
import { 
  Globe, 
  Smartphone, 
  Palette, 
  Layers, 
  Video, 
  Database, 
  MessageCircleCode
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Web Development',
    icon: Globe,
    description: 'Custom websites and web applications with responsive design and seamless user experience.',
    details: 'From simple landing pages to complex e-commerce platforms, we create custom web solutions that drive results.'
  },
  {
    title: 'App Development',
    icon: Smartphone,
    description: 'Native and cross-platform mobile applications for iOS and Android platforms.',
    details: 'Creating intuitive, feature-rich mobile apps that engage users and deliver exceptional functionality.'
  },
  {
    title: 'Graphic Design',
    icon: Palette,
    description: 'Creative visual designs for branding, marketing materials, and digital assets.',
    details: 'Eye-catching graphics that communicate your brand message and captivate your audience.'
  },
  {
    title: 'UI/UX Design',
    icon: Layers,
    description: 'User-centered interface and experience design for web and mobile applications.',
    details: 'Intuitive interfaces and seamless user journeys that enhance user satisfaction and conversion rates.'
  },
  {
    title: 'Video Editing',
    icon: Video,
    description: 'Professional video editing services for marketing, social media, and presentations.',
    details: 'Compelling visual storytelling through expertly crafted videos that engage and inspire your audience.'
  },
  {
    title: 'LLM Prompt Engineering',
    icon: MessageCircleCode,
    description: 'Expert prompt design and evaluation for AI systems and language models.',
    details: 'Optimizing AI interactions with carefully crafted prompts for maximum effectiveness and relevance.'
  },
  {
    title: 'Data Entry',
    icon: Database,
    description: 'Accurate and efficient data entry services for various industries.',
    details: 'Streamlining data management processes with precision and speed to enhance productivity.'
  }
];

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;

    if (section && heading && cards) {
      // Animate heading
      gsap.fromTo(
        heading.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate cards with stagger
      gsap.fromTo(
        cards.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          scrollTrigger: {
            trigger: cards,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <section id="services" ref={sectionRef} className="section relative bg-gradient-to-b from-secondary to-secondary/90 text-white">
      <div className="container mx-auto px-4">
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="max-w-2xl mx-auto text-white/80">
            We offer a comprehensive range of digital services to help your business grow and succeed in the digital world.
          </p>
        </div>
        
        <div 
          ref={cardsRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <ServiceCard
                title={service.title}
                Icon={service.icon}
                description={service.description}
                details={service.details}
              />
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <motion.a 
            href="#contact" 
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Services;