const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class Beneficiary {
  static async create(beneficiaryData) {
    const { name, age, email, phone, program, status, notes } = beneficiaryData;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO beneficiaries (id, name, age, email, phone, program, status, notes, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
       RETURNING *`,
      [id, name, age, email, phone, program, status || 'active', notes]
    );

    return result.rows[0];
  }

  static async getAll(limit = 50, offset = 0) {
    const result = await pool.query(
      `SELECT * FROM beneficiaries ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM beneficiaries WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async getByProgram(program) {
    const result = await pool.query(
      `SELECT * FROM beneficiaries WHERE program = $1 ORDER BY created_at DESC`,
      [program]
    );
    return result.rows;
  }

  static async update(id, beneficiaryData) {
    const { name, age, email, phone, program, status, notes } = beneficiaryData;
    const result = await pool.query(
      `UPDATE beneficiaries SET name = $1, age = $2, email = $3, phone = $4, 
       program = $5, status = $6, notes = $7, updated_at = NOW() WHERE id = $8 RETURNING *`,
      [name, age, email, phone, program, status, notes, id]
    );
    return result.rows[0];
  }

  static async recordProgress(beneficiaryId, milestone, description) {
    const id = uuidv4();
    const result = await pool.query(
      `INSERT INTO beneficiary_progress (id, beneficiary_id, milestone, description, created_at)
       VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
      [id, beneficiaryId, milestone, description]
    );
    return result.rows[0];
  }
}

module.exports = Beneficiary;