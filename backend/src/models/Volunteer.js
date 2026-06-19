const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class Volunteer {
  static async create(volunteerData) {
    const { name, email, phone, skills, availability, status } = volunteerData;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO volunteers (id, name, email, phone, skills, availability, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
       RETURNING *`,
      [id, name, email, phone, skills, availability, status || 'active']
    );

    return result.rows[0];
  }

  static async getAll(limit = 50, offset = 0) {
    const result = await pool.query(
      `SELECT * FROM volunteers ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM volunteers WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async update(id, volunteerData) {
    const { name, email, phone, skills, availability, status } = volunteerData;
    const result = await pool.query(
      `UPDATE volunteers SET name = $1, email = $2, phone = $3, skills = $4, 
       availability = $5, status = $6, updated_at = NOW() WHERE id = $7 RETURNING *`,
      [name, email, phone, skills, availability, status, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM volunteers WHERE id = $1', [id]);
  }

  static async logHours(volunteerId, hours, description) {
    const id = uuidv4();
    const result = await pool.query(
      `INSERT INTO volunteer_hours (id, volunteer_id, hours, description, created_at)
       VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
      [id, volunteerId, hours, description]
    );
    return result.rows[0];
  }
}

module.exports = Volunteer;