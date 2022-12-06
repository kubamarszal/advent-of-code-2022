const data = require('./day04-input');

const parseRange = (str) => {
    return [parseInt(str.split('-')[0]), parseInt(str.split('-')[1])];
}

const selfContain = (item1, item2) => {
    const [item1A, item1B] = parseRange(item1);
    const [item2A, item2B] = parseRange(item2);
    
    if (item1A <= item2A && item1B >= item2B) return true;
    if (item1A >= item2A && item1B <= item2B) return true;

    return false;
}

const overlap = (item1, item2) => {
    const [item1A, item1B] = parseRange(item1);
    const [item2A, item2B] = parseRange(item2);

    if (item2B >= item1A && item2A <= item1B) return true;

    return false;
}

const mainP1 = (input) => {
    let count = 0;
    input.forEach(item => {
        if(selfContain(item[0], item[1])) count++;
    });
    return count;
}

const mainP2 = (input) => {
    let count = 0;
    input.forEach(item => {
        if(overlap(item[0], item[1])) count++;
    });
    return count;
}

console.log(`Ranges that self-contain each other: ${mainP1(data)}`);
console.log(`Ranges that overlap: ${mainP2(data)}`);