export class ResponseUtil {
  /**
   * Standard success response structure - unwrapped to align with frontend clients
   * @param {object} res - Express response object
   * @param {object|array} data - The main payload returned
   * @param {string} message - User-friendly message
   * @param {number} statusCode - HTTP status code
   */
  static success(res, data = {}, message = 'Success', statusCode = 200) {
    if (data === null || data === undefined) {
      return res.status(statusCode).json({ message });
    }
    
    if (typeof data === 'object') {
      if (Array.isArray(data)) {
        return res.status(statusCode).json(data);
      }
      
      // Merge properties directly to response root, optionally attach message if not standard "Success"
      return res.status(statusCode).json({
        ...data,
        ...(message && message !== 'Success' ? { message } : {})
      });
    }

    return res.status(statusCode).json({ message, data });
  }

  /**
   * Standard error response structure - matches (body.message || body.error) in frontend parser
   * @param {object} res - Express response object
   * @param {string} message - Error description
   * @param {number} statusCode - HTTP status code
   * @param {any} [errors] - Specific validation errors details
   */
  static error(res, message = 'Error', statusCode = 500, errors = null) {
    const responsePayload = {
      message
    };
    
    if (errors) {
      responsePayload.errors = errors;
    }
    
    return res.status(statusCode).json(responsePayload);
  }
}
