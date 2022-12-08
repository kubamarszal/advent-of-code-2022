const { transform: input } = require('./day08-input');

const data = input();
const map = {};

const up = (i, j) => {
    let str = '';
    for(let k=0;k<i;k++)
        str += data[k][j];
    return str;
}

const down = (i, j) => {
    let str = '';
    for(let k=i+1;k<data.length;k++)
        str += data[k][j];
    return str;
}

const left = (i, j) => {
    let str = '';
    for(let k=0;k<j;k++)
        str += data[i][k];
    return str;
}

const right = (i, j) => {
    let str = '';
    for(let k=j+1;k<data[i].length;k++)
        str += data[i][k];
    return str;
}

const isVisible = (i, j) => {
    const { height, up, down, left, right } = map[`${i},${j}`];
    let visibility = 0;
    up.split('').find(x => parseInt(x) >= parseInt(height)) === undefined ? visibility++ : 0;
    down.split('').find(x => parseInt(x) >= parseInt(height)) === undefined ? visibility++ : 0;
    left.split('').find(x => parseInt(x) >= parseInt(height)) === undefined ? visibility++ : 0;
    right.split('').find(x => parseInt(x) >= parseInt(height)) === undefined ? visibility++ : 0;
    return visibility > 0;
}

const calculateScenicScore = (i, j) => {
    const { height, up, down, left, right } = map[`${i},${j}`];
    let scenicScore = [];

    const treesVisibilityUp = up.split('').findLastIndex(x => { return parseInt(x) >= parseInt(height)})
    scenicScore.push(treesVisibilityUp < 0
        ? up.length 
        : up.length - treesVisibilityUp);

    const treesVisibilityLeft = left.split('').findLastIndex(x => { return parseInt(x) >= parseInt(height)})
    scenicScore.push(treesVisibilityLeft < 0
        ? left.length 
        : left.length - treesVisibilityLeft);

    const treesVisibilityDown = down.split('').findIndex(x => { return parseInt(x) >= parseInt(height)})
    scenicScore.push(treesVisibilityDown < 0
        ? down.length
        : treesVisibilityDown + 1);

    const treesVisibilityRight = right.split('').findIndex(x => { return parseInt(x) >= parseInt(height)})
    scenicScore.push(treesVisibilityRight < 0
        ? right.length
        : treesVisibilityRight + 1);
        
    return scenicScore.reduce((prev, curr) => { return prev * curr});
}

const hashIt = () => {
    for(let i=0;i<data.length;i++) {
        for(let j=0;j<data[i].length;j++) {
            map[`${i},${j}`] = {
                height: `${data[i][j]}`,
                up: up(i, j),
                down: down(i, j),
                left: left(i, j),
                right: right(i, j),
                isVisible: undefined,
                scenicScore: 0,
            }
        }
    }
}

const main = () => {
    hashIt();

    let visibility = 0;
    let highestScenic = 0;
    for(let i=0;i<data.length;i++) {
        for(let j=0;j<data[i].length;j++) {
                map[`${i},${j}`].isVisible = isVisible(i, j);
                visibility += map[`${i},${j}`].isVisible;
                map[`${i},${j}`].scenicScore = calculateScenicScore(i, j);
                highestScenic = Math.max(highestScenic, calculateScenicScore(i, j));
        }
    }
    console.log(`Visible trees count: ${visibility}`)
    console.log(`Highest scenic score possible: ${highestScenic}`)
}

main();