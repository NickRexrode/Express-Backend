import { login, register } from "./../../controllers/AuthController";
import { CommonRoutesConfig } from "../base/CommonRoutesConfig";
import { verifyLoginBody, verifyRegisterBody } from "./../../middlewares/auth/AuthMiddleware";
export class AuthenticationRoutes extends CommonRoutesConfig {
    configureRoutes() {
        this.app.route("/auth/login")
            .post(verifyLoginBody,
                login
            );
        this.app.route("/auth/register")
            .post(verifyRegisterBody,
                register);


    }

}