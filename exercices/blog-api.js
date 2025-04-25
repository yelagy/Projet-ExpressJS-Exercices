const express = require('express');
const app = express();
const port = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Données fictives pour les articles
const posts = [
    { id: 1, title: "Découverte de Node.js", year: 2023, month: 5, category: "Technologie" },
    { id: 2, title: "Les bases d'Express", year: 2023, month: 6, category: "Technologie" },
    { id: 3, title: "Recette de gâteau", year: 2024, month: 1, category: "Cuisine" },
    { id: 4, title: "Voyage à Paris", year: 2024, month: 3, category: "Voyage" },
    { id: 5, title: "Astuces JavaScript", year: 2025, month: 2, category: "Technologie" }
];

// GET /posts - Récupérer des articles par défaut (tous les articles)
app.get('/posts', (req, res) => {
    res.json(posts);
});

// GET /posts/:year - Récupérer les articles d'une année
app.get('/posts/:year', (req, res) => {
    const year = parseInt(req.params.year);

    if (isNaN(year)) {
        return res.status(400).json({ message: 'L\'année doit être un nombre valide' });
    }

    const filteredPosts = posts.filter(post => post.year === year);

    if (filteredPosts.length === 0) {
        return res.status(404).json({ message: 'Aucun article trouvé pour cette année' });
    }

    res.json(filteredPosts);
});

// GET /posts/:year/:month - Récupérer les articles d'une année et d'un mois spécifique
app.get('/posts/:year/:month', (req, res) => {
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);

    if (isNaN(year)) {
        return res.status(400).json({ message: 'L\'année doit être un nombre valide' });
    }
    if (isNaN(month) || month < 1 || month > 12) {
        return res.status(400).json({ message: 'Le mois doit être un nombre valide entre 1 et 12' });
    }

    const filteredPosts = posts.filter(post => post.year === year && post.month === month);

    if (filteredPosts.length === 0) {
        return res.status(404).json({ message: 'Aucun article trouvé pour ces critères' });
    }

    res.json(filteredPosts);
});

// GET /categories/:categoryName/posts - Récupérer les articles d'une catégorie spécifique
app.get('/categories/:categoryName/posts', (req, res) => {
    const categoryName = req.params.categoryName;
    const filteredPosts = posts.filter(post => post.category.toLowerCase() === categoryName.toLowerCase());

    if (filteredPosts.length === 0) {
        return res.status(404).json({ message: `Aucun article trouvé pour la catégorie ${categoryName}` });
    }

    res.json(filteredPosts);
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).json({ message: 'Route non trouvée' });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});