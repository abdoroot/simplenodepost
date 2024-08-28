import express from "express"
import * as postHandler from "./handlers/postHandler"
import * as userHandler from "./handlers/userHandler"
import * as dotenv from "dotenv"
import { onlyUser } from "./middleware/auth"

if (!dotenv.config()) {
    console.log("error loading env file")
    process.exit(1)
}

//in memory database
var posts: postHandler.Post[] = []
var users: userHandler.User[] = []

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


let postRouter = express.Router()
let userRouter = express.Router()
postRouter.use(onlyUser)
postRouter.get("/post", postHandler.handleGetPosts(posts))
postRouter.get("/post/:id", postHandler.handleGetSingelPost(posts))
postRouter.post("/post", postHandler.handleCreatePost(posts))
postRouter.delete("/post/:id", postHandler.handleDeletePost(posts))
postRouter.delete("/post/:id", postHandler.handleDeletePost(posts))

//user login
userRouter.post("/user", userHandler.HandlerCreateUser(users))
userRouter.post("/user/login", userHandler.HandlerLoginUser(users))

//admin route
//app.get("/users", userHandler.HandlerGetUsers(users))

app.listen(listenAddr, () => {
    console.log(`app is running on port http://localhost:${listenAddr}`)
})
