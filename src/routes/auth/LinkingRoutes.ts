import { initalizeLinking, completeLink} from "./../../controllers/DiscordLinkingController";
import { CommonRoutesConfig } from "../base/CommonRoutesConfig";

import { verifyLinkingBody } from "./../../middlewares/auth/linking/LinkingMiddleware";
export class LinkingRoutes extends CommonRoutesConfig {
    configureRoutes() {
        this.app.route("/auth/link")
            .post(verifyLinkingBody,
                initalizeLinking
            );
        this.app.route("/auth/link")
            .get(completeLink);


    }

}