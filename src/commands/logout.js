// @flow
import fs from 'fs';
import { loginTokenExists, removeLoginToken } from '../utils/file';
import { getCommands, resetLogger } from '../logger';
import { promisify } from 'util';

const copyFile = promisify(fs.copyFile);

export const command = 'logout <username>';

export const describe = 'log out of Sweesh account on this computer';

export function handler(argv: any) {
    const username = argv.username;
    const tokenExists = loginTokenExists(username);
    if (tokenExists) {
        (JSON.parse(getCommands())['commands']).forEach(command => copyFile(command['new_path'], command['old_path']));
        resetLogger();
        removeLoginToken(username);
        console.log(`${username} successfully logged out`);
    }
    else {
        console.log(`${username} already logged out on this computer`);
    }
}
