'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

type SubmitState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success' }
  | { status: 'error'; message: string };

function buildSchema(t: ReturnType<typeof useTranslations<'contact'>>) {
  // Honeypot `website` must stay empty — bots usually fill it.
  return z.object({
    name: z.string().min(1, t('error_name_required')).max(120),
    email: z.string().email(t('error_email_invalid')).max(254),
    subject: z.string().min(1, t('error_subject_required')).max(160),
    message: z.string().min(10, t('error_message_required')).max(4000),
    website: z.string().max(0),
  });
}

type ContactFormValues = z.infer<ReturnType<typeof buildSchema>>;

export default function ContactForm() {
  const t = useTranslations('contact');
  const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle' });

  const schema = buildSchema(t);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', subject: '', message: '', website: '' },
  });

  async function onSubmit(values: ContactFormValues) {
    setSubmitState({ status: 'submitting' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setSubmitState({ status: 'error', message: data.error || t('form_error_generic') });
        return;
      }
      setSubmitState({ status: 'success' });
      reset();
    } catch {
      setSubmitState({ status: 'error', message: t('form_error_generic') });
    }
  }

  if (submitState.status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="border border-emerald-400/30 bg-emerald-400/[0.05] rounded-2xl p-8 text-center"
      >
        <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
        <h3 className="font-display text-2xl text-white mb-2">{t('form_success_title')}</h3>
        <p className="font-body text-[#A0A0A0] leading-relaxed max-w-md mx-auto">
          {t('form_success_body')}
        </p>
      </motion.div>
    );
  }

  const isSubmitting = submitState.status === 'submitting';
  const inputBase =
    'w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 font-body text-white placeholder:text-[#666666] focus:outline-none focus:border-[#FF8C00] focus:bg-white/[0.05] transition-colors';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot: hidden from human users via CSS, visible to bots */}
      <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden>
        <label>
          Website (do not fill)
          <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="contact-name"
            className="block font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#A0A0A0] mb-2"
          >
            {t('form_name_label')}
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            placeholder={t('form_name_placeholder')}
            className={inputBase}
            aria-invalid={!!errors.name}
            {...register('name')}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-[#FCA5A5]">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#A0A0A0] mb-2"
          >
            {t('form_email_label')}
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder={t('form_email_placeholder')}
            className={inputBase}
            aria-invalid={!!errors.email}
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-[#FCA5A5]">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="block font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#A0A0A0] mb-2"
        >
          {t('form_subject_label')}
        </label>
        <input
          id="contact-subject"
          type="text"
          placeholder={t('form_subject_placeholder')}
          className={inputBase}
          aria-invalid={!!errors.subject}
          {...register('subject')}
        />
        {errors.subject && (
          <p className="mt-1.5 text-xs text-[#FCA5A5]">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#A0A0A0] mb-2"
        >
          {t('form_message_label')}
        </label>
        <textarea
          id="contact-message"
          rows={6}
          placeholder={t('form_message_placeholder')}
          className={`${inputBase} resize-y min-h-[140px]`}
          aria-invalid={!!errors.message}
          {...register('message')}
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-[#FCA5A5]">{errors.message.message}</p>
        )}
      </div>

      <AnimatePresence>
        {submitState.status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="border border-red-400/30 bg-red-400/[0.05] rounded-lg px-4 py-3 text-sm text-[#FCA5A5]"
            role="alert"
          >
            {submitState.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-orange disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ padding: '0.85rem 2rem', fontSize: '0.85rem', letterSpacing: '0.08em' }}
        >
          {isSubmitting ? t('form_sending') : t('form_submit')}
        </button>
      </div>
    </form>
  );
}
