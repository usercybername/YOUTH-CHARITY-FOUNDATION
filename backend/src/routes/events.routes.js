const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { authenticate } = require('../middleware/auth');

// Get all events
router.get('/', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;
    const events = await Event.getAll(limit, offset);
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Create event
router.post('/', authenticate, async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Get event by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const event = await Event.getById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// Update event
router.put('/:id', authenticate, async (req, res) => {
  try {
    const event = await Event.update(req.params.id, req.body);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// Assign volunteer to event
router.post('/:id/volunteers/:volunteerId', authenticate, async (req, res) => {
  try {
    const assignment = await Event.assignVolunteer(req.params.id, req.params.volunteerId);
    res.status(201).json(assignment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to assign volunteer' });
  }
});

// Get event volunteers
router.get('/:id/volunteers', authenticate, async (req, res) => {
  try {
    const volunteers = await Event.getEventVolunteers(req.params.id);
    res.json(volunteers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch event volunteers' });
  }
});

module.exports = router;