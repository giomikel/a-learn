class NFA {
    constructor(states, transitions, acceptStates) {
        this.states = states;   // Array of states, e.g. [0, 1, 2, ...] Where initial state is the lowest value
        this.transitions = transitions; // Array of Transition objects
        this.acceptStates = acceptStates;   // Array of accept states
        this.alphabet = getAlphabetFromTransitions(transitions);    // Array of alphabet symbols
        this.startState = getStartStateFromStates(states);  // Start state
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
    alphabet.delete('#');
    return Array.from(alphabet);
}

function getStartStateFromStates(states) {
    return Math.min(...states);
}

// export default NFA;
module.exports = {
    NFA,
    getAlphabetFromTransitions,
    getStartStateFromStates
};