import { activateUser, registrationUser } from "../controllers/user.controller";

import express from "express";

const userRouter = express.Router();

userRouter.post("/registration", registrationUser);

userRouter.post("/activate-user", activateUser);

export default userRouter;
