// @flow

import path from 'path';
import uuid from 'uuid';
import fs from 'fs';
import { promisify } from 'util';
import { addCommand } from '../logger';
import resolve from '../utils/resolve';
import fsResolver from '../utils/fsResolver';

import { getConfigDirectoryPath, configDirectoryExists } from '../utils/file';

// import type {Resolver, ChangeIntent} from '../utils/resolve';

const backupDir = getConfigDirectoryPath('backups');
const pluginsDir = getConfigDirectoryPath('plugins');

const readFile = promisify(fs.readFile);
const readdir = promisify(fs.readdir);

export const command = 'add <app|document-name> [document-path]';

export const describe = 'Add a local file to the server';

export const builder = {
};

export async function handler(argv: any) {
    if (!configDirectoryExists()) {
        throw Error('Make sure you login first');
    }
    let addIntent = null;
    if (argv.documentPath) {
        addIntent = await resolve([fsResolver], argv.documentPath);
    }
    else {
        const pluginFolders = await readdir(pluginsDir);
        const resolvers = pluginFolders.map(plugin => path.join(pluginsDir, plugin)).map(require);
        addIntent = await resolve(resolvers, argv.app);
    }
    const file = await(readFile(addIntent.path, 'utf8'));
    //TODO: Push file to server
};
