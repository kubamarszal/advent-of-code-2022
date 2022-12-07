const cmds = require('./day07-input');

const main = () => {
    const lss = [];
    const disk = [];

    cmds.forEach((item, i) => {
        if(item === '$ ls')
            lss.push(i);
    })

    disk.push({
        name: '/',
        type: 'dir',
        kids: []
    })

    const parent = [disk[0]];

    for(let i=0 ; i<lss.length ; i++) {
        for(let j = lss[i] + 1 ; j<lss[i+1] ; j++) {
            const line = cmds[j];

            if(line.includes('$')) {
                const [sign, command, arg] = line.split(' ');
                if(command === 'cd' && arg === '..') {
                    parent.pop();
                } else if (command === 'cd') {
                    parent.push(parent[parent.length-1].kids.find(x => x.name === arg));
                }
            } else {
                const [ type, name ] = cmds[j].split(' ');
                let objToPush;
                if(type === 'dir') {
                    objToPush = {
                        name,
                        type,
                        size: 0,
                        kids: []
                    }
                } else {
                    objToPush = {
                        name,
                        type: 'file',
                        size: parseInt(type),
                        kids: []
                    }
                }
                parent[parent.length-1].kids.push(objToPush);
            }
        }
    }

    const bigDirs = []
    const allDirs = [];

    //this is super ugly and absolutely unacceptable way 
    //of resolving the challenge and should be rewritten 
    //into more elegant way using recursive function, but
    //due to limited time today I have to live with that
    //in pain and agony, one day I should revisit this
    //and remove the tech debt
    disk.forEach(l1 => {
        let sumL1 = 0;
        l1.kids.forEach(l2 => {
            let sumL2 = 0;
            l2.kids.forEach(l3 => {
                let sumL3 = 0;
                l3.kids.forEach(l4 => {
                    let sumL4 = 0;
                    l4.kids.forEach(l5 => {
                        let sumL5 = 0;
                        l5.kids.forEach(l6 => {
                            let sumL6 = 0;
                            l6.kids.forEach(l7 => {
                                let sumL7 = 0;
                                l7.kids.forEach(l8 => {
                                    let sumL8 = 0;
                                    l8.kids.forEach(l9 => {
                                        let sumL9 = 0;
                                        l9.kids.forEach(l10 => {
                                            sumL9 += l10.size;
                                        })
                                        if(l9.type === 'dir') {
                                            l9.size = sumL9;
                                            allDirs.push(l9.size);
                                            if(l9.size <= 100000)
                                                bigDirs.push(l9.size);
                                        }
                                        sumL8 += l9.size;
                                    })
                                    if(l8.type === 'dir') {
                                        l8.size = sumL8;
                                        allDirs.push(l8.size);
                                        if(l8.size <= 100000)
                                            bigDirs.push(l8.size);
                                    }
                                    sumL7 += l8.size;
                                })
                                if(l7.type === 'dir') {
                                    l7.size = sumL7;
                                    allDirs.push(l7.size);
                                    if(l7.size <= 100000)
                                        bigDirs.push(l7.size);
                                }
                                sumL6 += l7.size;
                            })
                            if(l6.type === 'dir') {
                                l6.size = sumL6;
                                allDirs.push(l6.size);
                                if(l6.size <= 100000)
                                    bigDirs.push(l6.size);
                            }
                            sumL5 += l6.size;
                        })
                        if(l5.type === 'dir') {
                            l5.size = sumL5;
                            allDirs.push(l5.size);
                            if(l5.size <= 100000)
                                bigDirs.push(l5.size);
                        }
                        sumL4 += l5.size;
                    })
                    if(l4.type === 'dir') {
                        l4.size = sumL4;
                        allDirs.push(l4.size);
                        if(l4.size <= 100000)
                            bigDirs.push(l4.size);
                    }
                    sumL3 += l4.size;
                })
                if(l3.type === 'dir') {
                    l3.size = sumL3;
                    allDirs.push(l3.size);
                    if(l3.size <= 100000)
                        bigDirs.push(l3.size);
                }
                sumL2 += l3.size;
            })
            if(l2.type === 'dir') {
                l2.size = sumL2;
                allDirs.push(l2.size);
                if(l2.size <= 100000)
                    bigDirs.push(l2.size);
            }
            sumL1 += l2.size;
        })
        if(l1.type === 'dir') {
            l1.size = sumL1;
            allDirs.push(l1.size);
            if(l1.size <= 100000)
                bigDirs.push(l1.size);
        }
    })
    
    const sum = bigDirs.reduce((prev, curr) => prev + curr, 0);
    const capacity = 70000000;
    const freeSpace = capacity - disk[0].size;
    const upgradeSize = 30000000;
    const toBeFreed = upgradeSize - freeSpace;

    console.log(`Dirs under 100000 sum: ${sum}`)
    console.log(`Disk capacity: ${capacity}`);
    console.log(`Total SUM: ${disk[0].size}`);
    console.log(`Freespace: ${freeSpace}`)
    console.log(`To be freed up: ${toBeFreed}`)

    allDirs.sort((a, b) => {return a-b});

    let filteredDirs = [];
    let percentage = 100;
    
    while(filteredDirs.length < 1) {
        threshold = toBeFreed * percentage / 100;
        filteredDirs = allDirs.filter(item => item < threshold && item > toBeFreed);
        percentage++;
    }
    console.log(`Dir to be removed to accomodate the upgrade: ${filteredDirs}`);
}

main()