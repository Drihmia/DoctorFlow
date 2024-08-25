import router from './SessionRoutes';
import AuthenticationController from '../controllers/AuthenticationController';
import AuthMiddleware from '../middlewares/authMiddleware';

/**
 * @swagger
 * /connect:
 *   get:
 *     summary: Connect a dev and create a session token - for dev.
 *     description: |
 *       Authenticates a dev using Basic Auth credentials in the format `email:password`,
 *        where the credentials are base64 encoded. On successful authentication,
 *        a session token is generated and returned.
 *
 *       **Authentication:**
 *       - Basic Auth is required with credentials in the format `email:password` encoded in Base64.
 *
 *       **Request Headers:**
 *       - `Authorization` (header, required): Basic Authentication credentials encoded in Base64.
 *        Example: `Basic dXNlcjpzZWNyZXQxMjM=`
 *
 *       **Response:**
 *       - On success: Returns the session token for the authenticated dev.
 *       - On error: |
 *        Provides details about missing credentials, invalid credentials, or server issues.
 *     tags:
 *       - Devs
 *     security:
 *       - basicAuth: []
 *     responses:
 *       '200':
 *         description: Successfully authenticated the dev and created a session token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The session token for the authenticated dev
 *                   example: "84f86045-a8a6-4ef1-bbbd-b4c9c4796be7"
 *       '400':
 *         description: Bad Request - Missing email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating missing email or password
 *                   example: "Bad Request: Missing email or password"
 *       '401':
 *         description: Unauthorized - Invalid credentials or wrong password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating missing or invalid Authorization header,
 *                    or wrong credentials or password
 *                   example: "Unauthorized: Missing or invalid Authorization header"
 *       '404':
 *         description: Not Found - Dev not registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the dev was not found
 *                   example: "Dev not found"
 *       '500':
 *         description: Internal Server Error - Unexpected error during authentication
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating an internal server error
 *                   example: "Internal Server Error"
 */
router.get('/connect', AuthenticationController.connectDev);

/**
 * @swagger
 * /disconnect:
 *   get:
 *     summary: Disconnect a dev by removing their session token - for dev.
 *     description: |
 *       Logs out a dev by deleting their session token from Redis,
 *        effectively ending their session. This endpoint requires the dev to be
 *        authenticated with a valid session token.
 *
 *       **Authentication:**
 *       - Token-based authentication is used,
 *        where the token should be passed in the `X-Token` header.
 *       - The `X-Token` value must be a valid session token issued during login.
 *       - Requires a role of `dev`.
 *
 *       **Request Parameters:**
 *       - `x-token` (header, required): The authentication token used for authorization.
 *
 *     tags:
 *       - Devs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: x-token
 *         in: header
 *         description: Token used for authentication.
 *         required: true
 *         schema:
 *           type: string
 *           example: "b14c9f0e-2a15-40f6-8187-f4c5ad4638c5"
 *     responses:
 *       '200':
 *         description: Successfully disconnected the dev
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: |
 *                    Success message indicating that the dev has been successfully disconnected
 *                   example: "Successfully disconnected"
 *       '400':
 *         description: Bad Request - Missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating a missing or invalid token
 *                   example: "Bad Request: Missing token"
 *       '401':
 *         description: Unauthorized - Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating an invalid or expired token
 *                   example: "Unauthorized: Invalid or expired token"
 *       '500':
 *         description: Internal Server Error - Unexpected error during disconnection
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating an internal server error
 *                   example: "Internal Server Error: Unexpected error"
 */
router.get('/disconnect', AuthMiddleware({ role: 'dev' }), AuthenticationController.disconnect);

export default router;
