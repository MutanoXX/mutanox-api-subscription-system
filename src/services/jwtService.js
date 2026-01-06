const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');
const JWT_SECRET = process.env.JWT_SECRET || 'MutanoX-Secret';
const BLACKLIST_PATH = path.join(__dirname, '../../data/jwt_blacklist.json');

module.exports = {
  generateToken: async (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }),
  verifyToken: async (token) => {
    try {
      const blacklist = JSON.parse(await fs.readFile(BLACKLIST_PATH, 'utf8') || '[]');
      if(blacklist.some(x => x.token === token)) throw new Error('Token revogado');
      return jwt.verify(token, JWT_SECRET);
    } catch(e) { throw new Error('Token inválido'); }
  },
  blacklistToken: async (token) => {
    const blacklist = JSON.parse(await fs.readFile(BLACKLIST_PATH, 'utf8') || '[]');
    blacklist.push({ token, date: new Date() });
    await fs.writeFile(BLACKLIST_PATH, JSON.stringify(blacklist));
  }
};