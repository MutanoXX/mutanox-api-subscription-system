const rateLimit = require('express-rate-limit');
exports.loginLimiter = rateLimit({ windowMs: 15*60*1000, max: 5 });
exports.adminLimiter = rateLimit({ windowMs: 60*1000, max: 500 });