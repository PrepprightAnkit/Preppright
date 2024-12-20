import React from 'react';
import { FileEdit, Building2, Brain, Send } from 'lucide-react';

const companies = [
  { name: 'Acuity', logo: '/api/placeholder/120/40' },
  { name: 'KPMG', logo: '/api/placeholder/120/40' },
  { name: 'Kotak', logo: '/api/placeholder/120/40' },
  { name: 'Knight Frank', logo: '/api/placeholder/120/40' },
  { name: 'Aditya Birla', logo: '/api/placeholder/120/40' },
  { name: 'Investeurs', logo: '/api/placeholder/120/40' },
  { name: 'Angel One', logo: '/api/placeholder/120/40' },
  { name: 'Verity', logo: '/api/placeholder/120/40' },
  { name: 'TresVista', logo: '/api/placeholder/120/40' },
  { name: 'Sutherland', logo: '/api/placeholder/120/40' }
];

const testimonials = [
  {
    name: 'Darshan T Patil',
    date: '12-Dec-24',
    course: 'Pre TWSS: CFA Level 1',
    placement: 'Square Analytics - Business Analyst',
    image: '/api/placeholder/150/150',
    testimonial: 'Being a part of Batch 243 at TWSS FMVA Program has been an incredible experience. As a CFA candid...'
  },
  {
    name: 'Pratik Srivastava',
    date: '03-Dec-24',
    course: 'Pre TWSS: B.com',
    placement: 'Daloopa',
    image: '/api/placeholder/150/150',
    testimonial: 'I had a great learning experience at The Wall Street School. With each class I gained more and mo...'
  },
  {
    name: 'Sheenam Shah',
    date: '03-Dec-24',
    course: 'Pre TWSS: CFA Level 1',
    placement: 'Oxane partners as senior analyst',
    image: '/api/placeholder/150/150',
    testimonial: 'It was a wonderful journey with TWSS. Before Twss I was not getting job and they encourage me and...'
  }
];
const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScOFaALLkOnFhOG68XtrikDhuRgKEFJvOu-EXoHiO5ghqFgZg/viewform";


const PlacementPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="bg-red-600 text-white py-3 px-4 flex justify-between items-center">
        <p>Christmas Comes Early at TWSS: 15% Off All Pre-Recorded Courses!</p>
        <div className="flex items-center gap-2">
          <button className="bg-white text-red-600 px-4 py-2 rounded">Enroll Now</button>
        </div>
      </div>

      {/* Companies Section */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Where Our Students Work</h2>
        <p className="text-gray-600 mb-8">The top choice for ambitious students, professionals, and leading organizations.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {companies.map((company, index) => (
            <div key={index} className="flex items-center justify-center">
              <img src={company.logo} alt={company.name} className="h-10 object-contain" />
            </div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            How it <span className="text-teal-600">Works?</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-teal-600 text-white p-8 rounded-lg">
              <Brain className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Rigorous Training</h3>
              <p>Our trainers bring real life, industry specific business scenarios to the classroom through case discussions, bridging the gap between "Theory" and "Practice" to make the candidate Job-ready.</p>
            </div>

            <div className="bg-teal-600 text-white p-8 rounded-lg">
              <FileEdit className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Resume Preparation & Mock Interview</h3>
              <p>We know what the employers look for in a Resume. Professionally crafted resume coupled with "stress" mock interviews brings the candidate a step closer to recruitment</p>
            </div>

            <div className="bg-teal-600 text-white p-8 rounded-lg">
              <Building2 className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Company Shortlisting & Final Selection</h3>
              <p>Based upon the profile and performance of the candidate in the training sessions, we shortlist few companies from our corporate network and arrange interviews with them, after which the final selection takes place</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-center mb-1">{testimonial.name}</h3>
                <p className="text-gray-600 text-center text-sm mb-2">Date: {testimonial.date}</p>
                <p className="text-gray-600 text-center text-sm mb-2">{testimonial.course}</p>
                <p className="text-gray-600 text-center text-sm mb-4">Placement: {testimonial.placement}</p>
                <div className="flex justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                <p className="text-gray-600 text-center">{testimonial.testimonial}</p>
                <button className="text-blue-600 hover:underline mt-2 block mx-auto">Read More</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Contact Information */}
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Let's Connect
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Have a question, suggestion, or just want to say hello? 
              We'd love to hear from you. Fill out our quick contact form 
              and we'll get back to you as soon as possible.
            </p>
            
            {/* Contact Details */}
            <div className="space-y-4 text-gray-700">
              <div className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>support@preppright.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h3m-3-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                <span>+91 9456183297</span>
              </div>
            </div>
          </div>

          {/* Contact Button */}
          <div className="flex justify-center">
            <a 
              href={googleFormUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center 
                         px-8 py-4 text-lg font-medium tracking-tighter 
                         text-white bg-blue-600 rounded-lg 
                         hover:bg-blue-700 transition duration-300 
                         transform hover:-translate-y-1 hover:shadow-xl 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:ring-offset-2"
            >
              <span className="absolute inset-0 bg-blue-700 opacity-50 rounded-lg blur-lg transition-all duration-300 group-hover:opacity-70"></span>
              <span className="relative flex items-center space-x-3">
                <Send className="w-6 h-6 transition-transform group-hover:rotate-6" />
                <span>Submit a Query</span>
              </span>
            </a>
          </div>
        </div>

        {/* Bottom Footer Line */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500">
          © {new Date().getFullYear()} Preppright. All Rights Reserved.
        </div>
      </div>
    </footer>
    </div>
  );
};

export default PlacementPage;