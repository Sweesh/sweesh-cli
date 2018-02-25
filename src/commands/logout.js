// @flow
import { loginTokenExists, removeLoginToken } from '../utils/file';

export const command = 'logout <username>';

export const describe = 'log out of Sweesh account on this computer';

export function handler(argv: any) {
    const username = argv.username;
    const tokenExists = loginTokenExists(username);

    if (tokenExists) {
        removeLoginToken(username);
        console.log(`${username} successfully logged out`);
    }

    else {
        console.log(`${username} already logged out on this computer`);
    }
}
