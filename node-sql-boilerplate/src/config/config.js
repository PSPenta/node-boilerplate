let config = {};

config.db = {};
config.db.name = process.env.DB_NAME;
config.db.username = process.env.DB_USERNAME;
config.db.password = process.env.DB_PASSWORD;
config.db.host = process.env.DB_HOST || 'localhost';
config.db.dialect = process.env.DB_DIALECT;

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
