const fsm = require('../../structures/fsm')
const fsm_transition = require('../../structures/fsm_transition')
const nfa_to_dfa = require('../nfa_to_dfa')
const constants = require('../../constants')

function testNFAtoDFA() {
    runTestCase1();
    runTestCase2();
}

function runTestCase1() {
    const states = [0, 1, 2];
    const transitions = [
        new fsm_transition.Transition(0, constants.EPSILON_SYMBOL, 1),
        new fsm_transition.Transition(1, 0, 2),
        new fsm_transition.Transition(1, 1, 2)
    ];
    const acceptStates = [2];
    const nfa = new fsm.FiniteStateMachine(
        states,
        transitions,
        acceptStates
    );
    const dfa = nfa_to_dfa.convertNFAToDFA(nfa);

    if (dfa.states.length !== 3
        || JSON.stringify(dfa.acceptStates) != JSON.stringify([1])
        || dfa.transitions.length !== 6
        || JSON.stringify(dfa.states) != JSON.stringify([0, 1, 2])) {
        console.log("NFA to DFA conversion test 1 failed");
    } else {
        console.log("NFA to DFA conversion test 1 passed");
    }
    console.log(dfa.toString());
}

function runTestCase2() {
    const states2 = [0, 1, 2]
    const transitions2 = [
        new fsm_transition.Transition(0, 0, 0),
        new fsm_transition.Transition(0, 1, 1),
        new fsm_transition.Transition(1, 0, 1),
        new fsm_transition.Transition(1, 1, 1),
        new fsm_transition.Transition(1, 0, 2),
        new fsm_transition.Transition(2, 0, 2),
        new fsm_transition.Transition(2, 1, 2),
        new fsm_transition.Transition(2, 1, 1)
    ];
    const acceptStates2 = [2]
    const nfa2 = new fsm.FiniteStateMachine(
        states2,
        transitions2,
        acceptStates2
    );
    const dfa2 = nfa_to_dfa.convertNFAToDFA(nfa2);
    if (dfa2.states.length !== 3
        || JSON.stringify(dfa2.acceptStates) !== JSON.stringify([2])
        || dfa2.transitions.length !== 6
        || JSON.stringify(dfa2.states) !== JSON.stringify([0, 1, 2])) {
        console.log("NFA to DFA conversion test 2 failed");
    } else {
        console.log("NFA to DFA conversion test 2 passed");
    }
    console.log(dfa2.toString());
}

testNFAtoDFA();
