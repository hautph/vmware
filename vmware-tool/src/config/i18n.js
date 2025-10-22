const i18next = require('i18next');
const i18nextHttpMiddleware = require('i18next-http-middleware');
const Backend = require('i18next-fs-backend');

const path = require('path');

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

module.exports = {
  i18next,
  i18nextHttpMiddleware
};