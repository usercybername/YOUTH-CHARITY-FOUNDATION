const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const Donation = require('../models/Donation');
const Volunteer = require('../models/Volunteer');
const pool = require('../config/database');

// Get dashboard stats
router.get('/dashboard/stats', authenticate, async (req, res) => {
  try {
    const totalDonations = await Donation.getTotalDonations();
    const donationCategories = await Donation.getByCategory();
    
    const volunteersResult = await pool.query('SELECT COUNT(*) as count FROM volunteers WHERE status = \'active\'');
    const beneficiariesResult = await pool.query('SELECT COUNT(*) as count FROM beneficiaries WHERE status = \'active\'');
    const eventsResult = await pool.query('SELECT COUNT(*) as count FROM events');

    res.json({
      totalDonations,
      donationsByCategory: donationCategories,
      activeVolunteers: volunteersResult.rows[0].count,
      activeBeneficiaries: beneficiariesResult.rows[0].count,
      totalEvents: eventsResult.rows[0].count
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// Generate impact report
router.get('/impact-report', authenticate, async (req, res) => {
  try {
    const totalDonations = await Donation.getTotalDonations();
    const volunteersResult = await pool.query(
      'SELECT COUNT(*) as total, SUM(COALESCE(hours, 0)) as total_hours FROM (SELECT DISTINCT v.id, COALESCE(SUM(vh.hours), 0) as hours FROM volunteers v LEFT JOIN volunteer_hours vh ON v.id = vh.volunteer_id GROUP BY v.id) t'
    );
    const beneficiariesResult = await pool.query('SELECT COUNT(*) as count FROM beneficiaries WHERE status = \'active\'');
    const programsResult = await pool.query('SELECT DISTINCT program, COUNT(*) as count FROM beneficiaries GROUP BY program');

    res.json({
      reportDate: new Date(),
      fundingReceived: totalDonations,
      volunteerStats: {
        totalVolunteers: volunteersResult.rows[0].total,
        totalHours: volunteersResult.rows[0].total_hours || 0
      },
      beneficiaryStats: {
        totalBeneficiaries: beneficiariesResult.rows[0].count,
        programBreakdown: programsResult.rows
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate impact report' });
  }
});

module.exports = router;