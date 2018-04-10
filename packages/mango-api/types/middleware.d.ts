/// <reference types="node" />
/// <reference types="winston" />
import { EventEmitter } from 'events';
import { Winston } from 'winston';
export declare class Middleware extends EventEmitter {
    ctx: any;
    config: any;
    log: Winston;
    private app;
    private router;
    private adapter;
    constructor(ctx: any, config: any, log: Winston);
    run(): void;
}
