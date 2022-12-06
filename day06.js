const str = require('./day06-input');

const main = (input, seq) => {
    for(let i=0 ; i< input.length - (seq-1) ; i++) {
        const hashmap = {}
        for(let j=0; j<seq; j++){
            if(hashmap[input[i+j]] === undefined)
                hashmap[input[i+j]] = [i+j];
            else {
                hashmap[input[i+j]].push(i+j);
            }
        }
        if(Object.values(hashmap).length === seq)
            return Math.max(...Object.values(hashmap)) + 1;
    }
}

console.log(`First unique 4-letter group ends at: ${main(str, 4)}`);
console.log(`First unique 4-letter group ends at: ${main(str, 14)}`);
