/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import fullogo from "../assets/images/logo.png";

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 20);
      const sections = ["home", "aboutus", "blogs", "events", "contactus"].map((id) => document.getElementById(id));
      let currentSection = "home";
      sections.forEach((section) => {
        if (section) {
          const sectionTop = section.offsetTop - 100;
          if (window.scrollY >= sectionTop) {
            currentSection = section.id;
          }
        }
      });
      setActiveSection(currentSection);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { title: "Home", url: "#home" },
    { title: "About Us", url: "#aboutus" },
    { title: "Blogs", url: "#blogs" },
    { title: "Events", url: "#events" },
    { title: "Contact Us", url: "#contactus" },
  ];

  const navLinkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, type: "spring", stiffness: 120 } },
    hover: {
      scale: 1.1,
      color: "#fde047",
      textShadow: "0px 0px 12px rgba(253, 224, 71, 0.9)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, type: "spring", bounce: 0.4 } },
    hover: { scale: 1.1, filter: "brightness(1.2)", boxShadow: "0 0 15px rgba(253, 224, 71, 0.6)", transition: { duration: 0.3 } },
    tap: { rotate: 360, scale: 1.2, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const menuVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, type: "spring", stiffness: 200 } },
  };

  const underlineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: { scaleX: 1, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { scaleX: 0, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
  };

  const rippleVariants = {
    initial: { scale: 0, opacity: 0.5 },
    animate: { scale: 2, opacity: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const handleNavClick = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = document.querySelector("nav")?.offsetHeight || 0;
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({ top: sectionTop, behavior: "smooth" });
      setActiveSection(sectionId);
    }
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <>
      <style jsx>{`
        @keyframes flicker {
          0%, 100% { box-shadow: 0 0 10px rgba(253, 224, 71, 0.8); }
          50% { box-shadow: 0 0 15px rgba(253, 224, 71, 1); }
        }
        .flicker { animation: flicker 0.5s infinite alternate; }
        @keyframes logoGlow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(253, 224, 71, 0.5)); }
          50% { filter: drop-shadow(0 0 20px rgba(253, 224, 71, 0.8)); }
        }
        .logo-glow { animation: logoGlow 2s ease-in-out infinite; }
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-scan { animation: scan 3s infinite linear; }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .pulse { animation: pulse 1.5s infinite ease-in-out; }
      `}</style>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 bg-black transition-all duration-300 ${sticky ? "shadow-xl" : "shadow-none"}`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            className="flex items-center cursor-pointer p-1 rounded-md logo-glow pulse"
            onClick={() => handleNavClick("home")}
          >
            {fullogo ? (
              <motion.img src={fullogo} alt="NepTech Tribe" className="h-10 sm:h-12 w-auto object-contain" />
            ) : (
              <span className="text-white text-lg sm:text-xl font-bold">NepTech Tribe</span>
            )}
            <span className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,transparent_0%,#fde047_50%,transparent_100%)] opacity-20 blur-md animate-scan" />
          </motion.div>
          <motion.ul
            initial="hidden"
            animate="visible"
            className="hidden md:flex space-x-6 sm:space-x-8 text-white font-medium tracking-wide"
          >
            {navLinks.map((link) => (
              <motion.li
                key={link.title}
                variants={navLinkVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Link
                  to={link.url}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.url.substring(1));
                  }}
                  className={`relative text-base sm:text-lg transition-colors duration-300 ${
                    activeSection === link.url.substring(1) ? "text-yellow-400" : "text-white hover:text-yellow-400"
                  }`}
                >
                  {link.title}
                  <motion.div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(253,224,71,0.3),transparent)] pointer-events-none"
                    variants={rippleVariants}
                    initial="initial"
                    whileTap="animate"
                  />
                  {activeSection === link.url.substring(1) && (
                    <motion.div
                      className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-gradient-to-r from-yellow-400 to-yellow-600 flicker"
                      variants={underlineVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    />
                  )}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
          <motion.button
            whileHover={{ scale: 1.2, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden text-white focus:outline-none z-50 ${menuOpen ? "hidden" : "block"}`}
          >
            <motion.svg
              animate={{ rotate: menuOpen ? 90 : 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 sm:w-8 h-6 sm:h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {!menuOpen && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m0 6H4" />
              )}
            </motion.svg>
          </motion.button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden bg-black/90 text-white fixed inset-0 z-40 flex flex-col items-center justify-center"
            >
              <motion.div
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(253,224,71,0.2),transparent)]"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 3, opacity: 0.5 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
              <motion.ul
                className="flex flex-col items-center space-y-6 text-xl sm:text-2xl font-semibold"
                variants={{ visible: { transition: { staggerChildren: 0.1 } }}}
              >
                {navLinks.map((link) => (
                  <motion.li
                    key={link.title}
                    variants={menuItemVariants}
                    whileHover={{
                      scale: 1.1,
                      color: "#fde047",
                      textShadow: "0px 0px 12px rgba(253,224,71,0.9)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <Link
                      to={link.url}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.url.substring(1));
                      }}
                      className={`relative transition-colors duration-300 ${
                        activeSection === link.url.substring(1) ? "text-yellow-400" : "text-white hover:text-yellow-400"
                      }`}
                    >
                      {link.title}
                      {activeSection === link.url.substring(1) && (
                        <motion.div
                          className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-gradient-to-r from-yellow-400 to-yellow-600 flicker"
                          variants={underlineVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.button
                onClick={() => setMenuOpen(false)}
                className="absolute top-6 right-6 text-yellow-400 text-4xl focus:outline-none"
                whileHover={{ scale: 1.3, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                &times;
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;