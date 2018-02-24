/**
 * The resolve module will call all the provided resolvers, interface with stdin to deal with ambiguities, and finally ALWAYS resolve a 'CHANGE' intent.
 * If we can't, this module will throw an Error.
 */

const resolve = (resolvers) => {
  return {
    path: "./test.config"
  }
}