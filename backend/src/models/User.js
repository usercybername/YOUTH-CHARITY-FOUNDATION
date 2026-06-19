const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

class User {
  static async create(userData) {
    const { email, password, firstName, lastName, role } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO users (id, email, password, first_name, last_name, role, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       RETURNING *`,
      [id, email, hashedPassword, firstName, lastName, role]
    );

    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query(
      'SELECT id, email, first_name, last_name, role, created_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  static async getAll() {
    const result = await pool.query(
      'SELECT id, email, first_name, last_name, role, created_at FROM users ORDER BY created_at DESC'
    );
    return result.rows;
  }

  static async update(id, userData) {
    const { firstName, lastName, role } = userData;
    const result = await pool.query(
      `UPDATE users SET first_name = $1, last_name = $2, role = $3, updated_at = NOW()
       WHERE id = $4 RETURNING id, email, first_name, last_name, role`,
      [firstName, lastName, role, id]
    );
    return result.rows[0];
  }

  static async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

module.exports = User;