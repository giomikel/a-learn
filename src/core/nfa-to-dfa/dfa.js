// const getAlphabetFromTransitions = require('./nfa')
// const getStartStateFromStates = require('./nfa')
const { getAlphabetFromTransitions, getStartStateFromStates } = require('./nfa.js');


class DFA {
    constructor(states, transitions, acceptStates) {
        this.states = states;   // Array of states, e.g. [0, 1, 2, ...] Where initial state is the lowest value
        this.transitions = transitions; // Array of Transition objects
        this.acceptStates = acceptStates;   // Array of accept states
        this.alphabet = getAlphabetFromTransitions(transitions);    // Array of alphabet symbols
        this.startState = getStartStateFromStates(states);  // Start state
    }

    toString() {
        return `States: ${this.states.toString()},
                Transitions: ${this.transitions.toString()},
                Accept States: ${this.acceptStates.toString()},
                Alphabet: ${this.alphabet.toString()},
                Start State: ${this.startState.toString()}`;
    }
}

// export default DFA;
module.exports = DFA;