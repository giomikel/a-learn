import { FiniteStateMachine } from '../fsm.mjs'
import { Transition } from '../fsm_transition.mjs';

function testNFA() {
    const states = [0, 1, 2];
    const transitions = [
        new Transition(0, 0, 0),
        new Transition(0, 1, 1),
        new Transition(1, 0, 1),
        new Transition(1, 1, 1),
        new Transition(1, 0, 2),
        new Transition(2, 0, 2),
        new Transition(2, 1, 2),
        new Transition(2, 1, 1)
    ];
    const acceptStates = [2];
    const nfa = new FiniteStateMachine(
        states,
        transitions,
        acceptStates
    );
    if (nfa.states.length !== 3 ||
        nfa.transitions.length !== 8 ||
        nfa.acceptStates.length !== 1 ||
        nfa.alphabet.length !== 2 ||
        nfa.startState !== 0 ||
        nfa.isDFA != false
    ) {
        console.error('NFA initialization failed');
    } else {
        console.log('NFA initialization passed');
    }
}

function testDFA() {
    const states = [0, 1, 2];
    const transitions = [
        new Transition(0, 0, 0),
        new Transition(0, 1, 1),
        new Transition(1, 1, 1),
        new Transition(1, 0, 2),
        new Transition(2, 0, 2),
        new Transition(2, 1, 2)
    ];
    const acceptStates = [2];
    const dfa = new FiniteStateMachine(
        states,
        transitions,
        acceptStates
    );
    if (dfa.states.length !== 3 ||
        dfa.transitions.length !== 6 ||
        dfa.acceptStates.length !== 1 ||
        dfa.alphabet.length !== 2 ||
        dfa.startState !== 0 ||
        dfa.isDFA != true
    ) {
        console.error('DFA initialization failed');
    } else {
        console.log('DFA initialization passed');
    }
}

testNFA();
testDFA();
