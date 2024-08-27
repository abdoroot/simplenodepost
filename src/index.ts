import express from "express"
import * as postHandler from "./handlers/postHandler"

var posts: postHandler.Post[] = []
const app = express()
app.use(express.json())
const listenAddr = 3000

var singlePost: postHandler.Post = {
    id: 1,
    status: postHandler.postStatus.active,
    title: "lorem ispum",
    author: "abdelhad",
    Content: "Post Content",
}

posts.push(singlePost)

app.get("/post", postHandler.handleGetPost(posts))
app.get("/post/:id", postHandler.handleSingelPost(posts))
app.post("/post", postHandler.handleCreatePost(posts))

app.listen(listenAddr, () => {
    console.log(`app is running on port http://localhost:${listenAddr}`)
})
