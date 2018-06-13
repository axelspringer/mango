export default function (config?: any): {
    adapter: (req: any) => Promise<any>;
    config: any;
};
