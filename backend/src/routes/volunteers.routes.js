const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');
const { authenticate } = require('../middleware/auth');

// Get all volunteers
router.get('/', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;
    const volunteers = await Volunteer.getAll(limit, offset);
    res.json(volunteers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch volunteers' });
  }
});

// Create volunteer
router.post('/', authenticate, async (req, res) => {
  try {
    const volunteer = await Volunteer.create(req.body);
    res.status(201).json(volunteer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create volunteer' });
  }
});

// Get volunteer by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const volunteer = await Volunteer.getById(req.params.id);
    if (!volunteer) return res.status(404).json({ error: 'Volunteer not found' });
    res.json(volunteer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch volunteer' });
  }
});

// Update volunteer
router.put('/:id', authenticate, async (req, res) => {
  try {
    const volunteer = await Volunteer.update(req.params.id, req.body);
    if (!volunteer) return res.status(404).json({ error: 'Volunteer not found' });
    res.json(volunteer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update volunteer' });
  }
});

// Delete volunteer
router.delete('/:id', authenticate, async (req, res) => {
  try {
    await Volunteer.delete(req.params.id);
    res.json({ message: 'Volunteer deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete volunteer' });
  }
});

// Log volunteer hours
router.post('/:id/hours', authenticate, async (req, res) => {
  try {
    const { hours, description } = req.body;
    const entry = await Volunteer.logHours(req.params.id, hours, description);
    res.status(201).json(entry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to log hours' });
  }
});

module.exports = router;