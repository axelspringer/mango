/// <reference types="node" />
import { EventEmitter } from 'events';
export declare class Middleware extends EventEmitter {
    ctx: any;
    config: any;
    schema: any;
    log: any;
    private app;
    private router;
    private adapter;
    constructor(ctx: any, config: any, schema: any, log: any);
    start(): void;
}
