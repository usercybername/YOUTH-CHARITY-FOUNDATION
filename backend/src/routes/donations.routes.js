const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const { authenticate } = require('../middleware/auth');

// Get all donations
router.get('/', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;
    const donations = await Donation.getAll(limit, offset);
    res.json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});

// Create donation
router.post('/', authenticate, async (req, res) => {
  try {
    const donation = await Donation.create(req.body);
    res.status(201).json(donation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create donation' });
  }
});

// Get total donations
router.get('/stats/total', authenticate, async (req, res) => {
  try {
    const total = await Donation.getTotalDonations();
    res.json({ total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch total donations' });
  }
});

// Get donations by category
router.get('/stats/category', authenticate, async (req, res) => {
  try {
    const stats = await Donation.getByCategory();
    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch donation stats' });
  }
});

// Get donation by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const donation = await Donation.getById(req.params.id);
    if (!donation) return res.status(404).json({ error: 'Donation not found' });
    res.json(donation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch donation' });
  }
});

// Update donation
router.put('/:id', authenticate, async (req, res) => {
  try {
    const donation = await Donation.update(req.params.id, req.body);
    if (!donation) return res.status(404).json({ error: 'Donation not found' });
    res.json(donation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update donation' });
  }
});

module.exports = router;