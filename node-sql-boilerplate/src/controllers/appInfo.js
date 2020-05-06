const errorMsg = require('../helpers/errorMessage').errorMessages;
const utils = require('../helpers/utils');

exports.fetchAppInfo = (req, res) => {
  try {
    let message = {
      text: 'This is demo api for to test'
    };
    res.send(utils.responseMsg(null, true, message));
  } catch (error) {
    console.error(`error : ${error.stack}`);
    res.status(500).send(utils.responseMsg(errorMsg.internalServerError));
  }
};
