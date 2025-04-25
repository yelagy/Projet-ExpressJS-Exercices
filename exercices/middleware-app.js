const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const app = express();
const port = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// 1. Morgan - Logging des requêtes (exécuté en premier pour capturer toutes les requêtes)
app.use(morgan('combined')); // Format 'combined' pour des logs détaillés

// 2. CORS - Autoriser les requêtes cross-origin
app.use(cors({
    origin: '*', // Autoriser toutes les origines (à ajuster pour la production)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. Compression - Compresser les réponses HTTP
app.use(compression());

// Route publique
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'application avec middlewares tiers !');
});

// Route pour tester une réponse volumineuse (bénéficie de la compression)
app.get('/large-data', (req, res) => {
    // Générer une réponse volumineuse pour tester la compression
    const largeResponse = {
        message: 'Données volumineuses',
        data: Array(1000).fill('Texte répétitif pour simuler une grande réponse.')
    };
    res.json(largeResponse);
});

// Route pour tester CORS (accessible depuis un autre domaine)
app.post('/cors-test', (req, res) => {
    const { data } = req.body;
    if (!data) {
        return res.status(400).json({ message: 'Données requises' });
    }
    res.json({ message: 'Requête CORS réussie', data });
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).json({ message: 'Route non trouvée' });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});