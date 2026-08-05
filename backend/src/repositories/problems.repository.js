export class ProblemsRepository {
  /**
   * @param {object} db - PostgreSQL pool or client instance
   */
  constructor(db) {
    this.db = db;
  }

  /**
   * Map database row fields to camelCase matching frontend expectations
   * @private
   */
  _mapProblem(row) {
    if (!row) return null;
    return {
      id: row.id,
      title: row.title,
      difficulty: row.difficulty,
      acceptance: row.acceptance,
      solvedCount: row.solved_count,
      companies: row.companies || [],
      tags: row.tags || [],
      description: row.description,
      examples: row.examples || [],
      constraints: row.constraints || [],
      templates: row.templates || {},
      discussions: row.discussions || [],
      hints: row.hints || [],
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  /**
   * Fetch problems matching filters
   * @param {object} [filters]
   * @param {string} [filters.difficulty]
   * @param {string} [filters.tag]
   * @returns {Promise<object[]>}
   */
  async findAll(filters = {}) {
    const { difficulty, tag } = filters;
    let query = 'SELECT * FROM problems';
    const values = [];
    const clauses = [];

    if (difficulty && difficulty !== 'All') {
      values.push(difficulty);
      clauses.push(`difficulty = $${values.length}`);
    }

    if (tag && tag !== 'All') {
      values.push(tag);
      clauses.push(`$${values.length} = ANY(tags)`);
    }

    if (clauses.length > 0) {
      query += ` WHERE ${clauses.join(' AND ')}`;
    }

    query += ' ORDER BY id ASC';

    const { rows } = await this.db.query(query, values);
    return rows.map(row => this._mapProblem(row));
  }

  /**
   * Find a problem by ID
   * @param {number|string} id 
   * @returns {Promise<object|null>}
   */
  async findById(id) {
    const query = 'SELECT * FROM problems WHERE id = $1';
    const { rows } = await this.db.query(query, [id]);
    return this._mapProblem(rows[0]);
  }
}
