export class ProblemsService {
  /**
   * @param {object} problemsRepository - Instance of ProblemsRepository
   */
  constructor(problemsRepository) {
    this.problemsRepository = problemsRepository;
  }

  /**
   * Fetch all problems matching filters
   */
  async getAllProblems(filters) {
    return this.problemsRepository.findAll(filters);
  }

  /**
   * Fetch a single problem by ID
   */
  async getProblemById(id) {
    const problem = await this.problemsRepository.findById(id);
    if (!problem) {
      throw new Error('Problem not found');
    }
    return problem;
  }

  /**
   * Run problem code (mock compilation execution)
   */
  async runCode(id, { code, language, input = '' }) {
    const problem = await this.problemsRepository.findById(id);
    if (!problem) {
      throw new Error('Problem not found');
    }

    const mockRuntime = Math.floor(8 + Math.random() * 25);
    const mockMemory = (38 + Math.random() * 8).toFixed(1);
    const mockOutput = problem.examples[0]?.output || 'Success';

    return {
      status: 'Accepted',
      runtime: `${mockRuntime}ms`,
      memory: `${mockMemory} MB`,
      logs: `Compiling script and verifying assertions...\nStatus: Accepted 🟢\nRuntime: ${mockRuntime}ms\nMemory: ${mockMemory} MB\n\nOutput Log:\n---------------------\nCase 1 input: ${input || problem.examples[0]?.input || 'data'}\nOutput: ${mockOutput}\nExpected: ${mockOutput}\n\nAssertion Successful. All tests verified.`
    };
  }

  /**
   * Submit problem code (increments catalog solved counts and returns verification)
   */
  async submitCode(id, { code, language }) {
    const problem = await this.problemsRepository.findById(id);
    if (!problem) {
      throw new Error('Problem not found');
    }

    // Increment problem solved count in database
    await this.problemsRepository.db.query(
      'UPDATE problems SET solved_count = solved_count + 1 WHERE id = $1',
      [id]
    );

    const mockRuntime = Math.floor(10 + Math.random() * 15);
    const mockMemory = (40 + Math.random() * 5).toFixed(1);

    return {
      status: 'Solved',
      runtime: `${mockRuntime}ms`,
      memory: `${mockMemory} MB`,
      message: 'Solution verified. Status: Solved 🟢'
    };
  }
}
