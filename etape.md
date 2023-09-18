## Projet Setup

Création du dossier server
NPM init

Création du dossier server
Initialisatation du projet avec `npm init`
Installation des dépendances `npm i bcryptjs cookie-parser cors dotenv express ioredis jsonwebtoken mongoose  ts-node-dev @types/bcryptjs @types/cookie-parser @types/cors @types/express @types/jsonwebtoken @types/node typescript`

Création des fichier :

- **app.ts** : importation du module express et exportation de app.ts vers server.ts
- **server.ts** : Création du serveur
- **.env** : Contient les variable d'environnement

Configuration du script `dev` dans le fichier `server\package.json` pour lancer le serveur avec la commande `npm run dev`

Cependant en lançant le serveur je rencontre une premiere erreur

```bash
[ERROR] 17:24:08 ⨯ Unable to compile TypeScript:
error TS5109: Option 'moduleResolution' must be set to 'NodeNext' (or left unspecified) when option 'module' is set to 'NodeNext'.
```

J'ai donc créer le fichier `server\tsconfig.json` pour annulé l'erreur grace a cette ligne de code
`"moduleResolution": "Node",`

Et ensuite quand je lance `npm run dev` j'ai cette erreur
`Error: listen EACCES: permission denied 5000;`
