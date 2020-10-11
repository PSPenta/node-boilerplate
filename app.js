//Third Party Modules
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const responseTime = require("response-time");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const dotenvFlow = require("dotenv-flow");
const client = require("redis").createClient();
const cors = require("cors");
const passport = require("passport");

dotenvFlow.config();
console.info(" Current Environment ===>", process.env.NODE_ENV);

//Local Modules
const utils = require("./src/helpers/utils");
const { errorMessages } = require("./src/helpers/errorMessage");
const config = require("./src/config/config");
const routes = require("./src/routes/routes");

/* Passport.js initialization */
require("./src/services/authServices");
passport.initialize();

require("./src/requireAllModels");

const app = express();

/* Security Middleware */
app.use(helmet());

/* Configuring port */
app.set("port", process.env.PORT || 8000);

app.disable("x-powered-by");

app.use(responseTime());

//Best practices app settings
app.set("title", "Node API");
app.set("query parser", "extended");

const clientUrl = process.env.CLIENT_URL || config.client;

/* Importing database connection when server starts **/
require("./src/config/dbConfig");

/* CORS Setting */
const corsOption = {
  origin: clientUrl,
  optionsSuccessStatus: 200,
  methods: ["POST", "GET", "OPTIONS", "HEAD", "PUT", "DELETE", "PATCH"],
  allowedHeaders: "*",
  preflightContinue: true,
};
app.use(cors(corsOption));
app.options("*", cors());

/**
 * @name Swagger Documentation
 * @description This is used for API documentation. It's not mandatory
 *  */
const swaggerDefinition = config.swaggerDefinition;
const swaggerOptions = config.swaggerOptions;
const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerOptions)
);

/* App activity logging */
app.use(morgan(":method :url :date :remote-addr :status :response-time"));

/* Parsing Request Limits */
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

/**
 * @name express-status-monitor
 * @description This middleware will report realtime server metrics for Express-based node servers.
 * Run server and go to /status
 * For further information: https://www.npmjs.com/package/express-status-monitor
 */
app.use(require("express-status-monitor")());

/**
 * @name compression
 * @description  This middleware will attempt to compress response bodies for all request that traverse through the middleware.
 */
app.use(compression());

/* API rate limit configuration. */
const limiter = require("express-limiter")(app, client);
const apiRateLimit = require("./src/services/apiRateLimit").rateLimit;
const limitCount = process.env.RATE_LIMIT_COUNT || 10,
  limitMinute = process.env.RATE_LIMIT_MINUTE || 1;

/* Configuring Routes */
app.use("/api", apiRateLimit(limiter, limitCount, limitMinute), routes);

/* Handling invalid route */
app.use("/", function (req, res) {
  res.status(404).send(utils.responseMsg(errorMessages.routeNotFound));
});

/**
 * Listening to port
 */
app.listen(app.get("port"), () => {
  console.info(`Find the server at port:${app.get("port")}`);
});

module.exports = app;
