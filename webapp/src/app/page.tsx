"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const testimonialRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Parallax effect for hero section
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(heroScrollProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.5], [1, 0.3]);

  // Parallax effect for services section
  const { scrollYProgress: servicesScrollProgress } = useScroll({
    target: servicesRef,
    offset: ["start end", "end start"]
  });
  
  const servicesScale = useTransform(servicesScrollProgress, [0, 0.5], [0.9, 1]);
  const servicesOpacity = useTransform(servicesScrollProgress, [0, 0.3], [0, 1]);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    
    const handleMediaQueryChange = (e) => {
      setReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    
    // Scroll event for various effects
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f7] dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-[#f5f5f7] font-sans">
      {/* Navigation bar with Apple-like styling */}
      <header className={`fixed w-full backdrop-blur-md bg-[#f5f5f7]/90 dark:bg-[#1d1d1f]/90 z-10 py-4 px-6 border-b border-[#d2d2d7] dark:border-[#424245] transition-all duration-300 ${scrollY > 50 ? 'py-2' : 'py-4'}`}>
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="font-semibold text-xl"
          >
            Innovate
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {["Produkte", "Services", "Support", "Über uns"].map((item, index) => (
              <motion.a 
                key={item}
                href="#"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="text-sm font-medium hover:text-[#0066cc] dark:hover:text-[#2997ff] transition-colors relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0066cc] dark:bg-[#2997ff] transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden flex flex-col space-y-1.5 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-current transform transition duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-current transition duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-6 h-0.5 bg-current transform transition duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <motion.div 
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-60' : 'max-h-0'}`}
          initial={false}
          animate={{ maxHeight: isMenuOpen ? 240 : 0 }}
        >
          <div className="px-6 py-4 flex flex-col space-y-4">
            {["Produkte", "Services", "Support", "Über uns"].map((item) => (
              <a 
                key={item}
                href="#" 
                className="text-sm font-medium py-2 hover:text-[#0066cc] dark:hover:text-[#2997ff] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      </header>

      {/* Main content with Apple-like styling */}
      <main className="flex-1 pt-24">
        {/* Hero section with parallax effect */}
        <motion.section 
          ref={heroRef}
          style={reducedMotion ? {} : { y: heroY, opacity: heroOpacity }}
          className="relative h-[90vh] flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 -z-10">
            <Image
              src="/hero-background.jpg" // You'll need to add this image to your public folder
              alt="Abstract background"
              fill
              priority
              className="object-cover"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJcIiLGHwAAAABJRU5ErkJggg=="
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f5f5f7] dark:to-[#1d1d1f]"></div>
          </div>
          
          <div className="text-center px-6 z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl sm:text-7xl font-semibold tracking-tight mb-6"
            >
              Innovate
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl sm:text-2xl text-[#86868b] dark:text-[#a1a1a6] max-w-2xl mx-auto mb-12"
            >
              Intelligente Lösungen für die digitale Zukunft
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="#"
                className="group relative bg-[#0066cc] dark:bg-[#2997ff] text-white rounded-full px-8 py-4 text-sm font-medium overflow-hidden"
              >
                <span className="relative z-10">Jetzt entdecken</span>
                <span className="absolute inset-0 bg-[#004499] dark:bg-[#147ce5] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
              </a>
              <a
                href="#"
                className="group relative bg-transparent border border-[#86868b] dark:border-[#a1a1a6] rounded-full px-8 py-4 text-sm font-medium overflow-hidden"
              >
                <span className="relative z-10">Kontakt aufnehmen</span>
                <span className="absolute inset-0 bg-[#e8e8ed] dark:bg-[#2c2c2e] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
              </a>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-8 h-12 border-2 border-[#86868b] dark:border-[#a1a1a6] rounded-full flex justify-center">
              <motion.div 
                animate={{ 
                  y: [0, 12, 0],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  repeatType: "loop"
                }}
                className="w-1 h-3 bg-[#86868b] dark:bg-[#a1a1a6] rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.section>

        {/* Product showcase with canvas animation */}
        <section className="py-24 px-6 bg-white dark:bg-[#1d1d1f]">
          <div className="max-w-5xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl font-semibold mb-4 text-center"
            >
              Innovation neu definiert
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center text-[#86868b] dark:text-[#a1a1a6] max-w-2xl mx-auto mb-16"
            >
              Entdecken Sie unsere neuesten Technologien, die Ihre Arbeitsweise revolutionieren werden.
            </motion.p>
            
            <div className="relative h-[60vh] mb-16">
              <div className="sticky top-0 h-screen flex items-center justify-center">
                <div className="w-full max-w-3xl aspect-video relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/product-showcase.jpg" // You'll need to add this image to your public folder
                    alt="Product showcase"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent flex items-end p-8">
                    <div>
                      <h3 className="text-white text-2xl font-medium mb-2">Innovate Pro</h3>
                      <p className="text-white/80">Unsere fortschrittlichste Lösung für Unternehmen</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services section with animation */}
        <motion.section 
          ref={servicesRef}
          style={reducedMotion ? {} : { scale: servicesScale, opacity: servicesOpacity }}
          className="py-24 px-6"
        >
          <div className="max-w-5xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-semibold mb-8 text-center"
            >
              Unsere Dienstleistungen
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: "⚙️",
                  title: "Cloud-Lösungen",
                  description: "Skalierbare und sichere Cloud-Infrastruktur für Ihr Unternehmen."
                },
                {
                  icon: "📱",
                  title: "App-Entwicklung",
                  description: "Native und Cross-Platform-Apps mit moderner Benutzeroberfläche."
                },
                {
                  icon: "🔒",
                  title: "Cyber-Sicherheit",
                  description: "Umfassender Schutz für Ihre sensiblen Unternehmensdaten."
                }
              ].map((service, index) => (
                <motion.div 
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="bg-white dark:bg-[#2c2c2e] rounded-2xl p-8 shadow-sm text-center"
                >
                  <div className="mb-4 text-[#0066cc] dark:text-[#2997ff] text-4xl">
                    <span>{service.icon}</span>
                  </div>
                  <h3 className="text-xl font-medium mb-4">{service.title}</h3>
                  <p className="text-[#86868b] dark:text-[#a1a1a6]">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        
        {/* Features section with grid */}
        <section className="py-24 px-6 bg-[#f2f2f7] dark:bg-[#2c2c2e]">
          <div className="max-w-5xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-semibold mb-16 text-center"
            >
              Warum Innovate wählen?
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                {
                  title: "Höchste Qualität",
                  description: "Wir setzen auf Premium-Materialien und fortschrittliche Technologien für langlebige Lösungen.",
                  icon: "✨"
                },
                {
                  title: "Expertenteam",
                  description: "Unser Team besteht aus Branchenexperten mit jahrelanger Erfahrung in der Technologiebranche.",
                  icon: "👥"
                },
                {
                  title: "Maßgeschneiderte Lösungen",
                  description: "Jede Lösung wird individuell an die Bedürfnisse Ihres Unternehmens angepasst.",
                  icon: "🔧"
                },
                {
                  title: "24/7 Support",
                  description: "Unser Kundendienst steht Ihnen rund um die Uhr zur Verfügung, um Ihre Fragen zu beantworten.",
                  icon: "🛠️"
                }
              ].map((feature, index) => (
                <motion.div 
                  key={feature.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0066cc] dark:bg-[#2997ff] text-white flex items-center justify-center text-2xl">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                    <p className="text-[#86868b] dark:text-[#a1a1a6]">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonial section with animation */}
        <motion.section 
          ref={testimonialRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-24 px-6"
        >
          <div className="max-w-5xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-semibold mb-16 text-center"
            >
              Was unsere Kunden sagen
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  quote: "Die Zusammenarbeit mit Innovate hat unsere digitale Transformation beschleunigt. Hervorragende Expertise und Kundendienst.",
                  author: "Anna Schmidt",
                  position: "CEO bei TechVision GmbH"
                },
                {
                  quote: "Innovate hat uns geholfen, unsere IT-Infrastruktur zu modernisieren und gleichzeitig Kosten zu senken. Ein echter Game-Changer für unser Unternehmen.",
                  author: "Markus Weber",
                  position: "CTO bei Digital Solutions AG"
                }
              ].map((testimonial, index) => (
                <motion.div 
                  key={testimonial.author}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-white dark:bg-[#2c2c2e] rounded-2xl p-8 shadow-sm"
                >
                  <div className="mb-6">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-[#ff9500] text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-lg italic text-[#86868b] dark:text-[#a1a1a6] mb-6">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-[#e5e5ea] dark:bg-[#3a3a3c] flex items-center justify-center text-lg font-medium mr-4">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-[#86868b] dark:text-[#a1a1a6]">{testimonial.position}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        
        {/* CTA section */}
        <section className="py-24 px-6 bg-gradient-to-r from-[#0066cc] to-[#5ac8fa] dark:from-[#0066cc] dark:to-[#5ac8fa] text-white">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl font-semibold mb-6"
            >
              Bereit für die Zukunft?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl max-w-2xl mx-auto mb-12 text-white/90"
            >
              Kontaktieren Sie uns noch heute und erfahren Sie, wie wir Ihr Unternehmen auf die nächste Stufe bringen können.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a
                href="#"
                className="group relative bg-white text-[#0066cc] rounded-full px-8 py-4 text-sm font-medium inline-block overflow-hidden"
              >
                <span className="relative z-10">Jetzt Beratungstermin vereinbaren</span>
                <span className="absolute inset-0 bg-[#f5f5f7] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer with Apple-like styling */}
      <footer className="py-12 px-6 border-t border-[#d2d2d7] dark:border-[#424245] text-sm text-[#86868b] dark:text-[#a1a1a6]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-medium mb-4">Produkte</h4>
              <ul className="space-y-2">
                {["Innovate Pro", "Innovate Cloud", "Innovate Security", "Innovate Mobile"].map(item => (
                  <li key={item}>
                    <a href="#" className="hover:text-[#0066cc] dark:hover:text-[#2997ff] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Services</h4>
              <ul className="space-y-2">
                {["Beratung", "Implementierung", "Schulung", "Support"].map(item => (
                  <li key={item}>
                    <a href="#" className="hover:text-[#0066cc] dark:hover:text-[#2997ff] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Unternehmen</h4>
              <ul className="space-y-2">
                {["Über uns", "Team", "Karriere", "Nachhaltigkeit"].map(item => (
                  <li key={item}>
                    <a href="#" className="hover:text-[#0066cc] dark:hover:text-[#2997ff] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Kontakt</h4>
              <ul className="space-y-2">
                {["Vertrieb", "Support", "Presse", "Standorte"].map(item => (
                  <li key={item}>
                    <a href="#" className="hover:text-[#0066cc] dark:hover:text-[#2997ff] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-[#d2d2d7] dark:border-[#424245]">
            <p>© {new Date().getFullYear()} Innovate GmbH. Alle Rechte vorbehalten.</p>
            <div className="flex gap-8">
              <a 
                href="#"
                className="hover:text-[#0066cc] dark:hover:text-[#2997ff] transition-colors"
              >
                Datenschutz
              </a>
              <a 
                href="#"
                className="hover:text-[#0066cc] dark:hover:text-[#2997ff] transition-colors"
              >
                Impressum
              </a>
              <a 
                href="#"
                className="hover:text-[#0066cc] dark:hover:text-[#2997ff] transition-colors"
              >
                Nutzungsbedingungen
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
