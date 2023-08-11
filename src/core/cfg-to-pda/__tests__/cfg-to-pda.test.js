import { DOLLAR_SYMBOL, EPSILON_SYMBOL, EPSILON_IN_CFG } from "../../constants.mjs";
import CFG from "../../structures/cfg.mjs";
import { PDATransition } from "../../structures/pda-transition.mjs";
import { convertCFGToPDA } from "../cfg-to-pda.mjs";

test('test cfg to pda - 1', () => {
    const cfg = new CFG();

    cfg.addNonTerminal('S');
    cfg.addNonTerminal('B');
    cfg.addTerminal('a');
    cfg.addTerminal('b');
    cfg.addProductionRule('S', 'aBa');
    cfg.addProductionRule('B', 'b');
    cfg.setStartSymbol('S');

    const pda = convertCFGToPDA(cfg);

    const transitions = [
        new PDATransition(0, 1, EPSILON_SYMBOL, EPSILON_SYMBOL, DOLLAR_SYMBOL),
        new PDATransition(1, 2, EPSILON_SYMBOL, EPSILON_SYMBOL, 'S'),
        new PDATransition(2, 2, 'a', 'a', EPSILON_SYMBOL),
        new PDATransition(2, 2, 'b', 'b', EPSILON_SYMBOL),
        new PDATransition(2, 2, EPSILON_SYMBOL, 'B', 'b'),
        new PDATransition(2, 3, EPSILON_SYMBOL, DOLLAR_SYMBOL, EPSILON_SYMBOL),
        new PDATransition(2, 4, EPSILON_SYMBOL, 'S', 'a'),
        new PDATransition(4, 5, EPSILON_SYMBOL, EPSILON_SYMBOL, 'B'),
        new PDATransition(5, 2, EPSILON_SYMBOL, EPSILON_SYMBOL, 'a')
    ];

    expect(pda.acceptStates).toEqual([3]);
    expect(pda.inputAlphabet).toEqual(['a', 'b']);
    expect(pda.stackAlphabet).toEqual([DOLLAR_SYMBOL, 'a', 'b', 'B', 'S']);
    expect(pda.states).toEqual([0, 1, 2, 3, 4, 5]);
    expect(pda.transitions).toEqual(transitions);
})

test('test cfg to pda - 2', () => {
    const cfg = new CFG();

    cfg.addNonTerminal('S');
    cfg.addNonTerminal('B');
    cfg.addNonTerminal('L');
    cfg.addTerminal('a');
    cfg.addTerminal('b');
    cfg.addTerminal('c');
    cfg.addTerminal('k');
    cfg.addTerminal('m');
    cfg.addProductionRule('S', 'aBa');
    cfg.addProductionRule('B', 'bcLk');
    cfg.addProductionRule('L', 'm');
    cfg.setStartSymbol('S');

    const pda = convertCFGToPDA(cfg);

    const transitions = [
        new PDATransition(0, 1, EPSILON_SYMBOL, EPSILON_SYMBOL, DOLLAR_SYMBOL),
        new PDATransition(1, 2, EPSILON_SYMBOL, EPSILON_SYMBOL, 'S'),
        new PDATransition(2, 2, 'a', 'a', EPSILON_SYMBOL),
        new PDATransition(2, 2, 'b', 'b', EPSILON_SYMBOL),
        new PDATransition(2, 2, 'c', 'c', EPSILON_SYMBOL),
        new PDATransition(2, 2, 'k', 'k', EPSILON_SYMBOL),
        new PDATransition(2, 2, EPSILON_SYMBOL, 'L', 'm'),
        new PDATransition(2, 2, 'm', 'm', EPSILON_SYMBOL),
        new PDATransition(2, 3, EPSILON_SYMBOL, DOLLAR_SYMBOL, EPSILON_SYMBOL),
        new PDATransition(2, 4, EPSILON_SYMBOL, 'S', 'a'),
        new PDATransition(2, 6, EPSILON_SYMBOL, 'B', 'k'),
        new PDATransition(4, 5, EPSILON_SYMBOL, EPSILON_SYMBOL, 'B'),
        new PDATransition(5, 2, EPSILON_SYMBOL, EPSILON_SYMBOL, 'a'),
        new PDATransition(6, 7, EPSILON_SYMBOL, EPSILON_SYMBOL, 'L'),
        new PDATransition(7, 8, EPSILON_SYMBOL, EPSILON_SYMBOL, 'c'),
        new PDATransition(8, 2, EPSILON_SYMBOL, EPSILON_SYMBOL, 'b')
    ];

    expect(pda.acceptStates).toEqual([3]);
    expect(pda.inputAlphabet).toEqual(['a', 'b', 'c', 'k', 'm']);
    expect(pda.stackAlphabet).toEqual([DOLLAR_SYMBOL, 'a', 'b', 'B', 'c', 'k', 'L', 'm', 'S']);
    expect(pda.states).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    expect(pda.transitions).toEqual(transitions);
})


test('test cfg to pda - 3', () => {
    const cfg = new CFG();

    cfg.addNonTerminal('S');
    cfg.addNonTerminal('B');
    cfg.addNonTerminal('L');
    cfg.addTerminal('a');
    cfg.addTerminal('b');
    cfg.addTerminal('m');
    cfg.addProductionRule('S', 'aBa');
    cfg.addProductionRule('B', 'LbaBa');
    cfg.addProductionRule('L', 'm');
    cfg.setStartSymbol('S');

    const pda = convertCFGToPDA(cfg);

    const transitions = [
        new PDATransition(0, 1, EPSILON_SYMBOL, EPSILON_SYMBOL, DOLLAR_SYMBOL),
        new PDATransition(1, 2, EPSILON_SYMBOL, EPSILON_SYMBOL, 'S'),
        new PDATransition(2, 2, 'a', 'a', EPSILON_SYMBOL),
        new PDATransition(2, 2, 'b', 'b', EPSILON_SYMBOL),
        new PDATransition(2, 2, EPSILON_SYMBOL, 'L', 'm'),
        new PDATransition(2, 2, 'm', 'm', EPSILON_SYMBOL),
        new PDATransition(2, 3, EPSILON_SYMBOL, DOLLAR_SYMBOL, EPSILON_SYMBOL),
        new PDATransition(2, 4, EPSILON_SYMBOL, 'S', 'a'),
        new PDATransition(2, 6, EPSILON_SYMBOL, 'B', 'a'),
        new PDATransition(4, 5, EPSILON_SYMBOL, EPSILON_SYMBOL, 'B'),
        new PDATransition(5, 2, EPSILON_SYMBOL, EPSILON_SYMBOL, 'a'),
        new PDATransition(6, 7, EPSILON_SYMBOL, EPSILON_SYMBOL, 'B'),
        new PDATransition(7, 8, EPSILON_SYMBOL, EPSILON_SYMBOL, 'a'),
        new PDATransition(8, 9, EPSILON_SYMBOL, EPSILON_SYMBOL, 'b'),
        new PDATransition(9, 2, EPSILON_SYMBOL, EPSILON_SYMBOL, 'L')
    ];

    expect(pda.acceptStates).toEqual([3]);
    expect(pda.inputAlphabet).toEqual(['a', 'b', 'm']);
    expect(pda.stackAlphabet).toEqual([DOLLAR_SYMBOL, 'a', 'b', 'B', 'L', 'm', 'S']);
    expect(pda.states).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(pda.transitions).toEqual(transitions);
})


test('test cfg to pda - 4', () => {
    const cfg = new CFG();

    cfg.addNonTerminal('S');
    cfg.addNonTerminal('B');
    cfg.addTerminal('a');
    cfg.addTerminal('m');
    cfg.addProductionRule('S', 'aBa');
    cfg.addProductionRule('S', 'Ba');
    cfg.addProductionRule('B', 'm');
    cfg.setStartSymbol('S');

    const pda = convertCFGToPDA(cfg);

    const transitions = [
        new PDATransition(0, 1, EPSILON_SYMBOL, EPSILON_SYMBOL, DOLLAR_SYMBOL),
        new PDATransition(1, 2, EPSILON_SYMBOL, EPSILON_SYMBOL, 'S'),
        new PDATransition(2, 2, 'a', 'a', EPSILON_SYMBOL),
        new PDATransition(2, 2, EPSILON_SYMBOL, 'B', 'm'),
        new PDATransition(2, 2, 'm', 'm', EPSILON_SYMBOL),
        new PDATransition(2, 3, EPSILON_SYMBOL, DOLLAR_SYMBOL, EPSILON_SYMBOL),
        new PDATransition(2, 4, EPSILON_SYMBOL, 'S', 'a'),
        new PDATransition(4, 2, EPSILON_SYMBOL, EPSILON_SYMBOL, 'B'),
        new PDATransition(4, 5, EPSILON_SYMBOL, EPSILON_SYMBOL, 'B'),
        new PDATransition(5, 2, EPSILON_SYMBOL, EPSILON_SYMBOL, 'a')
    ];

    expect(pda.acceptStates).toEqual([3]);
    expect(pda.inputAlphabet).toEqual(['a', 'm']);
    expect(pda.stackAlphabet).toEqual([DOLLAR_SYMBOL, 'a', 'B', 'm', 'S']);
    expect(pda.states).toEqual([0, 1, 2, 3, 4, 5]);
    expect(pda.transitions).toEqual(transitions);
})


test('test cfg to pda - 5', () => {
    const cfg = new CFG();

    cfg.addNonTerminal('S');
    cfg.addNonTerminal('B');
    cfg.addTerminal('a');
    cfg.addTerminal('m');
    cfg.addTerminal('l');
    cfg.addTerminal('k');
    cfg.addTerminal('t');
    cfg.addTerminal('p');
    cfg.addProductionRule('S', 'Ba');
    cfg.addProductionRule('S', 'aBa');
    cfg.addProductionRule('B', 'mlpk');
    cfg.addProductionRule('B', 'tpk');
    cfg.setStartSymbol('S');

    const pda = convertCFGToPDA(cfg);

    const transitions = [
        new PDATransition(0, 1, EPSILON_SYMBOL, EPSILON_SYMBOL, DOLLAR_SYMBOL),
        new PDATransition(1, 2, EPSILON_SYMBOL, EPSILON_SYMBOL, 'S'),
        new PDATransition(2, 2, 'a', 'a', EPSILON_SYMBOL),
        new PDATransition(2, 2, 'k', 'k', EPSILON_SYMBOL),
        new PDATransition(2, 2, 'l', 'l', EPSILON_SYMBOL),
        new PDATransition(2, 2, 'm', 'm', EPSILON_SYMBOL),
        new PDATransition(2, 2, 'p', 'p', EPSILON_SYMBOL),
        new PDATransition(2, 2, 't', 't', EPSILON_SYMBOL),
        new PDATransition(2, 3, EPSILON_SYMBOL, DOLLAR_SYMBOL, EPSILON_SYMBOL),
        new PDATransition(2, 4, EPSILON_SYMBOL, 'S', 'a'),
        new PDATransition(2, 6, EPSILON_SYMBOL, 'B', 'k'),
        new PDATransition(4, 2, EPSILON_SYMBOL, EPSILON_SYMBOL, 'B'),
        new PDATransition(4, 5, EPSILON_SYMBOL, EPSILON_SYMBOL, 'B'),
        new PDATransition(5, 2, EPSILON_SYMBOL, EPSILON_SYMBOL, 'a'),
        new PDATransition(6, 7, EPSILON_SYMBOL, EPSILON_SYMBOL, 'p'),
        new PDATransition(7, 2, EPSILON_SYMBOL, EPSILON_SYMBOL, 't'),
        new PDATransition(7, 8, EPSILON_SYMBOL, EPSILON_SYMBOL, 'l'),
        new PDATransition(8, 2, EPSILON_SYMBOL, EPSILON_SYMBOL, 'm')
    ];

    expect(pda.acceptStates).toEqual([3]);
    expect(pda.inputAlphabet).toEqual(['a', 'k', 'l', 'm', 'p', 't']);
    expect(pda.stackAlphabet).toEqual([DOLLAR_SYMBOL, 'a', 'B', 'k', 'l', 'm', 'p', 'S', 't']);
    expect(pda.states).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    expect(pda.transitions).toEqual(transitions);
})


test('test cfg to pda - 6', () => {
    const cfg = new CFG();

    cfg.addNonTerminal('S');
    cfg.addNonTerminal('B');
    cfg.addTerminal('a');
    cfg.addProductionRule('S', 'aBa');
    cfg.addProductionRule('S', 'a');
    cfg.addProductionRule('B', 'SB');
    cfg.addProductionRule('B', EPSILON_IN_CFG);
    cfg.setStartSymbol('S');

    const pda = convertCFGToPDA(cfg);

    const transitions = [
        new PDATransition(0, 1, EPSILON_SYMBOL, EPSILON_SYMBOL, DOLLAR_SYMBOL),
        new PDATransition(1, 2, EPSILON_SYMBOL, EPSILON_SYMBOL, 'S'),
        new PDATransition(2, 2, 'a', 'a', EPSILON_SYMBOL),
        new PDATransition(2, 2, EPSILON_SYMBOL, 'B', EPSILON_SYMBOL),
        new PDATransition(2, 2, EPSILON_SYMBOL, 'S', 'a'),
        new PDATransition(2, 3, EPSILON_SYMBOL, DOLLAR_SYMBOL, EPSILON_SYMBOL),
        new PDATransition(2, 4, EPSILON_SYMBOL, 'S', 'a'),
        new PDATransition(2, 6, EPSILON_SYMBOL, 'B', 'B'),
        new PDATransition(4, 5, EPSILON_SYMBOL, EPSILON_SYMBOL, 'B'),
        new PDATransition(5, 2, EPSILON_SYMBOL, EPSILON_SYMBOL, 'a'),
        new PDATransition(6, 2, EPSILON_SYMBOL, EPSILON_SYMBOL, 'S')
    ];

    expect(pda.acceptStates).toEqual([3]);
    expect(pda.inputAlphabet).toEqual(['a']);
    expect(pda.stackAlphabet).toEqual([DOLLAR_SYMBOL, 'a', 'B', 'S']);
    expect(pda.states).toEqual([0, 1, 2, 3, 4, 5, 6]);
    expect(pda.transitions).toEqual(transitions);
})
