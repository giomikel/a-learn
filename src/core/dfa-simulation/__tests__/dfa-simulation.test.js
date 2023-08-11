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
