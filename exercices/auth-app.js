const express = require('express');
const app = express();
const port = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Middleware d'authentification
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    
    // Vérifier si le token est présent et valide
    if (!token) {
        return res.status(401).json({ message: 'Aucun token fourni' });
    }
    
    // Token statique pour l'exemple (dans la réalité, vérifier avec JWT ou base de données)
    const validToken = 'DWM-@-2025';
    if (token !== `Bearer ${validToken}`) {
        return res.status(403).json({ message: 'Token invalide' });
    }
    
    // Token valide, passer au middleware suivant
    next();
};

// Route publique (accessible sans authentification)
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API avec authentification !');
});

// Route protégée (nécessite un token valide)
app.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'Accès autorisé à la route protégée !' });
});

// Route protégée pour tester une action avec données
app.post('/protected/data', authMiddleware, (req, res) => {
    const { data } = req.body;
    if (!data) {
        return res.status(400).json({ message: 'Données requises' });
    }
    res.json({ message: 'Données reçues', data });
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).json({ message: 'Route non trouvée' });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});