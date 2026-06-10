'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Cog, Award } from 'lucide-react';
import Link from 'next/link';
import { BRAND, TBD, safe } from '@/lib/product-claims';

export default function StorySection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const cells = safe(TBD.cellSupplier);
  const certs = safe(TBD.certifications);

  return (
    <section ref={ref} className="relative bg-[#0A0A0A] py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#888888] mb-4">
            {BRAND.text} · Story
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] mb-8">
            Waarom we {BRAND.product}<br />gebouwd hebben.
          </h1>

          <div className="space-y-5 text-[#A0A0A0] text-lg leading-relaxed mb-12">
            <p>
              {BRAND.text} is begonnen vanuit één frustratie: power banks worden verkocht als wegwerp-accessoire.
              Goedkoop plastic. Misleidende mAh-cijfers. Geen zekerheid hoe lang ze meegaan.
            </p>
            <p>
              {BRAND.product} is het tegenovergestelde. Eén product. Eerlijk gemeten capaciteit. Matte black
              afwerking die niet binnen drie maanden bekrast oogt. Gemaakt om mee te gaan, niet weg te gooien.
            </p>
            <p>
              We zijn pre-launch. Wat hier staat is de eerste batch — beperkt op voorraad omdat we eerst willen
              testen of het werkt zoals beloofd, voordat we opschalen.
            </p>
          </div>

          {/* Manufacturer credentials — alleen tonen als bevestigd */}
          {(cells || (certs && certs.length > 0)) && (
            <div className="border-t border-[#2A2A2A] pt-10 mb-12">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#FF8C00] mb-6">
                Engineering & compliance
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {cells && (
                  <div className="flex items-start gap-3">
                    <Cog className="w-5 h-5 text-[#0EB5C8] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-body text-white font-semibold mb-1">Battery cells</p>
                      <p className="text-[#888888] text-sm">{cells}</p>
                    </div>
                  </div>
                )}
                {certs && certs.length > 0 && (
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-[#EAB308] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-body text-white font-semibold mb-1">Certificeringen</p>
                      <p className="text-[#888888] text-sm">{certs.join(' · ')}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3 sm:col-span-2">
                  <Shield className="w-5 h-5 text-[#4ade80] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-body text-white font-semibold mb-1">2 jaar garantie</p>
                    <p className="text-[#888888] text-sm">
                      Defect onder normale gebruiksomstandigheden? Wij vervangen of repareren.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/shop" className="btn-orange">
              Bekijk {BRAND.product}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
