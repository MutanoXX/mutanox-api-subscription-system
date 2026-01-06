const helmet = require('helmet');
const validator = require('validator');

exports.securityHeaders = helmet({ contentSecurityPolicy: false });
exports.sanitizeInput = (req, res, next) => {
  if(req.body) Object.keys(req.body).forEach(k => {
    if(typeof req.body[k] === 'string') req.body[k] = validator.escape(req.body[k]);
  });
  next();
};