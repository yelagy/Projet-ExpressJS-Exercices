const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Configurer le moteur de rendu EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware pour parser les données du formulaire
app.use(express.urlencoded({ extended: true }));

// Middleware pour servir les fichiers statiques (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Route GET pour afficher le formulaire
app.get('/register', (req, res) => {
    res.render('form', { error: null, success: null, name: '', email: '' });
});

// Route POST pour traiter la soumission du formulaire
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Validation des données
    let error = null;
    if (!name || name.trim() === '') {
        error = 'Le nom est requis';
    } else if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        error = 'L\'email doit être valide';
    } else if (!password || password.length < 6) {
        error = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    if (error) {
        return res.render('form', { error, success: null, name: name || '', email: email || '' });
    }

    // Si validation réussie, afficher un message de confirmation
    const success = `Inscription réussie pour ${name} (${email}) !`;
    res.render('form', { error: null, success, name: '', email: '' });
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).send('Page non trouvée');
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});