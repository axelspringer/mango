/// <reference types="node" />
/// <reference types="koa" />
/// <reference types="koa-bodyparser" />
import { EventEmitter } from 'events';
import * as Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';
export declare class Middleware extends EventEmitter {
    ctx: any;
    config: any;
    schema: any;
    log: any;
    app: Koa;
    adapter: any;
    listener: any;
    apollo: ApolloServer;
    constructor(ctx: any, config: any, schema: any, log: any);
    start(): void;
    stop(): void;
}
