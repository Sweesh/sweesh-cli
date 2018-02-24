/**
 * The resolve module will call all the provided resolvers, interface with stdin to deal with ambiguities, and finally ALWAYS resolve a 'CHANGE' intent.
 * If we can't, this module will throw an Error.
 * @flow
 */
export type ChangeIntent = {|
    path: string
|}

export type Resolver = {|
    name: string,
    fn: (ResolverArgs: {path: string}) => ?ChangeIntent
|}

async function resolve(resolvers: Array<Resolver>, path: string): Promise<ChangeIntent> {
    let resolved = await Promise.all(resolvers.map(({fn}) => fn({path})));
    resolved = resolved.filter(Boolean);
    if (!resolved.length) {
        throw Error(`Unable to resolve ${path}`);
    }
    if (resolved.length > 1) {
    // TODO: disambiguate from the CLI
    } else {
        return resolved[0];
    }
};

module.exports = resolve;
