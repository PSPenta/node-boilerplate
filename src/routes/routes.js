const express = require('express');
const router = new express.Router();
const dependencies = require('./routesDependencies').default;

/**
 * @swagger
 * /health:
 *  get:
 *    tags:
 *      - Server Health Check 
 *    name: Server Health Check
 *    summary: This is api to check server health.
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
router.get('/health', dependencies.serverHealth.checkHealth);

module.exports = router;
