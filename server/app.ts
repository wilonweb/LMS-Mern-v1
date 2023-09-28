require("dotenv").config();

import express, { NextFunction, Request, Response } from "express";

import { ErrorMiddleware } from "./middleware/error";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes";

export const app = express();

// body parser : gere les donnée JSON envoyé via HTTP en s'assurant que la taille des données ne dépasse pas 50Mo pour éviter les porbleme de performance ou de sécurité
app.use(express.json({ limit: "50mb" }));

//cookie parser : Pour gerer les cookies
app.use(cookieParser());

// => cors => cross origin ressource sharing
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

// routes
app.use("/api/v1/", userRouter);

// testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

// unknow route : Pour envoyer une erreur 404
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(ErrorMiddleware);
