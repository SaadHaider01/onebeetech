import React from 'react';
import { Github, Linkedin, Instagram, Twitter, Hexagon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Hexagon size={30} className="text-primary mr-2" />
              <span className="text-xl font-bold">
                One<span className="text-primary">Bee</span> Tech
              </span>
            </div>
            <p className="text-neutral-300 mb-4">
              Creating exceptional digital experiences that transform businesses.
            </p>
            {/* <div className="flex space-x-4">
              <a href="#" className="text-neutral-300 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-neutral-300 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-neutral-300 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-neutral-300 hover:text-primary transition-colors">
                <Github size={20} />
              </a>
            </div> */}
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-neutral-300 hover:text-primary transition-colors">Home</a></li>
              <li><a href="#about" className="text-neutral-300 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#services" className="text-neutral-300 hover:text-primary transition-colors">Services</a></li>
              <li><a href="#why-choose-us" className="text-neutral-300 hover:text-primary transition-colors">Why Choose Us</a></li>
              <li><a href="#contact" className="text-neutral-300 hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <p className="text-neutral-300 mb-2">Samarpally, Kestopur</p>
            <p className="text-neutral-300 mb-2">Kolkata, WB 700102</p>
            <p className="text-neutral-300 mb-4">contact.onebeetech@gmail.com</p>
            <a href="#contact" className="btn btn-primary">Get In Touch</a>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 mt-8 pt-8 text-center text-neutral-400">
          <p>&copy; {new Date().getFullYear()} OneBee Tech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;