export declare type Development = 'development';
export declare type Production = 'production';
export declare type Runtime = Development | Production;
export declare const NODE_ENV: string, SSM_WP: string, SSM_ENV: string, SSM_PORT: string, SSM_PLUGINS: string, SSM_HOST: string, SSM_TOKEN: string, SSM_SECRET: string, SSM_MAX_AGE: string, SSM_TTL: string, SSM_JWT_SECRET_KEY: string, MANGO_WP: string, MANGO_ENV: string, MANGO_PORT: string, MANGO_PLUGINS: string, MANGO_HOST: string, MANGO_TOKEN: string, MANGO_SECRET: string, MANGO_MAX_AGE: string, MANGO_TTL: string, MANGO_JWT_SECRET_KEY: string;
export default class Environment {
    static WP: string;
    static Env: string;
    static Port: string | number;
    static Plugins: string[];
    static Host: string;
    static Token: string;
    static Secret: string;
    static MaxAge: number;
    static TTL: number;
    static JWTSecretKey: string;
    static Runtime(): "development" | "production";
    static readonly Development: boolean;
    static readonly Production: boolean;
}
