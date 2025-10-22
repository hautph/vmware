const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { i18next, i18nextHttpMiddleware } = require('./config/i18n');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// i18next middleware
app.use(i18nextHttpMiddleware.handle(i18next));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Custom middleware to handle EJS includes properly
app.use((req, res, next) => {
  res.locals.title = 'VMware Tool';
  res.locals.t = req.t; // Make translation function available in templates
  res.locals.language = req.language || 'en'; // Make current language available
  res.locals.req = req; // Make request object available in templates
  next();
});

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: req.t('home.title') });
});

// Import routes
const resourceRoutes = require('./routes/resource');
const glossaryRoutes = require('./routes/glossary');
const calculatorRoutes = require('./routes/calculator');
const knowledgeRoutes = require('./routes/knowledge');
const courseRoutes = require('./routes/course');

// Use routes
app.use('/resources', resourceRoutes);
app.use('/glossary', glossaryRoutes);
app.use('/calculators', calculatorRoutes);
app.use('/knowledge', knowledgeRoutes);
app.use('/course', courseRoutes);

// Language switcher route
app.get('/lang/:lang', (req, res) => {
  const lang = req.params.lang;
  const redirectUrl = req.query.redirect || '/';
  res.cookie('lang', lang, { maxAge: 900000, httpOnly: true });
  res.redirect(redirectUrl);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('error', { 
    title: req.t('navigation.error_404') || 'Page Not Found',
    message: req.t('navigation.page_not_found') || 'Sorry, the page you are looking for does not exist.',
    error: {}
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { 
    title: req.t('navigation.error_500') || 'Error',
    message: req.t('navigation.something_went_wrong') || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;