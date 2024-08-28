"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlerCreateUser = HandlerCreateUser;
exports.HandlerLoginUser = HandlerLoginUser;
exports.CreateJwtToken = CreateJwtToken;
exports.isValidToken = isValidToken;
var jwt = require("jsonwebtoken");
function HandlerCreateUser(users) {
    return function (req, resp) {
        try {
            //todo user validation
            var param = req.body;
            //let encreptedPassword = await bcrypt.hash(param.password, 10)
            var newUser = {
                id: users.length + 1,
                name: "param.name",
                role: "user",
                //encreptedPassword: encreptedPassword as string
                encreptedPassword: "encreptedPassword as string"
            };
            newUser.api_token = CreateJwtToken(newUser.id, "2h");
            users.push(newUser);
            resp.status(201).send({
                message: "User added sucessfully",
                user: newUser
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
function HandlerLoginUser(users) {
    return function (req, resp) {
        try {
            var id_1 = parseInt(req.params.id);
            var user = users.find(function (u) { return u.id == id_1; });
            if (!user) {
                resp.status(404).send({
                    message: "user not found"
                });
            }
            else {
                user.api_token = CreateJwtToken(user.id, "2h");
                resp.status(200).send({
                    message: "login sucessfully",
                    user: user
                });
            }
        }
        catch (error) {
            resp.status(500).send({
                message: "internal server error",
                error: error.message
            });
        }
    };
}
function CreateJwtToken(userId, expiresIn) {
    var secret = process.env.JWT_SECRET;
    console.log("secret", secret);
    var token = jwt.sign({
        userId: userId
    }, secret, { expiresIn: expiresIn, algorithm: 'HS256' });
    return token;
}
function isValidToken(token) {
    var secret = process.env.JWT_SECRET;
    var decoded = jwt.verify(token, secret);
    if (decoded) {
        return true;
    }
    return false;
}
