import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserService } from "../services/userService";
import { User } from "../models/userModel";
import { CreateJwtToken } from "../utils/jwt";

export class UserController {
    static createUser(req: Request, res: Response) {
        try {
            const { name, password } = req.body;

            // User validation can be added here
            if (!name || !password) {
                return res.status(400).json({ message: "Name and password are required" });
            }

            // Encrypt password
            const encryptedPassword = bcrypt.hashSync(password, 10);

            // Create new user
            const newUser: Omit<User, 'id'> = {
                name,
                role: "user",
                password: encryptedPassword,
            };

            const createdUser = UserService.createUser(newUser);

            // Generate JWT token
            createdUser.api_token = CreateJwtToken(createdUser.id, "2h");

            res.status(201).json({
                message: "User added successfully",
                user: createdUser,
            });
        } catch (error: any) {
            res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        }
    }

    static loginUser(req: Request, res: Response) {
        try {
            const { name, password } = req.body;

            const user = UserService.getUserByName(name);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid password" });
            }

            // Generate JWT token
            user.api_token = CreateJwtToken(user.id, "2h");

            res.status(200).json({
                message: "Login successful",
                token: user.api_token,
            });
        } catch (error: any) {
            res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        }
    }

    static getUsers(req: Request, res: Response) {
        try {
            const users = UserService.getUsers();
            res.status(200).json(users);
        } catch (error: any) {
            res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        }
    }
}
