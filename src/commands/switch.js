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

const copyFile = promisify(fs.copyFile);
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);

export const command = 'switch <app|document-name> [document-path]';

export const describe = 'Switch a local file to one stored on server';

export const builder = {
};

export async function handler(argv: any) {
    if (!configDirectoryExists()) {
        throw Error('Make sure you login first');
    }
    let changeIntent = null;
    if (argv.documentPath) {
        changeIntent = await resolve([fsResolver], argv.documentPath);
    }
    else {
        const pluginFolders = await readdir(pluginsDir);
        const resolvers = pluginFolders.map(plugin => path.join(pluginsDir, plugin)).map(require);
        changeIntent = await resolve(resolvers, argv.app);
    }
    const backupFile = path.join(backupDir, uuid());
    await copyFile(changeIntent.path, backupFile);
    // TODO: actually grab this from the server
    writeFile(changeIntent.path, 'Test config file', 'utf8');
    addCommand('add', backupFile, changeIntent.path);
};
