const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Analyze sentiment of query text
const analyzeQuery = async (text) => {
    try {
        if (!process.env.OPENAI_API_KEY) {
            // Fallback sentiment analysis without OpenAI
            return {
                score: 0,
                label: 'neutral',
                confidence: 0.5
            };
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are a sentiment analysis expert. Analyze the sentiment of customer service queries and respond with a JSON object containing:
          - score: number between -1 (very negative) and 1 (very positive)
          - label: "positive", "neutral", or "negative"
          - confidence: number between 0 and 1 indicating confidence in the analysis
          
          Consider urgency, frustration, satisfaction, and emotional tone.`
                },
                {
                    role: "user",
                    content: text
                }
            ],
            temperature: 0.3,
            max_tokens: 100
        });

        const result = JSON.parse(response.choices[0].message.content);
        return {
            score: Math.max(-1, Math.min(1, result.score || 0)),
            label: ['positive', 'neutral', 'negative'].includes(result.label) ? result.label : 'neutral',
            confidence: Math.max(0, Math.min(1, result.confidence || 0.5))
        };
    } catch (error) {
        console.error('Sentiment analysis error:', error);
        // Return neutral sentiment on error
        return {
            score: 0,
            label: 'neutral',
            confidence: 0.5
        };
    }
};

// Generate AI response to customer query
const generateAIResponse = async (query, category = 'general', context = '') => {
    try {
        if (!process.env.OPENAI_API_KEY) {
            // Fallback response without OpenAI
            return `Thank you for contacting us regarding your ${category} inquiry. We have received your message and will get back to you as soon as possible. Our team is committed to providing you with the best possible assistance.`;
        }

        const systemPrompt = `You are a helpful customer service AI assistant. Your role is to:
    1. Provide helpful, accurate, and empathetic responses
    2. Acknowledge the customer's concern
    3. Offer practical solutions when possible
    4. Maintain a professional and friendly tone
    5. If you cannot solve the issue, explain that a human agent will follow up
    
    Category: ${category}
    ${context ? `Additional context: ${context}` : ''}
    
    Keep responses concise but comprehensive, typically 2-4 sentences.`;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: query
                }
            ],
            temperature: 0.7,
            max_tokens: 200
        });

        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error('AI response generation error:', error);
        // Return fallback response on error
        return `Thank you for contacting us. We have received your inquiry and our team will review it carefully. We'll get back to you with a detailed response as soon as possible. If this is urgent, please don't hesitate to reach out to us directly.`;
    }
};

// Generate suggested responses for admin
const generateAdminSuggestions = async (query, customerHistory = []) => {
    try {
        if (!process.env.OPENAI_API_KEY) {
            return [
                "Thank you for bringing this to our attention. Let me look into this for you.",
                "I understand your concern. Here's what we can do to resolve this issue.",
                "I apologize for any inconvenience. Let me help you with this right away."
            ];
        }

        const historyContext = customerHistory.length > 0
            ? `Previous interactions: ${customerHistory.slice(-3).map(h => h.subject).join(', ')}`
            : '';

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `Generate 3 different professional response suggestions for a customer service admin. Each should:
          1. Be empathetic and professional
          2. Address the specific concern
          3. Offer a solution or next steps
          4. Be 1-2 sentences each
          
          ${historyContext}
          
          Return as a JSON array of strings.`
                },
                {
                    role: "user",
                    content: query
                }
            ],
            temperature: 0.8,
            max_tokens: 300
        });

        return JSON.parse(response.choices[0].message.content);
    } catch (error) {
        console.error('Admin suggestions error:', error);
        return [
            "Thank you for contacting us. I'll personally ensure this issue is resolved promptly.",
            "I understand your concern and appreciate you bringing this to our attention. Let me help you with this.",
            "I apologize for any inconvenience caused. Here's how we can address your concern immediately."
        ];
    }
};

module.exports = {
    analyzeQuery,
    generateAIResponse,
    generateAdminSuggestions
};