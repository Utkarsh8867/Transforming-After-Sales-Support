const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['query-response', 'status-update', 'system', 'reminder'],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    relatedQuery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Query'
    },
    isRead: {
        type: Boolean,
        default: false
    },
    readAt: Date,
    channels: {
        email: { type: Boolean, default: false },
        push: { type: Boolean, default: false },
        inApp: { type: Boolean, default: true }
    },
    metadata: {
        type: Map,
        of: mongoose.Schema.Types.Mixed
    }
}, {
    timestamps: true
});

// Index for better query performance
notificationSchema.index({ recipient: 1, isRead: 1 });
notificationSchema.index({ createdAt: -1 });

// Mark as read method
notificationSchema.methods.markAsRead = function () {
    this.isRead = true;
    this.readAt = new Date();
    return this.save();
};

module.exports = mongoose.model('Notification', notificationSchema);