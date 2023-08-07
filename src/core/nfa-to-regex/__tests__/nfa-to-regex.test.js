import { FiniteStateMachine } from "../../structures/fsm.mjs"
import { Transition } from "../../structures/fsm-transition.mjs";
import { EPSILON_SYMBOL } from "../../constants.mjs";
import { convertNFAToRegex } from "../nfa-to-regex.mjs"

test('test nfa to regex conversion 1', () => {
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
    expect(result).toEqual('0|1');
})

test('test nfa to regex conversion 2', () => {
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

test('test nfa to regex conversion 3', () => {
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

test('test nfa to regex conversion 4', () => {
    const states = [0, 1, 2];
    const transitions = [
        new Transition(0, 1, 1),
        new Transition(0, 0, 2),
        new Transition(1, 0, 2),
        new Transition(2, 1, 1)
    ];
    const acceptStates = [0, 1, 2];
    const nfa = new FiniteStateMachine(
        states,
        transitions,
        acceptStates
    );
    const result = convertNFAToRegex(nfa);
    expect(result).toEqual('#|1|(0|10)(10)*(#|1)');
})

test('test nfa to regex conversion 5', () => {
    const states = [0, 1, 2, 3];
    const transitions = [
        new Transition(0, 0, 1),
        new Transition(0, 1, 2),
        new Transition(1, 1, 2),
        new Transition(1, 1, 3),
        new Transition(2, 0, 1),
        new Transition(2, 0, 3)
    ];
    const acceptStates = [0, 3];
    const nfa = new FiniteStateMachine(
        states,
        transitions,
        acceptStates
    );
    const result = convertNFAToRegex(nfa);
    expect(result).toEqual('#|(01|(1|01)(01)*(0|01))');
})

test('test nfa to regex conversion 6', () => {
    const states = [0, 1, 2];
    const transitions = [
        new Transition(0, 'b', 0),
        new Transition(0, EPSILON_SYMBOL, 1),
        new Transition(1, 'c', 0),
        new Transition(1, 'a', 2),
        new Transition(2, 'b', 1)
    ];
    const acceptStates = [1];
    const nfa = new FiniteStateMachine(
        states,
        transitions,
        acceptStates
    );
    const result = convertNFAToRegex(nfa);
    expect(result).toEqual('(b*)(cb*)*|((b*)(cb*)*a)(b(cb*)*a)*(b(cb*)*)');
})