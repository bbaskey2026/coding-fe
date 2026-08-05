/**
   * Express middleware to validate request payload using a Zod schema
   * @param {import('zod').ZodSchema} schema 
   * @returns {import('express').RequestHandler}
   */
export const validateMiddleware = (schema) => (req, res, next) => {
  try {
    const validated = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params
    });

    // Replace original properties with schema-validated (and coerced) versions
    if (validated.body !== undefined) req.body = validated.body;
    if (validated.query !== undefined) req.query = validated.query;
    if (validated.params !== undefined) req.params = validated.params;

    return next();
  } catch (error) {
    return next(error);
  }
};
export default validateMiddleware;
