import { EPSILON_SYMBOL } from "../constants.mjs";

class PDA {
    constructor(states, transitions, acceptStates) {
        this.states = states.sort((a, b) => a - b); // Array of states
        this.transitions = transitions; // Array of PDA Transition objects
        this.sortTransitions();
        this.acceptStates = acceptStates.sort((a, b) => a - b); // Array of accept states
        this.inputAlphabet = this.getInputAlphabetFromTransitions(transitions); // Array of input alphabet symbols
        this.stackAlphabet = this.getStackAlphabetFromTransitions(transitions); // Array of stack alphabet symbols
        this.startState = 0; // Start state
        this.stack = []; // The stack used in the PDA
    }

    toString() {
        return `States: ${this.states.toString()}
Transitions: ${this.transitions.map(t => t.toString()).join('\n')}
Accept States: ${this.acceptStates.toString()}
Start State: ${this.startState}
Alphabet: ${this.alphabet.toString()}
Stack: ${this.stack.toString()}`;
    }

    sortTransitions() {
        this.transitions = this.transitions.sort((a, b) => {
            if (a.fromState !== b.fromState) {
                return a.fromState - b.fromState;
            } else if (a.toState !== b.toState) {
                return a.toState - b.toState;
            } else if (a.symbol !== b.symbol) {
                return a.symbol.localeCompare(b.symbol);
            } else if (a.popSymbol !== b.popSymbol) {
                return a.popSymbol.localeCompare(b.popSymbol);
            } else {
                return a.pushSymbol.localeCompare(b.pushSymbol);
            }
        });
    }

    getInputAlphabetFromTransitions(transitions) {
        const inputAlphabet = new Set();
        this.transitions.forEach(transition => inputAlphabet.add(transition.inputSymbol));
        inputAlphabet.delete(EPSILON_SYMBOL);
        return Array.from(inputAlphabet);
    }

    getStackAlphabetFromTransitions(transitions) {
        const stackAlphabet = new Set();
        this.transitions.forEach(transition => {
            stackAlphabet.add(transition.popSymbol);
            stackAlphabet.add(transition.pushSymbol);
        });
        stackAlphabet.delete(EPSILON_SYMBOL);
        return Array.from(stackAlphabet);
    }
}
