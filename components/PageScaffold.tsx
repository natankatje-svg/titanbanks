import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface PageScaffoldProps {
  title: string;
  intro?: string;
  children?: React.ReactNode;
}

export default function PageScaffold({ title, intro, children }: PageScaffoldProps) {
  return (
    <main className="relative min-h-screen bg-[#0A0A0A] text-[#F5F5F5] overflow-x-hidden">
      <Navigation />
      <section className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#888888] mb-6">
          TITANBANKS · Titan X
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-8">
          {title}
        </h1>
        {intro && (
          <p className="text-lg md:text-xl text-[#A0A0A0] max-w-2xl mb-12 leading-relaxed">
            {intro}
          </p>
        )}
        {children ?? (
          <div className="border border-[#2A2A2A] rounded-lg p-8 bg-[#1A1A1A]/40">
            <p className="font-mono text-xs uppercase tracking-widest text-[#FF6B00] mb-3">
              In ontwikkeling
            </p>
            <p className="text-[#A0A0A0]">
              Deze pagina wordt momenteel gebouwd. Bekijk de{' '}
              <Link href="/preview" className="text-[#FF6B00] underline underline-offset-4">
                interne preview
              </Link>{' '}
              voor de volledige inhoud, of ga naar de{' '}
              <Link href="/" className="text-[#FF6B00] underline underline-offset-4">
                homepage
              </Link>
              .
            </p>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
