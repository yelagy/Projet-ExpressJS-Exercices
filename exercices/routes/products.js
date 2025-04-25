const express = require('express');
const router = express.Router();

// Données fictives pour les produits
let products = [
    { id: 1, name: 'Ordinateur', price: 999.99 },
    { id: 2, name: 'Smartphone', price: 499.99 }
];
let nextProductId = 3;

// GET /api/products - Récupérer tous les produits
router.get('/', (req, res) => {
    res.json(products);
});

// GET /api/products/:id - Récupérer un produit spécifique
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (!product) {
        return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.json(product);
});

// POST /api/products - Créer un nouveau produit
router.post('/', (req, res) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).json({ message: 'Le nom et le prix sont requis' });
    }
    const newProduct = { id: nextProductId++, name, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

module.exports = router;