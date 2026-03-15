import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

function TermsOfService() {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col bg-[var(--background)]">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[var(--border)] bg-[var(--surface)] px-4 py-3">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="h-10 w-10 p-0">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold text-[var(--text-primary)]">Terms of Service</h1>
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
            <h2 className="text-base font-semibold text-[var(--text-primary)]">1. Acceptance of Terms</h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              By accessing or using the ZipRide application ("Service"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our Service. These terms apply to all users, including riders and drivers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">2. Description of Service</h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              ZipRide provides a technology platform that connects riders with transportation providers. We are not a transportation carrier. The actual transportation services are provided by independent third-party drivers who are not employed by ZipRide.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">3. User Accounts</h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              To use the Service, you must register for an account. You agree to provide accurate, current, and complete information during registration and keep your account information up to date. You are responsible for safeguarding your account credentials and for all activities that occur under your account.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">4. Rides and Payments</h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              When you request a ride, ZipRide will display an estimated fare based on the route, distance, and current demand. The final fare may vary from the estimate based on actual conditions such as traffic, route changes, or waiting time. You agree to pay all charges incurred for rides completed through the Service. Payment methods include UPI, credit/debit cards, wallet balance, and cash.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">5. Cancellations and Refunds</h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              You may cancel a ride before the driver arrives. Cancellation fees may apply if the driver has already been dispatched. Refunds for cancellations or service issues will be reviewed on a case-by-case basis and credited to your ZipRide wallet or original payment method.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">6. User Conduct</h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              You agree not to use the Service for any unlawful purpose, harass or threaten drivers or other users, damage or vandalise vehicles, or engage in fraudulent activity. ZipRide reserves the right to suspend or terminate accounts that violate these terms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">7. Safety</h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              ZipRide is committed to safety. All drivers undergo background verification. In-app safety features include ride sharing with contacts, an SOS button for emergencies, and real-time tracking. However, ZipRide does not guarantee the safety of any ride and users should exercise their own judgement.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">8. Intellectual Property</h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              All content, trademarks, logos, and intellectual property displayed on the Service are the property of ZipRide or its licensors. You may not reproduce, distribute, or create derivative works from any content without prior written permission.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">9. Limitation of Liability</h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              To the maximum extent permitted by law, ZipRide shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Service. Our total liability shall not exceed the amount paid by you for rides in the preceding 12 months.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">10. Modifications to Terms</h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              ZipRide reserves the right to modify these terms at any time. We will notify users of material changes via the app or email. Your continued use of the Service after changes constitutes acceptance of the revised terms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">11. Governing Law</h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in Kolkata, West Bengal.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">12. Contact Us</h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              If you have any questions about these Terms of Service, please contact us at support@zipride.in.
            </p>
          </section>

          <div className="pb-8" />
        </motion.div>
      </ScrollArea>
    </div>
  );
}

export default TermsOfService;
