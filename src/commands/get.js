// @flow
import { loginTokenExists } from '../utils/file';
import { getConfig } from '../api';

export const command = 'get <username> <app>';

export const describe = 'switch default config files for app using Sweesh';

export function handler(argv: any) {
    const username = argv.username;
    const app = argv.app;
    const tokenExists = loginTokenExists(username);

    if (tokenExists) {
        getConfig(username, app, config => {
            console.log(config);
        });
    }

    else {
        console.error(`${username} is not logged in`);
    }
}
