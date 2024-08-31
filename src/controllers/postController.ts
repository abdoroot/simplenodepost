import { Request, Response } from "express";
import { PostService } from "../services/postService";

export class PostController {
    static async getPosts(req: Request, res: Response) {
        const posts = PostService.getPosts();
        res.status(200).json(posts);
    }

    static async getPostById(req: Request, res: Response) {
        const postId = parseInt(req.params.id, 10);
        const post = PostService.getPostById(postId);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    }

    static async createPost(req: Request, res: Response) {
        const newPost = PostService.createPost(req.body);
        res.status(201).json(newPost);
    }

    static async deletePost(req: Request, res: Response) {
        const postId = parseInt(req.params.id, 10);
        const result = PostService.deletePost(postId);
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    }
}
