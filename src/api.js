// @flow
import fetch from 'node-fetch';
import { createLoginToken } from './utils/file';

const API_URL = 'http://financialapps.barngang.co/api';

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
                return res.json();
            case 500:
                console.error('An internal server error occurred. Please try again later');
                return null;
            default:
                console.error('Failed to authenticate. Invalid username/password');
                return null;
        }
    })
    .then(json => {
        if (json) {
            const token = JSON.stringify(json);
            createLoginToken(username, token);
            console.log(`${username} successfully logged in`);
        }
    })
    .catch(err => console.error(err));
}

export function register(username: string, password: string) {
    const registrationData = {
        username,
        password
    };

    fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        body: JSON.stringify(registrationData),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
        if (res.status === 200) {
            return res.json();
        }

        else {
            console.error(`An error occurred during registration. Please try again later`);
            return null;
        }
    })
    .then(json => {
        if (json && json.worked) {
            console.log(`${username} successfully registered`);
        }
    })
    .catch(err => console.error(err));
}
