const express = require('express');
const app = express();
const port = 3000;

// Importer les routeurs
const userRouter = require('./routes/users');
const productRouter = require('./routes/products');
const orderRouter = require('./routes/orders');

// Middleware pour parser le JSON
app.use(express.json());

// Utiliser les routeurs avec des préfixes
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

// Route principale
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API modulaire !');
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).json({ message: 'Route non trouvée' });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});