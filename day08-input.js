const { readFileSync } = require('fs')
const data = readFileSync('./day08.dat', 'utf-8');

const transform = () => {
    let i=0;
    const table = [];
    let line = [];
    while(data[i] !== undefined) {
        if(data[i] !== '\n') {
            line.push(parseInt(data[i]));
        }
        else {
            table.push(line);
            line = [];
        }
        i++;
    }

    return table;
}

module.exports = { transform }