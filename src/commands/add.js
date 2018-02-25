// @flow

import path from 'path';
import uuid from 'uuid';
import fs from 'fs';
import { promisify } from 'util';

import resolve from '../utils/resolve';
import fsResolver from '../utils/fsResolver';

import type {Resolver, ChangeIntent} from '../utils/resolve';

const backupDir = path.resolve(process.env.HOME, './.sweesh/backups');
const pluginsDir = path.resolve(process.env.HOME, './.sweesh/plugins');

const copyFile = promisify(fs.copyFile);
const writeFile = promisify(fs.writeFile);

export const command = 'add <app|document-name> [document-path]';

export const describe = 'Add a file to sweesh-cli servers';

export const builder = {
};

export async function handler(argv: any) {
    const resolvers = [];
    let changeIntent = null;
    if (argv.documentPath) {
        changeIntent = await resolve([fsResolver], argv.documentPath);
    } else {
        // TODO: get all the resolvers from the resolvers directory
        // TODO: call resolve with all resolvers and the file name
        changeIntent = await resolve(resolvers, argv.app);
    }
    // const rootDir = changeIntent.path.split('/').slice(0, -1).join('/') + '/';
    // TODO: execute CHANGE intent
    const backupFile = path.join(backupDir, uuid());
    // TODO: create dir if it doesn't exist
    await copyFile(changeIntent.path, backupFile);
    // TODO: fetch actual file from server
    writeFile(changeIntent.path, 'Test config file', 'utf8');
    // TODO: write change log to logger
};
