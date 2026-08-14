export class CompanyGuidesRepository {
  /**
   * @param {object} db - PostgreSQL pool or client instance
   */
  constructor(db) {
    this.db = db;
  }

  /**
   * Map database row fields to camelCase for application consumption
   * @private
   */
  _mapGuide(row) {
    if (!row) return null;
    return {
      id: row.id,
      companyName: row.company_name,
      logoUrl: row.logo_url,
      difficulty: row.difficulty,
      examPattern: row.exam_pattern || {},
      questionTypes: row.question_types || [],
      commonQuestions: row.common_questions || [],
      articleContent: row.article_content,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  /**
   * Fetch all company preparation guides
   * @returns {Promise<object[]>}
   */
  async findAll() {
    const query = 'SELECT * FROM company_guides ORDER BY id ASC';
    const { rows } = await this.db.query(query);
    return rows.map(row => this._mapGuide(row));
  }

  /**
   * Find a company preparation guide by ID
   * @param {number|string} id 
   * @returns {Promise<object|null>}
   */
  async findById(id) {
    const query = 'SELECT * FROM company_guides WHERE id = $1';
    const { rows } = await this.db.query(query, [id]);
    return this._mapGuide(rows[0]);
  }

  /**
   * Find a company preparation guide by company name
   * @param {string} companyName 
   * @returns {Promise<object|null>}
   */
  async findByCompanyName(companyName) {
    const query = 'SELECT * FROM company_guides WHERE LOWER(company_name) = LOWER($1)';
    const { rows } = await this.db.query(query, [companyName]);
    return this._mapGuide(rows[0]);
  }
}
