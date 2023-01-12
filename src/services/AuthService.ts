
import { CRUD } from "./base/crud";
import { DatabaseTable } from "./../db/Database";
import { Authentication } from "./../auth/authData";
import { DatabaseManager } from "./../db/DatabaseManager";


export class AuthService implements CRUD<Authentication> {
    db: DatabaseTable<Authentication> = DatabaseManager.getInstance().get("auth");

    create(data: Authentication): Promise<Authentication> {
        this.db.run("INSERT INTO auth VALUES (?,?,?,?,?,?,?)", [data.id, data.username, data.password, data.salt, data.iterations, data.authKey, data.email]);
        return new Promise((res, rej) => res(data));
    }
    readAll(): Promise<Array<Authentication>> {
        return this.db.all("SELECT * FROM auth", []);
    }
    read(id: string): Promise<Authentication> {
        return this.db.get("SELECT * FROM auth WHERE id = ?", [id]);
    };
    update(id: string, data: Authentication): Promise<Authentication> {
        this.db.run("UPDATE auth SET id = ?, username = ?, password = ?, salt = ?, iterations = ?, authKey = ?, email = ? WHERE id = ?", [data.id, data.username, data.password, data.salt, data.iterations, data.authKey, data.email, id]);

        return new Promise((res, rej) => res(data));
    }
    delete(id: string): Promise<Authentication> {
        let deleted: Promise<Authentication> = this.read(id);
        this.db.run("DELETE FROM auth WHERE id = ?", [id]);
        return deleted;
    }

    read_email(email: string): Promise<Authentication> {
        return this.db.get("SELECT * FROM auth WHERE email = ?", [email]);
    }

    read_username(username: string): Promise<Authentication> {
        return this.db.get("SELECT * FROM auth WHERE username = ?", [username]);
    }

    async email_username_taken(username: string, email: string): Promise<boolean> {
        let foundUsername: Authentication = await this.read_username(username);
        let foundEmail: Authentication = await this.read_email(email);

        if (foundUsername == null && foundEmail == null) {
            return false;
        }

        return true;


    }

}