import { DatabaseTable } from "./../db/Database";
import { DatabaseManager } from "./../db/DatabaseManager";
import { Song } from "./../discordbot/music/Song";
import { CRUD } from "./base/crud";

//TODO: make this class actuallye xist
// export class PlaylistService implements CRUD<Playlist> {
//     db: DatabaseTable<Song> = DatabaseManager.getInstance().get("songs");

    
//     create(data: Song) : Promise<Song>{
//         this.db.run("INSERT INTO songs VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [data.uuid, data.playlist_uuid, data.video_id, data.url, data.title, data.image, data.thumbnail, data.seconds, data.timestamp, data.ago, data.views, data.author, data.channel]);
//         return new Promise((res,rej) => res(data));
//     }
//     readAll() : Promise<Song[]>{
//         return this.db.all("SELECT * FROM songs", []);
//     }
//     read(id: string) : Promise<Song>{
//         return this.db.get("SELECT * FROM songs WHERE id = ?", [id]);
//     }
//     update(id: string, data: Song) : Promise<Song>{
//         this.db.run("UPDATE songs SET uuid = ?, playlist_uuid = ?, video_id = ?, url = ?, title = ?, image = ?, thumbnail = ?, seconds = ?, timestamp = ?, ago = ?, views = ?, author = ?, channel = ? WHERE id = ?", [data.uuid, data.playlist_uuid, data.video_id, data.url, data.title, data.image, data.thumbnail, data.seconds, data.timestamp, data.ago, data.views, data.author, data.channel, id]);

//         return new Promise((res, rej) => res(data));
//     }
//     delete(id: string) : Promise<Song>{
//         let deleted: Promise<Song> = this.read(id);
//         this.db.run("DELETE FROM songs WHERE id = ?", [id]);
//         return deleted;
//     }

// }