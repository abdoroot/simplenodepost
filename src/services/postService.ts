import { Post } from "../models/postModel";

const posts: Post[] = [];

export class PostService {
    static getPosts(): Post[] {
        return posts;
    }

    static getPostById(id: number): Post | undefined {
        return posts.find(post => post.id === id);
    }

    static createPost(data: Omit<Post, 'id'>): Post {
        const newPost = { ...data, id: posts.length + 1 };
        posts.push(newPost);
        return newPost;
    }

    static deletePost(id: number): boolean {
        const index = posts.findIndex(post => post.id === id);
        if (index !== -1) {
            posts.splice(index, 1);
            return true;
        }
        return false;
    }
}
