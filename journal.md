J'apprécie ce tutoriel un peu plus que les tutoriel "code" que j'ai fait jusqu'a présent car l'auteur :

- mentionne les extenssion qu'il utilise avant de commencer le tuto ( ce qui m'a permis d'apprendre des terme comme intellisense par exemple )
- parle des imports qui s'ajoute automatiquement dans le composant.

### Octobre 2023

Aujourd'hui je revois la notion de **destructuring** que l'on peut utilisé pour destructuré les clé d'un objet ou les élément d'un tableau afin de pouvoir les utilisé comme variable dans une fonctions.

Les models definissent la structure des donnée, interagisse avec la base de donnée.

Les controlleurs sont responsable de la gestion des interaction entre le client et les models qui sont déclenché par des fonctions en réponse a des actions utilisateur ou des routes spécifique.

Ils utilisent les models pour faire des operation sur les donnée et retourne une reponse au client avec du JSON, HTML, etc.

# LMS MERN V1

Cours du tuto Becodemy
[part 1](https://www.youtube.com/watch?v=kf6yyxMck8Y&t=834s)

## Commande

lancé le serveur : `npm run dev`

## Project Overview

On vas créer un LMS fullStack et on vas aborder :
le dimenssionement d'une application
la sécurité avec un chiffrement DRM pour empecher le telechargement non authorisé des videos.
l'optimisation de la vitesse

Le tableau de bord permet :
De mettre a jour la banniere,
Mettre a jour la FAQ,
Les categorie,

L'analyse utilisateur
Voir les commandes et les cours
Gerer le contenu du site

Le site sera responsive
Les utilisateur pourront poser des questions, laisser des avis
On peut payer les cours VIA Stripe

## Software Design / Project Plan

Avant de commencer un proet fullstack, il faut décomposer l'application en
fonctionalité majeur : ( Authentification, mise a jour du tableau de bord )
fonctionalité mineur : sont des petite fonctionalité a chaque fonctionnalité majeurs, par exemple pour l'authentification on comprendre ( inscription, connection, authentification sociale ...)

## Technologie Brief

Les applications à faible échelle sont celles qui ne sont pas très grandes en taille, n'ont pas de fonctionnalités très complexes et ne sont pas visitées par un grand nombre d'utilisateurs. Par exemple, les sites web de journaux locaux peuvent être considérés comme des applications à faible échelle.

Les applications à échelle moyenne sont celles qui ont un nombre modéré d'utilisateurs et certaines fonctionnalités complexes. Ces applications ont le potentiel de croître à l'avenir. Par exemple, une plateforme d'apprentissage en ligne (LMS) est considérée comme une application à échelle moyenne.

Les applications à grande échelle sont celles qui sont très fréquentées par les utilisateurs, ont de nombreuses fonctionnalités complexes et ont besoin d'une gestion de la performance avancée. Par exemple, des services comme Netflix ou Udemy sont considérés comme des applications à grande échelle.

Il est important de mettre en cache des donnée pour répondre rapidmeent aux demande utilisateur.

On utilisera RTK Query plutot que Redux Toolkit lui meme pour plusieur raison.

Facilité d'utilisation : RTK Query est conçu pour être simple à utiliser et à mettre en œuvre. Il réduit la quantité de code boilerplate nécessaire pour gérer l'état de l'application, ce qui rend le développement plus rapide et plus efficace.

Optimisation des performances : RTK Query est conçu pour optimiser les performances des applications en minimisant les requêtes réseau inutiles. Il met en cache automatiquement les données et ne récupère que les données qui ont été modifiées depuis la dernière requête. Cela réduit la charge sur le serveur et accélère les temps de réponse de l'application.

Gestion de l'état centralisée : RTK Query intègre la gestion de l'état directement dans Redux, ce qui signifie que l'état de l'application est centralisé et facilement accessible depuis n'importe quelle partie de l'application. Cela simplifie la gestion de l'état et garantit que les données sont cohérentes dans toute l'application.

Réutilisation des requêtes : RTK Query permet de définir des requêtes réutilisables pour accéder aux données de l'API. Cela facilite la réutilisation des requêtes dans différentes parties de l'application sans avoir à réécrire le code de requête à chaque fois.

Intégration transparente : RTK Query s'intègre facilement avec Redux Toolkit, ce qui signifie que vous pouvez l'utiliser en conjonction avec d'autres fonctionnalités de Redux, telles que la gestion des actions et des reducers.

Documentation complète : RTK Query est bien documenté, avec de nombreux exemples et ressources disponibles pour les développeurs. Cela facilite l'apprentissage et la résolution des problèmes éventuels.

## IDE Overview

FireFly Pro
Console Ninja
ES 7 + React Redux React Native Snippet
ES Lint
Git Graph
Image Preview
Mithril Emmet
Path Inellisense
Prettier Code Formatter
Taillwind CSS Intellisense

## Projet Setup

bcryptjs : Pour le hachage sécurisé des mots de passe.
cookie-parser : Pour l'analyse des cookies HTTP.
cors : Pour la gestion des politiques de partage de ressources inter-origines (CORS).
dotenv : Pour la gestion des variables d'environnement.
express : Framework pour créer des applications web Node.js.
ioredis : Client Redis pour Node.js.
jsonwebtoken : Pour la création et la vérification de tokens JWT (JSON Web Tokens).
ts-node-dev : Développement TypeScript avec un rechargement automatique.
@types/bcryptjs : Types TypeScript pour bcryptjs.
@types/cookie-parser : Types TypeScript pour cookie-parser.
@types/cors : Types TypeScript pour cors.
@types/jsonwebtoken : Types TypeScript pour jsonwebtoken.
@types/node : Types TypeScript pour Node.js.
typescript : Le compilateur TypeScript pour la prise en charge de TypeScript dans le projet.
Ces packages sont essentiels pour développer une application Node.js sécurisée avec Express.js, en utilisant TypeScript et en interagissant avec des bases de données MongoDB et Redis.

Création du serveur

## Database, Cloudinary, Redis connection

Configuration et connection de la BDD avec
MongoDb;
Cloudinary pour stocker les image
Redis pour la mise en cache avec Redis
et upstash : ( Pourquoi utiliser upstash ) ? Est ce pour accelerer la distributions de data avec mongoDb ?

## Backend error handling

La gestion des erreur dans une application

La classe `ErrorHandler`pour mentionné les erreur avec un code d'etat HTTP sera basé sur la POO en utilisant un constructeur

On utilise la methode super() pour appeler le constructor de la class parent.

middleware personalisé `errorMiddleWare` pour gerer les erreur de maniere coherentes.

## User Registration

J'ai appris ce qu'est le protocole SMTP Simple Mail Transfer Protocol
PS étudier le protocole SMTP pour connaitre les différentes variable nécéssaire a sa configuration et les protocole d'entré et sortie.

Le point d'interrogation (?) dans TypeScript est utilisé pour indiquer qu'une propriété est facultative dans une interface ou un type.

Dans typeScript `:` est une annotations de type typeScript pour indiquer le type de donnée attendu
exemple :

- string
- any
- interface ( on met le nom de l'interface attendu )
  ...
  PS ecrire un article sur tout les type typeScript.
