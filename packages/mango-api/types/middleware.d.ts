/// <reference types="koa-bodyparser" />
/// <reference types="node" />
import { EventEmitter } from 'events';
import * as Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';
export declare class Middleware extends EventEmitter {
    ctx: any;
    config: any;
    schema: any;
    app: Koa;
    adapter: any;
    listener: any;
    apollo: ApolloServer;
    constructor(ctx: any, config: any, schema: any);
    start(): void;
    stop(): void;
}
