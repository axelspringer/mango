export declare enum Env {
    Development = "development",
    Production = "production"
}
export declare type Development = Env.Development;
export declare type Production = Env.Production;
export declare type Runtime = Development | Production;
export declare const NODE_ENV: string, MANGO_ENV: string, SSM_MANGO_ENV: string;
export declare class Environment {
    static Env: string;
    static readonly Runtime: Runtime;
    static readonly Development: Boolean;
    static readonly Production: Boolean;
}
