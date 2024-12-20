import {
    BookOpen as Book,
    BookOpen,
    Calculator,
    Cloud,
    Code,
    Cpu,
    DollarSign,
    FileCode,
    Globe,
    Laptop,
    Lightbulb,
    Link2,
    MessageSquare,
    Network,
    Target,
    TrendingUp
} from 'lucide-react';
import React from 'react';

const LabCard = ({ icon: Icon, title }) => (
  <div className="bg-white p-4 rounded-lg flex items-center gap-3 hover:shadow-lg transition-shadow cursor-pointer">
    <Icon className="w-6 h-6 text-indigo-600" />
    <span className="font-medium text-black">{title}</span>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col gap-3">
    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
      <Icon className="w-6 h-6 text-indigo-600" />
    </div>
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Techlab = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">
            Why Must You Choose <span className="text-indigo-600">uCertify</span> As
            <br />Your Training Partner?
          </h1>
          <p className="text-center text-gray-600 mb-16">
            We're your one-stop shop for building in-demand IT skills and achieving real-world job readiness.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-gray-100 p-4 rounded-lg inline-block mb-4">
                <TrendingUp className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Practical Application</h3>
              <p className="text-gray-600">We immerse you in realistic, scenario-based simulations that mirror real-world IT tasks for targeted practice and rapid skill development.</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-100 p-4 rounded-lg inline-block mb-4">
                <Target className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Improved Accessibility</h3>
              <p className="text-gray-600">Our unique approach centers on outcome-based scenarios, all accessible through a basic web browser or our mobile app.</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-100 p-4 rounded-lg inline-block mb-4">
                <DollarSign className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cost-Effective Solution</h3>
              <p className="text-gray-600">No more budget blowouts! Our virtual hands-on labs are a cost-effective alternative to expensive physical labs.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 bg-white p-8 rounded-lg">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                <span className="text-indigo-600">Hands-On Live</span> Training
                <br />with the Most Trusted
                <br />Lab Provider
              </h2>
            </div>
            <div className="bg-indigo-950 text-white p-8 rounded-lg">
              <div className="space-y-6">
                <div>
                  <span className="text-4xl font-bold text-indigo-600">1000+</span>
                  <p className="text-white-600">Hands-On Courses</p>
                </div>
                <div>
                  <span className="text-4xl font-bold text-indigo-600">3M+</span>
                  <p className="text-white-600">Happy Customers</p>
                </div>
                <div>
                  <span className="text-4xl font-bold text-indigo-600">50+</span>
                  <p className="text-white-600">Countries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lesson Plan Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img 
              src="/api/placeholder/600/400" 
              alt="Team collaboration" 
              className="rounded-lg"
            />
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Adaptable to Any <span className="text-indigo-600">Lesson Plan</span>
              </h2>
              <p className="text-gray-600 mb-6">
                uCertify LABS can be mapped to any course, textbook, or training program to provide a "hands-on" learning experience. The objective of these simulated environments is to improve comprehension and retention by adding a practical element.
              </p>
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
                Find Lab-Rich Courses
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Labs Section */}
      <section className="bg-navy-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-4">
            Types of <span className="text-indigo-700">uCertify Labs</span> You Can Benefit From
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Recognize and correct your mistakes with our uCertify Labs to reduce errors reoccurring while on the job.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <LabCard icon={Lightbulb} title="LiveLAB" />
            <LabCard icon={Cloud} title="CloudLAB" />
            <LabCard icon={Globe} title="CyberRange" />
            <LabCard icon={Code} title="CodeLAB" />
            <LabCard icon={Cpu} title="HardwareSIM" />
            <LabCard icon={Network} title="SoftwareSIM" />
            <LabCard icon={FileCode} title="ScenarioSIM" />
            <LabCard icon={Calculator} title="MathsLAB" />
            <LabCard icon={MessageSquare} title="SmartChat" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Safe Place to <span className="text-indigo-600">Build Strong IT</span> Skills
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Get ready for real-world challenges with our hands-on labs that simulate actual job tasks.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Laptop}
              title="Real-World Simulations"
              description="Flexibility to explore and train in a live, non-production environment that mimics real-world scenarios."
            />
            <FeatureCard
              icon={Cloud}
              title="No Installations Required"
              description="Experiment with software/hardware without spending money on product licenses, maintenance, and configuration."
            />
            <FeatureCard
              icon={Book}
              title="Guided Learning"
              description="Achieve each lab's target with a step-by-step guided experience that is aligned perfectly with your lesson objectives."
            />
            <FeatureCard
              icon={Link2}
              title="Easy Integration"
              description="A cloud-based, device-enabled solution that can easily be integrated with an LMS and is accessible through a single sign-on (SSO)."
            />
            <FeatureCard
              icon={Network}
              title="Deep Linking"
              description="Go directly from your LMS to the exact section you need within an educational resource, like assessment, video, or lab."
            />
            <FeatureCard
              icon={BookOpen}
              title="Gradebook Syncing"
              description="Save valuable time by automating grade transfer into your LMS for a consolidated view—no more fragmented reports."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Techlab;