import { Log } from './log';
export default class Config {
    args: any;
    defaults: any;
    log: Log;
    config: any;
    constructor(args?: any, defaults?: any);
    loadConfig(): void;
}
