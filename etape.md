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

## Erreur rencontré

Cependant en démarrant le serveur je rencontre une premiere erreur

```bash
[ERROR] 17:24:08 ⨯ Unable to compile TypeScript:
error TS5109: Option 'moduleResolution' must be set to 'NodeNext' (or left unspecified) when option 'module' is set to 'NodeNext'.
```

Pour résoudre cet erreur j'ai créé le fichier `server\tsconfig.json` pour annuler l'erreur grace à cette ligne de code
`"moduleResolution": "Node",`

Et ensuite quand je lance `npm run dev` j'ai une nouvelle erreur qui est survenue.
`Error: listen EACCES: permission denied 5000;`
J'ai tenté différent port mais l'erreur persiste ...
