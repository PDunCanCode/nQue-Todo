import { createServer, IncomingMessage, ServerResponse } from "http";
import { LoginHandler } from "./LoginHandler";
import { Utils } from "./Utils";
import { Authorizer } from "../auth/Authorizer";
import { UsersHandler } from "./UsersHandler";

export class Server {
  private authorizer: Authorizer = new Authorizer();
  public createServer() {
    createServer(async (req: IncomingMessage, res: ServerResponse) => {
      console.log("Got request from : " + req.url);
      this.addCorsHeader(res);
      const basePath = Utils.getUrlBasePath(req.url);

      switch (basePath) {
        case "login":
          await new LoginHandler(req, res, this.authorizer).handleRequest();
          break;
        case "users":
          await new UsersHandler(req, res, this.authorizer);

        default:
          break;
      }
      res.end();
    }).listen(8080);
    console.log("Server Started");
  }
  private addCorsHeader(res: ServerResponse) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
  }
}
