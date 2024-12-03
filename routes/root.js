const express = require('express');
const router = express.Router();

// Welcome page
router.get('/', (req, res) => {
  res.render('index', {
    title: 'API Documentation',
    description: 'Complete API documentation and guides for the SIH Backend'
  });
});

// Main documentation page
router.get('/docs', (req, res) => {
  res.render('docs/index', {
    title: 'Documentation',
    section: 'overview'
  });
});

// Individual documentation sections
router.get('/docs/:section', (req, res) => {
  const { section } = req.params;
  res.render('docs/[section]', {
    title: `${section.charAt(0).toUpperCase() + section.slice(1)} - Documentation`,
    section
  });
});

module.exports = router;