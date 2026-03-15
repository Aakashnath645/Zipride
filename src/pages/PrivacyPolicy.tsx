import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col bg-[var(--background)]">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[var(--border)] bg-[var(--surface)] px-4 py-3">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="h-10 w-10 p-0">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold text-[var(--text-primary)]">Privacy Policy</h1>
      </div>

      <ScrollArea className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mx-auto max-w-2xl px-5 py-6 space-y-6"
        >
          <p className="text-xs text-[var(--text-muted)]">Last updated: March 15, 2026</p>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">1. Information We Collect</h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              We collect information you provide directly, such as your name, email address, phone number, and payment details when you create an account or use our services. We also collect location data when you use the ZipRide app to provide ride-hailing services, optimise routes, and ensure your safety during trips.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">2. How We Use Your Information</h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              Your information is used to provide and improve our services, including matching you with drivers, processing payments, calculating fares, providing customer support, and sending service-related notifications. We may also use your data to personalise your experience, detect fraud, and ensure the safety of our platform.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">3. Location Data</h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              ZipRide collects precise location data from your device when the app is in use. This data is essential for core features such as detecting your pickup location, tracking rides in real time, estimating arrival times, and calculating fares. You can disable location access through your device settings, but this will limit the app's functionality.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">4. Data Sharing</h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              We share your information with drivers to facilitate rides (e.g., your name and pickup location). We may also share data with payment processors to complete transactions, law enforcement when required by law, and service providers who assist with our operations. We do not sell your personal information to third parties for marketing purposes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">5. Data Storage and Security</h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              Your data is stored securely using industry-standard encryption and security practices. We retain your data for as long as your account is active or as needed to provide services. Some data may be retained longer for legal compliance, dispute resolution, or fraud prevention.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">6. Cookies and Analytics</h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              We use cookies and similar technologies to maintain session state, remember your preferences, and analyse app usage. This helps us improve performance and user experience. You can manage cookie preferences through your browser settings.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">7. Your Rights</h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              You have the right to access, update, or delete your personal information at any time through the app's profile settings. You may also request a copy of your data or ask us to restrict processing. To exercise these rights or for any privacy-related queries, contact us at privacy@zipride.in.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">8. Children's Privacy</h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              ZipRide is not intended for users under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal data, we will take steps to delete such information.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">9. Third-Party Services</h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              Our app integrates with third-party services such as map providers (OpenStreetMap), payment gateways, and analytics tools. These services have their own privacy policies, and we encourage you to review them. ZipRide is not responsible for the privacy practices of third-party services.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">10. Changes to This Policy</h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              We may update this Privacy Policy from time to time. We will notify you of significant changes through in-app notifications or email. The "Last updated" date at the top indicates the most recent revision. Your continued use of ZipRide after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">11. Contact Us</h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              For any questions or concerns about this Privacy Policy, please contact our Data Protection Officer at privacy@zipride.in or write to us at ZipRide Technologies, Kolkata, West Bengal, India.
            </p>
          </section>

          <div className="pb-8" />
        </motion.div>
      </ScrollArea>
    </div>
  );
}

export default PrivacyPolicy;
