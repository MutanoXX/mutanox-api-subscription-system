const jwtService = require('../services/jwtService');
const ADMIN_KEY = process.env.ADMIN_API_KEY || 'MutanoX3397';

exports.validate = async (req, res) => {
  if(req.body.apiKey === ADMIN_KEY) {
    const token = await jwtService.generateToken({ role: 'admin' });
    return res.json({ valid: true, token });
  }
  res.status(401).json({ valid: false });
};
exports.logout = async (req, res) => {
  /* Implementar blacklist */
  res.json({ success: true });
};