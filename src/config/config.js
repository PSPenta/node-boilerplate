let config = {};

config.db = {};
config.db.url = process.env.DB_URL || 'mongodb://localhost:27017/';
config.db.name = process.env.DB_NAME || 'vsg';
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
