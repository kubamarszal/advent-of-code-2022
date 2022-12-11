const array = require('./day10-input.js');

const ops = []
let register = 1;
let signal = 0;
const CRT = [];

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

    let sprite = register;
    for(let i=1;i<=240;i++) {
        const operation = ops.find(x => x.finish===i);
        if(operation!== undefined)
            register += operation.value;

        if(i=== 20 || i=== 60 || i=== 100 || i=== 140 || i=== 180 || i=== 220) {
            signal += (i*register);
        }

        const modifier = Math.floor(i/40)*40;
        sprite = register + modifier;
        const decision = sprite === i - 1 || sprite + 1 === i - 1 || sprite - 1 === i - 1;
        if(decision) {
            CRT[i-1]=1;
        }
        else {
            CRT[i-1]=0;
        }
        console.log(i, register, sprite, decision)
    }
    
    console.log(signal)
    console.log(JSON.stringify(CRT.splice(0,40)))
    console.log(JSON.stringify(CRT.splice(0,40)))
    console.log(JSON.stringify(CRT.splice(0,40)))
    console.log(JSON.stringify(CRT.splice(0,40)))
    console.log(JSON.stringify(CRT.splice(0,40)))
    console.log(JSON.stringify(CRT.splice(0,40)))
}

main()