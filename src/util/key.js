const crypto = require('crypto');

const sessionKey = crypto.randomBytes(64).toString('hex');

module.exports = {
  cookieKey: sessionKey
};
