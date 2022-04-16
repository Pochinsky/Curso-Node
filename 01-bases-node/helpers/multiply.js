/**
 * @requires fs to write files
 * @requires colors to colorize console outputs
 */
const fs = require('fs');
const colors = require('colors');

/**
 * 
 * @param {number} base Base of multiplication
 * @description Multiply the from 1 to 10 multiplications of the base
 * @returns {string} informate of .txt file was created
 */
const createFile = async (base = 5, limit = 10, list = false) => {
    try {
        console.clear()
        // variable to save the output content 
        let output = '';
        // write each multiplication in separated lines
        for (let i=1; i<=limit; i++) output += `${base} ${'x'.gray} ${i} ${'='.gray} ${base*i}\n`;
        // write file
        fs.writeFileSync(`./out/tabla-${base}.txt`, output);
        // print the file content in console
        if (list)
            console.log('=====================\n'.green);
            console.log('     Tabla del'.blue, colors.blue(base),'\n');
            console.log('=====================\n'.green)
            console.log(output);
        // informate of the .txt creation
        return `tabla-${base}.txt creado`;
    } catch  (err) {
        throw err;
    }
}

/**
 * @exports createFile Function
 */
module.exports = {
    createFile
};