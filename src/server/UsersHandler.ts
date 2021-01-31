import { TokenValidator } from './Model';
import { BaseRequestHandler } from "./BaseRequestHandler";
import { IncomingMessage, ServerResponse } from 'http';
import { HTTP_METHODS, HTTP_CODES } from '../shared/Model';
import { UsersDBAccess } from '../user/UsersDBAccess';
import { Utils } from './Utils';


export class UsersHandler extends BaseRequestHandler {
    private usersDBAccess: UsersDBAccess = new UsersDBAccess();
    private tokenValidator: TokenValidator;

    public constructor(req: IncomingMessage, res: ServerResponse, tokenValidator: TokenValidator) {
        super(req, res);
        this.tokenValidator = tokenValidator;
    }



    async handleRequest(): Promise<void> {
        switch (this.req.method) {
            case HTTP_METHODS.OPTIONS:
                this.res.writeHead(HTTP_CODES.OK);
                break;
            case HTTP_METHODS.GET:
                await this.handleGet();
                break;
            case HTTP_METHODS.PUT:
                await this.handlePut();
                break;
            case HTTP_METHODS.DELETE:
                await this.handleDelete();
                break;
            default:
                this.handleNotFound();
                break;
        }
    }
    private async handleGet() {
        const parsedUrl = Utils.getUrlParameters(this.req.url);
     if (parsedUrl) {
        const userId = parsedUrl.query.id
        if (userId) {
        const user = await this.usersDBAccess.getUserById(userId as string);
        if (user) {
            this.respondJsonObject(HTTP_CODES.OK, user)
        } else {
            this.handleNotFound();
        }
    }
}


}