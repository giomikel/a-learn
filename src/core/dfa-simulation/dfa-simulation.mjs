
class DFASimulator {
    constructor(dfa) {
        this.dfa = dfa; 
        this.currentState = dfa.startState;
        this.currentInputIndex = 0; 
        this.input = '';
    }

    setInput(input) {
        this.currentState = this.dfa.startState;
        this.currentInputIndex = 0;
        this.input = input;
    }

    step() {
        if (this.currentInputIndex >= this.input.length) {
            return false;
        }
        const transition = this.getTransition();
        if (transition !== null){
            this.currentState = transition.toState;
            this.currentInputIndex += 1;
            return true;
        }
        return false;  
    }

    getTransition(){
        for(let transition of this.dfa.transitions){
            if (transition.fromState === this.currentState && transition.symbol === this.input[this.currentInputIndex]){
                return transition;
            }
        }
        return  null;
    }

    isAcceptState() {
        return this.dfa.acceptStates.includes(this.currentState);
    }

    getCurrentInputSymbol() {
        if (this.currentInputIndex >= this.input.length) {
            return null;
        }
        return this.input[this.currentInputIndex];
    }

    accepts(input) {
        this.setInput(input);

        while (this.step());

        return this.isAcceptState();
    }
}

export { DFASimulator }
