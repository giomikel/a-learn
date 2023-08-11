import { findEpsilonClosures } from "../nfa-to-dfa/nfa-to-dfa.mjs";

class NFASimulator {
    constructor(nfa) {
        this.nfa = nfa; // NFA
        this.currentStates = findEpsilonClosures(nfa.startState);   // Array of current states
        this.currentInputIndex = 0; // Current position in input string
        this.input = ''; // Input string
    }

    reset() {
        this.currentStates = findEpsilonClosures(nfa.startState);
        this.currentInputIndex = 0;
        this.input = '';
    }

    setInput(input) {
        this.reset();
        this.input = input;
    }

    step() {
        if (this.currentInputIndex < this.currentInput.length) {
            const symbol = this.currentInput[this.currentInputIndex];
            const nextStates = [];

            for (const state of this.currentStates) {
                const transitions = this.nfa.transitions.filter(transition =>
                    transition.fromState == state && (transition.symbol == symbol || transition.symbol == EPSILON_SYMBOL)
                );
                transitions.forEach(transition => nextStates.push(transition.toState));
            }

            this.currentStates = Array.from(new Set(nextStates));
            this.currentInputIndex++;

            return this.currentStates.length > 0;  // Return if transitioned states exist
        }

        return false;  // No input left
    }

    isAcceptState() {
        return this.currentStates.some(state => this.nfa.acceptStates.includes(state));
    }

    getCurrentInputSymbol() {
        return this.input[this.currentInputIndex];
    }

    accepts(input) {
        this.setInput(input);

        while (this.step());

        return this.currentStates.some(state => this.isAcceptState(state));
    }
}

export { NFASimulator }
