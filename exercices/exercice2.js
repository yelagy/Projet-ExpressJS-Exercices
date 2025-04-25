const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Configuration pour servir des fichiers statiques depuis le dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Route principale
app.get('/', (req, res) => {
    res.send('Bienvenue sur DWM!');
});

// Route pour afficher un profil utilisateur
app.get('/profil', (req, res) => {
    res.send('Page de profil utilisateur');
});

// Route pour afficher la date et l'heure actuelles
app.get('/date', (req, res) => {
    const dateActuelle = new Date();
    res.send(`Date et heure actuelles : ${dateActuelle}`);
});

// Route pour une API simple
app.get('/api/info', (req, res) => {
    res.json({
        message: 'Ceci est une API simple',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

// Gestion des erreurs 404 (page non trouvée)
app.use((req, res) => {
    res.status(404).send('Erreur 404 : Page non trouvée');
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});