import express from "express"
import { setup } from "../setup"
import * as postHandler from "../../src/handlers/postHandler"
import request from 'supertest'
import { onlyUser } from "../../src/middleware/auth"
import { CreateJwtToken } from "../../src/handlers/userHandler"

describe("post routes", () => {
    setup()
    var posts: postHandler.Post[] = []
    var singlePost: postHandler.Post = {
        id: 1,
        status: postHandler.postStatus.active,
        title: "lorem ispum",
        author: "abdelhad",
        Content: "Post Content",
    }

    posts.push(singlePost)

    let app = express()
    let postRouter = express.Router()
    postRouter.use(express.json())
    postRouter.use(onlyUser) //auth middleware

    postRouter.get("/post", postHandler.handleGetPosts(posts))
    postRouter.get("/post/:id", postHandler.handleGetSingelPost(posts))
    postRouter.post("/post", postHandler.handleCreatePost(posts))
    postRouter.delete("/post/:id", postHandler.handleDeletePost(posts))
    postRouter.delete("/post/:id", postHandler.handleDeletePost(posts))

    app.use("/", postRouter)

    it("should get 401 unauthorized", async () => {
        const resp = await request(app)
            .get('/post')
            .set('Authorization', 'InvalidToken');

        expect(resp.status).toEqual(401)
    })


    it("should get 200", async () => {
        let validToken = CreateJwtToken(1, "1h")
        const resp = await request(app, {})
            .get('/post')
            .set('Authorization', validToken)
        expect(resp.status).toEqual(200)

        let posts: postHandler.Post[] = resp.body
        expect(posts.length).toEqual(1)
    })


    it("get single post", async () => {
        let validToken = CreateJwtToken(1, "1h")
        const resp = await request(app, {})
            .get('/post/1')
            .set('Authorization', validToken)
        expect(resp.status).toEqual(200)

        let got: postHandler.Post = resp.body
        expect(got.id).toEqual(singlePost.id)
    })
})