
const express = require('express');
const Session = require('../models/Session');
const User = require('../models/userModel');
const mongoose = require('mongoose'); 
const router = express.Router();

// Save session data
router.post('/saveSessionData', async (req, res) => {
  const { userId, tab, focusTime, shortBreak, longBreak, cycleCount } = req.body;

  if (!userId || !tab || focusTime === undefined || shortBreak === undefined || longBreak === undefined) {
    return res.status(400).json({ success: false, message: 'Invalid data' });
  }

  try {
    
    const userObjectId = new mongoose.Types.ObjectId(userId); // Use new keyword

    // Validate userId exists
    const userExists = await User.findById(userObjectId);
    if (!userExists) {
      return res.status(404).json({ success: false, message: 'User  not found' });
    }

    const newSession = new Session({ userId: userObjectId, tab, focusTime, shortBreak, longBreak, cycleCount });
    await newSession.save();

    res.status(201).json({ success: true, message: 'Session data saved successfully', data: newSession });
  } catch (error) {
    console.error("Error saving session data:", error); // Log the error for debugging
    res.status(500).json({ success: false, message: 'Error saving session data', error: error.message });
  }
});


router.get('/history', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ success: false, message: 'User ID is required' });
  }

  try {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const sessions = await Session.find({ userId: userObjectId });

    if (!sessions || sessions.length === 0) {
      return res.status(404).json({ success: false, message: 'No session history found' });
    }

    // Calculate aggregated statistics
    const totals = sessions.reduce((acc, session) => {
      acc.focusTime += session.focusTime || 0;
      acc.shortBreak += session.shortBreak || 0;
      acc.longBreak += session.longBreak || 0;
      acc.completedSessions += 1;
      acc.purpose[session.tab || "General"] = (acc.purpose[session.tab || "General"] || 0) + 1;
      return acc;
    }, { focusTime: 0, shortBreak: 0, longBreak: 0, completedSessions: 0, purpose: {} });

    res.status(200).json({ success: true, totals, sessions });
  } catch (error) {
    console.error("Error fetching session history:", error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
});
module.exports = router;