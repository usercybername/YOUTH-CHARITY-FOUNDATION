const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/volunteers', require('./routes/volunteers.routes'));
app.use('/api/donations', require('./routes/donations.routes'));
app.use('/api/beneficiaries', require('./routes/beneficiaries.routes'));
app.use('/api/events', require('./routes/events.routes'));
app.use('/api/reports', require('./routes/reports.routes'));
app.use('/api/communications', require('./routes/communications.routes'));
app.use('/api/users', require('./routes/users.routes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'NGO Management System is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ NGO Management System running on port ${PORT}`);
});

module.exports = app;