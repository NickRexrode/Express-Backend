import { Song } from "./../discordbot/music/Song";
import { Authentication, DiscordAuthorizationLink } from "./../auth/authData";
import { DatabaseTable } from "./Database";

export class DatabaseManager {

    private static BASE_PATH: string = "C:\\Users\\nrexr\\Desktop\\Development\\Databases";
    private static INSTANCE: DatabaseManager;

    private map: Map<string, DatabaseTable<any>>;


    constructor() {
        this.map = new Map<string, DatabaseTable<any>>();
        this.load();
    }

    private load(): void {
        this.map.set("auth", new DatabaseTable<Authentication>(DatabaseManager.BASE_PATH + "\\" + "nickrexrode.db"))
        this.map.set("discord_links", new DatabaseTable<DiscordAuthorizationLink>(DatabaseManager.BASE_PATH+"\\"+"nickrexrode.db"))
        this.map.set("songs", new DatabaseTable<Song>(DatabaseManager.BASE_PATH+"\\"+"discordbot.db"))
    }
    public static getInstance() {
        if (DatabaseManager.INSTANCE == null) {
            DatabaseManager.INSTANCE = new DatabaseManager();
        }

        return DatabaseManager.INSTANCE;
    }

    public get(name: string): DatabaseTable<any> {
        return this.map.get(name);
    }


}