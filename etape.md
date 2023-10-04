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

## user activation

On créer l'activation de l'utilisateur, ou l'utilisateur recevra un code c'activation via le protocol SMTP qui sera associé a sont JWT afin d'ajouter une fonctionalité qui s'assurera que l'activation est valide.

On code cette fonctionalité `server\controllers\user.controller.ts`

Et on utilise Postman pour envoyer des requete. On

## User Login LogOut

Dans cette section on met en place un systeme d'authentification avec des token d'acces et de rafraichissement.

Création des variable d'environnement

- ACCESS_TOKEN
- REFRESH_TOKEN

Puis on genere un password sur lastpass.com et on entre un password different pour chaque variable.

et on ajoute ces variables dans l'interface IUser du `server\models\user.model.ts` pour les rendre disponible à tout objet utilisateur que l'application rencontre

```js
SignAccessToken: () => string; // Génère un Token d'acces pour authentifier l'utilisateur de courte durée
SignRefreshToken: () => string; // Génère un Token de rafraichissement pour en obtenir un nouveau apres expiration du token actuel
```

Le fonctionnement de ses methodes est définis dans les méthodes `SignAccessToken` et `SignRefreshToken` toujours dans le fichier `server\models\user.model.ts`

```js
// sign access token
userSchema.methods.SignAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || "");
};

// sign refresh token
userSchema.methods.SignRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || "");
};
```

Ajout de Login User dans `server\controllers\user.controller.ts` pour authentifier l'utilisateur en validant son email et son password.

```js
// Login User
interface ILoginRequest {
  email: string;
  password: string;
}
// Exporte la fonction loginUser en tant que middleware pour gérer les demandes de connexion d'utilisateur
export const loginUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extraction des valeurs d'email et de mot de passe à partir du corps de la demande (req.body)
      const { email, password } = req.body as ILoginRequest;
      // Vérification si email ou mot de passe est manquant
      if (!email || !password) {
        // Si l'un des champs est manquant, génère une erreur 400 (Bad Request) avec un message d'erreur
        return next(new ErrorHandler("Invalid email or password", 400));
      }

      // Recherche d'un utilisateur dans la base de données par son adresse e-mail
      const user = await userModel.findOne({ email }).select("+password");

      // Si aucun utilisateur est trouvé
      if (!user) {
        // Si aucun utilisateur n'est trouvé, génère une erreur 400 avec un message d'erreur
        return next(new ErrorHandler("Invalid email or password", 400));
      }

      // Vérification si le mot de passe fourni correspond au mot de passe stocké pour cet utilisateur
      const isPasswordMatch = await user.comparePassword(password);
      if (!isPasswordMatch) {
        // Si les mots de passe ne correspondent pas, génère une erreur 400 avec un message d'erreur
        return next(new ErrorHandler("Invalid email or password", 400));
      }

      // Si tout est correct jusqu'à présent, envoie un token à l'utilisateur
      sendToken(user, 200, res);
    } catch (error: any) {
      // Gestion des erreurs : Si une erreur inattendue se produit, génère une erreur 400 avec le message d'erreur de l'exception
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
```

Création de `server\utils\jwt.ts` pour créer la fonction `sendToken` pour envoyer des token à l'utilisateur apres une autjentification réussi.

Les etapes pour le faire sont :

- généré un **accesToken** et un **refreshToken** grace aux methode **SignAccesToken** et **SignRefreshToken**
- enregistrer la session utilisateur dans redis
- configurer les cookie des token ( durée de validité, environnement de production ... )
- configurer les cookie acces_token et refresh_token
- Renvoi une réponse JSON au client HTTP avec un code 200 pour connectioni réussi

```js
require("dotenv").config();

import { IUser } from "../models/user.model";
import { Response } from "express";
import { redis } from "./redis";

// Interface définissant les options pour les cookies des tokens
interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean; // Propriété optionnelle avec le ?
}

// Fonction pour envoyer des tokens à l'utilisateur
export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  // Génère un token d'accès et un token de rafraîchissement à partir de l'utilisateur
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  // Enregistre la session utilisateur dans Redis
  redis.set(user._id, JSON.stringify(user) as any);

  // Parse les variables d'environnement pour configurer la durée de validité des tokens (en secondes)
  const accessTokenExpire = parseInt(
    process.env.ACCESS_TOKEN_EXPIRE || "300",
    10
  );
  const refreshTokenExpire = parseInt(
    process.env.REFRESH_TOKEN_EXPIRE || "1200",
    10
  );

  // Options pour le cookie du token d'accès
  const accessTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + accessTokenExpire * 1000),
    maxAge: accessTokenExpire * 1000,
    httpOnly: true,
    sameSite: "lax",
  };

  // Options pour le cookie du token de rafraîchissement
  const refreshTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpire * 1000),
    maxAge: accessTokenExpire * 1000,
    httpOnly: true,
    sameSite: "lax",
  };

  // Définit la propriété "secure" à true uniquement en production (pour les cookies sécurisés)
  if (process.env.NODE_ENV === "production") {
    accessTokenOptions.secure = true;
  }

  // Configure les cookies avec les tokens et leurs options respectives
  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  // Envoie une réponse JSON avec un code de statut spécifié, indiquant le succès de l'opération
  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });
};
```

Ajout des variable d'environnement `ACCESS_TOKEN_EXPIRE = 5 REFRESH_TOKEN_EXPIRE = 59` pour configurer la validité des TOKEN sans avoir a modifier le code source. ( fléxibilité et sécurité )

Importer la route `userRouter.post("/login", loginUser);`
dans `server\routes\user.routes.ts` pour utiliser le middleware **loginUser** quand il y a une demande POST a l'URL /login

## Erreur rencontré
