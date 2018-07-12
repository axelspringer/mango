export declare class DiscoveryStrategy {
    static getSrvURI(record: any): string;
    constructor();
}
export declare class RandomDiscoveryStrategy extends DiscoveryStrategy {
    constructor();
    resolve(config: any, wp: any): Promise<any>;
    static getRandomInt(min: any, max: any): any;
}
export declare class Discovery {
    wp: any;
    strategy: any;
    dnsCache: any;
    defaults: {
        enable: boolean;
        ttl: number;
        cachesize: number;
    };
    constructor(wp: any, strategy: any, settings?: {});
    use(): ((config: any) => Promise<any>)[];
    config(config: any): Promise<any>;
    error(error: any): Promise<never>;
}
