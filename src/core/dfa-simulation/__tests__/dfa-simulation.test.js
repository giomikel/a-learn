import { DFASimulator } from "../dfa-simulation.mjs";
import { Transition } from "../../structures/fsm-transition.mjs";
import { FiniteStateMachine } from "../../structures/fsm.mjs";

test('test dfa simulator - check step by step (1)', () => {

    const states = [0, 1, 2];
    const transitions = [
        new Transition(0, '0', 0),
        new Transition(0, '1', 1),
        new Transition(1, '0', 2),
        new Transition(1, '1', 0),
        new Transition(2, '0', 1),
        new Transition(2, '1', 2)
    ];
    const acceptStates = [2];
    const dfa = new FiniteStateMachine(states, transitions, acceptStates);
    const dfaSimulator = new DFASimulator(dfa);

    dfaSimulator.setInput("01000111");

    expect(dfaSimulator.currentState).toEqual(0);
    expect(dfaSimulator.isAcceptState()).toEqual(false);
    expect(dfaSimulator.getCurrentInputSymbol()).toEqual('0');
    
    expect(dfaSimulator.step()).toEqual(true);
    expect(dfaSimulator.currentState).toEqual(0);
    expect(dfaSimulator.getCurrentInputSymbol()).toEqual('1');

    expect(dfaSimulator.step()).toEqual(true);
    expect(dfaSimulator.currentState).toEqual(1);
    expect(dfaSimulator.getCurrentInputSymbol()).toEqual('0');
    
    expect(dfaSimulator.step()).toEqual(true);
    expect(dfaSimulator.currentState).toEqual(2);
    expect(dfaSimulator.getCurrentInputSymbol()).toEqual('0');

    expect(dfaSimulator.step()).toEqual(true);
    expect(dfaSimulator.currentState).toEqual(1);
    expect(dfaSimulator.getCurrentInputSymbol()).toEqual('0');

    expect(dfaSimulator.step()).toEqual(true);
    expect(dfaSimulator.currentState).toEqual(2);
    expect(dfaSimulator.getCurrentInputSymbol()).toEqual('1');

    expect(dfaSimulator.step()).toEqual(true);
    expect(dfaSimulator.currentState).toEqual(2);
    expect(dfaSimulator.getCurrentInputSymbol()).toEqual('1');

    expect(dfaSimulator.step()).toEqual(true);
    expect(dfaSimulator.currentState).toEqual(2);
    expect(dfaSimulator.getCurrentInputSymbol()).toEqual('1');

    expect(dfaSimulator.step()).toEqual(true);
    expect(dfaSimulator.currentState).toEqual(2);

    expect(dfaSimulator.isAcceptState()).toEqual(true);

    
    dfaSimulator.setInput("11000");

    expect(dfaSimulator.currentState).toEqual(0);
    expect(dfaSimulator.isAcceptState()).toEqual(false);
    expect(dfaSimulator.getCurrentInputSymbol()).toEqual('1');
    
    expect(dfaSimulator.step()).toEqual(true);
    expect(dfaSimulator.currentState).toEqual(1);
    expect(dfaSimulator.getCurrentInputSymbol()).toEqual('1');

    expect(dfaSimulator.step()).toEqual(true);
    expect(dfaSimulator.currentState).toEqual(0);
    expect(dfaSimulator.getCurrentInputSymbol()).toEqual('0');
    
    expect(dfaSimulator.step()).toEqual(true);
    expect(dfaSimulator.currentState).toEqual(0);
    expect(dfaSimulator.getCurrentInputSymbol()).toEqual('0');

    expect(dfaSimulator.step()).toEqual(true);
    expect(dfaSimulator.currentState).toEqual(0);
    expect(dfaSimulator.getCurrentInputSymbol()).toEqual('0');

    expect(dfaSimulator.step()).toEqual(true);
    expect(dfaSimulator.currentState).toEqual(0);

    expect(dfaSimulator.isAcceptState()).toEqual(false);
})

test('test dfa simulator - check step by step (2)', () => {

    const states = [0, 1, 2];
    const transitions = [
        new Transition(0, '1', 1),
        new Transition(1, '0', 2),
        new Transition(2, '0', 1),
        new Transition(2, '1', 2)
    ];
    const acceptStates = [1];
    const dfa = new FiniteStateMachine(states, transitions, acceptStates);
    const dfaSimulator = new DFASimulator(dfa);

    dfaSimulator.setInput("0100");

    expect(dfaSimulator.currentState).toEqual(0);
    expect(dfaSimulator.isAcceptState()).toEqual(false);
    expect(dfaSimulator.getCurrentInputSymbol()).toEqual('0');
    
    expect(dfaSimulator.step()).toEqual(false);

    
    dfaSimulator.setInput("11001");

    expect(dfaSimulator.currentState).toEqual(0);
    expect(dfaSimulator.isAcceptState()).toEqual(false);
    expect(dfaSimulator.getCurrentInputSymbol()).toEqual('1');
    
    expect(dfaSimulator.step()).toEqual(true);
    expect(dfaSimulator.currentState).toEqual(1);
    expect(dfaSimulator.getCurrentInputSymbol()).toEqual('1');

    expect(dfaSimulator.step()).toEqual(false);


    dfaSimulator.setInput("1010");

    expect(dfaSimulator.currentState).toEqual(0);
    expect(dfaSimulator.isAcceptState()).toEqual(false);
    expect(dfaSimulator.getCurrentInputSymbol()).toEqual('1');
    
    expect(dfaSimulator.step()).toEqual(true);
    expect(dfaSimulator.currentState).toEqual(1);
    expect(dfaSimulator.getCurrentInputSymbol()).toEqual('0');

    expect(dfaSimulator.step()).toEqual(true);
    expect(dfaSimulator.currentState).toEqual(2);
    expect(dfaSimulator.getCurrentInputSymbol()).toEqual('1');
    
    expect(dfaSimulator.step()).toEqual(true);
    expect(dfaSimulator.currentState).toEqual(2);
    expect(dfaSimulator.getCurrentInputSymbol()).toEqual('0');

    expect(dfaSimulator.step()).toEqual(true);
    expect(dfaSimulator.currentState).toEqual(1);

    expect(dfaSimulator.isAcceptState()).toEqual(true);
    expect(dfaSimulator.step()).toEqual(false);
})

test('test dfa simulator - check accepts method (1)', () => {

    const states = [0, 1, 2, 3, 4];
    const transitions = [
        new Transition(0, '1', 1),
        new Transition(1, '0', 2),
        new Transition(2, '0', 1),
        new Transition(2, '1', 2),
        new Transition(2, '2', 3),
        new Transition(3, '1', 1),
        new Transition(3, '0', 4),
        new Transition(4, '1', 4),
        new Transition(4, '0', 2)
    ];
    const acceptStates = [1];
    const dfa = new FiniteStateMachine(states, transitions, acceptStates);
    const dfaSimulator = new DFASimulator(dfa);

    expect(dfaSimulator.accepts("1")).toEqual(true);
    expect(dfaSimulator.accepts("000")).toEqual(false);
    expect(dfaSimulator.accepts("101")).toEqual(false);
    expect(dfaSimulator.accepts("100010")).toEqual(true);
    expect(dfaSimulator.accepts("1020100")).toEqual(true);
    expect(dfaSimulator.accepts("10120")).toEqual(false);
    expect(dfaSimulator.accepts("10111111111201111111100")).toEqual(true);
    expect(dfaSimulator.accepts("1021")).toEqual(true);
    expect(dfaSimulator.accepts("10201")).toEqual(false);
    expect(dfaSimulator.accepts("10200")).toEqual(false);
    expect(dfaSimulator.accepts("12")).toEqual(false);
    expect(dfaSimulator.accepts("101110")).toEqual(true);
    expect(dfaSimulator.accepts("11120")).toEqual(false);
    expect(dfaSimulator.accepts("10111111111201000000")).toEqual(true);
    expect(dfaSimulator.accepts("10111111201000")).toEqual(false);
})

test('test dfa simulator - check accepts method (2)', () => {

    const states = [0, 1, 2, 3, 4];
    const transitions = [
        new Transition(0, '1', 1),
        new Transition(1, '0', 2),
        new Transition(2, '0', 1),
        new Transition(2, '1', 2),
        new Transition(2, '2', 3),
        new Transition(3, '1', 1),
        new Transition(3, '2', 3),
        new Transition(3, '0', 4),
        new Transition(4, '1', 4),
        new Transition(4, '0', 0)
    ];
    const acceptStates = [1, 2];
    const dfa = new FiniteStateMachine(states, transitions, acceptStates);
    const dfaSimulator = new DFASimulator(dfa);

    expect(dfaSimulator.accepts("1012222001")).toEqual(true);
    expect(dfaSimulator.accepts("10")).toEqual(true);
    expect(dfaSimulator.accepts("101111111111222222222220")).toEqual(false);
    expect(dfaSimulator.accepts("100000000000000000000")).toEqual(true);
    expect(dfaSimulator.accepts("100001")).toEqual(false);
    expect(dfaSimulator.accepts("1020010200102001020010200102001020010200102001")).toEqual(true);
    expect(dfaSimulator.accepts("1020010111111111")).toEqual(true);
    expect(dfaSimulator.accepts("0100")).toEqual(false);
    expect(dfaSimulator.accepts("1010001")).toEqual(false);
    expect(dfaSimulator.accepts("10100100001000000111111110")).toEqual(true);
    expect(dfaSimulator.accepts("100222222222222222011111111")).toEqual(false);
    expect(dfaSimulator.accepts("101110021")).toEqual(true);
    expect(dfaSimulator.accepts("101110021000000000000000000000000")).toEqual(true);
    expect(dfaSimulator.accepts('')).toEqual(false);
})
