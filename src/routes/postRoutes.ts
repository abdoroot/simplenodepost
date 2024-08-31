import { Router } from "express";
import { PostController } from "../controllers/postController";
import { onlyUser } from "../middleware/auth";
import pool from '../config/db';
import logger from '../config/logger';

const postController = new PostController(pool, logger)
const postRouter = Router();

postRouter.use(onlyUser);
postRouter.get("/", postController.getPosts);
postRouter.get("/:id", postController.getPostById);
postRouter.post("/", postController.createPost);
postRouter.delete("/:id", postController.deletePost);

export default postRouter;


