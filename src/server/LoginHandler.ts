import { IncomingMessage, ServerResponse } from "http";
import { resolve } from "path";
import { HTTP_CODES, HTTP_METHODS } from "../shared/Model";
import { Account, TokenGenerator } from "./Model";

export class LoginHandler implements Handler {
  private req: IncomingMessage;
  private res: ServerResponse;
  private tokenGenerator: TokenGenerator;

  public constructor(
    req: IncomingMessage,
    res: ServerResponse,
    tokenGenerator: TokenGenerator
  ) {
    this.req = req;
    this.res = res;
    this.tokenGenerator = tokenGenerator;
  }
  public async handleRequest(): Promise<void> {
    switch (this.req.method) {
        case HTTP_METHODS.POST:
            await this.handlePost();
            break;
        case HTTP_METHODS.OPTIONS:
            this.res.writeHead(HTTP_CODES.OK);
            break;
        default:
            this.handleNotFound();
            break;
    }
}
  handleNotFound() {
    throw new Error("Method not implemented.");
  }

private async handlePost() {
    try {
        const body: Account = await this.getRequestBody();
        const sessionToken = await this.tokenGenerator.generateToken(body);
        if (sessionToken) {
            this.res.statusCode = HTTP_CODES.CREATED,
                this.res.writeHead(HTTP_CODES.CREATED, { 'Content-Type': 'application/json' });
            this.res.write(JSON.stringify(sessionToken));
        } else {
            this.res.statusCode = HTTP_CODES.NOT_FOUND;
            this.res.write('wrong username or password');
        }
    } catch (error) {
        this.res.write('error: ' + error.message)
    }
}
  getRequestBody(): Account | PromiseLike<Account> {
    throw new Error("Method not implemented.");
  }


}