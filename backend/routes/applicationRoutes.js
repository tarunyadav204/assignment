// routes/applicationRoutes.js
const express = require('express');
const { submitApplication, reviewApplication } = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/submit', authMiddleware, submitApplication);
router.post('/review', authMiddleware, reviewApplication);

module.exports = router;
