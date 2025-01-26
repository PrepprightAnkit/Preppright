import React from "react";
import { Linkedin } from 'lucide-react';
import theme from "../theme";

const MentorSupport = () => {
  const mentors = [
    {
      name: "Maruwada Saketh",
      expertise: "Trainer AWS",
      description: "Accenture - Sr. Software engineer. ",
      image: "https://media.licdn.com/dms/image/v2/D5603AQHV7vVgd85JmQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1683054341185?e=1743638400&v=beta&t=PXGShW5jK0rhdx5atidzK5Pau8mDU0i5twmLLJdkjGc",
      linkedin: "https://www.linkedin.com/in/maruvada-saketh?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    },
    {
      name: "Taranpreet Singh ",
      expertise: "Trainer - Full Stack Web Development",
      description: "Senior Site Reliability Engineer @ ASAPP",
      image: "https://media.licdn.com/dms/image/v2/C4E03AQGV1uRfKY0gTQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1621765283349?e=1743638400&v=beta&t=2OEhenu2ZUr9gqgx2zYImRg3DIObs9gHXALyFZw12A0",
      linkedin: "https://www.linkedin.com/in/singh20taran?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    },
    {
      name: "Rishabh Singh Parmar",
      expertise: "Trainer - Java and python programming",
      description: "Assistant Engineer - Tata Consultancy Services",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQFRm-r4lYpx0Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1674572966844?e=1743638400&v=beta&t=Mb7ouCYut9_dHabs3Yl0kR5963JKs_M9207tJDREqs8",
      linkedin: "https://www.linkedin.com/in/rishabh-singh-parmar-1144b210b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    },
    {
      name: "Ishwarpreet Singh",
      expertise: "Trainer - Web Development",
      description: "Senior software engineer ",
      image: "https://media.licdn.com/dms/image/v2/D5603AQH4Nckp26aF1A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1728636064359?e=1743638400&v=beta&t=aCHBB6wpt6tVXmlV6OmjqWbiX54M-FA_cNcOyGA4Yec",
      linkedin: "https://www.linkedin.com/in/ishwarpreet-singh-546214160/"
    },
    {
      name: "Yash Sharma",
      expertise: "Trainer - Finance",
      description: "Process Associate  ",
      image: "https://media.licdn.com/dms/image/v2/D5603AQGIukn5CP60sA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1704783070988?e=1743638400&v=beta&t=CgLVWgh4oaGvnTcuX0O_Ch3LyrOu261sPc_45wKGOA0",
      linkedin: "https://www.linkedin.com/in/yash-sharma-4206b1221?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    },
    {
      name: "Chitrang G.",
      expertise: "Trainer - Digital marketing",
      description: "Product manager ",
      image: "https://media.licdn.com/dms/image/v2/D5603AQEpTzFapJiYKA/profile-displayphoto-shrink_400_400/B56ZRy29liGoAg-/0/1737093798764?e=1743638400&v=beta&t=zh1FKxIT4li4NGP_1YtGY0WK-s3VKYwCcp4K8icHE7A",
      linkedin: "https://www.linkedin.com/in/chitrang-g-83153a1b0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    },
  ];

  return (
    <div className="bg-gradient-to-br from-primary-light to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold ${theme.typography.gradient} mb-4`}>
            Mentor Support
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Connect with experienced mentors to guide you on your journey. Learn
            from the best and achieve your goals with personalized support and 
            expert insights tailored to your unique learning path.
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className={`text-3xl md:text-4xl ${theme.typography.gradient} font-bold mb-8 text-center`}>
            Our Expert Mentors
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentors.map((mentor, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-xl shadow-md p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-32 h-32 rounded-full object-cover mb-4 ring-4 ring-primary-light shadow-lg"
                  />
                  <h3 className="text-2xl font-semibold text-primary-dark mb-2">
                    {mentor.name}
                  </h3>
                  <p className="text-primary-main font-medium mb-2 text-lg">
                    {mentor.expertise}
                  </p>
                  <p className="text-gray-600 text-center mb-4 text-base">
                    {mentor.description}
                  </p>
                  
                  {/* LinkedIn Link */}
                  <a 
                    href={mentor.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`text-primary-main text-blue-800  hover:text-primary-dark transition-colors duration-300 flex items-center`}
                  >
                    <Linkedin className="w-6 h-6 mr-2" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorSupport;