const express = require('express');
const app = express();
const port = 3000;

// Route principale
app.get('/', (req, res) => {
    res.send('Bonjour le monde');
});

// Route pour afficher la date et l'heure
app.get('/date', (req, res) => {
    const currentDate = new Date();
    res.send(`Date et heure actuelles : ${currentDate}`);
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});