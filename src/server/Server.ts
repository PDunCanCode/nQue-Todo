import { createServer, IncomingMessage, ServerResponse } from "http";
import { LoginHandler } from "./LoginHandler";
import { Utils } from "./Utils";
import { Authorizer } from "../auth/Authorizer";

export class Server {
  private authorizer: Authorizer = new Authorizer();
  public createServer() {
    createServer(async (req: IncomingMessage, res: ServerResponse) => {
      console.log("Got request from : " + req.url);
      const basePath = Utils.getUrlBasePath(req.url);

      switch (basePath) {
        case "login":
          await new LoginHandler(req, res, this.authorizer).handleRequest();
          break;

        default:
          break;
      }
      res.end();
    }).listen(8080);
    console.log("Server Started");
  }
}
