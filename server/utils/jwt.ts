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
