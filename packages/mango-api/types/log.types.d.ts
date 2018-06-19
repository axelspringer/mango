export interface WinstonMessage {
    level?: string;
    message?: string;
}
export declare class Level {
    static EMERG: string;
    static ALERT: string;
    static ERROR: string;
    static WARNING: string;
    static NOTICE: string;
    static INFO: string;
    static DEBUG: string;
}
export declare class Message implements WinstonMessage {
    level: string;
    message: string;
    constructor(level?: string, message?: string);
}
