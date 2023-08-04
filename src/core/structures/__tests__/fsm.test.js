import { FiniteStateMachine } from '../fsm.mjs'
import { Transition } from '../fsm-transition.mjs';

test('check nfa initialization', () => {
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
    expect(nfa.states.length).toEqual(3);
    expect(nfa.transitions.length).toEqual(8);
    expect(nfa.acceptStates.length).toEqual(1);
    expect(nfa.alphabet.length).toEqual(2);
    expect(nfa.startState).toEqual(0);
    expect(nfa.isDFA).toEqual(false);
})

test('check dfa initialization', () => {
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
    expect(dfa.states.length).toEqual(3);
    expect(dfa.transitions.length).toEqual(6);
    expect(dfa.acceptStates.length).toEqual(1);
    expect(dfa.alphabet.length).toEqual(2);
    expect(dfa.startState).toEqual(0);
    expect(dfa.isDFA).toEqual(true);
})
