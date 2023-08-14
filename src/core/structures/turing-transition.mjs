class TuringTransition{
    constructor(fromState, readSymbol, toState, writeSymbol, move){
        this.fromState = fromState;
        this.readSymbol = readSymbol;
        this.toState = toState;
        this.writeSymbol = writeSymbol;
        this.move = move;
    }
}

export default TuringTransition;
