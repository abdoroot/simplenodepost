import jwt from "jsonwebtoken";

export function CreateJwtToken(userId: number, expiresIn: string): string {
    const secret = process.env.JWT_SECRET as string;
    const token = jwt.sign({ id: userId }, secret, { expiresIn });
    return token;
}

export function isValidToken(token: string): boolean {
    const secret = process.env.JWT_SECRET as string;
    try {
        jwt.verify(token, secret);
        return true;
    } catch (error: any) {
        console.log('Token validation failed:', error.message);
        return false;
    }
}
