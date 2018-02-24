import fs from 'fs';

var file = 'log.json';
var data = { 'commands': [] };

function resetLogger(logfile = 'log.json') {
    file = logfile;
    fs.writeFileSync(file, JSON.stringify({ 'commands': [] }));
}

function addCommand(command, oldPath, newPath) {
    (data['commands']).push({'command': command, 'old_path': oldPath, 'new_path': newPath});
    fs.writeFileSync(file, JSON.stringify(data));
}

function getCommands() {
    return JSON.stringify(data);
}

module.exports = {resetLogger, addCommand, getCommands};
