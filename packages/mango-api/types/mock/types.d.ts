export declare class Response {
    status: any;
    data: any;
    config: any;
    headers: any;
    statusText: any;
    constructor(status: any, data: any, config: any, headers: any, statusText: any);
}
export declare type UrlMatch = string;
export declare const AnyRequest: UrlMatch;
export declare class HttpMethods {
    static GET: string;
    static POST: string;
    static OPTIONS: string;
    static HEAD: string;
    static DELETE: string;
    static PUT: string;
}
