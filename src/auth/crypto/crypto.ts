import * as crypto from "crypto";
import { v4 as uuidv4 } from "uuid";


//https://stackoverflow.com/questions/17201450/salt-and-hash-password-in-nodejs-w-crypto
export interface PersistedPassword {
    salt: string;
    hash: string;
    iterations: number;
}

const SALT_LENGTH = 64;
const ITERATIONS = 10000;


export function generateHashPassword(
    password: string
): Promise<PersistedPassword> {
    return new Promise<PersistedPassword>((accept, reject) => {
        const salt = crypto
            .randomBytes(SALT_LENGTH)
            .toString("hex");

        crypto.pbkdf2(
            password,
            salt,
            ITERATIONS,
            256,
            "sha512",
            (error, hash) => {
                if (error) {
                    return reject(error);
                }

                accept({
                    salt,
                    hash: hash.toString("hex"),
                    iterations: ITERATIONS,
                });
            }
        );
    });
}

/**
 * Verifies the attempted password against the password information saved in
 * the database. This should be called when
 * the user tries to log in.
 */
export function verifyPassword(
    persistedPassword: PersistedPassword,
    passwordAttempt: string
): Promise<boolean> {
    return new Promise<boolean>((accept, reject) => {
        crypto.pbkdf2(
            passwordAttempt,
            persistedPassword.salt,
            persistedPassword.iterations,
            256,
            "sha512",
            (error, hash) => {
                if (error) {
                    return reject(error);
                }

                accept(
                    persistedPassword.hash === hash.toString("hex")
                );
            }
        );
    });
}


const AUTH_KEY_SIZE: number = 1024;
const AUTH_KEY_VALID_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
export function generateAuthKey(): string {

    let str: string = "";

    for (let i = 0; i < AUTH_KEY_SIZE; i++) {
        str += AUTH_KEY_VALID_CHARS[randomNumber(0, AUTH_KEY_VALID_CHARS.length)];

    }

    return str;
}

/**
 * 
 * @param min included
 * @param max excluded
 * @returns 
 */
function randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}


export function generateUUID(): string {
    return uuidv4();
}