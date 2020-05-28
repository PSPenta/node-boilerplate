let config = {};

config.db = {};
config.db.url = process.env.DB_URL;
config.db.name = process.env.DB_NAME;
config.db.username = process.env.DB_USERNAME;
config.db.password = process.env.DB_PASSWORD;
config.db.host = process.env.DB_HOST_IP;
config.db.port = process.env.DB_PORT;
config.db.dialect = process.env.DB_DIALECT;
config.client = process.env.CLIENT_URL || '*';

/* Swagger Definition */
config.swaggerDefinition = {
  'info': {
    'title': 'PRDXN Node API Boilerplate',
    'version': '1.0.0',
    'description': ''
  },
  'host': process.env.HOST || 'localhost:8000',
  'basePath': '/api',
  'securityDefinitions': {
    'bearerAuth': {
      'type': 'apiKey',
      'name': 'Authorization',
      'scheme': 'bearer',
      'in': 'header'
    }
  }
};
config.swaggerOptions = {
  'customSiteTitle': '[Project Title]',
  'customCss': '',
  'customfavIcon': ''
};

module.exports = config;
