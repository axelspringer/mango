import DiscoveryStrategy from './strategy';
import { DiscoveryStrategyConfig } from './strategy';
export default class SimpleRoundRobin extends DiscoveryStrategy {
    /**
     * Record last selected record
     */
    lastRecord: number;
    constructor(config: DiscoveryStrategyConfig);
    resolve(from: any): Promise<any>;
    record(records: any): any;
}
