'use client';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from '../src/locales/en/translation.json';
import translationFR from '../src/locales/fr/translation.json';

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      fr: {
        translation: translationFR,
      },
    },
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next; 