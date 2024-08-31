import { Request } from "express";
import logger from '../config/logger';

export function getRequestId(req: Request): string {
    return req.headers['x-request-id'] as string;
}
