import { RequestHandler } from "express"
import * as jwt from "jsonwebtoken"
import bcrypt from 'bcrypt';

export type User = {
    id: number
    name: string
    password: string //encrypted
    role: "admin" | "user"
    api_token?: string
}

export type UserRequestParam = {
    name: string
    password: string //plain text
}

export function HandlerCreateUser(users: User[]): RequestHandler {
    return async (req, resp) => {
        try {
            //todo user validation
            let param: UserRequestParam = req.body
            let encreptedPassword = await bcrypt.hash(param.password, 10)
            let newUser: User = {
                id: users.length + 1,
                name: param.name,
                role: "user",
                password: encreptedPassword
            }
            newUser.api_token = CreateJwtToken(newUser.id, "2h")

            users.push(newUser)
            resp.status(201).send({
                message: "User added sucessfully",
                user: newUser
            })
        } catch (error: any) {
            resp.status(500).send({
                message: "internal server error",
                error: error.message
            })
        }
    }
}

export function HandlerLoginUser(users: User[]): RequestHandler {
    return async (req, resp) => {
        try {
            let param: UserRequestParam = req.body
            let user = users.find(u => u.name === param.name)

            if (!user) {
                resp.status(404).send({
                    message: "user not found"
                })
            } else {
                //compare password
                if (!await bcrypt.compare(param.password, user.password)) {
                    resp.status(400).send({
                        message: "password not match"
                    })
                    return
                }

                if (!isValidToken(user.api_token as string)) {
                    user.api_token = CreateJwtToken(user.id, "2h")
                }
                resp.status(200).send({
                    message: "login sucessfully",
                    user: user
                })
            }
        } catch (error: any) {
            resp.status(500).send({
                message: "internal server error",
                error: error.message
            })
        }
    }
}


export function CreateJwtToken(userId: number, expiresIn: "1h" | "2h"): string {
    let secret = process.env.JWT_SECRET
    var token = jwt.sign({
        userId: userId
    }, secret as string, { expiresIn: expiresIn, algorithm: 'HS256' })

    return token
}

export function isValidToken(token: string): boolean {
    let secret = process.env.JWT_SECRET
    try {
        var decoded = jwt.verify(token, secret as string);
        if (decoded) {
            return true
        }
        return false
    } catch (error: any) {
        console.error('Token validation failed:', error.message);
        return false
    }
}