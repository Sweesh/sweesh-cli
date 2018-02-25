import fetch from 'node-fetch';

const API_URL = 'something';

export function login(username: string, password: string) {
    const authenticationData = {
        username,
        password
    };

    fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(authenticationData),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
        switch (res.status) {
            case 200:
                // success, store valid token in ~/.sweesh/
                break;
            case 500:
                // something went terribly wrong
                break;
            default:
                // invalid credentials (either invalid password or user does not exist)
                // this could also mean the session is expired, user needs to log out and log back in
                break;
        }
    })
    .catch(err => console.error(err));
}
