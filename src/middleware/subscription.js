const subService = require('../services/subscriptionService');
module.exports = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if(!apiKey) return res.status(401).json({error: 'API Key necessária'});

  const keys = await subService.loadKeys();
  const key = keys.find(k => k.apiKey === apiKey);

  if(!key || !key.isActive) return res.status(403).json({error: 'Key inválida ou expirada'});

  if(key.subscription?.enabled) {
    if(new Date(key.subscription.endDate) < new Date()) {
      return res.status(402).json({error: 'Assinatura expirada. Renove para continuar.'});
    }
  }

  req.apiKey = key;
  next();
};