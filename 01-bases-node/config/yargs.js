
const argv = require('yargs')
    .option('B',{
        alias: 'base',
        type: 'number',
        description: 'Define the base of the multiplications',
        demandOption: true
    })
    .option('L',{
        alias: 'limit',
        type: 'number',
        description: 'Define the limit of the multiplications',
        demandOption: true
    })
    .option('l',{
        alias: 'list',
        type: 'boolean',
        description: 'Show the list of multiplications',
        demandOption: false,
        default: false
    })
    .check((argv, options) => {
        if (isNaN(argv.B))
            throw 'The base should be a number';
        if (isNaN(argv.L))
            throw 'The limit should be a number';
        return true;
    })
    .argv;

module.exports = argv;