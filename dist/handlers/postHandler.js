"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postStatus = void 0;
exports.handleGetPost = handleGetPost;
exports.handleSingelPost = handleSingelPost;
exports.handleCreatePost = handleCreatePost;
var postStatus;
(function (postStatus) {
    postStatus[postStatus["active"] = 0] = "active";
    postStatus[postStatus["disabled"] = 1] = "disabled";
})(postStatus || (exports.postStatus = postStatus = {}));
function handleGetPost(posts) {
    return (req, resp) => {
        resp.status(200).send(posts);
    };
}
function handleSingelPost(posts) {
    return (req, resp) => {
        const id = parseInt(req.params.id, 10);
        const post = posts.find(p => p.id === id);
        console.log(post);
        if (post) {
            resp.status(200).send(post);
        }
        else {
            resp.status(200).send({
                message: "Post not found"
            });
        }
    };
}
//handle Post request
function handleCreatePost(posts) {
    return (req, resp) => {
        try {
            const newPost = req.body;
            newPost.id = posts.length + 1;
            posts.push(newPost);
            resp.status(201).send({
                message: "Post added sucessfully"
            });
        }
        catch (error) {
            resp.status(500).send({
                message: "internal server error"
            });
        }
    };
}
