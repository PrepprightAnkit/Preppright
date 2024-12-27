import { motion } from 'framer-motion';
import { Book, ChevronRight, ClipboardList, Users } from 'lucide-react';
import React from "react";
import theme from '../theme';
import learningImage from "./assets/p1.png";
import trackingImage from "./assets/p2.png";
import analyticsImage from "./assets/p3.png";

const platformFeatures = [
  {
    image: learningImage,
    icon: Book,
    title: "Interactive Learning Modules",
    description: "Engage students with interactive courses, quizzes, and multimedia content tailored for effective learning."
  },
  {
    image: trackingImage,
    icon: Users,
    title: "Student Performance Tracking",
    description: "Monitor individual and group progress with detailed insights and personalized feedback."
  },
  {
    image: analyticsImage,
    icon: ClipboardList,
    title: "Advanced Analytics & Reporting",
    description: "Gain actionable insights with performance metrics, attendance reports, and learning trends."
  }
];

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

  return (
    <section className={`${theme.spacing.section} bg-gradient-to-b ${theme.colors.gray[50]}`}>
      <div className={theme.spacing.container}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className={`${theme.typography.hero} ${theme.typography.gradient} mb-4`}>
            Empowering Education with PreppRight
          </h2>
          <p className={theme.typography.body}>
            PreppRight is your comprehensive platform for modern education, combining tools for learning, analytics, and student engagement.
          </p>
        </motion.div>

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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {platformFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={platformCardVariants}
              whileHover="hover"
              className={`${theme.components.card.base} ${theme.components.card.hover} overflow-hidden`}
            >
              <div className="relative">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-64 object-contain"
                />
              </div>
              <div className={`${theme.components.card.padding} bg-indigo-50`}>
                <div className="flex items-center mb-4">
                  <div className={`${theme.components.icon.base} ${theme.components.icon.size} p-2`}>
                    <feature.icon className={theme.components.icon.color} size={24} />
                  </div>
                  <h3 className={`${theme.typography.subheading} ml-4`}>
                    {feature.title}
                  </h3>
                </div>
                <p className={`${theme.typography.body} mb-4`}>
                  {feature.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${theme.components.button.base} inline-flex items-center text-indigo-600 hover:text-indigo-700 py-2 px-4`}
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
