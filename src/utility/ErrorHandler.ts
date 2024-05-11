import { NextFunction, Request, Response } from "express";

export function handleException(error: Error, req: Request, res: Response, next: NextFunction) {
    console.log(error)
    return res.status(500).json({ "message" : "Server error", "error" : error })
}
