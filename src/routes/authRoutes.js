const router = require('express').Router();
const dependencies = require('./routesDependencies').default;

/**
 * @swagger
 * /auth/login:
 *  get:
 *    tags:
 *      - Demo
 *    name: Demo App login api
 *    summary: This api sent user data and jwt token which leads to login process.
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: JWT token will be in response.
 *      500:
 *        description: Internal server error.
 */
router.get('/login', dependencies.authClient.login);

module.exports = router;