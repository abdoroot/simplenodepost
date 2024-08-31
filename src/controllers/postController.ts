import { Request, Response } from "express";
import { PostService } from "../services/postService";
import { Pool } from "pg";
import winston from 'winston';
import { getRequestId } from "../utils/requestId";

//todo: try catch in all handlers

export class PostController {
    private postService: PostService;

    private logger: winston.Logger;

    constructor(pool: Pool, logger: winston.Logger) {
        this.logger = logger;
        this.postService = new PostService(pool, this.logger);
    }

    getPosts = async (req: Request, res: Response) => {
        const rid = getRequestId(req)
        this.logger.info(`Request id=${rid} start PostController::getPosts`)
        try {
            let page: number = 0
            if (req.query.page) {
                page = parseInt(req.query.page as string, 10);
            }
            const posts = await this.postService.getPosts(page);
            res.status(200).json(posts);
            this.logger.info(`Request id=${rid} finish PostController::getPosts`)
        } catch (error: any) {
            this.logger.error(`Request id=${rid} - Error getting posts: ${error.message}`);
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
