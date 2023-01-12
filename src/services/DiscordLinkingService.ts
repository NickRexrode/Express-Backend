import { DatabaseTable } from "./../db/Database";
import { DatabaseManager } from "./../db/DatabaseManager";
import { DiscordAuthorizationLink } from "./../auth/authData";
import { CRUD } from "./base/crud";



export class DiscordLinkingService implements CRUD<DiscordAuthorizationLink> {
    db : DatabaseTable<DiscordAuthorizationLink> = DatabaseManager.getInstance().get("discord_links");

    create(data: DiscordAuthorizationLink) :Promise<DiscordAuthorizationLink> {
        this.db.run("INSERT INTO discord_auth_link VALUES (?,?,?,?)", [data.id, data.discord_id, data.auth_id, data.discord_link_authKey]);
        return new Promise((res, rej) => res(data));
    };
    readAll(): Promise<DiscordAuthorizationLink[]> {
        return this.db.all("SELECT * FROM discord_auth_link", []);
    }
    read(id: string): Promise<DiscordAuthorizationLink>{
        return this.db.get("SELECT * FROM discord_auth_link WHERE id = ?", [id]);
    }
    update(id: string, data: DiscordAuthorizationLink): Promise<DiscordAuthorizationLink>{
        this.db.run("UPDATE discord_auth_link SET id = ?, discord_id = ?, auth_id = ?, discord_link_authKey = ? WHERE id = ?", [data.id, data.discord_id, data.auth_id, data.discord_link_authKey,id ]);

        return new Promise((res, rej) => res(data));
    }
    delete(id: string): Promise<DiscordAuthorizationLink>{
        let deleted : Promise<DiscordAuthorizationLink> = this.read(id);

        this.db.run("DELETE FROM discord_auth_link WHERE id = ?", [id]);
        return deleted;
    }

}