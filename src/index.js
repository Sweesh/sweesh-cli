// @flow
import { configDirectoryExists, createConfigDirectory } from './utils/file';

// not sure if we can use ES6 imports for yargs, so use require for now
const argv = require('yargs') // eslint-disable-line no-unused-vars
    .commandDir('./commands')
    .help()
    .argv;

// check if the ~/.sweesh/ directory exists and create it if it doesn't
if (!configDirectoryExists()) {
    console.log('Creating .sweesh directory in home folder');
    createConfigDirectory();
}
