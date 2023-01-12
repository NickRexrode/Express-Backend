import { Request, Response } from "express";
import { LinkingRequestData } from "./../auth/linking/LinkingRequestData";

//from discord bot
export function initalizeLinking(req: Request<LinkingRequestData>, res: Response) {
    console.log(req.body.discord_id);

    

    res.status(200).send()
}

//browser called to get auth set in cookies
export function completeLink(req : Request, res : Response) {
    console.log(req.params)
    console.log(req.query)
}