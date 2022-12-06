const input = require('./day03-input');

const priorities = {
    'a': 1,
    'b': 2,
    'c': 3,
    'd': 4,
    'e': 5,
    'f': 6,
    'g': 7,
    'h': 8,
    'i': 9,
    'j': 10,
    'k': 11,
    'l': 12,
    'm': 13,
    'n': 14,
    'o': 15,
    'p': 16,
    'q': 17,
    'r': 18,
    's': 19,
    't': 20,
    'u': 21,
    'v': 22,
    'w': 23,
    'x': 24,
    'y': 25,
    'z': 26,
    'A': 27,
    'B': 28,
    'C': 29,
    'D': 30,
    'E': 31,
    'F': 32,
    'G': 33,
    'H': 34,
    'I': 35,
    'J': 36,
    'K': 37,
    'L': 38,
    'M': 39,
    'N': 40,
    'O': 41,
    'P': 42,
    'Q': 43,
    'R': 44,
    'S': 45,
    'T': 46,
    'U': 47,
    'V': 48,
    'W': 49,
    'X': 50,
    'Y': 51,
    'Z': 52,
}

const split = (str) => {
    const halfLen = str.length / 2;
    return { first: str.slice(0, halfLen).split(''), second: str.slice(-halfLen).split('') }
}

const arrarize = (str) => {
    return str.split('');
}

const objectify = (arr) => {
    const obj = {};
    arr.forEach(item => {
        if (obj[item] === undefined) obj[item] = 1;
        else obj[item]++;
    });
    return obj;
}

const calcPrioVal = (array) => {
    let sumOfPrios = 0;
    array.forEach(item => {
        sumOfPrios += priorities[item];
    })

    return sumOfPrios;
}

const mainP1 = () => {
    const prio = []
    input.forEach(item => {
        const prioRound = new Set();
        const { first, second } = split(item);
        const fiob = objectify(first);
        second.forEach(item => {
            if(fiob[item] !== undefined)
                prioRound.add(item);
        })
        prio.push(...prioRound)
    })
    
    return calcPrioVal(prio);
}

const mainP2 = () => {
    const arr = [], prio = [];
    for (let i = 1; i < input.length; i += 3) {
        arr.push([
            arrarize(input[i-1]), 
            arrarize(input[i]), 
            arrarize(input[i+1])
        ]);
    }

    arr.forEach(item => {
        const one = objectify(item[0]);
        const two = item[1];
        const three = objectify(item[2]);
        
        two.every(char => {
            if(one[char] !== undefined && three[char] !== undefined) {
                prio.push(char);
                return false;
            }
            return true;
        })
    })

    return calcPrioVal(prio);
}

console.log(`Result part1: ${mainP1()}`)
console.log(`Result part2: ${mainP2()}`)