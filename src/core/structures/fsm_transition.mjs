class Transition {
    constructor(fromState, symbol, toState) {
        this.symbol = symbol
        this.fromState = fromState
        this.toState = toState
    }

    toString() {
        return `q${this.fromState} --${this.symbol}--> q${this.toState}`;
    }
}

export { Transition };