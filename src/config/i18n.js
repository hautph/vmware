import i18next from 'i18next';
import i18nextHttpMiddleware from 'i18next-http-middleware';
import Backend from 'i18next-fs-backend';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

i18next
  .use(i18nextHttpMiddleware.LanguageDetector)
  .use(Backend)
  .init({
    backend: {
      loadPath: path.join(__dirname, '../locales/{{lng}}/{{ns}}.json'),
    },
    fallbackLng: 'en',
    preload: ['en', 'vi'],
    ns: ['translation'],
    defaultNS: 'translation',
    supportedLngs: ['en', 'vi'],
    nonExplicitSupportedLngs: true,
    detection: {
      // order and from where user language should be detected
      order: ['querystring', 'cookie', 'header'],
      
      // keys or params to lookup language from
      lookupQuerystring: 'lang',
      lookupCookie: 'lang',
      lookupHeader: 'accept-language',
      
      // cache user language on
      caches: ['cookie'],
      
      // optional expire and domain for set cookie
      cookieMinutes: 60 * 24 * 30, // 30 days
      cookieDomain: 'localhost',
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });

export {
  i18next,
  i18nextHttpMiddleware
};