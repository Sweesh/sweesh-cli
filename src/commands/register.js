// @flow
import { register } from '../api';

export const command = 'register <username> <password>';

export const describe = 'register a Sweesh account';

export function handler(argv: any) {
    const username = argv.username;
    const password = argv.password;

    register(username, password);
}
