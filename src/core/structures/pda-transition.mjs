class PDATransition {
    constructor(fromState, toState, inputSymbol, popSymbol, pushSymbol) {
        this.fromState = fromState; // Source state
        this.toState = toState; // Destination state
        this.inputSymbol = inputSymbol; // Input symbol
        this.popSymbol = popSymbol; // Symbol to be popped from the stack
        this.pushSymbol = pushSymbol; // Symbol to be pushed onto the stack
    }

    toString() {
        return `${this.fromState} --(${this.inputSymbol}, ${this.popSymbol} / ${this.pushSymbol})--> ${this.toState}`;
    }
}
