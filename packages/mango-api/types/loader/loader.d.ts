export default class Loader {
    addResolver(name: any, func: any): void;
    _fetcher(ctx: any, url: any, params?: {}): Promise<any>;
    _postData(ctx: any, url: any, params?: {}): Promise<any>;
}
