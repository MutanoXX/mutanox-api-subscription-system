const jwtService = require('../services/jwtService');
module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) throw new Error('Sem token');
    req.user = await jwtService.verifyToken(token);
    next();
  } catch(e) { res.status(401).json({ error: 'Não autorizado' }); }
};