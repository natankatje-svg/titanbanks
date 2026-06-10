/**
 * Centrale bron voor externe merk-links en contactgegevens.
 * Footer, JsonLd (sameAs/contactPoint) en contact-/supportpagina's
 * gebruiken allemaal déze constanten — nooit hardcoden in componenten.
 */
export const SOCIALS = {
  instagram: 'https://www.instagram.com/thetitanbanks',
  facebook: 'https://www.facebook.com/thetitanbanks',
} as const;

export const CONTACT_EMAIL = 'info@titan-banks.com';
