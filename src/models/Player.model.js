const { pool } = require("../config/db.postgres");

class Player {
  static async findAll({ q, teamId, limit = 50, offset = 0 }) {
    let base = "SELECT * FROM players";
    const params = [];
    const conds = [];
    if (q) {
      params.push(`%${q.toLowerCase()}%`);
      conds.push(`LOWER(name) LIKE $${params.length}`);
    }
    if (teamId) {
      params.push(Number(teamId));
      conds.push(`team_id = $${params.length}`);
    }
    if (conds.length) {
      base += " WHERE " + conds.join(" AND ");
    }
    base += " ORDER BY id LIMIT " + Number(limit) + " OFFSET " + Number(offset);
    const r = await pool.query(base, params);
    return r.rows;
  }

  static async findById(id) {
    const r = await pool.query("SELECT * FROM players WHERE id=$1", [id]);
    return r.rows[0] || null;
  }

  static async createOne({ name, position, team_id }) {
    const r = await pool.query("INSERT INTO players(name, position, team_id) VALUES($1,$2,$3) RETURNING *", [name, position, team_id]);
    return r.rows[0];
  }

  static async updateOne(id, dto) {
    const current = await this.findById(id);
    if (!current) return null;
    const n = dto.name !== undefined ? dto.name : current.name;
    const p = dto.position !== undefined ? dto.position : current.position;
    const t = dto.team_id !== undefined ? dto.team_id : current.team_id;
    const r = await pool.query("UPDATE players SET name=$1, position=$2, team_id=$3 WHERE id=$4 RETURNING *", [n, p, t, id]);
    return r.rows[0];
  }

  static async deleteOne(id) {
    const r = await pool.query("DELETE FROM players WHERE id=$1", [id]);
    return r.rowCount > 0;
  }
}

module.exports = Player;