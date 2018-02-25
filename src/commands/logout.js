// @flow
import resetLogger from '../logger';
import { loginTokenExists, removeLoginToken } from '../utils/file';
import { getCommands, addCommand } from '../logger';
import { promisify } from 'util';
import fs from 'fs';
import { configDirectoryExists } from '../utils/file';

const copyFile = promisify(fs.copyFile);

export const command = 'logout <username>';

export const describe = 'log out of Sweesh account on this computer';

export function handler(argv: any) {

    if (!configDirectoryExists()) {
        throw Error('You have not logged in first');
    }


    const username = argv.username;
    const tokenExists = loginTokenExists(username);
    (JSON.parse(getCommands())["commands"]).map( command => fs.copyFile(command['old_path'], command['new_path'])  )
    resetLogger();

    if (tokenExists) {
        removeLoginToken(username);
        console.log(`${username} successfully logged out`);
    }

    else {
        console.log(`${username} already logged out on this computer`);
    }
}
