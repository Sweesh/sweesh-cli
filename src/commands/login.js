// @flow
import resetLogger from '../logger';
import { login } from '../api';
import { loginTokenExists } from '../utils/file';

export const command = 'login <username> <password>';

export const describe = 'log in to Sweesh account on this computer';

export function handler(argv: any) {
    const username = argv.username;
    const password = argv.password;
    resetLogger();
    const tokenExists = loginTokenExists(username);

    if (!tokenExists) {
        login(username, password);
    }

    else {
        console.log(`${username} already logged in on this computer`);
    }
}
