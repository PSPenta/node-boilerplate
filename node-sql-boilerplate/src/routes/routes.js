const router = require('express').Router();
const dependencies = require('./routesDependencies').default;

/**
 * @swagger
 * /health-check:
 *  get:
 *    tags:
 *      - Server Health Check 
 *    name: Demo API
 *    summary: This is server health check API.
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: successfully send.
 *      500:
 *        description: Internal server error.
 */
router.get('/health-check', dependencies.serverHealth.checkHealth);

module.exports = router;
