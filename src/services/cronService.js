const cron = require('node-cron');
const subService = require('./subscriptionService');

module.exports = {
  start: () => {
    cron.schedule('0 0 * * *', async () => {
      console.log('Verificando expirações...');
      await subService.checkExpirations();
    });
  }
};