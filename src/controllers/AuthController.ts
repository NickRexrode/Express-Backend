import { Request, Response } from "express";
import { AuthService } from "./../services/AuthService";

import { LoginRequestData } from "./../auth/LoginRequestData";
import { Authentication } from "./../auth/authData";
import { RegisterRequestData } from "./../auth/RegisterRequestData";
import { verifyPassword, PersistedPassword, generateAuthKey, generateUUID, generateHashPassword } from "./../auth/crypto/crypto";

const authService = new AuthService();

export async function login(req: Request<LoginRequestData>, res: Response) {

    const { username, password } = req.body;

    let auth: Authentication;

    if (isEmail(username)) {
        auth = await authService.read_email(username);
    } else {
        auth = await authService.read_username(username);
    }

    if (!auth) {
        return res.status(400).json();
    }
    const persistantPassword: PersistedPassword = {
        hash: auth.password,
        salt: auth.salt,
        iterations: auth.iterations
    };

    const isValidLogin: boolean = await verifyPassword(persistantPassword, password);
    if (!isValidLogin) {
        return res.status(400).json();
    }

    const authKey: string = await generateAuthKey();
    auth.authKey = authKey;

    await authService.update(auth.id, auth);

    return res.status(200).json(auth.authKey);
}

export async function register(req: Request<RegisterRequestData>, res: Response) {
    const { username, password, email } = req.body;

    const id = generateUUID();

    const encryptedPassword: PersistedPassword = await generateHashPassword(password);

    //auth key empty

    const authData: Authentication = {
        id: id,
        username: username,
        password: encryptedPassword.hash,
        salt: encryptedPassword.salt,
        iterations: encryptedPassword.iterations,
        authKey: null,
        email: email
    }
    const taken: boolean = await authService.email_username_taken(authData.username, authData.email)
    if (!taken) {
        //make account
        authService.create(authData);
        return res.status(200).send();
    } else {
        //taken
        return res.status(400).send();
    }


}

/**
 * Refactor This!!  
 * @param str 
 */
export function isEmail(str: string) {
    return str.includes("@");
}
