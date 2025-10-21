const express = require('express');
const { body, validationResult } = require('express-validator');
const Query = require('../models/Query');
const { auth } = require('../middleware/auth');
const { analyzeQuery, generateAIResponse } = require('../services/aiService');
const { createNotification } = require('../services/notificationService');

const router = express.Router();

// Create new query
router.post('/', auth, [
    body('subject').trim().isLength({ min: 5 }).withMessage('Subject must be at least 5 characters'),
    body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
    body('category').optional().isIn(['technical', 'billing', 'general', 'complaint', 'feature-request'])
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { subject, message, category = 'general' } = req.body;

        // Analyze sentiment and generate AI response
        const sentiment = await analyzeQuery(message);
        const aiResponse = await generateAIResponse(message, category);

        // Determine priority based on sentiment
        let priority = 'medium';
        if (sentiment.label === 'negative' && sentiment.confidence > 0.7) {
            priority = 'high';
        } else if (sentiment.label === 'positive') {
            priority = 'low';
        }

        // Create query
        const query = new Query({
            customer: req.user._id,
            subject,
            message,
            category,
            priority,
            sentiment,
            aiResponse: {
                message: aiResponse,
                confidence: 0.8,
                generatedAt: new Date()
            }
        });

        await query.save();
        await query.populate('customer', 'name email');

        // Create notification for customer
        await createNotification({
            recipient: req.user._id,
            type: 'query-response',
            title: 'Query Received',
            message: 'Your query has been received and processed by our AI assistant.',
            relatedQuery: query._id
        });

        // Emit real-time update
        req.io.to(req.user._id.toString()).emit('query-created', query);

        res.status(201).json({
            message: 'Query created successfully',
            query
        });
    } catch (error) {
        console.error('Create query error:', error);
        res.status(500).json({ message: 'Server error while creating query' });
    }
});

// Get user's queries
router.get('/', auth, async (req, res) => {
    try {
        const { page = 1, limit = 10, status, category } = req.query;
        const skip = (page - 1) * limit;

        const filter = { customer: req.user._id };
        if (status) filter.status = status;
        if (category) filter.category = category;

        const queries = await Query.find(filter)
            .populate('customer', 'name email')
            .populate('adminResponse.respondedBy', 'name email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Query.countDocuments(filter);

        res.json({
            queries,
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / limit),
                total
            }
        });
    } catch (error) {
        console.error('Get queries error:', error);
        res.status(500).json({ message: 'Server error while fetching queries' });
    }
});

// Get single query
router.get('/:id', auth, async (req, res) => {
    try {
        const query = await Query.findOne({
            _id: req.params.id,
            customer: req.user._id
        })
            .populate('customer', 'name email')
            .populate('adminResponse.respondedBy', 'name email');

        if (!query) {
            return res.status(404).json({ message: 'Query not found' });
        }

        res.json({ query });
    } catch (error) {
        console.error('Get query error:', error);
        res.status(500).json({ message: 'Server error while fetching query' });
    }
});

// Rate query response
router.post('/:id/rate', auth, [
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('feedback').optional().trim().isLength({ max: 500 }).withMessage('Feedback too long')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { rating, feedback } = req.body;

        const query = await Query.findOne({
            _id: req.params.id,
            customer: req.user._id
        });

        if (!query) {
            return res.status(404).json({ message: 'Query not found' });
        }

        query.satisfactionRating = rating;
        if (feedback) query.feedback = feedback;
        await query.save();

        res.json({
            message: 'Rating submitted successfully',
            query
        });
    } catch (error) {
        console.error('Rate query error:', error);
        res.status(500).json({ message: 'Server error while rating query' });
    }
});

module.exports = router;