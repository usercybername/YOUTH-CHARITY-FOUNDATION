const express = require('express');
const router = express.Router();
const Beneficiary = require('../models/Beneficiary');
const { authenticate } = require('../middleware/auth');

// Get all beneficiaries
router.get('/', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;
    const beneficiaries = await Beneficiary.getAll(limit, offset);
    res.json(beneficiaries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch beneficiaries' });
  }
});

// Create beneficiary
router.post('/', authenticate, async (req, res) => {
  try {
    const beneficiary = await Beneficiary.create(req.body);
    res.status(201).json(beneficiary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create beneficiary' });
  }
});

// Get beneficiary by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const beneficiary = await Beneficiary.getById(req.params.id);
    if (!beneficiary) return res.status(404).json({ error: 'Beneficiary not found' });
    res.json(beneficiary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch beneficiary' });
  }
});

// Update beneficiary
router.put('/:id', authenticate, async (req, res) => {
  try {
    const beneficiary = await Beneficiary.update(req.params.id, req.body);
    if (!beneficiary) return res.status(404).json({ error: 'Beneficiary not found' });
    res.json(beneficiary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update beneficiary' });
  }
});

// Record progress
router.post('/:id/progress', authenticate, async (req, res) => {
  try {
    const { milestone, description } = req.body;
    const progress = await Beneficiary.recordProgress(req.params.id, milestone, description);
    res.status(201).json(progress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to record progress' });
  }
});

module.exports = router;