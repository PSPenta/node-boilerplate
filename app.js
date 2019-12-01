//Third Party Modules
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('mongo-morgan-ext');
const compression = require('compression');
const helmet = require('helmet');
const responseTime = require('response-time');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const utils = require('./src/helpers/utils');

require('dotenv').config();

//Local Modules
const {
  errorMessages
} = require('./src/helpers/responseMessages');
const config = require('./src/config/config');
const routes = require('./src/routes/routes');

require('./src/requireAllModels');

const app = express();

/* Security Middleware */
app.use(helmet());

/* Configuring port */
app.set('port', process.env.PORT || 8000);

app.disable('x-powered-by');

app.use(responseTime());

//Best practices app settings
app.set('title', 'PRDXN Node API');
app.set('query parser', `extended`);

const clientUrl = process.env.CLIENT_URL || config.client;

/* CORS Setting */
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", clientUrl);
  res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept, X-Powered-By");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, HEAD, PUT, DELETE, PATCH");
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

/**
 * @name Swagger Documentation
 * @description This is used for API documentation. It's not manadatory 
 *  */

const swaggerDefinition = config.swaggerDefinition;
const swaggerOptions = config.swaggerOptions;
const options = {
  swaggerDefinition,
  'apis': ['./src/routes/*.js'],
}

const swaggerSpec = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));

/* App activity logging */
app.use(morgan(':method :url :date :remote-addr :status :response-time'));
app.use(logger(config.db.url + config.db.name, "logs"));

/* Parsing Request Limits */
app.use(bodyParser.json({
  limit: '50mb'
}));

app.use(bodyParser.urlencoded({
  'limit': '50mb',
  'extended': true
}));

/**
 * @name compression
 * @description  This middleware will attempt to compress response bodies for all request that traverse through the middleware.
 */
app.use(compression());

/* Configuring Routes */
app.use('/api', routes);

/* Handling invalid route */
app.use('/', function (req, res) {
  res.status(404).send(utils.responseMsg(errorMessages.routeNotFound));
});

/**
 * Listening to port
 */
app.listen(app.get('port'), () => {
  console.log(`Find the server at port:${app.get('port')}`);
});

module.exports = app