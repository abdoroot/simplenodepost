"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var postHandler = require("./handlers/postHandler");
var userHandler = require("./handlers/userHandler");
var dotenv = require("dotenv");
if (!dotenv.config()) {
    console.log("error loading env file");
    process.exit(1);
}
//in memory database
var posts = [];
var users = [];
var app = (0, express_1.default)();
app.use(express_1.default.json());
var listenAddr = 3000;
var singlePost = {
    id: 1,
    status: postHandler.postStatus.active,
    title: "lorem ispum",
    author: "abdelhad",
    Content: "Post Content",
};
posts.push(singlePost);
app.get("/post", postHandler.handleGetPosts(posts));
app.get("/post/:id", postHandler.handleGetSingelPost(posts));
app.post("/post", postHandler.handleCreatePost(posts));
app.delete("/post/:id", postHandler.handleDeletePost(posts));
app.delete("/post/:id", postHandler.handleDeletePost(posts));
//user login
app.post("/user", userHandler.HandlerCreateUser(users));
app.post("/user/login", userHandler.HandlerLoginUser(users));
app.listen(listenAddr, function () {
    console.log("app is running on port http://localhost:".concat(listenAddr));
});
