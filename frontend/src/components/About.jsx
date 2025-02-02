import { Award, Clock, Globe, Handshake, TrendingUp, Users } from 'lucide-react';
import { default as React } from "react";
import theme from './theme';

import { Book, CheckCircle, Target } from 'lucide-react';
import Footer from './Footer';
import Navbar from './Navbar';


const LearnerBenefits = () => {
  const benefits = [
    {
      title: "World Class Pedagogy",
      items: [
        "Learn from the World's Best Faculty & Industry Experts",
        "Learn with fun Hands-on Exercises & Assignments",
        "Participate in Hackathons & Group Activities"
      ],
      image: "https://lapgadgets.in/wp-content/uploads/2024/04/Firefly-happy-student-working-on-laptop-27248-1024x1024.jpg",
      stats: [
        { icon: <Award />, text: "4.8/5 Rating" },
        { icon: <Users />, text: "Gamified Learning" }
      ]
    },
    {
      title: "Personalized Guidance with 24×7 Support",
      items: [
        "Dedicated Learning Managers",
        "24/7 Learning Support",
        "Network with Peers & Interact with Industry Leaders"
      ],
      image: "https://media.istockphoto.com/id/1465651473/photo/happy-hispanic-woman-working-inside-office-businesswoman-with-video-call-headset-talking-and.jpg?s=612x612&w=0&k=20&c=4DBmVlj5l8fVA6Vxnfax3_OKfmwJzSkVzMMrilD_AoU=",
      stats: [
        { icon: <Clock />, text: "24 x 7 Support" },
        { icon: <Handshake />, text: "1:1 Mentorship" }
      ]
    },
    {
      title: "Career Assistance",
      items: [
        "Resume Building & Mock Interview Prep",
        "Exclusive access to PreppRight Job Portal",
        "400+ Hiring Partners"
      ],
      image: "https://thumbs.dreamstime.com/b/woman-hiring-manager-intake-meeting-hr-recruiting-team-member-young-indian-having-job-qualifications-office-350435810.jpg",
      stats: [
        { icon: <TrendingUp />, text: "85,000 Career Transition" },
        { icon: <Globe />, text: "400+ Hiring Partners" }
      ]
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className={`text-3xl font-bold text-center mb-12 bg-gradient-to-r ${theme.colors.primary.gradient} bg-clip-text text-transparent`}>
          Learner Benefits
        </h2>
        
        <div className="space-y-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="h-full flex flex-col md:flex-row items-center gap-8 bg-white rounded-xl p-6 shadow-lg">
              <div className="w-full h-full flex justify-center items-center md:w-1/3">
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="rounded-lg shadow-lg"
                />
              </div>
              
              <div className="w-full md:w-2/3">
                <h3 className={`text-2xl font-semibold mb-4 text-${theme.colors.primary.main}`}>
                  {benefit.title}
                </h3>
                <ul className="space-y-3 mb-8">
                  {benefit.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className={`text-${theme.colors.primary.main} mt-1`}>•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="grid grid-cols-2 gap-4">
                  {benefit.stats.map((stat, idx) => (
                    <div key={idx} className={`bg-${theme.colors.primary.light} p-4 rounded-lg shadow flex flex-col items-center justify-center text-center`}>
                      <span className={`text-${theme.colors.primary.main} mb-2`}>
                        {stat.icon}
                      </span>
                      <span className="text-sm font-medium text-gray-800">{stat.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default function AboutSection () {
  return (
    <>
    <Navbar/>
    
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
      <LearnerBenefits/>
      <Footer/>
    </section>
    </>
  );
};

