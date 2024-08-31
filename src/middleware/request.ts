
import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from 'uuid';


export function setRequestId(req: Request, resp: Response, next: NextFunction) {
    const requestId = uuidv4()
    resp.setHeader('X-Request-ID', requestId)
    req.headers['x-request-id'] = requestId;
    return next();
}
