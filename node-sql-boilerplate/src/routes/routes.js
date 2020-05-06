const router = require('express').Router();
const dependencies = require('./routesDependencies').default;

router.get('/', dependencies.appInfo.fetchAppInfo);

module.exports = router;
