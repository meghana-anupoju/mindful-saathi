const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve frontend files

// In-memory storage for demo (replace with database in production)
let userSessions = {};
let moodData = {};
let communityPosts = [];

// Mental health context for Gemini AI
const mentalHealthPrompt = `You are MindfulSaathi, an AI mental health companion designed specifically for Indian youth aged 15-25. You provide empathetic, culturally sensitive support while being aware of Indian family dynamics, academic pressures, and cultural contexts. Always respond with warmth, understanding, and never provide medical diagnosis. If you detect crisis language, gently suggest professional help and crisis resources like Tele-MANAS (14416). Keep responses conversational and supportive.`;

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// AI Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Initialize session if new
    if (!userSessions[sessionId]) {
      userSessions[sessionId] = {
        id: sessionId,
        messages: [],
        createdAt: new Date().toISOString()
      };
    }

    // Add user message to session
    userSessions[sessionId].messages.push({
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    });

    // Check for crisis keywords
    const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'hurt myself', 'depression', 'hopeless'];
    const containsCrisisKeyword = crisisKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );

    // Generate AI response using Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const contextualPrompt = `${mentalHealthPrompt}\n\nUser message: "${message}"\n\nPlease respond with empathy and cultural sensitivity appropriate for Indian youth.`;
    
    const result = await model.generateContent(contextualPrompt);
    const response = await result.response;
    let aiReply = response.text();

    // Add crisis support if needed
    if (containsCrisisKeyword) {
      aiReply += "\n\n🚨 I'm here to support you, but if you're having thoughts of self-harm, please reach out to professionals immediately:\n• Tele-MANAS: 14416 (24/7 crisis support)\n• iCall: 9152987821\n• Vandrevala Foundation: 9999666555\n\nYou are not alone, and help is available.";
    }

    // Add AI response to session
    userSessions[sessionId].messages.push({
      role: 'assistant',
      content: aiReply,
      timestamp: new Date().toISOString(),
      crisisDetected: containsCrisisKeyword
    });

    res.json({ 
      reply: aiReply,
      sessionId: sessionId,
      crisisDetected: containsCrisisKeyword
    });

  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ 
      error: 'Failed to get AI response',
      fallback: 'I understand you\'re reaching out for support. While I\'m having technical difficulties right now, please know that your feelings are valid. If you need immediate help, contact Tele-MANAS at 14416.'
    });
  }
});

// Mood tracking endpoints
app.post('/api/mood', (req, res) => {
  try {
    const { sessionId, mood, moodValue, notes } = req.body;
    
    if (!moodData[sessionId]) {
      moodData[sessionId] = [];
    }
    
    const moodEntry = {
      id: uuidv4(),
      mood,
      moodValue,
      notes: notes || '',
      timestamp: new Date().toISOString(),
      date: new Date().toDateString()
    };
    
    moodData[sessionId].push(moodEntry);
    
    res.json({ 
      success: true, 
      message: 'Mood recorded successfully',
      entry: moodEntry
    });
  } catch (error) {
    console.error('Mood API error:', error);
    res.status(500).json({ error: 'Failed to record mood' });
  }
});

app.get('/api/mood/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;
    const moods = moodData[sessionId] || [];
    
    // Get last 7 days of mood data
    const last7Days = moods.slice(-7);
    
    res.json({ 
      moods: last7Days,
      totalEntries: moods.length
    });
  } catch (error) {
    console.error('Get mood API error:', error);
    res.status(500).json({ error: 'Failed to retrieve mood data' });
  }
});

// Crisis resources endpoint
app.get('/api/crisis-resources', (req, res) => {
  const resources = {
    hotlines: [
      { name: 'Tele-MANAS', number: '14416', description: '24x7 tele-mental health service by Ministry of Health' },
      { name: 'iCall', number: '9152987821', description: 'Psychological counseling helpline' },
      { name: 'Vandrevala Foundation', number: '9999666555', description: '24x7 free counseling support' },
      { name: 'AASRA', number: '9820466726', description: 'Mumbai-based suicide prevention helpline' }
    ]
  };
  
  res.json(resources);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 MindfulSaathi server running on http://localhost:${PORT}`);
  console.log(`📱 Frontend available at http://localhost:${PORT}`);
  console.log(`🔧 API endpoints at http://localhost:${PORT}/api/`);
  
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_actual_gemini_api_key_here') {
    console.warn('⚠️  Warning: GEMINI_API_KEY not set. Please add your API key to .env file');
  }
});
