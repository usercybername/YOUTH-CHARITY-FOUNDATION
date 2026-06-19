const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class Event {
  static async create(eventData) {
    const { name, description, date, location, budget, status, volunteersNeeded } = eventData;
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO events (id, name, description, date, location, budget, status, volunteers_needed, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
       RETURNING *`,
      [id, name, description, date, location, budget, status || 'planned', volunteersNeeded]
    );

    return result.rows[0];
  }

  static async getAll(limit = 50, offset = 0) {
    const result = await pool.query(
      `SELECT * FROM events ORDER BY date DESC LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async assignVolunteer(eventId, volunteerId) {
    const id = uuidv4();
    const result = await pool.query(
      `INSERT INTO event_volunteers (id, event_id, volunteer_id, created_at)
       VALUES ($1, $2, $3, NOW()) RETURNING *`,
      [id, eventId, volunteerId]
    );
    return result.rows[0];
  }

  static async getEventVolunteers(eventId) {
    const result = await pool.query(
      `SELECT v.* FROM volunteers v
       JOIN event_volunteers ev ON v.id = ev.volunteer_id
       WHERE ev.event_id = $1`,
      [eventId]
    );
    return result.rows;
  }

  static async update(id, eventData) {
    const { name, description, date, location, budget, status } = eventData;
    const result = await pool.query(
      `UPDATE events SET name = $1, description = $2, date = $3, location = $4, 
       budget = $5, status = $6, updated_at = NOW() WHERE id = $7 RETURNING *`,
      [name, description, date, location, budget, status, id]
    );
    return result.rows[0];
  }
}

module.exports = Event;