import { EPSILON_SYMBOL } from '../constants.mjs';

class FiniteStateMachine {
    constructor(states, transitions, acceptStates) {
        this.states = states.sort();   // Array of states, e.g. [0, 1, 2, ...] Where initial state is the lowest value
        this.transitions = transitions.sort((a, b) => {
            if (a.fromState !== b.fromState) {
                return a.fromState - b.fromState;
            } else if (a.toState !== b.toState) {
                return a.toState - b.toState;
            } else {
                if (a.symbol < b.symbol) return -1;
                if (a.symbol > b.symbol) return 1;
                return 0;
            }
        }); // Array of Transition objects
        this.acceptStates = acceptStates.sort();   // Array of accept states
        this.alphabet = getAlphabetFromTransitions(transitions);    // Array of alphabet symbols
        this.startState = getStartStateFromStates(states);  // Start state
        this.isDFA = determineFSMIsDFA(this.states, this.transitions, this.alphabet);
    }

    toString() {
        return `States: ${this.states.toString()}
Transitions: ${this.transitions.toString()}
Accept States: ${this.acceptStates.toString()}
Alphabet: ${this.alphabet.toString()}
Start State: ${this.startState.toString()}`;
    }
}

function getAlphabetFromTransitions(transitions) {
    const alphabet = new Set();
    transitions.forEach(element => {
        alphabet.add(element.symbol);
    });
    alphabet.delete(EPSILON_SYMBOL);
    return Array.from(alphabet);
}

function getStartStateFromStates(states) {
    return Math.min(...states);
}

function determineFSMIsDFA(states, transitions, alphabet) {
    if (transitions.some((transition) => transition.symbol == EPSILON_SYMBOL)) {
        return false; // Epsilon transitions are not allowed in DFAs
    }

    for (const state of states) {
        for (const symbol of alphabet) {
            const hasTransition = transitions.some((transition) => {
                return transition.fromState == state && transition.symbol == symbol;
            });
            if (!hasTransition) {
                return false; // If any state doesnt have a transition for any symbol then its not DFA
            }
        }
    }

    for (const state of states) {
        const symbolsWithMultipleTransitions = new Set();
        for (const transition of transitions) {
            if (transition.fromState == state) {
                if (symbolsWithMultipleTransitions.has(transition.symbol)) {
                    return false; // If a state has multiple transitions with the same symbol its not a DFA
                } else {
                    symbolsWithMultipleTransitions.add(transition.symbol);
                }
            }
        }
    }

    return true;
}


export { FiniteStateMachine, getAlphabetFromTransitions, getStartStateFromStates };