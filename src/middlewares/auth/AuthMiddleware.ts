import { Request, Response, NextFunction } from "express";
import { RegisterRequestData } from "./../../auth/RegisterRequestData";
import { LoginRequestData } from "./../../auth/LoginRequestData";

export function verifyLoginBody(req: Request<LoginRequestData>, res: Response, next: NextFunction): Promise<void> {

    let { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json();
        return;
    }

    next();
    return;
}

export function verifyRegisterBody(req: Request<RegisterRequestData>, res: Response, next: NextFunction): Promise<void> {
    let { username, password, email } = req.body;
    console.log(username, password, email);
    if (!username || !password || !email) {

        res.status(400).json("verifyRegisterBody");
        return;
    }

    next();
    return;
}