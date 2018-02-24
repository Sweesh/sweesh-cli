// @flow
export const command = 'logout <username>';

export const describe = 'log out of Sweesh account on this computer';

export function handler(argv: any) {
    const username = argv.username;
    const tokenName = `${username}-token.json`;
    const tokenExists = true; // call file utils to check for token

    if (tokenExists) {
        // delete the token
    }

    else {
        console.log(`${username} already logged out on this computer`);
    }
}
