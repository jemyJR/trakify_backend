/**
 * @swagger
 * components:
 *   schemas:
 *     Error401:
 *       type: object
 *       properties:
 *         code:
 *           type: number
 *           example: 401
 *         message:
 *           type: string
 *           example: Unauthorized
 *         details:
 *           type: string
 *           example: No token provided or invalid token
 *
 *     Error500:
 *       type: object
 *       properties:
 *         code:
 *           type: number
 *           example: 500
 *         message:
 *           type: string
 *           example: Internal Server Error
 *         details:
 *           type: string
 *           example: An unexpected error occurred
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   responses:
 *     Unauthorized:
 *       description: Unauthorized error.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error401'
 *     Forbidden:
 *       description: Forbidden error.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error403'
 *     InternalServerError:
 *       description: Internal server error.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error500'
 *     BadRequest:
 *       description: Bad Request error.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: number
 *                 example: 400
 *               message:
 *                 type: string
 *                 example: Bad Request
 *               details:
 *                 type: string
 *                 example: Validation error
 *     NotFound:
 *       description: Resource not found.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: number
 *                 example: 404
 *               message:
 *                 type: string
 *                 example: Not Found
 *               details:
 *                 type: string
 *                 example: Resource not found
 */
