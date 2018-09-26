export default class Loader {
    addResolver(name: any, func: any): void;
    _fetcher(ctx: any, url: any, params?: {}, isGet?: boolean): Promise<any>;
}
