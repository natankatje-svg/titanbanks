import Image from 'next/image';

const links = {
  Product: ['Functies', 'Vergelijking', 'Specificaties', 'Reviews'],
  Bedrijf: ['Over TitanBanks', 'Contact', 'Pers & Media'],
  Support: ['FAQ', 'Garantie', 'Retourneren', 'Verzending'],
  Juridisch: ['Privacybeleid', 'Algemene voorwaarden', 'Cookiebeleid'],
};

function FooterLogo() {
  return (
    <Image
      src="/branding/logo-white-tight.png"
      alt="TitanBanks"
      width={1746}
      height={320}
      className="h-8 w-auto block"
    />
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-[#080808] border-t border-white/[0.05]">
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#FF8C00]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-5">
              <FooterLogo />
            </div>
            <p className="font-body text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
              Premium powerbanks gebouwd voor mensen die meer willen. Nooit meer zonder stroom.
            </p>
            <div className="flex gap-3">
              {['IG', 'TT', 'YT'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-gray-600 hover:text-white hover:border-white/20 transition-all duration-200 text-xs font-bold"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-mono-titan text-white/60 text-xs uppercase tracking-widest mb-4">{category}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="font-body text-gray-600 hover:text-gray-300 text-sm transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.05] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
            <p className="text-gray-700 text-sm">
              © {new Date().getFullYear()} TitanBanks. Alle rechten voorbehouden.
            </p>
            <span className="hidden sm:block w-px h-3.5 bg-white/[0.07]" />
            <p className="font-mono-titan text-gray-700 text-[0.6rem] uppercase tracking-widest">
              KvK: <span className="text-gray-600">[KVK_NUMMER]</span>
              <span className="mx-2 opacity-40">·</span>
              <span className="text-gray-600">[VESTIGINGSADRES]</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-gray-700 text-xs">Veilig betalen · iDEAL · Visa · Mastercard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
