const express = require('express');
const router = express.Router();

// Données fictives pour les utilisateurs
let users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' }
];
let nextUserId = 3;

// GET /api/users - Récupérer tous les utilisateurs
router.get('/', (req, res) => {
    res.json(users);
});

// GET /api/users/:id - Récupérer un utilisateur spécifique
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(user);
});

// POST /api/users - Créer un nouvel utilisateur
router.post('/', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: 'Le nom et l\'email sont requis' });
    }
    const newUser = { id: nextUserId++, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

module.exports = router;