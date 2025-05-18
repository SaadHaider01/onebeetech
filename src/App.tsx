import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import WhyChooseUs from './sections/WhyChooseUs';
import OurWork from './sections/OurWork';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import BackgroundCanvas from './components/three/BackgroundCanvas';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative">
      <BackgroundCanvas />
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          <OurWork />
          <WhyChooseUs />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;