// @flow
import path from 'path';
import fs from 'fs';
import os from 'os';

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

function getTokenName(username: string) {
    return `${username}-token.json`;
}

function getConfigDirectoryPath(file: string) {
    return path.resolve(CONFIG_DIR, file);
}

export function configDirectoryExists() {
    return fileExists(CONFIG_DIR);
}

export function loginTokenExists(username: string) {
    const tokenName = getTokenName(username);
    const tokenPath = getConfigDirectoryPath(tokenName);
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
    const tokenName = getTokenName(username);
    const tokenPath = getConfigDirectoryPath(tokenName);

    try {
        fs.writeFileSync(tokenPath, json);
    }

    catch (err) {
        console.error(err);
    }
}

export function removeLoginToken(username: string) {
    const tokenName = getTokenName(username);
    const tokenPath = getConfigDirectoryPath(tokenName);

    try {
        fs.unlinkSync(tokenPath);
    }

    catch (err) {
        console.error(err);
    }
}
