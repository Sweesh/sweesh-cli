// @flow
import path from 'path';
import fs from 'fs';
import os from 'os';
import Token from '../models/token';

const HOME_DIR = os.homedir();
const CONFIG_DIR = path.resolve(HOME_DIR, '.sweesh');

function fileExists(path: string) {
    try {
        fs.accessSync(path);
        return true;
    }

    catch (err) {
        return false;
    }
}

function getTokenPath(username: string) {
    const tokenName = `${username}-token.json`;
    return path.resolve(CONFIG_DIR, tokenName);
}

export function getLoginToken(username: string): Token {
    const tokenPath = getTokenPath(username);
    let data: Buffer;

    try {
        data = fs.readFileSync(tokenPath);
        return JSON.parse(data.toString());
    }

    catch (err) {
        console.error(err);
    }
}

export function configDirectoryExists() {
    return fileExists(CONFIG_DIR);
}

export function loginTokenExists(username: string) {
    const tokenPath = getTokenPath(username);
    return fileExists(tokenPath);
}

export function createConfigDirectory() {
    try {
        fs.mkdirSync(CONFIG_DIR);
    }

    catch (err) {
        console.error(err);
    }
}

export function createLoginToken(username: string, json: string) {
    const tokenPath = getTokenPath(username);

    try {
        fs.writeFileSync(tokenPath, json);
    }

    catch (err) {
        console.error(err);
    }
}

export function removeLoginToken(username: string) {
    const tokenPath = getTokenPath(username);

    try {
        fs.unlinkSync(tokenPath);
    }

    catch (err) {
        console.error(err);
    }
}
