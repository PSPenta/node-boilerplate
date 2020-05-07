const errorMsg = require('../helpers/errorMessage').errorMessages;
const utils = require('../helpers/utils');

exports.checkHealth = (req, res) => {
  try {
    let message = {
      'text': 'This is server health check API.'
    };
    res.send(utils.responseMsg(null, true, message));
  } catch (error) {
    console.error('error', error.stack);
    res.status(500).send(utils.responseMsg(errorMsg.internalServerError));
  }
};

