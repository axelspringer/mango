import DiscoveryStrategy from './strategy';
export default class RandomDiscoveryStrategy extends DiscoveryStrategy {
    constructor();
    resolve(config: any, wp: any, dnsCache: any): Promise<{}>;
    static getRandomInt(min: any, max: any): any;
}
