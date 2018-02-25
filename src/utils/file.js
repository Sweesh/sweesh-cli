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

export function configDirectoryExists() {
    return fileExists(CONFIG_DIR);
}

export function loginTokenExists(token: string) {
    const tokenPath = path.resolve(CONFIG_DIR, token);
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

export function removeLoginToken(token: string) {
    const tokenPath = path.resolve(CONFIG_DIR, token);
    try {
        fs.unlinkSync(tokenPath);
    }

    catch (err) {
        console.error(err);
    }
}
