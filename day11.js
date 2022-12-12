const { monke: monkes } = require('./day11-input');

const throwItem = (from, to, item) => {
    const itemFrom = monkes[from].items[item];
    monkes[to].items.push(itemFrom);
    monkes[from].toDel.unshift(item);
}

const worryCalc = (monkeI, itemI, action, value) => {
    if(action === 'm') monkes[monkeI].items[itemI] *= value;
    if(action === 'a') monkes[monkeI].items[itemI] += value;
    if(action === 'p') monkes[monkeI].items[itemI] **= value;
}

const boredMonke = (monkeI, itemI) => {
    monkes[monkeI].items[itemI] = Math.floor(monkes[monkeI].items[itemI] / 3)
}

const test = (monkeI, itemI) => {
    const { test : { div }} = monkes[monkeI];
    return monkes[monkeI].items[itemI] % div === 0;
}

const monkeBusiness = () => {
    let max = 0;
    let secondMax = 0;
    monkes.find(x => {
        if(x.inspected > max)
            max = x.inspected
    })

    monkes.find(x => {
        if(x.inspected > secondMax && x.inspected !== max)
            secondMax = x.inspected
    })

    console.log('inspected: ' + max);
    console.log('inspected: ' + secondMax);
    return { one: max, two: secondMax };
}

const main = () => {
    let i = 0;
    const rounds = 20;
    while (i<rounds) {
        monkes.forEach((monke, i) => {
            const { items, new: [action, value], test: {trueAction, falseAction} } = monke;
            
            items.forEach((item, j) => {
                worryCalc(i, j, action, value);
                boredMonke(i, j);
                const to = test(i, j) ? trueAction : falseAction;
                throwItem(i, to, j);
                monke.inspected++;
            })

            const { toDel } = monke;

            toDel.forEach(item => {
                items.splice(item, 1);
            })

            toDel.splice(0, toDel.length);
        })

        i++;
    }

    console.log(monkes)
    const { one, two } = monkeBusiness();
    console.log('monkebusiness: ' + one*two)
}

main()