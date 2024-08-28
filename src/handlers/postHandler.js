"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postStatus = void 0;
exports.handleGetPosts = handleGetPosts;
exports.handleGetSingelPost = handleGetSingelPost;
exports.handleCreatePost = handleCreatePost;
exports.handleDeletePost = handleDeletePost;
var postStatus;
(function (postStatus) {
    postStatus[postStatus["active"] = 0] = "active";
    postStatus[postStatus["disabled"] = 1] = "disabled";
})(postStatus || (exports.postStatus = postStatus = {}));
function handleGetPosts(posts) {
    return function (req, resp) {
        resp.status(200).send(posts);
    };
}
function handleGetSingelPost(posts) {
    return function (req, resp) {
        var id = parseInt(req.params.id, 10);
        var post = posts.find(function (p) { return p.id === id; });
        if (post) {
            resp.status(200).send(post);
        }
        else {
            resp.status(404).send({
                message: "Post not found"
            });
        }
    };
}
//handle Post request
function handleCreatePost(posts) {
    return function (req, resp) {
        try {
            var newPost = req.body;
            newPost.id = posts.length + 1;
            posts.push(newPost);
            resp.status(201).send({
                message: "Post added sucessfully"
            });
        }
        catch (error) {
            resp.status(500).send({
                message: "internal server error",
                error: error.message
            });
        }
    };
}
function handleDeletePost(posts) {
    return function (req, resp) {
        try {
            var id_1 = parseInt(req.params.id, 10);
            var post = posts.find(function (p) { return p.id === id_1; });
            if (!post) {
                resp.status(404).send({
                    message: "post not found"
                });
            }
            else {
                var postIndex = posts.indexOf(post);
                delete posts[postIndex];
                resp.status(201).send({
                    message: "Post deleted sucessfully"
                });
            }
        }
        catch (error) {
            resp.status(500).send({
                message: "internal server error"
            });
        }
    };
}
