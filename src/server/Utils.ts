import { UrlWithParsedQuery } from 'url';
const URL = require('url')

export class Utils {


    public static getUrlBasePath(url: string | undefined): string {
        if (url) {
            const parsedUrl = new URL(url);
            return parsedUrl.pathname!.split('/')[1];
        } else {
            return '';
        }
    }

    public static getUrlParameters(url: string | undefined): UrlWithParsedQuery | undefined {
        if (url) {
            return new URL(url, true);
        } else {
            return undefined;
        }
    }
}