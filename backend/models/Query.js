const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['technical', 'billing', 'general', 'complaint', 'feature-request'],
        default: 'general'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },
    status: {
        type: String,
        enum: ['open', 'in-progress', 'resolved', 'closed'],
        default: 'open'
    },
    sentiment: {
        score: { type: Number, min: -1, max: 1 },
        label: { type: String, enum: ['positive', 'neutral', 'negative'] },
        confidence: { type: Number, min: 0, max: 1 }
    },
    aiResponse: {
        message: String,
        confidence: Number,
        generatedAt: Date
    },
    adminResponse: {
        message: String,
        respondedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        respondedAt: Date
    },
    tags: [String],
    attachments: [{
        filename: String,
        url: String,
        uploadedAt: { type: Date, default: Date.now }
    }],
    responseTime: Number, // in minutes
    satisfactionRating: {
        type: Number,
        min: 1,
        max: 5
    },
    feedback: String
}, {
    timestamps: true
});

// Index for better query performance
querySchema.index({ customer: 1, status: 1 });
querySchema.index({ priority: 1, createdAt: -1 });
querySchema.index({ 'sentiment.label': 1 });

// Calculate response time when status changes
querySchema.pre('save', function (next) {
    if (this.isModified('status') && this.status === 'resolved' && !this.responseTime) {
        this.responseTime = Math.round((Date.now() - this.createdAt) / (1000 * 60));
    }
    next();
});

module.exports = mongoose.model('Query', querySchema);