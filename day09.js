const { transform } = require('./day09.input');
const data = transform();

class Position {
    constructor() {
        this.x= 0,
        this.y= 0,
        this.Tx = 0,
        this.Ty = 0,
        this.history = [[0,0]];
        this.Thistory = [[0,0]];
    }

    move({direction, value}) {
        for(let i=0;i<value;i++) {
            switch(direction) {
                case 'R': this.x++; break;
                case 'U': this.y++; break;
                case 'L': this.x--; break;
                case 'D': this.y--; break;
            }
            this.history.push([this.x, this.y]);
            
            if(Math.abs(this.x - this.Tx) < 2 && Math.abs(this.y - this.Ty) < 2) {
                // console.log('-----hoooold position')
            } else {
                // console.log('-----moooooove')
                this.Tx = this.history[this.history.length-2][0]
                this.Ty = this.history[this.history.length-2][1]
                this.Thistory.push([this.Tx, this.Ty]);
            }
            // console.log(this.history)
            // console.log('x ' + this.x)
            // console.log('y ' + this.y)
            // console.log('Tx ' + this.Tx)
            // console.log('Ty ' + this.Ty)
        }
    }

    posLenght() {
        return this.history.length;
    }

    printPos() {
        return this.history;
    }

    posTLenght() {
        return this.Thistory.length;
    }

    printTPos() {
        return this.Thistory;
    }
}

const main = () => {
    const POINT = new Position();
    
    data.forEach(move => {
        POINT.move(move)        
    })

    console.log(JSON.stringify(POINT.printPos()))
    console.log(JSON.stringify(POINT.printTPos()))

    const resArr = POINT.printTPos();
    const resObj = {};
    resArr.forEach(item => {
        if(resObj[`${item}`] === undefined) {
            resObj[`${item}`] = 1;
        } else {
            resObj[`${item}`]++;
        }
    })

    // console.log(resObj)
    console.log(Object.keys(resObj).length);
    console.log(Math.min(...Object.values(resObj)));
}

main();