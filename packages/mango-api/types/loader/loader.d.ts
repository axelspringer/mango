export declare class Job {
    ctx: any;
    url: any;
    params: {};
    resolve: any;
    reject: any;
    key: any;
    promise: Promise<{}>;
    constructor(ctx: any, url: any, params?: {});
    fetch(): any;
}
export default class Loader {
    queue: Job[];
    promise: Promise<any>;
    addResolver(name: any, func: any): void;
    job(ctx: any, url: any, params?: {}): Promise<{}>;
    dispatch(): void;
}
