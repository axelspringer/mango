import '../utils/almost';
export interface DiscoveryRecord {
    priority?: number;
    weight?: number;
    port?: number;
    name?: string;
}
export interface DiscoveryStrategyConfig {
    dnsCacheConfig?: any;
}
export default class DiscoveryStrategy {
    config: DiscoveryStrategyConfig;
    dnsCache: any;
    constructor(config?: DiscoveryStrategyConfig);
    resolveSrv(url: any): Promise<any[]>;
}
