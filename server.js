// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serves the frontend

// 🍕 THE BRAIN: Predefined Input Patterns & Responses
const chatbotBrain = [
    {
        intent: "greeting",
        keywords: ["hi", "hello", "hey", "good morning", "good evening"],
        response: "Hello! Welcome to PizzaBot 🍕. How can I help you today? You can ask for our 'menu', place an 'order', or check our 'hours'."
    },
    {
        intent: "menu",
        keywords: ["menu", "food", "eat", "what do you have", "options", "pizzas"],
        response: "Here is our menu:\n1. Pepperoni Pizza - $12\n2. Margherita Pizza - $10\n3. Veggie Supreme - $14\nWhat would you like to order?"
    },
    {
        intent: "order",
        keywords: ["order", "buy", "get", "purchase", "want"],
        response: "Great choice! To process your order, please tell me which pizza you want and your delivery address."
    },
    {
        intent: "hours",
        keywords: ["hours", "open", "close", "time", "when"],
        response: "We are open every day from 11:00 AM to 10:00 PM! 🕒"
    },
    {
        intent: "location",
        keywords: ["where", "location", "address", "find you"],
        response: "You can find us at 123 Mozzarella Street, Cheese City. 📍"
    },
    {
        intent: "goodbye",
        keywords: ["bye", "goodbye", "see ya", "thanks", "thank you"],
        response: "Thank you for choosing PizzaBot! Enjoy your pizza. Goodbye! 👋"
    }
];

// 🧠 THE LOGIC: Retrieval-based matching
function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();

    // Check each intent to see if any keywords match the user's message
    for (const item of chatbotBrain) {
        for (const keyword of item.keywords) {
            if (message.includes(keyword)) {
                return item.response;
            }
        }
    }

    // Fallback response if no patterns match
    return "I'm sorry, I didn't quite understand that. 🤔 You can ask about our 'menu', 'hours', or say 'order' to get started!";
}

// 🌐 API ENDPOINT: Handles incoming chat messages
app.post('/api/chat', (req, res) => {
    const userMessage = req.body.message;
    
    if (!userMessage) {
        return res.status(400).json({ error: "Message is required" });
    }

    // Simulate a tiny delay to make it feel like "instant but human" response
    setTimeout(() => {
        const botReply = getBotResponse(userMessage);
        res.json({ reply: botReply });
    }, 500); 
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🍕 PizzaBot server is running on http://localhost:${PORT}`);
});