export declare class Handler {
    url: any;
    data: any;
    exact: boolean;
    status: number;
    statusText: string;
    constructor(url: any, data: any, exact?: boolean);
    is(url: any): boolean;
    handle(config: any): Promise<{}>;
    reply(code?: number, statusText?: string): void;
}
