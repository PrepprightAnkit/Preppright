import { Users } from 'lucide-react';
import React from "react";
import theme from './theme';

import { Book, CheckCircle, Target } from 'lucide-react';

export default function AboutSection () {
  return (
    <section className={`${theme.spacing.section} bg-${theme.colors.primary.light}`}>
      <div className={theme.spacing.container}>
        <div className="text-center mb-12">
          <h2 className={`${theme.typography.hero} ${theme.typography.gradient}`}>About PreppRight</h2>
          <p className={`${theme.typography.body} mt-4 text-${theme.colors.gray[600]}`}>
            Empowering the next generation with quality education and personalized learning experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className={`${theme.components.card.base} shadow-lg p-8`}>
            <div className={`${theme.components.icon.base} ${theme.components.icon.size} mb-4`}>
              <Book className={`${theme.components.icon.color} text-6xl`} />
            </div>
            <h3 className={`${theme.typography.subheading} text-${theme.colors.primary.main}`}>Our Mission</h3>
            <p className={`${theme.typography.body} mt-4 text-${theme.colors.gray[600]}`}>
              At PreppRight, our mission is to provide students with the resources, tools, and guidance
              they need to achieve academic excellence and beyond.
            </p>
          </div>

          <div className={`${theme.components.card.base} shadow-lg p-8`}>
            <div className={`${theme.components.icon.base} ${theme.components.icon.size} mb-4`}>
              <Users className={`${theme.components.icon.color} text-6xl`} />
            </div>
            <h3 className={`${theme.typography.subheading} text-${theme.colors.secondary.main}`}>Our Community</h3>
            <p className={`${theme.typography.body} mt-4 text-${theme.colors.gray[600]}`}>
              Join a thriving community of learners, educators, and professionals all working towards
              success and growth in their fields.
            </p>
          </div>

          <div className={`${theme.components.card.base} shadow-lg p-8`}>
            <div className={`${theme.components.icon.base} ${theme.components.icon.size} mb-4`}>
              <Target className={`${theme.components.icon.color} text-6xl`} />
            </div>
            <h3 className={`${theme.typography.subheading} text-${theme.colors.primary.main}`}>Our Vision</h3>
            <p className={`${theme.typography.body} mt-4 text-${theme.colors.gray[600]}`}>
              We envision a world where every learner has access to personalized education, breaking
              down barriers to learning opportunities.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h3 className={`${theme.typography.heading} ${theme.typography.gradient} text-center mb-8`}>Why Choose PreppRight?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="flex items-center">
            <CheckCircle className="text-green-500 w-24 h-24 px-4" />


              <p className={`${theme.typography.body} text-${theme.colors.gray[600]}`}>
                Personalized Learning Plans to match each student's unique pace and learning style.
              </p>
            </div>
            <div className="flex items-center">
            <CheckCircle className="text-green-500 w-24 h-24 px-4" />
              <p className={`${theme.typography.body} text-${theme.colors.gray[600]}`}>
                Real-time progress tracking to help students stay on top of their learning goals.
              </p>
            </div>
            <div className="flex items-center">
            <CheckCircle className="text-green-500 w-24 h-24 px-4" />
              <p className={`${theme.typography.body} text-${theme.colors.gray[600]}`}>
                Expert educators and mentors available for guidance and academic support.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <h3 className={`${theme.typography.heading} ${theme.typography.gradient} mb-6`}>Our Impact</h3>
          <p className={`${theme.typography.body} text-${theme.colors.gray[600]} mx-auto max-w-3xl`}>
            Since our inception, PreppRight has impacted over 50,000 students worldwide, with a 95% success
            rate in helping students achieve their academic goals. We are proud to contribute to shaping the
            future of education.
          </p>
        </div>
      </div>
    </section>
  );
};

