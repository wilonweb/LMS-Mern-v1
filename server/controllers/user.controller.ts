require("dotenv").config();

import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import userModel, { IUser } from "../models/user.model";

import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import { sendToken } from "../utils/jwt";

//register User
/*
Gere l'inscription utilsiateur en verifiant si l'email existe deja, 
créer un token, 
envoi un email de confirmation
renvoi une reponse en fonction du resultat de l'inscription  
*/

/* L'interface définis la structure des data attendue lors de l'inscription utilisateur.
le ? indique que l'avatar est facultatif */
interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

/* Gestionnaire de routage pour les demandes d'inscriptions utilisateur */

export const registrationUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // extrait les donnée entré dans le client
      const { name, email, password } = req.body;
      // verifie si l'email existe depuis user.model.ts
      const isEmailExist = await userModel.findOne({ email });
      if (isEmailExist) {
        //Si il existe retourne une erreur
        return next(new ErrorHandler("Email already exist", 400));
      }

      const user: IRegistrationBody = {
        // Créer l'objet user typé depuis l'interface IRegistrationBody
        name,
        email,
        password,
      };

      // Génère le token depuis l'objet user
      const activationToken = createActivationToken(user);

      const activationCode = activationToken.activationCode;

      const data = { user: { name: user.name }, activationCode }; // creation de l'objet data avec les infromation utilisateur et le code d'activation
      const html = await ejs.renderFile(
        // utilise le moteur de template EJS pour rendre le contenue de l'email de confirmation
        path.join(__dirname, "", "../mails/activation-mail.ejs"),
        data
      );

      try {
        await sendMail({
          // Envoi un email a l'utilisateur
          email: user.email,
          subject: "Activate your account",
          template: "activation-mail.ejs",
          data,
        });

        res.status(201).json({
          success: true,
          message: `Please check your Email: ${user.email} to activate your account`,
          activationToken: activationToken.token,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

interface IActivationToken {
  token: string;
  activationCode: string;
}

export const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_SECRET as Secret,
    {
      expiresIn: "5m",
    }
  );
  return { token, activationCode };
};

// activate user
interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}
export const activateUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code } =
        req.body as IActivationRequest;

      // Vérification du jeton d'activation avec jwt.verify
      // Le jeton est décodé pour extraire les données de l'utilisateur et le code d'activation
      const newUser: { user: IUser; activationCode: string } = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET as string
      ) as { user: IUser; activationCode: string };

      // Vérification si le code d'activation correspond à celui soumis par l'utilisateur
      if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler("Invalid activation code", 400));
      }

      // Extraction des données de l'utilisateur (nom, email, mot de passe)
      const { name, email, password } = newUser.user;

      // Recherche dans la base de données si l'email existe déjà
      const existUser = await userModel.findOne({ email: email });
      if (existUser) {
        return next(new ErrorHandler("Email already exists", 404));
      }

      // Création d'un nouvel utilisateur dans la base de données
      const user = await userModel.create({ name, email, password });

      // Réponse JSON en cas de succès
      res.status(201).json({
        success: true,
      });
    } catch (error: any) {
      // Gestion des erreurs et réponse en cas d'erreur
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

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
