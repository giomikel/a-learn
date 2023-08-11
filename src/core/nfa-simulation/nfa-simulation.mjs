import { findEpsilonClosures } from "../nfa-to-dfa/nfa-to-dfa.mjs";
import { EPSILON_SYMBOL } from "../constants.mjs";

class NFASimulator {
    constructor(nfa) {
        this.nfa = nfa; // NFA
        this.currentStates = findEpsilonClosures([this.nfa.startState], this.nfa.transitions);   // Array of current states
        this.currentInputIndex = 0; // Current position in input string
        this.input = ''; // Input string
    }

    reset() {
        this.currentStates = findEpsilonClosures([this.nfa.startState], this.nfa.transitions);
        this.currentInputIndex = 0;
        this.input = '';
    }

    setInput(input) {
        this.reset();
        this.input = input;
    }

    step() {
        if (this.currentInputIndex < this.input.length) {
            const symbol = this.input[this.currentInputIndex];
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

    isInAcceptStates() {
        return this.currentStates.some(state => this.nfa.acceptStates.includes(state));
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

        return this.currentStates.some(state => this.isInAcceptStates(state));
    }
}

export { NFASimulator }
