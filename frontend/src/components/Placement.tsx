import { Brain, Building2, Clock, FileEdit, History, Send, Users } from 'lucide-react';
import React from 'react';

const companies = [
  { name: 'Acuity', logo: 'https://cdn.worldvectorlogo.com/logos/acuity-1.svg' },
  { name: 'KPMG', logo: 'https://cdn.worldvectorlogo.com/logos/kpmg-1.svg' },
  { name: 'Kotak', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwu_TCLGc2BzudlwAZauhhMWslcLloI1LkxQ&s' },
  { name: 'Knight Frank', logo: 'https://cdn.worldvectorlogo.com/logos/knight.svg' },
  { name: 'Aditya Birla', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfJDh-ATuQXGsnDMQkNYXEo1n5ysaTstJJPg&s' },
  { name: 'Verizon', logo: 'data:image/png;base64,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' },
  { name: 'Angel One', logo: 'https://bsmedia.business-standard.com/_media/bs/img/article/2023-07/13/full/1689270035-3662.png?im=FeatureCrop,size=(1200,900)' },
  { name: 'Verity', logo: 'https://cdn.worldvectorlogo.com/logos/verity.svg' },
  { name: 'TresVista', logo: 'data:image/png;base64,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' },
  { name: 'Sutherland', logo: 'https://cdn.worldvectorlogo.com/logos/sutherlands.svg' }
];

const testimonials = [
  {
    name: 'Darshan T Patil',
    date: '12-Dec-24',
    course: 'Pre TWSS: CFA Level 1',
    placement: 'Square Analytics - Business Analyst',
    image: 'https://static.vecteezy.com/system/resources/previews/039/334/804/non_2x/ai-generated-indian-female-student-free-photo.jpg',
    testimonial: 'Being a part of Batch 243 at TWSS FMVA Program has been an incredible experience. As a CFA candid...'
  },
  {
    name: 'Pratik Srivastava',
    date: '03-Dec-24',
    course: 'Pre TWSS: B.com',
    placement: 'Daloopa',
    image: 'https://img.freepik.com/premium-photo/indian-college-boy-happy-smiling-college_437792-723.jpg',
    testimonial: 'I had a great learning experience at The Wall Street School. With each class I gained more and mo...'
  },
  {
    name: 'Sheenam Shah',
    date: '03-Dec-24',
    course: 'Pre TWSS: CFA Level 1',
    placement: 'Oxane partners as senior analyst',
    image: 'https://img.freepik.com/premium-photo/indian-college-boy-happy-smiling-college_437792-725.jpg',
    testimonial: 'It was a wonderful journey with TWSS. Before Twss I was not getting job and they encourage me and...'
  }
];

const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScOFaALLkOnFhOG68XtrikDhuRgKEFJvOu-EXoHiO5ghqFgZg/viewform";

const PlacementPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-500 text-white py-4 px-6 flex justify-between items-center shadow-lg">
        <p className="text-lg font-medium">Christmas Comes Early at TWSS: 15% Off All Pre-Recorded Courses!</p>
        <button className="bg-white text-red-600 px-6 py-2 rounded-full font-semibold hover:bg-red-50 transition-all transform hover:-translate-y-0.5">
          Enroll Now
        </button>
      </div>

      {/* Hero Section */}
      <div className="w-full bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 py-20 px-6">
        <div className="max-w-6xl mx-auto text-white">
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-3 text-blue-100">OUR COMMITMENT</h2>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Placement Assistance Services (PAS)</h1>
            <p className="text-2xl font-medium mb-4">Leading the Way in <span className="text-yellow-300 font-semibold">Practical Financial Education</span></p>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">100% Placement assistance and access to our corporate network on all the candidates successfully completing our workshop</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
            {[
              { icon: Users, count: '46,693', label: 'Students Trained' },
              { icon: Building2, count: '10,740', label: 'Placements' },
              { icon: Clock, count: '253,820+', label: 'Hours of Training' },
              { icon: History, count: '14+', label: 'Years of Operations' }
            ].map((stat, index) => (
              <div key={index} className="text-center transform hover:-translate-y-2 transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-10 h-10 text-blue-100" />
                </div>
                <h3 className="text-4xl font-bold mb-2">{stat.count}</h3>
                <p className="text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button className="bg-yellow-400 text-gray-800 px-10 py-4 rounded-full text-lg font-semibold hover:bg-yellow-300 transition-all transform hover:-translate-y-1 hover:shadow-xl">
              View Live Placements
            </button>
          </div>
        </div>
      </div>

      {/* Companies Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Where Our Students Work</h2>
          <p className="text-xl text-gray-600 text-center mb-12">The top choice for ambitious students, professionals, and leading organizations.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
            {companies.map((company, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center h-24 transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-48 h-16 relative">
                  <img 
                    src={company.logo} 
                    alt={company.name} 
                    className="absolute inset-0 w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center text-gray-800">
            How it <span className="text-blue-600">Works?</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'Rigorous Training',
                description: 'Our trainers bring real life, industry specific business scenarios to the classroom through case discussions, bridging the gap between "Theory" and "Practice" to make the candidate Job-ready.'
              },
              {
                icon: FileEdit,
                title: 'Resume Preparation & Mock Interview',
                description: 'We know what the employers look for in a Resume. Professionally crafted resume coupled with "stress" mock interviews brings the candidate a step closer to recruitment'
              },
              {
                icon: Building2,
                title: 'Company Shortlisting & Final Selection',
                description: 'Based upon the profile and performance of the candidate in the training sessions, we shortlist few companies from our corporate network and arrange interviews with them, after which the final selection takes place'
              }
            ].map((step, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-blue-600 text-white p-4 rounded-xl inline-block mb-6">
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-blue-100"
                />
                <h3 className="text-xl font-semibold text-center mb-2 text-gray-800">{testimonial.name}</h3>
                <p className="text-blue-600 text-center text-sm mb-2">{testimonial.date}</p>
                <p className="text-gray-600 text-center text-sm mb-2">{testimonial.course}</p>
                <p className="text-gray-800 font-medium text-center text-sm mb-6">Placement: {testimonial.placement}</p>
                <div className="flex justify-center mb-6">
                  <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                <p className="text-gray-600 text-center leading-relaxed">{testimonial.testimonial}</p>
                <button className="text-blue-600 hover:text-blue-700 font-medium hover:underline mt-4 block mx-auto transition-colors">
                  Read More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Let's Connect
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Have a question, suggestion, or just want to say hello? 
                We'd love to hear from you. Fill out our quick contact form 
                and we'll get back to you as soon as possible.
              </p>
              
              <div className="space-y-6 text-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-lg">support@preppright.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h3m-3-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <span className="text-lg">+91 9456183297</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <a 
                href={googleFormUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-medium tracking-tight text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span className="absolute inset-0 bg-blue-700 opacity-50 rounded-full blur-lg transition-all duration-300 group-hover:opacity-70"></span>
                <span className="relative flex items-center space-x-3">
                  <Send className="w-6 h-6 transition-transform group-hover:rotate-6" />
                  <span>Submit a Query</span>
                </span>
              </a></div>
          </div>

          <div className="mt-20 pt-8 border-t border-gray-200">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About Us</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Courses</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Success Stories</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Blog</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Programs</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">FMVA Program</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">CFA Training</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">FRM Program</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Financial Modeling</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Support</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Help Center</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact Us</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-blue-100 p-3 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-blue-100 p-3 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-blue-100 p-3 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-blue-100 p-3 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="text-center text-gray-500 text-sm pt-8 border-t border-gray-200">
              <p>© {new Date().getFullYear()} Preppright. All Rights Reserved.</p>
              <p className="mt-2">Designed with ❤️ for aspiring finance professionals</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PlacementPage;