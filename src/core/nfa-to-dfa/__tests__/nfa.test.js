const NFA = require('../nfa');
const Transition = require('../transition');

function testNFA() {
    const states = [0, 1, 2];
    const transitions = [
        new Transition(0, '0', 1),
        new Transition(0, '1', 2),
        new Transition(1, '0', 0),
        new Transition(1, '1', 0),
        new Transition(2, '0', 2),
        new Transition(2, '1', 2)
    ];
    const acceptStates = [2];
    const nfa = new NFA(
        states,
        transitions,
        acceptStates
    );
    if (nfa.states.length !== 3 ||
        nfa.transitions.length !== 6 ||
        nfa.acceptStates.length !== 1 ||
        nfa.alphabet.length !== 2 ||
        nfa.startState !== 0
    ) {
        console.error('NFA initialization failed');
    } else {
        console.log('NFA initialization passed');
    }
}

testNFA();