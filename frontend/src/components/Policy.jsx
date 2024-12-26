import { CheckCircle } from 'lucide-react';
import theme from './theme';  // Ensure your theme.js is correctly imported

const PrivacyPolicy = () => {
  return (
    <section className={`bg-${theme.colors.gray[50]} ${theme.spacing.section}`}>
      <div className={`${theme.spacing.container} max-w-3xl mx-auto`}>
        <header className="text-center mb-12">
          <h1 className={`${theme.typography.hero} ${theme.typography.gradient}`}>
            PRIVACY POLICY
          </h1>
          <h2 className={`${theme.typography.subheading} text-gray-800`}>
            PreppRight
          </h2>
        </header>
        
        <div className="text-lg text-gray-600 leading-relaxed space-y-6">
          <p>
            PreppRight is committed to ensuring the privacy and protection of your information. This Privacy Policy outlines how we collect, use, and disclose information about you while you use our services. This policy complies with the Information Technology (Reasonable security practices and procedures and sensitive personal data or information) Rules, 2011.
          </p>
          <p>
            By using PreppRight, you agree to the terms of this Privacy Policy. If you have any queries or concerns regarding this policy, please contact our Customer Support Desk.
          </p>

          <section className="mt-6">
            <h3 className={`${theme.typography.heading} text-gray-800`}>
              1. DEFINITIONS
            </h3>
            <ul className="list-inside list-disc space-y-3 mt-4 text-gray-600">
              <li><strong>“We”, “Our”, and “Us”</strong> refer to PreppRight.</li>
              <li><strong>“You”, “Your”, “User”</strong> refer to individuals who use our services, including students, educators, and general users.</li>
              <li><strong>“Application”</strong> refers to PreppRight and all related services.</li>
              <li><strong>“Personal Information”</strong> refers to any information that can be used to identify you personally.</li>
              <li><strong>“Third Parties”</strong> refer to any application, website, company, or individual apart from the User and PreppRight.</li>
            </ul>
          </section>

          <section className="mt-6">
            <h3 className={`${theme.typography.heading} text-gray-800`}>
              2. OVERVIEW
            </h3>
            <p className="text-gray-600 mt-4">
              To use the services of PreppRight, you are required to register and verify your account. This Privacy Policy applies to the information we collect and receive through our platform. It does not apply to practices of businesses we do not own or control, or people we do not employ.
            </p>
          </section>

          <section className="mt-6">
            <h3 className={`${theme.typography.heading} text-gray-800`}>
              3. INFORMATION COLLECTED
            </h3>
            <ul className="list-inside list-disc space-y-3 mt-4 text-gray-600">
              <li><strong>Personal Data:</strong> such as your name, age, date of birth, occupation, and gender.</li>
              <li><strong>Contact Information:</strong> including your email, phone number, and GPS-based location.</li>
              <li><strong>Tracking Information:</strong> such as your device ID, Google Advertising ID, and Android ID.</li>
              <li><strong>Data Sent Through the Application:</strong> including any information you provide while using PreppRight.</li>
            </ul>
          </section>

          <section className="mt-6">
            <h3 className={`${theme.typography.heading} text-gray-800`}>
              4. EXTERNAL LINKS ON THE APPLICATION
            </h3>
            <p className="text-gray-600 mt-4">
              PreppRight may include advertisements, offers from partners, and links to external websites or applications. We do not control these external links and are not responsible for the collection or disclosure of your personal information by them. We recommend reviewing the privacy policies of any external sites you visit.
            </p>
          </section>

          <section className="mt-6">
            <h3 className={`${theme.typography.heading} text-gray-800`}>
              5. OUR USE OF YOUR INFORMATION
            </h3>
            <p className="text-gray-600 mt-4">
              The information you provide will be used to contact you when necessary, enhance your experience on PreppRight, and comply with legal requirements. We may release your information to third parties to comply with legal processes, prevent harm, or in the event of a merger or acquisition.
            </p>
          </section>

          <section className="mt-6">
            <h3 className={`${theme.typography.heading} text-gray-800`}>
              6. DISCLOSURE OF YOUR INFORMATION TO THIRD PARTIES
            </h3>
            <p className="text-gray-600 mt-4">
              We may share your personal information with third parties to provide better services and enhance the visibility of PreppRight. However, we do not sell or rent your personal information to third parties. We may disclose your information to law enforcement or other government officials as necessary.
            </p>
          </section>

          <section className="mt-6">
            <h3 className={`${theme.typography.heading} text-gray-800`}>
              7. WEBSITE TERMS
            </h3>
            <p className="text-gray-600 mt-4">
              By using PreppRight, you agree to be bound by our Terms of Use, Privacy Policy, and other policies as set forth on our website. These terms and policies are coterminous with the terms of this Privacy Policy.
            </p>
          </section>
        </div>

        <div className="text-center mt-12">
          <CheckCircle className={`text-${theme.colors.success.main} text-9xl`} />
          <p className="text-lg text-gray-600 mt-4">Thank you for reading our Privacy Policy.</p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
