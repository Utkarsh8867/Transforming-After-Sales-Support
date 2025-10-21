const nodemailer = require('nodemailer');
const Notification = require('../models/Notification');
const User = require('../models/User');

// Email transporter setup
const createTransporter = () => {
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn('Email configuration missing. Email notifications will be disabled.');
        return null;
    }

    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT || 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

const transporter = createTransporter();

// Create notification
const createNotification = async (notificationData) => {
    try {
        const {
            recipient,
            type,
            title,
            message,
            relatedQuery,
            channels = { email: false, push: false, inApp: true },
            metadata = {}
        } = notificationData;

        // Create in-app notification
        const notification = new Notification({
            recipient,
            type,
            title,
            message,
            relatedQuery,
            channels,
            metadata
        });

        await notification.save();

        // Get user preferences
        const user = await User.findById(recipient);
        if (!user) {
            throw new Error('User not found');
        }

        // Send email notification if enabled
        if (channels.email && user.preferences?.notifications?.email && transporter) {
            await sendEmailNotification(user, notification);
        }

        return notification;
    } catch (error) {
        console.error('Create notification error:', error);
        throw error;
    }
};

// Send email notification
const sendEmailNotification = async (user, notification) => {
    try {
        if (!transporter) {
            console.warn('Email transporter not configured');
            return;
        }

        const emailTemplate = getEmailTemplate(notification);

        const mailOptions = {
            from: `"Customer Service" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: notification.title,
            html: emailTemplate
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${user.email} for notification ${notification._id}`);
    } catch (error) {
        console.error('Send email error:', error);
    }
};

// Get email template
const getEmailTemplate = (notification) => {
    const baseTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${notification.title}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #007bff; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
        .button { display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Customer Service Update</h1>
        </div>
        <div class="content">
          <h2>${notification.title}</h2>
          <p>${notification.message}</p>
          ${notification.relatedQuery ? `
            <p>
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/queries/${notification.relatedQuery}" class="button">
                View Query Details
              </a>
            </p>
          ` : ''}
        </div>
        <div class="footer">
          <p>This is an automated message from our customer service system.</p>
          <p>If you have any questions, please contact our support team.</p>
        </div>
      </div>
    </body>
    </html>
  `;

    return baseTemplate;
};

// Get user notifications
const getUserNotifications = async (userId, options = {}) => {
    try {
        const {
            page = 1,
            limit = 20,
            unreadOnly = false
        } = options;

        const skip = (page - 1) * limit;
        const filter = { recipient: userId };

        if (unreadOnly) {
            filter.isRead = false;
        }

        const notifications = await Notification.find(filter)
            .populate('relatedQuery', 'subject status')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Notification.countDocuments(filter);
        const unreadCount = await Notification.countDocuments({
            recipient: userId,
            isRead: false
        });

        return {
            notifications,
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / limit),
                total
            },
            unreadCount
        };
    } catch (error) {
        console.error('Get user notifications error:', error);
        throw error;
    }
};

// Mark notification as read
const markAsRead = async (notificationId, userId) => {
    try {
        const notification = await Notification.findOne({
            _id: notificationId,
            recipient: userId
        });

        if (!notification) {
            throw new Error('Notification not found');
        }

        if (!notification.isRead) {
            await notification.markAsRead();
        }

        return notification;
    } catch (error) {
        console.error('Mark as read error:', error);
        throw error;
    }
};

// Mark all notifications as read
const markAllAsRead = async (userId) => {
    try {
        await Notification.updateMany(
            { recipient: userId, isRead: false },
            { isRead: true, readAt: new Date() }
        );

        return { message: 'All notifications marked as read' };
    } catch (error) {
        console.error('Mark all as read error:', error);
        throw error;
    }
};

module.exports = {
    createNotification,
    sendEmailNotification,
    getUserNotifications,
    markAsRead,
    markAllAsRead
};