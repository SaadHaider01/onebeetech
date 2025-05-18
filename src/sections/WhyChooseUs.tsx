import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FeatureBox from '../components/FeatureBox';
import { 
  Zap, 
  HeadsetIcon, 
  DollarSign, 
  Settings 
} from 'lucide-react';
import WhyUsScene from '../components/three/WhyUsScene';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: 'Fast Delivery',
    description: 'We deliver projects efficiently without compromising on quality.',
    icon: Zap,
  },
  {
    title: '24/7 Support',
    description: 'Our dedicated team is always available to assist you with any issues.',
    icon: HeadsetIcon,
  },
  {
    title: 'Affordable Pricing',
    description: 'Competitive pricing with flexible packages to suit your budget.',
    icon: DollarSign,
  },
  {
    title: 'Custom Solutions',
    description: 'Tailored solutions designed specifically for your unique business needs.',
    icon: Settings,
  },
];

const WhyChooseUs: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const featureBoxes = featuresRef.current;
    const canvas = canvasRef.current;

    if (section && heading && featureBoxes && canvas) {
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

      // Animate feature boxes
      gsap.fromTo(
        featureBoxes.children,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 0.8,
          scrollTrigger: {
            trigger: featureBoxes,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate 3D canvas
      gsap.fromTo(
        canvas,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: canvas,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <section id="why-choose-us" ref={sectionRef} className="section relative bg-white/90 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">
            Why Choose <span className="text-primary">Us</span>
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-800">
            Experience the OneBee Tech difference with our client-focused approach and commitment to excellence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-2" ref={canvasRef}>
            <div className="h-[400px] relative">
              <WhyUsScene />
            </div>
          </div>
          
          <div className="lg:col-span-3" ref={featuresRef}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <FeatureBox
                    title={feature.title}
                    description={feature.description}
                    Icon={feature.icon}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;