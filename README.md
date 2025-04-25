# Projet ExpressJS : Exercices

Ce projet contient une série d'exercices pour apprendre à utiliser ExpressJS, organisés en sections thématiques. Chaque exercice est accompagné de captures d'écran dans le dossier `screen/` :
- **Captures de code** : Nommées `sc-ex<Chapitre><Exercice>` (ex. `I/sc-ex1`).
- **Captures de réponses/résultats** : Nommées `sr-ex<Chapitre><Exercice>` (ex. `I/sr-ex1`).# I - Introduction à ExpressJS

## Exercice 1 : Créer un serveur ExpressJS simple
**Description** : Création d'un serveur ExpressJS qui répond "Bonjour le monde" sur la route principale (`/`) et affiche la date et l'heure actuelles sur la route `/date`.

**Fichier** : `server.js`  
**Détails** :  
- Route `GET /` : Renvoie "Bonjour le monde".  
- Route `GET /date` : Renvoie la date et l'heure au format `Date et heure actuelles : <date>`.  
- Captures :  
  - Code : `screen/I/sc-ex1.png`  
  - Résultat : `screen/I/sr-ex1.png` (par exemple, affiche la réponse dans un navigateur ou Postman).

## Exercice 2 : Configuration d'un projet ExpressJS
**Description** : Création d'un projet ExpressJS avec une structure de répertoires, service de fichiers statiques, et routes variées (accueil, profil, date, API).

**Fichier** : `exercice2.js`  
**Détails** :  
- Routes :  
  - `GET /` : "Bienvenue sur l'application ExpressJS !".  
  - `GET /profil` : Page de profil utilisateur.  
  - `GET /date` : Date et heure actuelles.  
  - `GET /api/info` : Réponse JSON avec des informations.  
- Fichiers statiques servis depuis `public/`.  
- Captures :  
  - Code : `screen/I/sc-ex2.png`  
  - Résultat : `screen/I/sr-ex2.png` (par exemple, montre la réponse de `/api/info`).

# II - Routage avec ExpressJS

## Exercice 1 : Créer un ensemble de routes pour une API de gestion de tâches
**Description** : Création d'une API RESTful pour gérer des tâches avec des routes pour lister, récupérer, créer, mettre à jour et supprimer des tâches.

**Fichier** : `task-api.js`  
**Détails** :  
- Routes :  
  - `GET /tasks` : Liste toutes les tâches.  
  - `GET /tasks/:id` : Récupère une tâche par ID.  
  - `POST /tasks` : Crée une tâche (titre requis).  
  - `PUT /tasks/:id` : Met à jour une tâche.  
  - `DELETE /tasks/:id` : Supprime une tâche.  
- Données stockées en mémoire.  
- Captures :  
  - Code : `screen/II/sc-ex1.png`  
  - Résultat : `screen/II/sr-ex1.png` (par exemple, réponse JSON de `GET /tasks`).

## Exercice 2 : Implémenter des routes paramétrées
**Description** : Création d'une API pour un blog avec des routes paramétrées pour récupérer des articles par année/mois et par catégorie.

**Fichier** : `blog-api.js`  
**Détails** :  
- Routes :  
  - `GET /posts` : Liste tous les articles (par défaut).  
  - `GET /posts/:year` : Liste les articles d'une année.  
  - `GET /posts/:year/:month` : Liste les articles d'une année et d'un mois.  
  - `GET /categories/:categoryName/posts` : Liste les articles d'une catégorie.  
- Données fictives en mémoire.  
- Captures :  
  - Code : `screen/II/sc-ex2.png`  
  - Résultat : `screen/II/sr-ex2.png` (par exemple, réponse de `GET /posts/2023`).

# III - Les Middlewares dans ExpressJS

## Exercice 1 : Créer un middleware de logging personnalisé
**Description** : Création d'un middleware qui enregistre les détails des requêtes (méthode, URL, heure, IP) dans un fichier `access.log`.

**Fichier** : `logging-app.js`  
**Détails** :  
- Middleware `requestLogger` : Écrit les logs dans `access.log`.  
- Routes de test : `GET /` et `GET /test`.  
- Exemple de log : `[2025-04-25T12:34:56.789Z] GET / - IP: ::1`.  
- Captures :  
  - Code : `screen/III/sc-ex1.png`  
  - Résultat : `screen/III/sr-ex1.png` (par exemple, contenu de `access.log` ou console).

## Exercice 2 : Implémenter un middleware d'authentification simple
**Description** : Création d'un middleware qui vérifie un token dans l'en-tête `Authorization` pour protéger certaines routes.

**Fichier** : `auth-app.js`  
**Détails** :  
- Middleware `authMiddleware` : Vérifie un token statique (`Bearer mon-token-secret`).  
- Routes :  
  - `GET /` : Publique.  
  - `GET /protected` : Protégée (nécessite token).  
  - `POST /protected/data` : Protégée (accepte JSON).  
- Captures :  
  - Code : `screen/III/sc-ex2.png`  
  - Résultat : `screen/III/sr-ex2.png` (par exemple, réponse de `GET /protected` avec token).

## Exercice 3 : Intégrer plusieurs middlewares tiers
**Description** : Configuration d'une application avec `morgan` (logging), `cors` (cross-origin), et `compression` (compression des réponses).

**Fichier** : `middleware-app.js`  
**Détails** :  
- Middlewares :  
  - `morgan` : Logs des requêtes en console.  
  - `cors` : Autorise les requêtes cross-origin.  
  - `compression` : Compresse les réponses HTTP.  
- Routes :  
  - `GET /` : Message de bienvenue.  
  - `GET /large-data` : Réponse volumineuse pour tester la compression.  
  - `POST /cors-test` : Teste CORS.  
- Captures :  
  - Code : `screen/III/sc-ex3.png`  
  - Résultat : `screen/III/sr-ex3.png` (par exemple, logs de `morgan` ou réponse compressée).

# IV - Gestion des requêtes et réponses

## Exercice 1 : Créer un formulaire et traiter sa soumission avec ExpressJS
**Description** : Création d'une application avec un formulaire d'inscription (nom, email, mot de passe), validation des données, et affichage d'un message de confirmation.

**Fichier** : `form-app/app.js`  
**Détails** :  
- Routes :  
  - `GET /register` : Affiche le formulaire.  
  - `POST /register` : Traite la soumission avec validation (nom non vide, email valide, mot de passe ≥ 6 caractères).  
- Vue : `form-app/views/form.ejs` (formulaire avec messages d'erreur/succès).  
- Captures :  
  - Code : `screen/IV/sc-ex1.png`  
  - Résultat : `screen/IV/sr-ex1.png` (par exemple, formulaire avec message de succès).

## Exercice 2 : Implémenter un système d'upload de fichiers
**Description** : Création d'une application pour uploader des images (JPEG, PNG, GIF, ≤ 5MB) et afficher une galerie.

**Fichier** : `upload-app/app.js`  
**Détails** :  
- Routes :  
  - `GET /upload` : Affiche le formulaire d'upload.  
  - `POST /upload` : Traite l'upload avec `multer` (validation du type et de la taille).  
  - `GET /gallery` : Affiche les images uploadées.  
- Vues : `upload-app/views/upload.ejs`, `upload-app/views/gallery.ejs`.  
- Captures :  
  - Code : `screen/IV/sc-ex2.png`  
  - Résultat : `screen/IV/sr-ex2.png` (par exemple, galerie ou message d'erreur pour fichier trop grand).

## Exercice 3 : Créer une API qui répond en différents formats
**Description** : Création d'une API qui renvoie des données (liste d'utilisateurs) en JSON, XML, ou HTML selon l'en-tête `Accept`, en utilisant `res.format()`.

**Fichier** : `form-app/app.js`  
**Détails** :  
- Route : `GET /users` :  
  - `Accept: application/json` : Liste des utilisateurs en JSON.  
  - `Accept: application/xml` : Liste en XML.  
  - `Accept: text/html` : Tableau HTML.  
  - Autres : Erreur 406.  
- Données fictives : Liste d'utilisateurs en mémoire.  
- Captures :  
  - Code : `screen/IV/sc-ex3.png`  
  - Résultat : `screen/IV/sr-ex3.png` (par exemple, réponse HTML dans un navigateur ou JSON dans Postman).

## Instructions pour exécuter
1. Clonez ou téléchargez ce projet.
2. Pour chaque application (par exemple, `form-app`, `upload-app`, `format-api`) :
   - Accédez au dossier correspondant :
     ```bash
     cd form-app
     ```
   - Installez les dépendances :
     ```bash
     npm install
     ```
   - Lancez le serveur :
     ```bash
     node app.js
     ```
   - Testez les routes via un navigateur, Postman, ou cURL (voir les fichiers pour les URLs, généralement `http://localhost:3000`).
3. Consultez les captures d'écran dans `screen/` pour voir le code et les résultats.

## Dépendances
- `express` : Framework web.
- `ejs` : Moteur de rendu pour les formulaires et galeries.
- `multer` : Gestion des uploads de fichiers.
- `xmlbuilder2` : Génération de XML.
- Autres : `morgan`, `cors`, `compression` (pour les middlewares tiers).