import fs from 'fs';

import { getConfigDirectoryPath } from './utils/file';

let file = getConfigDirectoryPath('log.json');
let data = { 'commands': [] };

function resetLogger(logfile) {
    file = logfile || file;
    data = { 'commands': [] };
    fs.writeFileSync(file, JSON.stringify(data));
}

function addCommand(command, oldPath, newPath) {
    data['commands'].push({'command': command, 'old_path': oldPath, 'new_path': newPath});
    fs.writeFileSync(file, JSON.stringify(data));
}

function getCommands() {
    return JSON.stringify(data);
}

module.exports = {resetLogger, addCommand, getCommands};
