import { AxiosInstance, AxiosPromise } from 'axios';
import { Handler } from './handler';
export declare class MockAdapter {
    client: AxiosInstance;
    options: any;
    private defaultAdapter;
    handlers: {
        [index: string]: any;
    };
    constructor(client: AxiosInstance, options: any);
    restore(): void;
    adapter: (config: any) => AxiosPromise<any>;
    get(url: any, data: any, exact?: boolean): Handler;
    addHandler(method: any, url: any, data: any, exact: any): Handler;
    removeHandler(method: any, url: any): any;
    removeAllHandlers(): {
        [index: string]: any;
    };
}
