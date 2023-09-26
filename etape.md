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

MongoDb : Pour stocker les data <br>
Cloudinary : Pour stocker les images <br>
Upstash : Pour ??? <br>
Redis : Pour la mise en cache <br>

On configure la BDD avec Cloudinary pour stocker les image et la mise en cache avec Redis dans Node.js

On définis les variables d'environnement dans un fichier `.env`

On créer un dossier `utils` fonctions pour se connecter a MongoDb et Redis

## Backend error handling

On utilise MongoDb en local pour éviter le temps de connection quand on utilise la version cloud de mongoDb

J'ai donc installé mongoDb <br>
Créer une database avec :

- database name : Lms-v1
- collection name : Lms-v1

Et j'ai changé `DB_URL` dans mes variable d'environnement dans `.env` pour :
`DB_URL = 'mongodb://localhost:27017/Lms-v1'`

Cependant j'ai une erreur quand je me connecte

```bash
[INFO] 13:24:24 ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.1, typescript ver. 5.2.2)
Server is connected with port 8050
connect ECONNREFUSED ::1:27017
```

## Erreur rencontré

Quand je me connecte avec `npm run dev`
La console me répond :

```
[INFO] 13:24:24 ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.1, typescript ver. 5.2.2)
Server is connected with port 8050
connect ECONNREFUSED ::1:27017
```
