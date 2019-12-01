const express = require('express');
const router = new express.Router();
const dependencies = require('./routesDependencies').default;

router.get('/', dependencies.appInfo.fetchAppInfo);

module.exports = router;