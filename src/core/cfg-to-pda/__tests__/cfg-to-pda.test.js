import { DOLLAR_SYMBOL, EPSILON_SYMBOL } from "../../constants.mjs";
import CFG from "../../structures/cfg.mjs";
import { PDATransition } from "../../structures/pda-transition.mjs";
import { convertCFGToPDA } from "../cfg-to-pda.mjs";

test('test cfg to pda', () => {
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
        new PDATransition(2, 4, 'S', EPSILON_SYMBOL, 'a'),
        new PDATransition(4, 5, EPSILON_SYMBOL, EPSILON_SYMBOL, 'B'),
        new PDATransition(5, 2, EPSILON_SYMBOL, EPSILON_SYMBOL, 'a'),
        new PDATransition(2, 3, EPSILON_SYMBOL, DOLLAR_SYMBOL, EPSILON_SYMBOL)
    ];

    expect(pda.acceptStates).toEqual([3]);
    expect(pda.inputAlphabet).toEqual(['B', 'S', 'a', 'b']);
    expect(pda.stackAlphabet).toEqual([DOLLAR_SYMBOL, 'S', 'a', 'b']);
    expect(pda.states).toEqual([0, 1, 2, 3, 4, 5]);
    expect(pda.transitions).toEqual(transitions);
})
