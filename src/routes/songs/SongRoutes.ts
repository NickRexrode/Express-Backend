import { verifySongBody } from "./../../middlewares/songs/SongMiddleware";
import { CommonRoutesConfig } from "../base/CommonRoutesConfig";
import { saveSong } from "./../../controllers/SongController";

export class SongRoutes extends CommonRoutesConfig {
    configureRoutes() {
        this.app.route("/api/songs")
            .post(verifySongBody,
                saveSong
            );



    }

}