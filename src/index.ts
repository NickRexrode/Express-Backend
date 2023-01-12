var bodyParser = require("body-parser");
var express = require("express");
import { NextFunction, Request, Response } from "express";
import { AuthenticationRoutes } from "./routes/auth/AuthenticationRoutes";
import { LinkingRoutes } from "./routes/auth/LinkingRoutes";
import { SongRoutes } from "./routes/songs/SongRoutes";

const path = require("path");

const app = express();

const port = 3000;

app.use(bodyParser.json());

//logging
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.originalUrl);
    next();
})

app.use(express.static("C:\\Users\\nrexr\\Desktop\\Development\\newbackend\\public\\website")) //, { redirects: false }

app.get("/home", (req: Request, res: Response) => {
    res.status(200).sendFile("index.html", { root: path.join(__dirname, "..", "public", "website") });
})

app.get("/resume", (req: Request, res: Response) => {
    res.status(200).sendFile("resume.pdf", { root: path.join(__dirname, "..", "public") });
}) 



new AuthenticationRoutes(app, "auth");
new LinkingRoutes(app, "discord_link");
new SongRoutes(app, "songs");
app.listen(port, () => {
    console.log(`nickrexrode.com is ONLINE on port ${port}`);
})



