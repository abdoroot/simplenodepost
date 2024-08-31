import { Router } from "express";
import { PostController } from "../controllers/postController";
import { onlyUser } from "../middleware/auth";

const postRouter = Router();

postRouter.use(onlyUser);
postRouter.get("/", PostController.getPosts);
postRouter.get("/:id", PostController.getPostById);
postRouter.post("/", PostController.createPost);
postRouter.delete("/:id", PostController.deletePost);

export default postRouter;
