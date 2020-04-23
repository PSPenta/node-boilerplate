const express = require('express');
const router = new express.Router();
const dependencies = require('./routesDependencies').default;

/**
 * @swagger
 * /:
 *  get:
 *    tags:
 *      - Demo 
 *    name: Demo API
 *    summary: This is demo api for to unit test.
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
router.get('/', dependencies.appInfo.fetchAppInfo);

module.exports = router;
