const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig').default;
const rid = require('rid');

/**
 * 
 * @param {string} logTableName - table name in which logs is going to be saved
 * @description Returns the instance of logging table
 */
function getTableInstance(logTableName) {
  const Log = sequelize.define(logTableName, {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    requestId: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.INTEGER,
    },
    method: {
      type: DataTypes.STRING,
    },
    remoteUser: {
      type: DataTypes.STRING,
    },
    remoteAddress: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    httpversion: {
      type: DataTypes.STRING,
    },
    responseTime: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.STRING,
    },
    request: {
      type: DataTypes.TEXT,
    },
    response: {
      type: DataTypes.TEXT,
    },
  });

  sequelize.sync({ alter: true }).then(
    () => {
      console.log(`${logTableName} is connected and synced.`);
    },
    (err) => {
      console.log(`Error occured while connecting ${logTableName} : ` + err);
    }
  );
  return Log;
}

/**
 *
 * @param {Express.Request} req - Request Object
 * @param {Express.Response} res - Response Object
 * @description Returns Response time
 */
function getResponseTimeToken(req, res) {
  if (!req._startAt || !res._startAt) {
    // missing request and/or response start time
    return '-';
  }

  // calculate diff
  var ms =
    (res._startAt[0] - req._startAt[0]) * 1e3 +
    (res._startAt[1] - req._startAt[1]) * 1e-6;

  // return truncated value
  return ms.toFixed(3);
}

/**
 *
 * @param {Express.Request} req - Request Object
 * @param {string} field - Field from request object.
 * @description Returns field value from request object.
 */
function getRequestToken(req, field) {
  // get header
  var header = req.headers[field.toLowerCase()];

  return Array.isArray(header) ? header.join(', ') : header;
}

/**
 *
 * @param {Express.Response} res  - Response Object
 * @param {string} field - Field from request object.
 * @description Returns field value from response object.
 */
function getResponseHeader(res, field) {
  if (!headersSent(res)) {
    return undefined;
  }

  // get header
  var header = res.getHeader(field);

  return Array.isArray(header) ? header.join(', ') : header;
}

/**
 * @param {Express.Response} res - Provide response object to verify
 * @description Returns boolean of res.header.
 */
function headersSent(res) {
  return typeof res.headersSent !== 'boolean'
    ? Boolean(res._header)
    : res.headersSent;
}

/**
 * @param [tableName] {String} - Table name as string where logs will be stored. Word will automatically be pluralize so provide singular word.
 * @description Middleware which makes logs and store it in sql data table.
 */
module.exports = function logger(tableName) {
  try {
    const Log = getTableInstance(tableName || 'logs');
    return async (req, res, next) => {
      try {
        res.on('finish', async () => {
          const logObject = {
            requestId: rid(),
            status: res.statusCode,
            method: req.method,
            remoteUser: '-',
            remoteAddress:
              req.ip ||
              req._remoteAddress ||
              (req.connection && req.connection.remoteAddress) ||
              undefined,
            url: req.originalUrl || req.url,
            httpversion: req.httpVersionMajor + '.' + req.httpVersionMinor,
            responseTime: getResponseTimeToken(req, res),
            date: new Date().toUTCString(),
            request: JSON.stringify({
              Accept: getRequestToken(req, 'Accept'),
              'Accept-Charset': getRequestToken(req, 'Accept-Charset'),
              'Accept-Encoding': getRequestToken(req, 'Accept-Encoding'),
              'Accept-Language': getRequestToken(req, 'Accept-Language'),
              Authorization: getRequestToken(req, 'Authorization'),
              'Cache-Control': getRequestToken(req, 'Cache-Control'),
              Connection: getRequestToken(req, 'Connection'),
              Cookie: getRequestToken(req, 'Cookie'),
              'Content-Length': getRequestToken(req, 'Content-Length'),
              'Content-MD5': getRequestToken(req, 'Content-MD5'),
              'Content-Type': getRequestToken(req, 'Content-Type'),
              Expect: getRequestToken(req, 'Expect'),
              Forwarded: getRequestToken(req, 'Forwarded'),
              From: getRequestToken(req, 'From'),
              Host: getRequestToken(req, 'Host'),
              'Max-Forwards': getRequestToken(req, 'Max-Forwards'),
              Origin: getRequestToken(req, 'Origin'),
              Pragma: getRequestToken(req, 'Pragma'),
              'Proxy-Authorization': getRequestToken(
                req,
                'Proxy-Authorization'
              ),
              Range: getRequestToken(req, 'Range'),
              TE: getRequestToken(req, 'TE'),
              'User-Agent': getRequestToken(req, 'User-Agent'),
              Via: getRequestToken(req, 'Via'),
              Warning: getRequestToken(req, 'Warning'),
              Upgrade: getRequestToken(req, 'Upgrade'),
              Referer: getRequestToken(req, 'Referer'),
              Date: getRequestToken(req, 'Date'),
              'X-requested-with': getRequestToken(req, 'X-requested-with'),
              'X-Csrf-Token': getRequestToken(req, 'X-Csrf-Token'),
              'X-UIDH': getRequestToken(req, 'X-UIDH'),
              'Proxy-Connection': getRequestToken(req, 'Proxy-Connection'),
              'X-Wap-Profile': getRequestToken(req, 'X-Wap-Profile'),
              'X-ATT-DeviceId': getRequestToken(req, 'X-ATT-DeviceId'),
              'X-Http-Method-Override': getRequestToken(
                req,
                'X-Http-Method-Override'
              ),
              'Front-End-Https': getRequestToken(req, 'Front-End-Https'),
              'X-Forwarded-Proto': getRequestToken(req, 'X-Forwarded-Proto'),
              'X-Forwarded-Host': getRequestToken(req, 'X-Forwarded-Host'),
              'X-Forwarded-For': getRequestToken(req, 'X-Forwarded-For'),
              DNT: getRequestToken(req, 'DNT'),
              'Accept-Datetime': getRequestToken(req, 'Accept-Datetime'),
              'If-Match': getRequestToken(req, 'If-Match'),
              'If-Modified-Since': getRequestToken(req, 'If-Modified-Since'),
              'If-None-Match': getRequestToken(req, 'If-None-Match'),
              'If-Range': getRequestToken(req, 'If-Range'),
              'If-Unmodified-Since': getRequestToken(
                req,
                'If-Unmodified-Since'
              ),
            }),
            response: JSON.stringify({
              Status: getResponseHeader(res, 'Status'),
              'Content-MD5': getResponseHeader(res, 'Content-MD5'),
              'X-Frame-Options': getResponseHeader(res, 'X-Frame-Options'),
              'Accept-Ranges': getResponseHeader(res, 'Accept-Ranges'),
              Age: getResponseHeader(res, 'Age'),
              Allow: getResponseHeader(res, 'Allow'),
              'Cache-Control': getResponseHeader(res, 'Cache-Control'),
              Connection: getResponseHeader(res, 'Connection'),
              'Content-Disposition': getResponseHeader(
                res,
                'Content-Disposition'
              ),
              'Content-Encoding': getResponseHeader(res, 'Content-Encoding'),
              'Content-Language': getResponseHeader(res, 'Content-Language'),
              'Content-Length': getResponseHeader(res, 'Content-Length'),
              'Content-Location': getResponseHeader(res, 'Content-Location'),
              'Content-Range': getResponseHeader(res, 'Content-Range'),
              'Content-Type': getResponseHeader(res, 'Content-Type'),
              Date: getResponseHeader(res, 'Date'),
              'Last-Modified': getResponseHeader(res, 'Last-Modified'),
              Link: getResponseHeader(res, 'Link'),
              Location: getResponseHeader(res, 'Location'),
              P3P: getResponseHeader(res, 'P3P'),
              Pragma: getResponseHeader(res, 'Pragma'),
              'Proxy-Authenticate': getResponseHeader(
                res,
                'Proxy-Authenticate'
              ),
              'Public-Key-Pins': getResponseHeader(res, 'Public-Key-Pins'),
              'Retry-After': getResponseHeader(res, 'Retry-After'),
              Server: getResponseHeader(res, 'Server'),
              Trailer: getResponseHeader(res, 'Trailer'),
              'Transfer-Encoding': getResponseHeader(res, 'Transfer-Encoding'),
              TSV: getResponseHeader(res, 'TSV'),
              Upgrade: getResponseHeader(res, 'Upgrade'),
              Vary: getResponseHeader(res, 'Vary'),
              Via: getResponseHeader(res, 'Via'),
              Warning: getResponseHeader(res, 'Warning'),
              'WWW-Authenticate': getResponseHeader(res, 'WWW-Authenticate'),
              Expires: getResponseHeader(res, 'Expires'),
              'Set-Cookie': getResponseHeader(res, 'Set-Cookie'),
              'Strict-Transport-Security': getResponseHeader(
                res,
                'Strict-Transport-Security'
              ),
              Refresh: getResponseHeader(res, 'Refresh'),
              'Access-Control-Allow-Origin': getResponseHeader(
                res,
                'Access-Control-Allow-Origin'
              ),
              'X-XSS-Protection': getResponseHeader(res, 'X-XSS-Protection'),
              'X-WebKit-CSP': getResponseHeader(res, 'X-WebKit-CSP'),
              'X-Content-Security-Policy': getResponseHeader(
                res,
                'X-Content-Security-Policy'
              ),
              'Content-Security-Policy': getResponseHeader(
                res,
                'Content-Security-Policy'
              ),
              'X-Content-Type-Options': getResponseHeader(
                res,
                'X-Content-Type-Options'
              ),
              'X-Powered-By': getResponseHeader(res, 'X-Powered-By'),
              'X-UA-Compatible': getResponseHeader(res, 'X-UA-Compatible'),
              'X-Content-Duration': getResponseHeader(
                res,
                'X-Content-Duration'
              ),
              'Upgrade-Insecure-Requests': getResponseHeader(
                res,
                'Upgrade-Insecure-Requests'
              ),
              'X-Request-ID': getResponseHeader(res, 'X-Request-ID'),
              ETag: getResponseHeader(res, 'ETag'),
              'Accept-Patch': getResponseHeader(res, 'Accept-Patch'),
            }),
          };
          await Log.create(logObject);
        });
        next();
      } catch (error) {
        console.error(error);
        next();
      }
    };
  } catch (error) {
    console.error(error);
  }
};
