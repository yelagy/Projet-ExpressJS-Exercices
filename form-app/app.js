const express = require('express');
const { create } = require('xmlbuilder2');
const app = express();
const port = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Données fictives pour l'exemple
const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// Route GET pour récupérer les utilisateurs dans différents formats
app.get('/users', (req, res) => {
    res.format({
        'application/json': () => {
            res.json(users);
        },
        'application/xml': () => {
            const xmlObj = { users: { user: users } };
            const xml = create(xmlObj).end({ prettyPrint: true });
            res.type('application/xml').send(xml);
        },
        'text/html': () => {
            let html = `
                <!DOCTYPE html>
                <html lang="fr">
                <head>
                    <meta charset="UTF-8">
                    <title>Liste des utilisateurs</title>
                    <style>
                        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
                        table { width: 100%; border-collapse: collapse; }
                        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
                        th { background-color: #f2f2f2; }
                    </style>
                </head>
                <body>
                    <h2>Liste des utilisateurs</h2>
                    <table>
                        <tr><th>ID</th><th>Nom</th><th>Email</th></tr>
            `;
            users.forEach(user => {
                html += `<tr><td>${user.id}</td><td>${user.name}</td><td>${user.email}</td></tr>`;
            });
            html += `
                    </table>
                </body>
                </html>
            `;
            res.type('text/html').send(html);
        },
        default: () => {
            res.status(406).json({ message: 'Format non supporté. Utilisez JSON, XML ou HTML.' });
        }
    });
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).json({ message: 'Route non trouvée' });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});