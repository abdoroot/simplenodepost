import { Router } from "express";
import { UserController } from "../controllers/userController";
import { onlyUser } from "../middleware/auth";

const userRouter = Router();

userRouter.post("/user", UserController.createUser);
userRouter.post("/user/login", UserController.loginUser);
userRouter.get("/users", onlyUser, UserController.getUsers);

export default userRouter;
