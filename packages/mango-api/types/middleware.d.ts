/// <reference types="node" />
import { EventEmitter } from 'events';
import * as Koa from 'koa';
import * as koaRouter from 'koa-router';
export declare class Middleware extends EventEmitter {
    ctx: any;
    config: any;
    schema: any;
    log: any;
    app: Koa;
    router: koaRouter;
    adapter: any;
    listener: any;
    constructor(ctx: any, config: any, schema: any, log: any);
    start(): void;
    stop(): void;
}
