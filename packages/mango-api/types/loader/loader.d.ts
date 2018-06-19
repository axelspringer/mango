import { GraphQLContext } from 'graphql';
export default class Loader {
    addResolver(name: any, func: any): void;
    _fetcher(ctx: GraphQLContext, url: any, params?: {}): Promise<any>;
}
