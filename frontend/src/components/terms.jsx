import { CheckCircle } from 'lucide-react';
import theme from './theme';  // Ensure your theme.js is correctly imported

const Terms = () => {
  return (
    <section className={`bg-${theme.colors.gray[50]} ${theme.spacing.section}`}>
      <div className={`${theme.spacing.container} max-w-3xl mx-auto`}>
        <header className="text-center mb-12">
          <h1 className={`${theme.typography.hero} ${theme.typography.gradient}`}>
            Terms of Service
          </h1>
          <h2 className={`${theme.typography.subheading} text-gray-800`}>
            PreppRight
          </h2>
        </header>
        
        <div className="text-lg text-gray-600 leading-relaxed space-y-6">
          <p>
            Welcome to PreppRight. By accessing or using our platform, you agree to these Terms of Service which govern your use of our services.
          </p>

          <section className="mt-6">
            <h3 className={`${theme.typography.heading} text-gray-800`}>
              1. Acceptance of Terms
            </h3>
            <p className="text-gray-600 mt-4">
              By creating an account or using PreppRight, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </section>

          <section className="mt-6">
            <h3 className={`${theme.typography.heading} text-gray-800`}>
              2. User Rights and Responsibilities
            </h3>
            <ul className="list-inside list-disc space-y-3 mt-4 text-gray-600">
              <li>You must provide accurate and current information</li>
              <li>You are responsible for maintaining the confidentiality of your account</li>
              <li>You agree to use the platform for lawful purposes only</li>
            </ul>
          </section>

          <section className="mt-6">
            <h3 className={`${theme.typography.heading} text-gray-800`}>
              3. Intellectual Property
            </h3>
            <p className="text-gray-600 mt-4">
              All content on PreppRight, including text, graphics, logos, and software, is the property of PreppRight and protected by intellectual property laws.
            </p>
          </section>

          <section className="mt-6">
            <h3 className={`${theme.typography.heading} text-gray-800`}>
              4. Limitation of Liability
            </h3>
            <p className="text-gray-600 mt-4">
              PreppRight is not liable for any direct, indirect, incidental, or consequential damages arising from your use of our platform.
            </p>
          </section>

          <section className="mt-6">
            <h3 className={`${theme.typography.heading} text-gray-800`}>
              5. Refund Policy
            </h3>
            <p className="text-gray-600 mt-4">
              Refunds are available within 7 days of purchase. To request a refund, contact support@preppright.com with your purchase receipt.
            </p>
          </section>
        </div>

        <div className="text-center mt-12">
          <CheckCircle className={`text-${theme.colors.success.main} text-9xl`} />
          <p className="text-lg text-gray-600 mt-4">Thank you for choosing PreppRight.</p>
        </div>
      </div>
    </section>
  );
};

export default Terms;