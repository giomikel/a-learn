import { NFASimulator } from "../nfa-simulation.mjs";
import { FiniteStateMachine } from "../../structures/fsm.mjs";
import { Transition } from "../../structures/fsm-transition.mjs";

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
    nfaSimulator.setInput('101101');
    expect(nfaSimulator.input).toEqual('101101');
    expect(nfaSimulator.currentInputIndex).toEqual(0);
    expect(nfaSimulator.isAcceptState()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('1');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(1);
    expect(nfaSimulator.isAcceptState()).toEqual(false)
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('0');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(2);
    expect(nfaSimulator.isAcceptState()).toEqual(false)
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('1');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(3);
    expect(nfaSimulator.isAcceptState()).toEqual(true);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('1');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(4);
    expect(nfaSimulator.isAcceptState()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('0');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(5);
    expect(nfaSimulator.isAcceptState()).toEqual(false);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual('1');

    expect(nfaSimulator.step()).toEqual(true);
    expect(nfaSimulator.currentInputIndex).toEqual(6);
    expect(nfaSimulator.isAcceptState()).toEqual(true);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual(null);

    expect(nfaSimulator.step()).toEqual(false);
    expect(nfaSimulator.currentInputIndex).toEqual(6);
    expect(nfaSimulator.isAcceptState()).toEqual(true);
    expect(nfaSimulator.getCurrentInputSymbol()).toEqual(null);
})
