const fs = require('fs').promises;
const path = require('path');
const KEYS_PATH = path.join(__dirname, '../../data/keys.json');

module.exports = {
  loadKeys: async () => JSON.parse(await fs.readFile(KEYS_PATH, 'utf8') || '[]'),
  saveKeys: async (keys) => await fs.writeFile(KEYS_PATH, JSON.stringify(keys, null, 2)),

  checkExpirations: async () => {
    const keys = await module.exports.loadKeys();
    const now = new Date();
    keys.forEach(key => {
      if(key.subscription?.enabled && new Date(key.subscription.endDate) < now) {
        key.isActive = false;
        key.subscription.status = 'expired';
      }
    });
    await module.exports.saveKeys(keys);
  }
};