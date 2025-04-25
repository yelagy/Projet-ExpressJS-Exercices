const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Chemin du fichier de log
const logFilePath = path.join(__dirname, 'access.log');

// Middleware de logging personnalisé
const requestLogger = (req, res, next) => {
    const date = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;
    const ip = req.ip || req.connection.remoteAddress;
    
    // Format du log
    const logMessage = `[${date}] ${method} ${url} - IP: ${ip}\n`;
    
    // Écrire dans le fichier de log de manière asynchrone
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Erreur lors de l\'écriture dans le fichier de log:', err);
        }
    });
    
    // Passer au middleware suivant
    next();
};

// Utiliser le middleware pour toutes les requêtes
app.use(requestLogger);

// Middleware pour parser le JSON
app.use(express.json());

// Route de test
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'application avec logging !');
});

// Route de test supplémentaire
app.get('/test', (req, res) => {
    res.json({ message: 'Ceci est une route de test' });
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).json({ message: 'Route non trouvée' });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});