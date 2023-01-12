import { Song } from "./../discordbot/music/Song";
import { Request, Response } from "express";

export async function saveSong(req : Request<Song>, res : Response) {


    res.status(200).send();

}