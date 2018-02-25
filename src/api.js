// @flow
import fetch from 'node-fetch';
import { createLoginToken } from './utils/file';

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
                createLoginToken(username, res.body);
                console.log(`${username} successfully logged in`);
                break;
            case 500:
                console.error('An internal server error occurred. Please try again later');
                break;
            default:
                console.error('Failed to authenticate. Invalid username/password');
                break;
        }
    })
    .catch(err => console.error(err));
}
