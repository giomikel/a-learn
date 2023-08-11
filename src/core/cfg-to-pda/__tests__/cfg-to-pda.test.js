import { DOLLAR_SYMBOL, EPSILON_SYMBOL } from "../../constants.mjs";
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
    expect(pda.stackAlphabet).toEqual([DOLLAR_SYMBOL, 'a', 'b', 'B', 'S' ]);
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
    expect(pda.stackAlphabet).toEqual(['$', 'a', 'b', 'B', 'c', 'k', 'L', 'm', 'S' ]);
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
    console.log(pda.inputAlphabet);
    expect(pda.inputAlphabet).toEqual(['a', 'b', 'm']);
    console.log(pda.stackAlphabet);
    expect(pda.stackAlphabet).toEqual(['$', 'a', 'b', 'B', 'L', 'm', 'S' ]);
    console.log(pda.states);
    expect(pda.states).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    console.log(pda.transitions);
    expect(pda.transitions).toEqual(transitions);
})
