const express = require('express');
const { body, validationResult } = require('express-validator');
const Query = require('../models/Query');
const User = require('../models/User');
const { adminAuth } = require('../middleware/auth');
const { createNotification } = require('../services/notificationService');

const router = express.Router();

// Get all queries for admin
router.get('/queries', adminAuth, async (req, res) => {
    try {
        const {
            page = 1,
            limit = 20,
            status,
            priority,
            category,
            sentiment,
            search
        } = req.query;

        const skip = (page - 1) * limit;
        const filter = {};

        // Apply filters
        if (status) filter.status = status;
        if (priority) filter.priority = priority;
        if (category) filter.category = category;
        if (sentiment) filter['sentiment.label'] = sentiment;
        if (search) {
            filter.$or = [
                { subject: { $regex: search, $options: 'i' } },
                { message: { $regex: search, $options: 'i' } }
            ];
        }

        const queries = await Query.find(filter)
            .populate('customer', 'name email')
            .populate('adminResponse.respondedBy', 'name email')
            .sort({ priority: -1, createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Query.countDocuments(filter);

        // Get statistics
        const stats = await Query.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json({
            queries,
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / limit),
                total
            },
            stats: stats.reduce((acc, stat) => {
                acc[stat._id] = stat.count;
                return acc;
            }, {})
        });
    } catch (error) {
        console.error('Admin get queries error:', error);
        res.status(500).json({ message: 'Server error while fetching queries' });
    }
});

// Get single query for admin
router.get('/queries/:id', adminAuth, async (req, res) => {
    try {
        const query = await Query.findById(req.params.id)
            .populate('customer', 'name email')
            .populate('adminResponse.respondedBy', 'name email');

        if (!query) {
            return res.status(404).json({ message: 'Query not found' });
        }

        res.json({ query });
    } catch (error) {
        console.error('Admin get query error:', error);
        res.status(500).json({ message: 'Server error while fetching query' });
    }
});

// Respond to query
router.post('/queries/:id/respond', adminAuth, [
    body('message').trim().isLength({ min: 10 }).withMessage('Response must be at least 10 characters'),
    body('status').optional().isIn(['open', 'in-progress', 'resolved', 'closed'])
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { message, status = 'resolved' } = req.body;

        const query = await Query.findById(req.params.id)
            .populate('customer', 'name email');

        if (!query) {
            return res.status(404).json({ message: 'Query not found' });
        }

        // Update query with admin response
        query.adminResponse = {
            message,
            respondedBy: req.user._id,
            respondedAt: new Date()
        };
        query.status = status;

        await query.save();
        await query.populate('adminResponse.respondedBy', 'name email');

        // Create notification for customer
        await createNotification({
            recipient: query.customer._id,
            type: 'query-response',
            title: 'Response to Your Query',
            message: `An admin has responded to your query: "${query.subject}"`,
            relatedQuery: query._id,
            channels: { email: true, push: true, inApp: true }
        });

        // Emit real-time update
        req.io.to(query.customer._id.toString()).emit('query-updated', query);

        res.json({
            message: 'Response sent successfully',
            query
        });
    } catch (error) {
        console.error('Admin respond error:', error);
        res.status(500).json({ message: 'Server error while responding to query' });
    }
});

// Update query status
router.patch('/queries/:id/status', adminAuth, [
    body('status').isIn(['open', 'in-progress', 'resolved', 'closed']).withMessage('Invalid status'),
    body('priority').optional().isIn(['low', 'medium', 'high', 'urgent'])
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { status, priority } = req.body;

        const query = await Query.findById(req.params.id)
            .populate('customer', 'name email');

        if (!query) {
            return res.status(404).json({ message: 'Query not found' });
        }

        const oldStatus = query.status;
        query.status = status;
        if (priority) query.priority = priority;

        await query.save();

        // Create notification if status changed significantly
        if (oldStatus !== status && ['resolved', 'closed'].includes(status)) {
            await createNotification({
                recipient: query.customer._id,
                type: 'status-update',
                title: 'Query Status Updated',
                message: `Your query "${query.subject}" has been ${status}`,
                relatedQuery: query._id
            });
        }

        // Emit real-time update
        req.io.to(query.customer._id.toString()).emit('query-updated', query);

        res.json({
            message: 'Query updated successfully',
            query
        });
    } catch (error) {
        console.error('Admin update query error:', error);
        res.status(500).json({ message: 'Server error while updating query' });
    }
});

// Get dashboard statistics
router.get('/dashboard', adminAuth, async (req, res) => {
    try {
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const startOfWeek = new Date(today.setDate(today.getDate() - 7));
        const startOfMonth = new Date(today.setMonth(today.getMonth() - 1));

        const [
            totalQueries,
            todayQueries,
            weekQueries,
            monthQueries,
            statusStats,
            priorityStats,
            sentimentStats,
            avgResponseTime,
            satisfactionStats
        ] = await Promise.all([
            Query.countDocuments(),
            Query.countDocuments({ createdAt: { $gte: startOfDay } }),
            Query.countDocuments({ createdAt: { $gte: startOfWeek } }),
            Query.countDocuments({ createdAt: { $gte: startOfMonth } }),

            Query.aggregate([
                { $group: { _id: '$status', count: { $sum: 1 } } }
            ]),

            Query.aggregate([
                { $group: { _id: '$priority', count: { $sum: 1 } } }
            ]),

            Query.aggregate([
                { $group: { _id: '$sentiment.label', count: { $sum: 1 } } }
            ]),

            Query.aggregate([
                {
                    $match: { responseTime: { $exists: true } }
                },
                {
                    $group: {
                        _id: null,
                        avgTime: { $avg: '$responseTime' }
                    }
                }
            ]),

            Query.aggregate([
                {
                    $match: { satisfactionRating: { $exists: true } }
                },
                {
                    $group: {
                        _id: null,
                        avgRating: { $avg: '$satisfactionRating' },
                        totalRatings: { $sum: 1 }
                    }
                }
            ])
        ]);

        res.json({
            overview: {
                totalQueries,
                todayQueries,
                weekQueries,
                monthQueries
            },
            statusDistribution: statusStats.reduce((acc, stat) => {
                acc[stat._id] = stat.count;
                return acc;
            }, {}),
            priorityDistribution: priorityStats.reduce((acc, stat) => {
                acc[stat._id] = stat.count;
                return acc;
            }, {}),
            sentimentDistribution: sentimentStats.reduce((acc, stat) => {
                acc[stat._id] = stat.count;
                return acc;
            }, {}),
            performance: {
                avgResponseTime: avgResponseTime[0]?.avgTime || 0,
                avgSatisfactionRating: satisfactionStats[0]?.avgRating || 0,
                totalRatings: satisfactionStats[0]?.totalRatings || 0
            }
        });
    } catch (error) {
        console.error('Admin dashboard error:', error);
        res.status(500).json({ message: 'Server error while fetching dashboard data' });
    }
});

module.exports = router;