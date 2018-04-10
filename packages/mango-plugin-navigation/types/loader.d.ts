export declare enum API {
    NavMenu = "/mango/v1/nav/menus",
    NavItems = "/mango/v1/nav/items",
    NavLocations = "/mango/v1/nav/locations",
}
export declare const Loader: {
    getNavMenu: (ctx: any, id: number, args?: {}) => Promise<any>;
    getNavItems: (ctx: any, id: number, args?: {}) => Promise<any>;
    getNavLocation: (ctx: any, name: string, args?: {}) => Promise<any>;
    getNavLocations: (ctx: any, args?: {}) => Promise<any[]>;
};
