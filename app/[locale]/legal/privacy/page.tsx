import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'Privacy | TITANBANKS',
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <main className="relative bg-black min-h-screen text-white">
      <Navigation mode="teaser" />
      <section className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <div className="section-label mb-4 flex items-center gap-3">
          <div className="w-6 h-px bg-[#FF6B00]" />
          <span>Privacy</span>
        </div>
        <h1
          className="font-display uppercase text-white mb-8"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', lineHeight: 0.92 }}
        >
          Privacy
        </h1>
        <div className="font-body text-gray-300 text-base lg:text-lg leading-relaxed space-y-5">
          <p>
            TitanBanks is a trade name of NamaCorp VOF, established in the Netherlands. We collect email
            addresses through the waitlist form on titan-banks.com for the sole purpose of notifying you about
            the launch of the Titan X power bank.
          </p>
          <p>
            We do not share your email with third parties. You can unsubscribe with one click from any email we
            send you, or request deletion of your data at any time via{' '}
            <a href="mailto:hello@titan-banks.com" className="underline hover:text-white">
              hello@titan-banks.com
            </a>
            .
          </p>
          <p>
            For details on your rights under the GDPR (AVG), see the Dutch Data Protection Authority at{' '}
            <a href="https://autoriteitpersoonsgegevens.nl" className="underline hover:text-white" rel="noreferrer noopener" target="_blank">
              autoriteitpersoonsgegevens.nl
            </a>
            .
          </p>
          <p className="text-gray-500 text-sm pt-6">
            This is a placeholder. A complete NL-conforming privacy statement will be published before public launch.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
