// @flow
import fetch from 'node-fetch';

const LOGIN_URL = 'put login url here';

export const command = 'login <username> <password>';

export const describe = 'log in to Sweesh account on this computer';

export function handler(argv: any) {
    const authenticationData = {
        username: argv.username,
        password: argv.password
    };
    const tokenName = `${authenticationData.username}-token.json`;
    const tokenExists = true; // call file util here to check for existing token

    if (!tokenExists) {
        fetch(LOGIN_URL, {
            method: 'POST',
            body: JSON.stringify(authenticationData),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            switch (res.status) {
                case 200:
                    // success, store valid token in ~/.sweesh/
                    break;
                case 400:
                    // bad request
                    break;
                case 401:
                    // invalid credentials
                    break;
                case 500:
                    // something went terribly wrong
                    break;
            }
        })
        .catch(err => console.error(err));
    }

    else {
        console.log(`${authenticationData.username} already logged in on this computer`);
    }
}
