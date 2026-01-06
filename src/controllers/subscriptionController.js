const subService = require('../services/subscriptionService');

exports.getStats = async (req, res) => {
  const keys = await subService.loadKeys();
  res.json({
    total: keys.length,
    active: keys.filter(k => k.isActive).length,
    revenue: 0 // Calcular real
  });
};