import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Hexagon } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#our-work' },
    { name: 'Why Us', href: '#why-choose-us' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrolledDown = currentScrollPos > 50;
      
      setVisible(
        (prevScrollPos > currentScrollPos && currentScrollPos > 50) || 
        currentScrollPos < 50
      );
      
      setPrevScrollPos(currentScrollPos);
      setIsScrolled(isScrolledDown);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3 }}
          className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
            isScrolled 
              ? 'bg-white/90 backdrop-blur-md shadow-md' 
              : 'bg-transparent'
          }`}
        >
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <a href="#home" className="flex items-center">
              <Hexagon size={30} className="text-primary mr-2" />
              <span className="text-xl font-bold text-secondary">
                One<span className="text-primary">Bee</span> Tech
              </span>
            </a>

            <nav className="hidden md:flex space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`font-medium transition-colors duration-300 ${
                    isScrolled 
                      ? 'text-secondary hover:text-primary' 
                      : 'text-white hover:text-primary'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-secondary focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} className="text-secondary" />
              ) : (
                <Menu size={24} className={isScrolled ? "text-secondary" : "text-white"} />
              )}
            </button>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-white shadow-lg"
              >
                <div className="container mx-auto px-4 py-4">
                  <nav className="flex flex-col space-y-4">
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="font-medium text-secondary hover:text-primary transition-colors duration-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    ))}
                  </nav>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Header;