#!/usr/bin/env node

const argv = require('yargs').usage('Usage: $0 --ships [num] --distance [num]').argv
 
if (argv.ships > 3 && argv.distance < 53.5) {
  console.log('Plunder more riffiwobbles!')
} else {
  console.log('Retreat from the xupptumblers!')
}