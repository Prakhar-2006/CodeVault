/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaYoutube, FaEnvelope, FaLinkedinIn } from "react-icons/fa"; // Font Awesome icons
import { Link } from "react-router-dom";
import fullogo from "../assets/images/logo.png";

function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring", stiffness: 120 } },
  };

  return (
    <motion.div
      className="Footer bg-black text-white py-8 sm:py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 sm:gap-12 pt-8 pb-8">
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <motion.img
              src={fullogo}
              alt="NepTech Tribe Logo"
              className="mb-4 w-32 sm:w-40"
              variants={itemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            />
            <motion.p
              className="text-sm sm:text-base text-gray-300 leading-relaxed"
              variants={itemVariants}
            >
              NepTech Tribe is a non-profit organization that unites tech enthusiasts of all ages to share knowledge and foster innovation. We offer events and activities to enhance skills and encourage collaboration, aiming to drive technological progress and create a supportive community.
            </motion.p>
            <motion.div
              className="flex space-x-3 mt-4"
              variants={itemVariants}
            >
              <motion.button
                whileHover={{ scale: 1.1, color: "#3b5998" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://www.facebook.com/neptechtribe/', '_blank')}
                className="bg-transparent text-white focus:outline-none"
              >
                <FaFacebookF className="text-xl sm:text-2xl" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, color: "#ff0000" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://www.youtube.com/@NepTechTribe', '_blank')}
                className="bg-transparent text-white focus:outline-none"
              >
                <FaYoutube className="text-xl sm:text-2xl" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, color: "#0078d4" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('mailto:neptechtribe@gmail.com', '_blank')}
                className="bg-transparent text-white focus:outline-none"
              >
                <FaEnvelope className="text-xl sm:text-2xl" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, color: "#0077b5" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://www.linkedin.com/company/neptechtribe/posts/?feedView=all', '_blank')}
                className="bg-transparent text-white focus:outline-none"
              >
                <FaLinkedinIn className="text-xl sm:text-2xl" />
              </motion.button>
            </motion.div>
          </motion.div>
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <dl>
              <dt className="text-lg sm:text-xl font-semibold text-yellow-400 mb-2">Explore</dt>
              <dd className="mb-1"><Link to="/about" className="text-gray-300 hover:text-yellow-400 transition-colors">About Us</Link></dd>
              <dd className="mb-1"><Link to="/team" className="text-gray-300 hover:text-yellow-400 transition-colors">Our Team</Link></dd>
              <dd className="mb-1"><Link to="/blog" className="text-gray-300 hover:text-yellow-400 transition-colors">Blogs</Link></dd>
              <dd className="mb-1"><Link to="/faq" className="text-gray-300 hover:text-yellow-400 transition-colors">FAQ</Link></dd>
            </dl>
          </motion.div>
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <dl>
              <dt className="text-lg sm:text-xl font-semibold text-yellow-400 mb-2">Services</dt>
              <dd className="mb-1"><Link to="/events" className="text-gray-300 hover:text-yellow-400 transition-colors">Events</Link></dd>
              <dd className="mb-1"><Link to="/hackathon" className="text-gray-300 hover:text-yellow-400 transition-colors">Hackathons</Link></dd>
              <dd className="mb-1"><Link to="/bootcamp" className="text-gray-300 hover:text-yellow-400 transition-colors">Bootcamps</Link></dd>
              <dd><Link to="/Hacktoberfest" className="text-gray-300 hover:text-yellow-400 transition-colors">Hacktoberfest</Link></dd>
            </dl>
          </motion.div>
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <dl>
              <dt className="text-lg sm:text-xl font-semibold text-yellow-400 mb-2">Resources</dt>
              <dd className="mb-1"><Link to="/csit" className="text-gray-300 hover:text-yellow-400 transition-colors">BSc CSIT</Link></dd>
              <dd className="mb-1"><Link to="/bca" className="text-gray-300 hover:text-yellow-400 transition-colors">BCA</Link></dd>
              <dd className="mb-1"><Link to="/bim" className="text-gray-300 hover:text-yellow-400 transition-colors">BIM</Link></dd>
              <dd className="mb-1"><Link to="/bit" className="text-gray-300 hover:text-yellow-400 transition-colors">BIT</Link></dd>
            </dl>
          </motion.div>
        </div>
        <hr className="border-gray-700 my-6" />
        <div className="text-center">
          <motion.p
            className="text-sm sm:text-base text-gray-400"
            variants={itemVariants}
          >
            Copyright © {new Date().getFullYear()} NepTech Tribe. All Rights Reserved.
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

export default Footer;