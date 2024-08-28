import { Request, Response, NextFunction } from 'express';
import { isValidToken } from '../handlers/userHandler'

export function onlyUser(req: Request, resp: Response, next: NextFunction) {
    let apiToken = req.header('Authorization')
    if (apiToken !== undefined && (apiToken as string).length > 5 && isValidToken(apiToken as string)) {
        return next()
    }

    resp.status(401).send({ message: "unauthorized" })
}