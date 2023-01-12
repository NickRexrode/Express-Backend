import { LinkingRequestData } from "./../../../auth/linking/LinkingRequestData";
import { Request, Response, NextFunction } from "express";
export function verifyLinkingBody(req: Request<LinkingRequestData>, res: Response, next: NextFunction): Promise<void> {

    const {discord_id} = req.body;

    if (!discord_id) {
        res.status(400).json();
        return;
    }

    next();
    return;
}
