import { User } from "../models/userModel";

export class UserService {
    private static users: User[] = [];

    static createUser(userData: Omit<User, 'id'>): User {
        const newUser: User = {
            id: this.users.length + 1,
            ...userData,
            api_token: ""
        };
        this.users.push(newUser);
        return newUser;
    }

    static getUsers(): User[] {
        return this.users;
    }

    static getUserByName(name: string): User | undefined {
        return this.users.find(user => user.name === name);
    }
}
