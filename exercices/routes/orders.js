const express = require('express');
const router = express.Router();

// Données fictives pour les commandes
let orders = [
    { id: 1, userId: 1, productId: 1, quantity: 2 },
    { id: 2, userId: 2, productId: 2, quantity: 1 }
];
let nextOrderId = 3;

// GET /api/orders - Récupérer toutes les commandes
router.get('/', (req, res) => {
    res.json(orders);
});

// GET /api/orders/:id - Récupérer une commande spécifique
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const order = orders.find(o => o.id === id);
    if (!order) {
        return res.status(404).json({ message: 'Commande non trouvée' });
    }
    res.json(order);
});

// POST /api/orders - Créer une nouvelle commande
router.post('/', (req, res) => {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || !quantity) {
        return res.status(400).json({ message: 'L\'ID utilisateur, l\'ID produit et la quantité sont requis' });
    }
    const newOrder = { id: nextOrderId++, userId, productId, quantity };
    orders.push(newOrder);
    res.status(201).json(newOrder);
});

module.exports = router;