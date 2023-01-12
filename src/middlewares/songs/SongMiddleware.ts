import { Song } from "./../../discordbot/music/Song";
import { Request, Response, NextFunction } from "express"



export function verifySongBody(req: Request<Song>, res: Response, next: NextFunction) {


    const song: Song = req.body;

    if (song.uuid
        && song.playlist_uuid
        && song.video_id
        && song.url
        && song.title
        && song.image
        && song.thumbnail
        && song.seconds
        && song.timestamp
        && song.ago
        && song.views
        && song.author
        && song.channel
    ) {
        next();
    } else {
        res.status(400).json("verifySongBody");
    }

}