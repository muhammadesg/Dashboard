import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import uzTranslation from './locales/uz.json'; // Переводы на узбекском языке
import ruTranslation from './locales/ru.json'; // Переводы на русском языке
import enTranslation from './locales/en.json';

const lang = localStorage.getItem('lang');

i18n
    .use(initReactI18next)
    .init({
        resources: {
            uz: { translation: uzTranslation }, // Указываем правильный импорт для узбекского
            ru: { translation: ruTranslation },
            en: { translation: enTranslation },
        },
        lng: lang,
        fallbackLng: lang,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;