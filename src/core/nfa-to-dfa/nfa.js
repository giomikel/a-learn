class NFA {
    constructor(states, transitions, acceptStates) {
        this.states = states;   // Array of states, e.g. [0, 1, 2, ...] Where initial state is the lowest value
        this.transitions = transitions;
        this.acceptStates = acceptStates;
        this.alphabet = getAlphabetFromTransitions(transitions);
        this.startState = getStartStateFromStates(states);
    }
}

function getAlphabetFromTransitions(transitions) {
    const alphabet = new Set();
    transitions.forEach(element => {
        alphabet.add(element.symbol);
    });
    return Array.from(alphabet);
}

function getStartStateFromStates(states) {
    return Math.min(...states);
}

module.exports = NFA;