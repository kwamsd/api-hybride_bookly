const { pool } = require("../config/db.postgres");

class Team {
  static async findAll() {
    const r = await pool.query("SELECT * FROM teams ORDER BY id");
    return r.rows;
  }

  static async findById(id) {
    const r = await pool.query("SELECT * FROM teams WHERE id=$1", [id]);
    return r.rows[0] || null;
  }

  static async createOne({ name, city }) {
    const r = await pool.query("INSERT INTO teams(name, city) VALUES($1,$2) RETURNING *", [name, city]);
    return r.rows[0];
  }

  static async updateOne(id, { name, city }) {
    const current = await this.findById(id);
    if (!current) return null;
    const n = name !== undefined ? name : current.name;
    const c = city !== undefined ? city : current.city;
    const r = await pool.query("UPDATE teams SET name=$1, city=$2 WHERE id=$3 RETURNING *", [n, c, id]);
    return r.rows[0];
  }

  static async deleteOne(id) {
    const r = await pool.query("DELETE FROM teams WHERE id=$1", [id]);
    return r.rowCount > 0;
  }
}

module.exports = Team;