import express from "express"
import * as postHandler from "./handlers/postHandler"
import * as userHandler from "./handlers/userHandler"
import * as dotenv from "dotenv"
import { onlyUser } from "./middleware/auth"
import { setRequestId } from "./middleware/request"

if (!dotenv.config()) {
    console.log("error loading env file")
    process.exit(1)
}

//in memory database
var posts: postHandler.Post[] = []
var users: userHandler.User[] = []

const app = express()
app.use(express.json(), setRequestId)
const listenAddr = 3002

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
postRouter.use(onlyUser);
postRouter.get("/", postHandler.handleGetPosts(posts));
postRouter.get("/:id", postHandler.handleGetSingelPost(posts));
postRouter.post("/", postHandler.handleCreatePost(posts));
postRouter.delete("/:id", postHandler.handleDeletePost(posts));

// User routes
userRouter.post("/", userHandler.HandlerCreateUser(users));
userRouter.post("/login", userHandler.HandlerLoginUser(users));

//admin route
//app.get("/users", userHandler.HandlerGetUsers(users))

app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(listenAddr, () => {
    console.log(`app is running on port http://localhost:${listenAddr}`)
})
