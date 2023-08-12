import { NFASimulator } from "../nfa-simulation.mjs";
import { FiniteStateMachine } from "../../structures/fsm.mjs";
import { Transition } from "../../structures/fsm-transition.mjs";
import { EPSILON_SYMBOL } from "../../constants.mjs";

test('test nfa simulator for nfa accepting strings ending with 01', () => {
    // NFA that accepts all strings ending with 01
    const states = [0, 1, 2];
    const transitions = [
        new Transition(0, '0', 0),
        new Transition(0, '1', 0),
        new Transition(0, '0', 1),
        new Transition(1, '1', 2)
    ];
    const acceptStates = [2];
    const nfa = new FiniteStateMachine(states, transitions, acceptStates);
    const nfaSimulator = new NFASimulator(nfa);

    const input1 = '101101';
    nfaSimulator.setInput(input1);
    expect(nfaSimulator.input).toEqual(input1);
    expect(nfaSimulator.currentInputIndex).toEqual(0);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('1');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(1);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('0');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(2);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('1');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(3);
    expect(nfaSimulator.isInAcceptStates()).toEqual(true);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('1');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(4);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('0');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(5);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('1');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(6);
    expect(nfaSimulator.isInAcceptStates()).toEqual(true);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual(null);

    expect(nfaSimulator.step()).toEqual(false);
    expect(nfaSimulator.currentInputIndex).toEqual(6);
    expect(nfaSimulator.isInAcceptStates()).toEqual(true);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual(null);

    expect(nfaSimulator.accepts(input1));


    const input2 = '110100';
    nfaSimulator.setInput(input2);
    expect(nfaSimulator.input).toEqual(input2);
    expect(nfaSimulator.currentInputIndex).toEqual(0);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('1');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(1);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('1');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(2);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('0');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(3);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('1');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(4);
    expect(nfaSimulator.isInAcceptStates()).toEqual(true);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('0');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(5);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('0');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(6);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual(null);

    expect(nfaSimulator.step()).toEqual(false);
    expect(nfaSimulator.currentInputIndex).toEqual(6);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual(null);

    expect(nfaSimulator.accepts(input2)).toEqual(false);
})

test('test nfa simulator for nfa containing 1100', () => {
    // NFA that accepts all strings containing 1100
    const states = [0, 1, 2, 3, 4];
    const transitions = [
        new Transition(0, '0', 0),
        new Transition(0, '1', 0),
        new Transition(0, '1', 1),
        new Transition(1, '1', 2),
        new Transition(2, '0', 3),
        new Transition(3, '0', 4),
        new Transition(4, '0', 4),
        new Transition(4, '1', 4)
    ];
    const acceptStates = [4];
    const nfa = new FiniteStateMachine(states, transitions, acceptStates);
    const nfaSimulator = new NFASimulator(nfa);

    const input1 = '011001';
    nfaSimulator.setInput(input1);
    expect(nfaSimulator.input).toEqual(input1);
    expect(nfaSimulator.currentInputIndex).toEqual(0);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('0');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(1);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('1');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(2);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('1');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(3);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('0');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(4);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('0');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(5);
    expect(nfaSimulator.isInAcceptStates()).toEqual(true);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('1');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(6);
    expect(nfaSimulator.isInAcceptStates()).toEqual(true);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual(null);

    expect(nfaSimulator.step()).toEqual(false);
    expect(nfaSimulator.currentInputIndex).toEqual(6);
    expect(nfaSimulator.isInAcceptStates()).toEqual(true);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual(null);

    expect(nfaSimulator.accepts(input1)).toEqual(true);

    const input2 = '011101';
    nfaSimulator.setInput(input2);
    expect(nfaSimulator.input).toEqual(input2);
    expect(nfaSimulator.currentInputIndex).toEqual(0);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('0');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(1);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('1');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(2);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('1');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(3);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('1');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(4);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('0');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(5);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('1');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(6);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual(null);

    expect(nfaSimulator.step()).toEqual(false);
    expect(nfaSimulator.currentInputIndex).toEqual(6);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual(null);

    expect(nfaSimulator.accepts(input2)).toEqual(false);
})

test('test nfa simulator for nfa with unreachable accept state', () => {
    const states = [0, 1, 2];
    const transitions = [
        new Transition(0, '0', 0),
        new Transition(0, '1', 0),
        new Transition(0, '1', 1),
        new Transition(2, '0', 1)
    ];
    const acceptStates = [2];
    const nfa = new FiniteStateMachine(states, transitions, acceptStates);
    const nfaSimulator = new NFASimulator(nfa);

    const input1 = '0110';
    nfaSimulator.setInput(input1);
    expect(nfaSimulator.input).toEqual(input1);
    expect(nfaSimulator.currentInputIndex).toEqual(0);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('0');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(1);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('1');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(2);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('1');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(3);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('0');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(4);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual(null);

    expect(nfaSimulator.step()).toEqual(false);
    expect(nfaSimulator.currentInputIndex).toEqual(4);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual(null);

    expect(nfaSimulator.accepts('0110')).toEqual(false);
    expect(nfaSimulator.accepts('010')).toEqual(false);
    expect(nfaSimulator.accepts('011')).toEqual(false);
    expect(nfaSimulator.accepts('0')).toEqual(false);
    expect(nfaSimulator.accepts('11')).toEqual(false);
    expect(nfaSimulator.accepts('')).toEqual(false);
})

test('test nfa simulator for nfa with epsilon transitions', () => {
    // One of the NFAs that accepts a(abb)*|b
    const states = [0, 1, 2, 3, 4, 5];
    const transitions = [
        new Transition(0, 'a', 1),
        new Transition(0, 'b', 5),
        new Transition(1, 'a', 2),
        new Transition(1, EPSILON_SYMBOL, 5),
        new Transition(2, 'b', 3),
        new Transition(3, 'b', 4),
        new Transition(4, EPSILON_SYMBOL, 1)
    ];
    const acceptStates = [5];
    const nfa = new FiniteStateMachine(states, transitions, acceptStates);
    const nfaSimulator = new NFASimulator(nfa);

    const input1 = 'aabb';
    nfaSimulator.setInput(input1);
    expect(nfaSimulator.input).toEqual(input1);
    expect(nfaSimulator.currentInputIndex).toEqual(0);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('a');
    expect(nfaSimulator.currentStates).toEqual([0]);

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(1);
    expect(nfaSimulator.isInAcceptStates()).toEqual(true);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('a');
    expect(nfaSimulator.currentStates).toEqual([1, 5]);

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(2);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('b');
    expect(nfaSimulator.currentStates).toEqual([2]);

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(3);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('b');
    expect(nfaSimulator.currentStates).toEqual([3]);

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(4);
    expect(nfaSimulator.isInAcceptStates()).toEqual(true);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual(null);
    expect(nfaSimulator.currentStates).toEqual([1, 4, 5]);

    expect(nfaSimulator.step()).toEqual(false);
    expect(nfaSimulator.currentInputIndex).toEqual(4);
    expect(nfaSimulator.isInAcceptStates()).toEqual(true);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual(null);
    expect(nfaSimulator.currentStates).toEqual([1, 4, 5]);

    expect(nfaSimulator.accepts('aabb')).toEqual(true);

    const input2 = 'babb';
    nfaSimulator.setInput(input2);
    expect(nfaSimulator.input).toEqual(input2);
    expect(nfaSimulator.currentInputIndex).toEqual(0);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('b');
    expect(nfaSimulator.currentStates).toEqual([0]);

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(1);
    expect(nfaSimulator.isInAcceptStates()).toEqual(true);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('a');
    expect(nfaSimulator.currentStates).toEqual([5]);

    expect(nfaSimulator.step()).toEqual(false);
    expect(nfaSimulator.currentInputIndex).toEqual(2);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('b');
    expect(nfaSimulator.currentStates).toEqual([]);

    expect(nfaSimulator.accepts('babb')).toEqual(false);

    const input3 = 'b';
    nfaSimulator.setInput(input3);
    expect(nfaSimulator.input).toEqual(input3);
    expect(nfaSimulator.currentInputIndex).toEqual(0);
    expect(nfaSimulator.isInAcceptStates()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('b');
    expect(nfaSimulator.currentStates).toEqual([0]);

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(1);
    expect(nfaSimulator.isInAcceptStates()).toEqual(true);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual(null);
    expect(nfaSimulator.currentStates).toEqual([5]);

    expect(nfaSimulator.step()).toEqual(false);
    expect(nfaSimulator.currentInputIndex).toEqual(1);
    expect(nfaSimulator.isInAcceptStates()).toEqual(true);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual(null);
    expect(nfaSimulator.currentStates).toEqual([5]);

    expect(nfaSimulator.accepts('b')).toEqual(true);
})
