import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MailIcon, MapPin,  CheckCircle2, AlertTriangle } from 'lucide-react';
import emailjs from '@emailjs/browser';



gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    const info = infoRef.current;

    if (section && form && info) {
      // Animate info section
      gsap.fromTo(
        info.children,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: info,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate form elements
      gsap.fromTo(
        form.elements,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          scrollTrigger: {
            trigger: form,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formRef.current) return;
    
    // Show submitting state
    setIsSubmitting(true);
    setError(null);
    
    // Use EmailJS to send the form
    // Replace these with your actual EmailJS service ID, template ID, and public key
    const serviceId = 'service_bfncdb8';
    const templateId = 'template_ood3xvc';
    const publicKey = 'Ov_XyQ22dFiD36kgH';
   
    
    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        setFormSubmitted(true);
        setIsSubmitting(false);
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setFormSubmitted(false);
          if (formRef.current) {
            formRef.current.reset();
          }
        }, 5000);
      })
      .catch((error) => {
        console.error('Failed to send email:', error.text);
        setError('Failed to send your message. Please try again later.');
        setIsSubmitting(false);
      });
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      className="section relative bg-gradient-to-b from-secondary/90 to-secondary text-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.h2>
          <motion.p 
            className="max-w-2xl mx-auto text-white/80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Have a project in mind or want to learn more about our services? We'd love to hear from you!
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div ref={infoRef}>
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary/20 p-3 rounded-lg mr-4">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-white/80">Samarpally, Kestopur, Kolkata, WB 700102</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/20 p-3 rounded-lg mr-4">
                  <MailIcon className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-white/80">contact.onebeetech@gmail.com</p>
                </div>
              </div>
              
              {/* <div className="flex items-start">
                <div className="bg-primary/20 p-3 rounded-lg mr-4">
                  <Phone className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-white/80">+91 XXX XXX XXXX</p>
                </div>
              </div> */}
            </div>
            
            {/* Social media icons section (commented out in original) */}
          </div>
          
          <div>
            {formSubmitted ? (
              <motion.div 
                className="bg-white/10 p-8 rounded-lg flex flex-col items-center justify-center text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle2 size={60} className="text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-white/80">
                  Thank you for contacting us. We'll get back to you shortly.
                </p>
              </motion.div>
            ) : (
              <form 
                ref={formRef}
                onSubmit={handleSubmit}
                className="bg-white/10 p-8 rounded-lg"
              >
                {error && (
                  <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center">
                    <AlertTriangle className="text-red-400 mr-2" size={20} />
                    <p className="text-white/90 text-sm">{error}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="user_name" className="block mb-2 text-sm font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="user_name"
                      name="user_name"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="user_email" className="block mb-2 text-sm font-medium">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="user_email"
                      name="user_email"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary"
                    placeholder="How can we help?"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block mb-2 text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary"
                    placeholder="Tell us about your project..."
                    required
                  ></textarea>
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full btn btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;