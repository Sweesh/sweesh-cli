// @flow
import resolve from './resolve'; // eslint-disable-line no-unused-vars

// not sure if we can use ES6 imports for yargs, so use require for now
const argv = require('yargs') // eslint-disable-line no-unused-vars
    .commandDir('./commands')
    .help()
    .argv;
