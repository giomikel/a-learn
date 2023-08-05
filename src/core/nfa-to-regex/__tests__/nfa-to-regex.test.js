import { FiniteStateMachine } from "../../structures/fsm.mjs"
import { Transition } from "../../structures/fsm-transition.mjs";
import { EPSILON_SYMBOL } from "../../constants.mjs";
import { convertNFAToRegex } from "../nfa-to-regex.mjs"

test('test nfa to regex conversion', () => {
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
    const result = convertNFAToRegex(nfa);
    expect(result).toEqual('(0|1)*');
})

test('test nfa to regex conversion', () => {
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
    const result = convertNFAToRegex(nfa);
    expect(result).toEqual('(a*b)(a|b)*');
})

test('test nfa to regex conversion', () => {
    const states = [0, 1, 2];
    const transitions = [
        new Transition(0, 'a', 0),
        new Transition(0, 'b', 0),
        new Transition(0, 'a', 1),
        new Transition(1, 'b', 2)
    ];
    const acceptStates = [2];
    const nfa = new FiniteStateMachine(
        states,
        transitions,
        acceptStates
    );
    const result = convertNFAToRegex(nfa);
    expect(result).toEqual('((a|b)*a)b');
})