// @flow
export const command = 'login <username> <password>';

export const describe = 'log in to Sweesh account on this computer';

export function handler(argv: any) {
    const username = argv.username;
    const password = argv.password;
    console.log(`${username}, ${password}`);
}
