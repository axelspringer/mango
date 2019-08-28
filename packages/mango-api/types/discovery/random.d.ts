import DiscoveryStrategy from './strategy';
import { DiscoveryStrategyConfig } from './strategy';
export default class RandomDiscoveryStrategy extends DiscoveryStrategy {
    constructor(config: DiscoveryStrategyConfig);
    resolve(from: any): Promise<any>;
    static getRandomInt(min: any, max: any): any;
}
