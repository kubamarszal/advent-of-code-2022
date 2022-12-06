const { init, moves } = require('./day05-input');

const input01 = JSON.parse(JSON.stringify(init))
const input02 = JSON.parse(JSON.stringify(init))

const parseMove = (move) => {
    return new Array(
        parseInt(move.split(' ')[1]), 
        parseInt(move.split(' ')[3]), 
        parseInt(move.split(' ')[5])
        );
}

const top = (arr) => {
    const result = [];
    arr.shift(); //remove JP3GMD
    arr.forEach(subarr => {
        result.push(subarr[subarr.length - 1]);
    })
    return result.toString().replaceAll(',', '');
}

const mainP1 = (arr, moves) => {
    moves.forEach(move => {
        const [amount, from, to] = parseMove(move);
        for(let i=0 ; i < amount ; i++)
            arr[to].push(arr[from].pop());
    });
}

const mainP2 = (arr, moves) => {
    moves.forEach(move => {
        const [amount, from, to] = parseMove(move);
        arr[to].push(...arr[from].slice(-amount))
        for(let i=0 ; i < amount ; i++) {
            arr[from].pop();
        }
    });
}

mainP1(input01, moves);
console.log(`TOP LINE: ${top(input01)}`);

mainP2(input02, moves);
console.log(`TOP LINE: ${top(input02)}`);
