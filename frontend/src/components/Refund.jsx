import { CheckCircle } from 'lucide-react';
import theme from './theme';  // Ensure your theme.js is correctly imported

const RefundPolicy = () => {
  return (
    <section className={`bg-${theme.colors.gray[50]} ${theme.spacing.section}`}>
      <div className={`${theme.spacing.container} max-w-3xl mx-auto`}>
        <header className="text-center mb-12">
          <h1 className={`${theme.typography.hero} ${theme.typography.gradient}`}>
          REFUND POLICY
          </h1>
          <h2 className={`${theme.typography.subheading} text-gray-800`}>
            PreppRight
          </h2>
        </header>
        
          <section className="mt-6">
          
            
            <h4 className="text-lg font-semibold text-gray-800 mt-4">1. Interpretation and Definitions</h4>
            <p><strong>Interpretation:</strong> Words with capitalized initials have specific meanings as defined below. The definitions apply in singular and plural forms.</p>
            
            <h4 className="text-lg font-semibold text-gray-800 mt-4">2. Definitions</h4>
            <ul className="list-inside list-disc space-y-3 mt-4 text-gray-600">
              <li><strong>Company:</strong> Refers to PreppRight.</li>
              <li><strong>Goods:</strong> Items offered for sale on the service.</li>
              <li><strong>Orders:</strong> A request by you to purchase goods from us.</li>
              <li><strong>Service:</strong> Refers to the website.</li>
              <li><strong>Website:</strong> Refers to PreppRight, accessible from <a href="https://www.preppright.com/" className="text-blue-500 underline">www.preppright.com</a></li>
              <li><strong>You:</strong> The individual using the service.</li>
            </ul>
            
            <h4 className="text-lg font-semibold text-gray-800 mt-4">3. Your Order Cancellation Rights</h4>
            <p>You may cancel your order within 7 days without providing a reason. The deadline for cancellation is 7 days from the date of purchase.</p>
            <p>To cancel, inform us by email: <a href="mailto:support@preppright.com" className="text-blue-500 underline">support@preppright.com</a></p>
            <p>We will refund you within 14 days using the same payment method you used for the purchase.</p>
            
            <h4 className="text-lg font-semibold text-gray-800 mt-4">4. Conditions for Refund from User’s End</h4>
            <p>To be eligible for a refund, the course must have been purchased within the last 7 days. We reserve the right to refuse refunds if the conditions are not met.</p>
            <p>Email your purchase receipt to: <a href="mailto:support@preppright.com" className="text-blue-500 underline">support@preppright.com</a></p>
            
            <h4 className="text-lg font-semibold text-gray-800 mt-4">5. Conditions for Refund from Our End</h4>
            <p>PreppRight reserves the right to postpone/cancel training due to insufficient enrollments, unavailability of slots, or mentors. In such cases, a full refund will be issued.</p>
            
            <h4 className="text-lg font-semibold text-gray-800 mt-4">6. Contact Us</h4>
            <p>If you have any questions, contact us via email: <a href="mailto:support@preppright.com" className="text-blue-500 underline">support@preppright.com</a></p>
          </section>
        </div>

        <div className="text-center mt-12">
          <CheckCircle className={`text-${theme.colors.success.main} text-9xl`} />
          <p className="text-lg text-gray-600 mt-4">Thank you for reading our Privacy Policy.</p>
        </div>
      
    </section>
  );
};

export default RefundPolicy;
