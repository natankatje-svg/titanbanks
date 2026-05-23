'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

const STORAGE_KEY = 'tb-announcement-dismissed';

export default function AnnouncementBar() {
  const t = useTranslations('announcement');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) !== 'true') {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
  };

  return (
    <div className="relative z-[60] bg-[#FF6B00] text-black">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-center gap-3">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-center">
          {t('default')}
        </span>
        <button
          onClick={dismiss}
          aria-label="Sluiten"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
