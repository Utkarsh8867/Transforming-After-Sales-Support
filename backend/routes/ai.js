const express = require('express');
const { body, validationResult } = require('express-validator');
const { auth } = require('../middleware/auth');
const { analyzeQuery, generateAIResponse } = require('../services/aiService');

const router = express.Router();

// Analyze text sentiment
router.post('/analyze', auth, [
    body('text').trim().isLength({ min: 5 }).withMessage('Text must be at least 5 characters')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { text } = req.body;
        const sentiment = await analyzeQuery(text);

        res.json({
            sentiment,
            message: 'Text analyzed successfully'
        });
    } catch (error) {
        console.error('AI analyze error:', error);
        res.status(500).json({ message: 'Server error during analysis' });
    }
});

// Generate AI response
router.post('/generate-response', auth, [
    body('query').trim().isLength({ min: 5 }).withMessage('Query must be at least 5 characters'),
    body('category').optional().isIn(['technical', 'billing', 'general', 'complaint', 'feature-request'])
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { query, category = 'general', context } = req.body;
        const response = await generateAIResponse(query, category, context);

        res.json({
            response,
            message: 'Response generated successfully'
        });
    } catch (error) {
        console.error('AI generate response error:', error);
        res.status(500).json({ message: 'Server error during response generation' });
    }
});

module.exports = router;