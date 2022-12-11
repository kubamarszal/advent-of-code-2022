const array = require('./day10-input.js');

const ops = []
let register = 1;
let signal = 0;

const main = () => {
    let prev = 1;
    for(let i=0;i<array.length;i++) {
        if(array[i].includes('addx')) {
            ops.push({
                op: 'addx',
                value: parseInt(array[i].split(' ')[1]),
                start: prev,
                finish: prev + 2,
            })
            prev += 2;
        } else if(array[i].includes('noop')) {
            prev +=1;
        }
    }

    console.log(ops)

    for(let i=1;i<=220;i++) {
        const operation = ops.find(x => x.finish===i);
        if(operation!== undefined)
            register += operation.value;

        if(i=== 20 || i=== 60 || i=== 100 || i=== 140 || i=== 180 || i=== 220) {
            signal += (i*register);
        }
    }

    console.log(signal)
}

main()