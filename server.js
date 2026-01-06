const express = require('express');
const path = require('path');
const cronService = require('./src/services/cronService');
const adminRoutes = require('./src/routes/admin');
const subscriptionMiddleware = require('./src/middleware/subscription');
const { securityHeaders, sanitizeInput } = require('./src/middleware/security');

const app = express();
const PORT = process.env.PORT || 8080;

// Configurações Básicas
app.use(express.json());
app.use(securityHeaders);
app.use(sanitizeInput);

// Rota de Health Check
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// Rotas Admin
app.use('/api/admin', adminRoutes);

// Servir Dashboard
app.get('/api/dashboard/apikeys', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Exemplo de Rota Protegida com Assinatura
app.get('/api/exemplo-protegido', subscriptionMiddleware, (req, res) => {
  res.json({ mensagem: 'Acesso permitido!', key: req.apiKey.name });
});

// Iniciar Cron Service
cronService.start();

app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
});
