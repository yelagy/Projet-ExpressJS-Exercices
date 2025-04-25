const express = require('express');
const app = express();
const port = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Liste en mémoire pour stocker les tâches
let tasks = [];
let nextId = 1;

// GET /tasks - Récupérer toutes les tâches
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// GET /tasks/:id - Récupérer une tâche spécifique
app.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) {
        return res.status(404).json({ message: 'Tâche non trouvée' });
    }
    res.json(task);
});

// POST /tasks - Créer une nouvelle tâche
app.post('/tasks', (req, res) => {
    const { title, completed = false } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Le titre est requis' });
    }
    const newTask = {
        id: nextId++,
        title,
        completed
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT /tasks/:id - Mettre à jour une tâche existante
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) {
        return res.status(404).json({ message: 'Tâche non trouvée' });
    }
    const { title, completed } = req.body;
    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;
    res.json(task);
});

// DELETE /tasks/:id - Supprimer une tâche
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Tâche non trouvée' });
    }
    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).json({ message: 'Route non trouvée' });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});