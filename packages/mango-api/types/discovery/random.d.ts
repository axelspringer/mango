import DiscoveryStrategy from './strategy';
export default class RandomDiscoveryStrategy extends DiscoveryStrategy {
    constructor();
    resolve(from: any): Promise<string>;
    static getRandomInt(min: any, max: any): any;
}
