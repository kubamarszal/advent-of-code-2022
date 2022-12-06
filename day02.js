const inputData = require('./day02-input');

const results = [
    [4, 8, 3], 
    [1, 5, 9], 
    [7, 2 ,6]
];

const resultToAwayShape = {
    1: 'X',
    2: 'Z',
    3: 'Y',
    4: 'Z',
    5: 'Y',
    6: 'X',
    7: 'Y',
    8: 'X',
    9: 'Z',
}

const compare = ({home, away}) => {
    home = home === "A" ? 0 : home === "B" ? 1 : 2;
    away = away === "X" ? 0 : away === "Y" ? 1 : 2;
    return results[home][away];
}

const transform = (input) => {
    let arr = []
    input.forEach(item => {
        const transformed = {
            home: item.home,
            away: resultToAwayShape[compare(item)]
        }
        arr.push(transformed)
    })
    return arr;
}

const func = (input) => {
    let points = 0;
    input.forEach(item => {
        points += compare(item);
    })
    return points;
}

console.log(`Part1 - total points: ${func(inputData)}`)
console.log(`Part2 - total points: ${func(transform(inputData))}`)