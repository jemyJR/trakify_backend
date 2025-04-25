/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated unique identifier
 *           example: "65a1bfae1f3a0b7b7c7a123"
 *         name:
 *           type: string
 *           description: User's full name
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: "john.doe@example.com"
 *         password:
 *           type: string
 *           description: Hashed password
 *           example: "$2b$10$E3RxG4rX7dU7TZIzUy7Yje"
 *         image:
 *           type: string
 *           description: URL of the user's profile image
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Auto-generated creation timestamp
 *           example: "2024-01-15T14:48:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Auto-generated update timestamp
 *           example: "2024-01-16T09:15:00.000Z"
 *       example:
 *         _id: "65a1bfae1f3a0b7b7c7a123"
 *         name: "John Doe"
 *         email: "john.doe@example.com"
 *         createdAt: "2024-01-15T14:48:00.000Z"
 *         updatedAt: "2024-01-16T09:15:00.000Z"
 */
