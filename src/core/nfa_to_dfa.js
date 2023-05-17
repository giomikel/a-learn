class NFA {
    constructor(states, transitions, acceptStates) {
        this.states = states;
        this.transitions = transitions;
        this.acceptStates = acceptStates;
        this.alphabet = getAlphabetFromTransitions(transitions);
        this.startState = getStartStateFromStates(states);
    }
}

class Transition {
    constructor(fromState, symbol, toState) {
        this.symbol = symbol
        this.fromState = fromState
        this.toState = toState
    }
}

function getAlphabetFromTransitions(transitions) {

}

function getStartStateFromStates(states) {
    
}