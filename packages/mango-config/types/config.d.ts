import { Log } from './log';
export declare class Config {
    args: any;
    defaults: any;
    log: Log;
    config: any;
    constructor(args?: any, defaults?: any);
    loadConfig(): void;
}
