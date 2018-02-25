// @flow
import { loginTokenExists, removeLoginToken } from '../utils/file';

export const command = 'logout <username>';

export const describe = 'log out of Sweesh account on this computer';

export function handler(argv: any) {
    const username = argv.username;
    const tokenName = `${username}-token.json`;
    const tokenExists = loginTokenExists(tokenName);

    if (tokenExists) {
        removeLoginToken(tokenName);
    }

    else {
        console.log(`${username} already logged out on this computer`);
    }
}
