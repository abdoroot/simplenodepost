import { Request, Response } from "express";
import { PostService } from "../services/postService";
import { Pool } from "pg";

//todo: try catch in all handlers

export class PostController {
    private postService: PostService;

    constructor(pool: Pool) {
        this.postService = new PostService(pool);
    }

    getPosts = async (req: Request, res: Response) => {
        try {
            let page: number = 0
            if (req.query.page) {
                page = parseInt(req.query.page as string, 10);
            }
            const posts = await this.postService.getPosts(page);
            res.status(200).json(posts);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    getPostById = async (req: Request, res: Response) => {
        const postId = parseInt(req.params.id, 10);
        const post = this.postService.getPostById(postId);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    }

    createPost = async (req: Request, res: Response) => {
        const newPost = this.postService.createPost(req.body);
        res.status(201).json(newPost);
    }

    deletePost = async (req: Request, res: Response) => {
        const postId = parseInt(req.params.id, 10);
        const result = await this.postService.deletePost(postId);
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    }
}
