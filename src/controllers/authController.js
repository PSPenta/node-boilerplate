const authService = require('../services/authServices');
const errorMsg = require('../helpers/errorMessage').errorMessages;
const utils = require('../helpers/utils');

exports.login = async (req, res) => {
  try {
    let message = {
      text: 'Login Successful.',
      token: authService.createToken({name : 'John Doe'})
    };
    res.send(utils.responseMsg(null, true, message));
  } catch (error) {
    console.error('error', error.stack);
    res.status(500).send(utils.responseMsg(errorMsg.internalServerError));
  }
};