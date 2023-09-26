## Projet Setup

Création du dossier "server"
Initialisatation du projet avec `npm init`
Installation des dépendances `npm i bcryptjs cookie-parser cors dotenv express ioredis jsonwebtoken mongoose  ts-node-dev @types/bcryptjs @types/cookie-parser @types/cors @types/express @types/jsonwebtoken @types/node typescript`

Création des fichiers :

`tsc --init` pour créer le fichier tsconfig.ts

- **app.ts** : importation du module express et exportation de app.ts vers server.ts
- **server.ts** : Création du serveur
- **.env** : Contient les variable d'environnement

Configuration du script `dev` dans le fichier `server\package.json` pour lancer le serveur avec la commande `npm run dev`

## Database, Cloudinary, Redis connection

Création des routes
MongoDb
Cloudinary
Upstash

On configure la BDD avec Cloudinary pour stocker les image et la mise en cache avec Redis dans Node.js

importer les dependances

définir les variables d'environnement

fonctions pour se connecter a MongoDb et Redis

gestion des erreur

Le caching avec Redis pour la gestion de l'authentification

## Backend error handling

On utilise MongoDb en local pour éviter le temps de connection quand on utilise la version en ligne.

J'ai donc installer mongoDb
Créer une database avec
database name : Lms-v1
collection name : Lms-v1

Et j'ai changé `DB_URL` dans mes variable d'environnement dans `.env`

## Erreur rencontré

Quand je me connecte avec `npm run dev`
La console me répond :

```
[INFO] 13:24:24 ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.1, typescript ver. 5.2.2)
Server is connected with port 8050
connect ECONNREFUSED ::1:27017
```
