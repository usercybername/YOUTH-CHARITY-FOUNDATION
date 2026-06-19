const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class Donation {
  static async create(donationData) {
    const { donorName, amount, description, category, status } = donationData;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO donations (id, donor_name, amount, description, category, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       RETURNING *`,
      [id, donorName, amount, description, category, status || 'received']
    );

    return result.rows[0];
  }

  static async getAll(limit = 50, offset = 0) {
    const result = await pool.query(
      `SELECT * FROM donations ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM donations WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async getTotalDonations() {
    const result = await pool.query(
      `SELECT SUM(amount) as total FROM donations WHERE status = 'received'`
    );
    return result.rows[0].total || 0;
  }

  static async getByCategory() {
    const result = await pool.query(
      `SELECT category, SUM(amount) as total, COUNT(*) as count 
       FROM donations WHERE status = 'received'
       GROUP BY category`
    );
    return result.rows;
  }

  static async update(id, donationData) {
    const { amount, description, status } = donationData;
    const result = await pool.query(
      `UPDATE donations SET amount = $1, description = $2, status = $3, updated_at = NOW() 
       WHERE id = $4 RETURNING *`,
      [amount, description, status, id]
    );
    return result.rows[0];
  }
}

module.exports = Donation;