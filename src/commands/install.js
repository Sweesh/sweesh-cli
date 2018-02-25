// @flow

// import path from 'path';
// import uuid from 'uuid';
// import fs from 'fs';
// import { promisify } from 'util';
// import { addCommand } from '../logger';
// import resolve from '../utils/resolve';
import installFromGithub from '../utils/installFromGithub';

import { getConfigDirectoryPath, configDirectoryExists } from '../utils/file';

// import type {Resolver, ChangeIntent} from '../utils/resolve';

// const backupDir = getConfigDirectoryPath('backups');
const pluginsDir = getConfigDirectoryPath('plugins');

// const copyFile = promisify(fs.copyFile);
// const writeFile = promisify(fs.writeFile);
// const readdir = promisify(fs.readdir);

export const command = 'install <repo-stub>';

export const describe = 'Installs a plugin using a github repo stub (eg: Sweesh/vim-plugin)';

export const builder = {
};

export async function handler(argv: any) {
    if (!configDirectoryExists()) {
        throw Error('Make sure you login first');
    }
    // check if valid stub, else default to prepending 'Sweesh/'
    let repoStub = argv.repoStub;
    if (repoStub.split('/').length === 1) {
        repoStub = 'Sweesh/' + repoStub;
    }
    // Fetch the tar from github
    // and extract tar into plugins directory
    await installFromGithub(repoStub, pluginsDir);
    // TODO: add installed plugin to the user
};
