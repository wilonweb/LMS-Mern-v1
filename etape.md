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

Ensuite on créer le code pour gerer les erreur et rendre le code maintenable

creation de `server\utils\ErrorHandler.ts` contenant la classe `ErrorHandler` permettant de créer des objet d'erreur personalisé

Creation du dossier `server\middleware\`

Puis du fichier `server\middleware\error.ts` pour gerer divers type d'erreurs et envoyer des reponse d'erreur coherente aux clients avec un statut et un message

Et de `server\middleware\catchAsyncError.ts` pour gerer les erreurs asynchrone qui se produise

`server\utils\redis.ts` Configuration d'une instance de Redis qui genere une erreur si l'url n'est pas confoguré dans les variable d'environnement.

## User Model Design

Nous créons un model utilisateur destinée à être utilisé dans le cadre de la gestion des utilisateurs et de l'authentification

Création du dossier `server\models`et du fichier `server\models\user.model.ts` pour définir un model de donnée pour les utilisateur
avec le hachage pour crypter le mot de passe,
et une methode pour comparer les mot de passe lors d'une autentification utilisateurs.

## User Registration

Nous allons créer la fonction controlleur permetant d'enregistrer un nouvel utilisateur.

creation de `server\controllers\user.controller.ts` pour gerer les utilisateur.
on y importe
dotenv : pour l'utilisation de variable d'environnement.
express : pour communiquer avec le serveur
jsonwebtoken : pour créer un token d'activation
ejs : moteur de template pour créer un email de confirmation
path :

installation de

- npm i ejs + npm i --save-dev @types/ejs
- npm i nodemailer + npm i --save-dev @types/nodemailer

creation de `server\mails\activation-mail.ejs` qui contient le template du mail a envoyer a un utilisateur pour confirmer son inscription

creation de `server\controllers\user.controller.ts` Gere l'inscription utilsiateur en verifiant si l'email existe deja,
créer un token,
envoi un email de confirmation
renvoi une reponse en fonction du resultat de l'inscription

creation de `server\routes\user.routes.ts`avec la route `userRouter.post("/registration", registrationUser);` pour activer la fonctionalité `user.controller.ts`

## Erreur rencontré
