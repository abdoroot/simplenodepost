import { RequestHandler } from 'express';


export enum postStatus {
    active,
    disabled
}

export type Post = {
    id: number
    status: postStatus
    title: string
    author: string
    Content: string
}

export function handleGetPosts(posts: Post[]): RequestHandler {
    return (req, resp) => {
        resp.status(200).send(posts)
    }
}

export function handleGetSingelPost(posts: Post[]): RequestHandler {
    return (req, resp) => {
        const id = parseInt(req.params.id, 10);
        const post = posts.find(p => p.id === id);

        if (post) {
            resp.status(200).send(post)
        } else {
            resp.status(404).send({
                message: "Post not found"
            })
        }
    }
}

//handle Post request
export function handleCreatePost(posts: Post[]): RequestHandler {
    return (req, resp) => {
        try {
            const newPost: Post = req.body
            newPost.id = posts.length + 1
            posts.push(newPost)
            resp.status(201).send({
                message: "Post added sucessfully"
            })
        } catch (error: any) {
            resp.status(500).send({
                message: "internal server error",
                error: error.message
            })
        }
    }
}

export function handleDeletePost(posts: Post[]): RequestHandler {
    return (req, resp) => {
        try {
            const id = parseInt(req.params.id, 10);
            const post = posts.find(p => p.id === id);

            if (!post) {
                resp.status(404).send({
                    message: "post not found"
                })
            } else {
                let postIndex = posts.indexOf(post)
                delete posts[postIndex]
                resp.status(201).send({
                    message: "Post deleted sucessfully"
                })
            }
        } catch (error: any) {
            resp.status(500).send({
                message: "internal server error"
            })
        }
    }
}