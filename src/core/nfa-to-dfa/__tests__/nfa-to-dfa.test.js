import { FiniteStateMachine } from '../../structures/fsm.mjs'
import { Transition } from '../../structures/fsm-transition.mjs'
import { convertNFAToDFA } from '../nfa-to-dfa.mjs'
import { EPSILON_SYMBOL } from '../../constants.mjs'

test('test nfa to dfa conversion algorithm with epsilon symbol', () => {
    const states = [0, 1, 2];
    const transitions = [
        new Transition(0, EPSILON_SYMBOL, 1),
        new Transition(1, 0, 2),
        new Transition(1, 1, 2)
    ];
    const acceptStates = [2];
    const nfa = new FiniteStateMachine(
        states,
        transitions,
        acceptStates
    );
    const dfa = convertNFAToDFA(nfa);
    expect(dfa.states.length).toEqual(3);
    expect(dfa.acceptStates).toEqual([1]);
    expect(dfa.transitions.length).toEqual(6);
    expect(dfa.states).toEqual([0, 1, 2]);
})

test('test nfa to dfa conversion algorithm without epsilon symbol', () => {
    const states2 = [0, 1, 2]
    const transitions2 = [
        new Transition(0, 0, 0),
        new Transition(0, 1, 1),
        new Transition(1, 0, 1),
        new Transition(1, 1, 1),
        new Transition(1, 0, 2),
        new Transition(2, 0, 2),
        new Transition(2, 1, 2),
        new Transition(2, 1, 1)
    ];
    const acceptStates2 = [2]
    const nfa2 = new FiniteStateMachine(
        states2,
        transitions2,
        acceptStates2
    );
    const dfa2 = convertNFAToDFA(nfa2);
    expect(dfa2.states.length).toEqual(3);
    expect(dfa2.acceptStates).toEqual([2]);
    expect(dfa2.transitions.length).toEqual(6);
    expect(dfa2.states).toEqual([0, 1, 2]);
})

test('test nfa to dfa conversion algorithm with epsilon symbol 2', () => {
    const states = [0, 1, 2, 3];
    const transitions = [
        new Transition(0, EPSILON_SYMBOL, 1),
        new Transition(1, 'a', 1),
        new Transition(1, 'b', 2),
        new Transition(2, 'a', 2),
        new Transition(2, 'b', 2),
        new Transition(2, EPSILON_SYMBOL, 3)
    ];
    const acceptStates = [3];
    const nfa = new FiniteStateMachine(
        states,
        transitions,
        acceptStates
    );
    const result = convertNFAToDFA(nfa);

    const resultStates = [0, 1, 2];
    const resultTransitions = [
        new Transition(0, 'a', 1),
        new Transition(0, 'b', 2),
        new Transition(1, 'a', 1),
        new Transition(1, 'b', 2),
        new Transition(2, 'a', 2),
        new Transition(2, 'b', 2)
    ];
    const resultAcceptStates = [2];
    expect(result).toEqual(new FiniteStateMachine(resultStates, resultTransitions, resultAcceptStates));
})