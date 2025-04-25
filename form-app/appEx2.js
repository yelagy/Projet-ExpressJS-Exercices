const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Configurer le moteur de rendu EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware pour servir les fichiers statiques (images uploadées)
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Middleware pour parser les données du formulaire
app.use(express.urlencoded({ extended: true }));

// Configuration de Multer pour l'upload de fichiers
const uploadDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Seules les images JPEG, PNG et GIF sont autorisées'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limite à 5MB
});

// Route GET pour afficher le formulaire d'upload
app.get('/upload', (req, res) => {
    res.render('upload', { error: null, success: null });
});

// Route POST pour traiter l'upload de l'image
app.post('/upload', (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.render('upload', { error: 'L\'image dépasse la taille maximale de 5MB', success: null });
            }
            return res.render('upload', { error: 'Erreur lors de l\'upload : ' + err.message, success: null });
        } else if (err) {
            return res.render('upload', { error: err.message || 'Seules les images JPEG, PNG et GIF sont autorisées', success: null });
        }
        if (!req.file) {
            return res.render('upload', { error: 'Aucune image sélectionnée', success: null });
        }
        const success = 'Image uploadée avec succès !';
        res.render('upload', { error: null, success });
    });
});

// Route GET pour afficher la galerie
app.get('/gallery', (req, res) => {
    const images = fs.readdirSync(uploadDir).filter(file => {
        return ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(file).toLowerCase());
    });
    res.render('gallery', { images });
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).send('Page non trouvée');
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});