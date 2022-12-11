const { readFileSync } = require('fs')
const data = readFileSync('./day09.dat', 'utf-8');

const transform = () => {
    let i=0;
    const table = [];
    let line = [];
    while(data[i] !== undefined) {
        if(data[i] !== '\n') {
            line += data[i];
        }
        else {
            const [direction, value] = line.split(' ');
            table.push({
                direction,
                value
            });
            line = [];
        }
        i++;
    }

    return table;
}

module.exports = { transform }