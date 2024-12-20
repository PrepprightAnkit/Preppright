import { motion } from 'framer-motion';
import {
  ChevronRight,
  CreditCard,
  FileText,
  PieChart
} from 'lucide-react';
import React from "react";
import p1 from "./assets/p1.png";
import p2 from "./assets/p2.png";
import p3 from "./assets/p3.png";

const Platform = () => {
  const platformCardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const platformFeatures = [
    {
      image: p1,
      icon: CreditCard,
      title: "Online Billing & Invoicing",
      description: "Simple and secure control of financial transactions. Send customized invoices and contracts."
    },
    {
      image: p2,
      icon: FileText,
      title: "Comprehensive Reporting",
      description: "Advanced analytics and detailed insights into your organization's performance and growth."
    },
    {
      image: p3,
      icon: PieChart,
      title: "Learning Management",
      description: "Integrated platform for course delivery, student tracking, and comprehensive educational management."
    }
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 to-white min-h-screen py-16 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-blue-700 mb-4">
            All-In-One <span className="text-blue-800">Learning Platform</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Skilline is one powerful online software suite that combines all the tools needed to run a successful school or office.
          </p>
        </motion.div>

        {/* Platform Features Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-7xl"
        >
          {platformFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={platformCardVariants}
              whileHover="hover"
              className="bg-white rounded-xl shadow-xl overflow-hidden mx-auto"
            >
              <div className="relative">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-64 object-contain"
                />
              </div>
              <div className="p-6 bg-blue-50">
                <div className="flex items-center mb-4">
                  <feature.icon className="mr-3 text-blue-600" size={32} />
                  <h3 className="text-2xl font-semibold text-blue-700">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4 text-lg">
                  {feature.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Learn More
                  <ChevronRight className="ml-2" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Platform;
