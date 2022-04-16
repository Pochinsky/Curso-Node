/**
 * @requires createFile function to create file of multiplications table
 * @requires argv object of console parameters
 * @requires colors 
 */
const { createFile } = require('./helpers/multiply');
const argv = require('./config/yargs');
require('colors');

// create file with the function imported
createFile(argv.B, argv.L, argv.l)
    .then(nameFile => console.log(nameFile,'creado'))
    .catch(err => console.log(err));