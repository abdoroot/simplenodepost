import { Pool } from 'pg';
import { Post } from "../models/postModel";

export class PostService {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool
    }

    async getPosts(page: number = 1): Promise<Post[]> {
        try {
            const limit = 8
            page = isNaN(page) || page <= 0 ? 1 : page;

            const offset = (page - 1) * limit;

            const result = await this.pool.query('select * from posts limit $1 offset $2', [limit, offset]);
            const posts: Post[] = result.rows
            return posts;
        } catch (error: any) {
            console.log("error getting posts:", error.message)
            throw new Error('Unable to get posts');
        }
    }

    async getPostById(id: number): Promise<Post> {
        try {
            const result = await this.pool.query('SELECT * FROM posts where id =? ', [id]);
            const post: Post = result.rows[0]
            return post;
        } catch (error: any) {
            console.log("error getting posts")
            throw new Error('Unable to get post');
        }
    }

    async createPost(data: Omit<Post, 'id'>): Promise<Post> {
        try {
            const result = await this.pool.query(
                'INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *',
                [data.title, data.content]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error creating post:', error);
            throw new Error('Unable to create post');
        }
    }

    async deletePost(id: number): Promise<boolean> {
        try {
            await this.pool.query('DELETE FROM posts WHERE id = $1', [id]);
            return true
        } catch (error) {
            console.error('Error deleting post:', error);
            throw new Error('Unable to delete post');
        }
    }
}
