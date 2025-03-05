import { Phone, Send } from 'lucide-react';
import React from "react";
import { Link } from "react-router-dom";
import theme from './theme';
export default function Footer () {
    const googleFormUrl = "https://forms.gle/DMx8f1irRLF9vZM29";
  
    return (
      <footer className="bg-gradient-to-br from-gray-50 to-gray-100 py-16" id='contact'>
        <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className={`text-4xl font-bold text-${theme.colors.primary.main} mb-6`}>
              Let's Connect
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Have a question or suggestion? We'd love to hear from you. 
              Fill out our quick contact form and we'll get back to you promptly.
            </p>
            
            <div className="space-y-4 text-gray-700">
              <div className="flex items-center space-x-3">
                <Send className={`h-6 w-6 text-${theme.colors.primary.main}`} />
                <span>support@preppright.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className={`h-6 w-6 text-${theme.colors.primary.main}`} />
                <span>+91 9456183297</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <a 
              href={googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative inline-flex items-center justify-center 
                       px-8 py-4 text-lg font-medium tracking-tighter 
                       text-white bg-gradient-to-r ${theme.colors.primary.gradient}
                       rounded-lg transition duration-300 
                       transform hover:-translate-y-1 hover:shadow-xl 
                       focus:outline-none focus:ring-2 focus:ring-${theme.colors.primary.main} 
                       focus:ring-offset-2`}
            >
              <span className="absolute inset-0 bg-indigo-700 opacity-50 rounded-lg blur-lg transition-all duration-300 group-hover:opacity-70"></span>
              <span className="relative flex items-center space-x-3">
                <Send className="w-6 h-6 transition-transform group-hover:rotate-6" />
                <span>Submit a Query</span>
              </span>
            </a>
          </div>
        </div>

  
          {/* Bottom Footer Line */}
          <div className="mt-20 pt-8 border-t border-gray-200">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
                <ul className="space-y-3">
                <li><Link to="/about" className='text-gray-600 hover:text-blue-600 transition-colors'>About us</Link></li>
                <li><Link to="/allCourses#courses" className='text-gray-600 hover:text-blue-600 transition-colors'>Courses</Link></li>
                <li><Link to="/placements" className='text-gray-600 hover:text-blue-600 transition-colors'>Placement Program</Link></li>
                <li><Link to="/quiz" className='text-gray-600 hover:text-blue-600 transition-colors'>Quiz</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Programs</h3>
              <ul className="space-y-3">
                <li><Link to="/placements" className='text-gray-600 hover:text-blue-600 transition-colors'>Placement program</Link></li>
                <li><Link to="/createQuiz" className='text-gray-600 hover:text-blue-600 transition-colors'>Create Quiz</Link></li>
                <li><Link to="/takeQuiz" className='text-gray-600 hover:text-blue-600 transition-colors'>Take Quiz</Link></li>
                <li><Link to="/uploadCourse" className='text-gray-600 hover:text-blue-600 transition-colors'>Upload Course</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Support</h3>
              <ul className="space-y-3">
                <li><a href="/terms" className="text-gray-600 hover:text-indigo-600 transition-colors">Terms and conditions</a></li>
                <li><Link to="/privacypolicy" className='text-gray-600 hover:text-blue-600 transition-colors'>Privacy Policy</Link></li>
                <li><Link to="/refundpolicy" className='text-gray-600 hover:text-blue-600 transition-colors'>Refund Policy</Link></li>
                <li><a href="#contact" className="text-gray-600 hover:text-indigo-600 transition-colors">Contact Us</a></li>
              </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                <a href="https://www.youtube.com/@PreppRight" className="bg-indigo-100 p-3 rounded-full text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186c-.273-1.03-1.078-1.836-2.113-2.112C19.585 3.5 12 3.5 12 3.5s-7.585 0-9.385.574c-1.035.276-1.84 1.081-2.113 2.112C.5 7.993.5 12 .5 12s0 4.007.502 5.814c.273 1.03 1.078 1.836 2.113 2.112C4.415 20.5 12 20.5 12 20.5s7.585 0 9.385-.574c1.035-.276 1.84-1.081 2.113-2.112.502-1.807.502-5.814.502-5.814s0-4.007-.502-5.814zM9.749 15.02v-6.04L15.25 12l-5.501 3.02z"/>
                  </svg>
                </a>
                  <a href="#" className="bg-indigo-100 p-3 rounded-full text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/company/101203728/admin/dashboard/" className="bg-indigo-100 p-3 rounded-full text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/careercrafter360?igsh=MXdvNml1N205M2x3YQ==" className="bg-indigo-100 p-3 rounded-full text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="text-center text-gray-500 text-sm pt-8 border-t border-gray-200">
              <p>© {new Date().getFullYear()} PreppRight. All Rights Reserved.</p>
              
            </div>
          </div>
        </div>
      </footer>
    );
  };