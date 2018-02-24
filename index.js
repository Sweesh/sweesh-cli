#!/usr/bin/env node
const fs = require('fs');
const argv = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .command('add', 'Adds a file')
    .example('$0 add -f foo.js', 'puts a file on the database')
    .alias('f', 'file')
    .nargs('f', 1)
    .describe('f', 'Load a file')
    .demandOption(['f'])
    .help('h')
    .alias('h', 'help')
    .argv;
const s = fs.createReadStream(argv.file);

var lines = "";
s.on('data', function (buf) {
    lines += buf.toString()
});

s.on('end', function () {
    console.log(lines);
});