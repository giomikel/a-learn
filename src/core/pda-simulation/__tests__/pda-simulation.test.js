import { DOLLAR_SYMBOL, EPSILON_IN_CFG, EPSILON_SYMBOL } from "../../constants.mjs";
import { PDATransition } from "../../structures/pda-transition.mjs";
import { PDA } from "../../structures/pda.mjs";
import { PDASimulator } from "../pda-simulation.mjs";
import CFG from "../../structures/cfg.mjs";
import { convertCFGToPDA } from "../../cfg-to-pda/cfg-to-pda.mjs";

test('test PDA simulator for PDA accepting ww(R) meaning string concatenated with reverse of string', () => {
    const states = [0, 1, 2, 3];
    const transitions = [
        new PDATransition(0, 1, EPSILON_SYMBOL, EPSILON_SYMBOL, DOLLAR_SYMBOL),
        new PDATransition(1, 1, '0', EPSILON_SYMBOL, '0'),
        new PDATransition(1, 1, '1', EPSILON_SYMBOL, '1'),
        new PDATransition(1, 2, EPSILON_SYMBOL, EPSILON_SYMBOL, EPSILON_SYMBOL),
        new PDATransition(2, 2, '0', '0', EPSILON_SYMBOL),
        new PDATransition(2, 2, '1', '1', EPSILON_SYMBOL),
        new PDATransition(2, 3, EPSILON_SYMBOL, DOLLAR_SYMBOL, EPSILON_SYMBOL)
    ];
    const acceptStates = [3];
    const pda = new PDA(states, transitions, acceptStates);
    const pdaSimulator = new PDASimulator(pda);

    const input1 = '10';
    pdaSimulator.setInput(input1);

    expect(pdaSimulator.input).toEqual(input1);
    expect(pdaSimulator.currentInputIndex).toEqual(0);
    expect(pdaSimulator.isInAcceptStates()).toEqual(true);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('1');
    expect(pdaSimulator.currentStates).toEqual([0, 1, 2, 3]);

    expect(pdaSimulator.step()).toEqual(true);
    expect(pdaSimulator.currentInputIndex).toEqual(1);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('0');
    expect(pdaSimulator.currentStates).toEqual([1, 2]);

    expect(pdaSimulator.step()).toEqual(true);
    expect(pdaSimulator.currentInputIndex).toEqual(2);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual(null);
    expect(pdaSimulator.currentStates).toEqual([1, 2]);

    expect(pdaSimulator.step()).toEqual(false);
    expect(pdaSimulator.currentInputIndex).toEqual(2);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual(null);
    expect(pdaSimulator.currentStates).toEqual([1, 2]);

    expect(pdaSimulator.accepts(input1)).toEqual(false);

    const input2 = '1111';
    pdaSimulator.setInput(input2);

    expect(pdaSimulator.input).toEqual(input2);
    expect(pdaSimulator.currentInputIndex).toEqual(0);
    expect(pdaSimulator.isInAcceptStates()).toEqual(true);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('1');
    expect(pdaSimulator.currentStates).toEqual([0, 1, 2, 3]);

    expect(pdaSimulator.step()).toEqual(true);
    expect(pdaSimulator.currentInputIndex).toEqual(1);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('1');
    expect(pdaSimulator.currentStates).toEqual([1, 2]);

    expect(pdaSimulator.step()).toEqual(true);
    expect(pdaSimulator.currentInputIndex).toEqual(2);
    expect(pdaSimulator.isInAcceptStates()).toEqual(true);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('1');
    expect(pdaSimulator.currentStates).toEqual([1, 2, 3]);

    expect(pdaSimulator.step()).toEqual(true);
    expect(pdaSimulator.currentInputIndex).toEqual(3);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('1');
    expect(pdaSimulator.currentStates).toEqual([1, 2]);

    expect(pdaSimulator.step()).toEqual(true);
    expect(pdaSimulator.currentInputIndex).toEqual(4);
    expect(pdaSimulator.isInAcceptStates()).toEqual(true);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual(null);
    expect(pdaSimulator.currentStates).toEqual([1, 2, 3]);

    expect(pdaSimulator.step()).toEqual(false);
    expect(pdaSimulator.currentInputIndex).toEqual(4);
    expect(pdaSimulator.isInAcceptStates()).toEqual(true);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual(null);
    expect(pdaSimulator.currentStates).toEqual([1, 2, 3]);

    expect(pdaSimulator.accepts(input2)).toEqual(true);

    const input3 = '00000';
    pdaSimulator.setInput(input3);

    expect(pdaSimulator.input).toEqual(input3);
    expect(pdaSimulator.currentInputIndex).toEqual(0);
    expect(pdaSimulator.isInAcceptStates()).toEqual(true);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('0');
    expect(pdaSimulator.currentStates).toEqual([0, 1, 2, 3]);

    expect(pdaSimulator.step()).toEqual(true);
    expect(pdaSimulator.currentInputIndex).toEqual(1);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('0');
    expect(pdaSimulator.currentStates).toEqual([1, 2]);

    expect(pdaSimulator.step()).toEqual(true);
    expect(pdaSimulator.currentInputIndex).toEqual(2);
    expect(pdaSimulator.isInAcceptStates()).toEqual(true);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('0');
    expect(pdaSimulator.currentStates).toEqual([1, 2, 3]);

    expect(pdaSimulator.step()).toEqual(true);
    expect(pdaSimulator.currentInputIndex).toEqual(3);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('0');
    expect(pdaSimulator.currentStates).toEqual([1, 2]);

    expect(pdaSimulator.step()).toEqual(true);
    expect(pdaSimulator.currentInputIndex).toEqual(4);
    expect(pdaSimulator.isInAcceptStates()).toEqual(true);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('0');
    expect(pdaSimulator.currentStates).toEqual([1, 2, 3]);

    expect(pdaSimulator.step()).toEqual(true);
    expect(pdaSimulator.currentInputIndex).toEqual(5);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual(null);
    expect(pdaSimulator.currentStates).toEqual([1, 2]);

    expect(pdaSimulator.step()).toEqual(false);
    expect(pdaSimulator.currentInputIndex).toEqual(5);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual(null);
    expect(pdaSimulator.currentStates).toEqual([1, 2]);

    expect(pdaSimulator.accepts(input3)).toEqual(false);
})

test('test PDA simulator for pda that accepts 0n1n language', () => {
    const states = [0, 1, 2, 3];
    const transitions = [
        new PDATransition(0, 1, EPSILON_SYMBOL, EPSILON_SYMBOL, DOLLAR_SYMBOL),
        new PDATransition(1, 1, '0', EPSILON_SYMBOL, 'x'),
        new PDATransition(1, 2, '1', 'x', EPSILON_SYMBOL),
        new PDATransition(2, 2, '1', 'x', EPSILON_SYMBOL),
        new PDATransition(2, 3, EPSILON_SYMBOL, DOLLAR_SYMBOL, EPSILON_SYMBOL)
    ];
    const acceptStates = [3];
    const pda = new PDA(states, transitions, acceptStates);
    const pdaSimulator = new PDASimulator(pda);

    const input1 = '10';
    pdaSimulator.setInput(input1);

    expect(pdaSimulator.input).toEqual(input1);
    expect(pdaSimulator.currentInputIndex).toEqual(0);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('1');
    expect(pdaSimulator.currentStates).toEqual([0, 1]);

    expect(pdaSimulator.step()).toEqual(false);
    expect(pdaSimulator.currentInputIndex).toEqual(1);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('0');
    expect(pdaSimulator.currentStates).toEqual([]);

    expect(pdaSimulator.step()).toEqual(false);
    expect(pdaSimulator.currentInputIndex).toEqual(2);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual(null);
    expect(pdaSimulator.currentStates).toEqual([]);

    expect(pdaSimulator.accepts(input1)).toEqual(false);

    const input2 = '0011';
    pdaSimulator.setInput(input2);

    expect(pdaSimulator.input).toEqual(input2);
    expect(pdaSimulator.currentInputIndex).toEqual(0);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('0');
    expect(pdaSimulator.currentStates).toEqual([0, 1]);

    expect(pdaSimulator.step()).toEqual(true);
    expect(pdaSimulator.currentInputIndex).toEqual(1);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('0');
    expect(pdaSimulator.currentStates).toEqual([1]);

    expect(pdaSimulator.step()).toEqual(true);
    expect(pdaSimulator.currentInputIndex).toEqual(2);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('1');
    expect(pdaSimulator.currentStates).toEqual([1]);

    expect(pdaSimulator.step()).toEqual(true);
    expect(pdaSimulator.currentInputIndex).toEqual(3);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('1');
    expect(pdaSimulator.currentStates).toEqual([2]);

    expect(pdaSimulator.step()).toEqual(true);
    expect(pdaSimulator.currentInputIndex).toEqual(4);
    expect(pdaSimulator.isInAcceptStates()).toEqual(true);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual(null);
    expect(pdaSimulator.currentStates).toEqual([2, 3]);

    expect(pdaSimulator.step()).toEqual(false);
    expect(pdaSimulator.currentInputIndex).toEqual(4);
    expect(pdaSimulator.isInAcceptStates()).toEqual(true);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual(null);
    expect(pdaSimulator.currentStates).toEqual([2, 3]);

    expect(pdaSimulator.accepts(input2)).toEqual(true);

    const input3 = '1011';
    pdaSimulator.setInput(input3);

    expect(pdaSimulator.input).toEqual(input3);
    expect(pdaSimulator.currentInputIndex).toEqual(0);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('1');
    expect(pdaSimulator.currentStates).toEqual([0, 1]);

    expect(pdaSimulator.step()).toEqual(false);
    expect(pdaSimulator.currentInputIndex).toEqual(1);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('0');
    expect(pdaSimulator.currentStates).toEqual([]);

    expect(pdaSimulator.step()).toEqual(false);
    expect(pdaSimulator.currentInputIndex).toEqual(2);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('1');
    expect(pdaSimulator.currentStates).toEqual([]);

    expect(pdaSimulator.step()).toEqual(false);
    expect(pdaSimulator.currentInputIndex).toEqual(3);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('1');
    expect(pdaSimulator.currentStates).toEqual([]);

    expect(pdaSimulator.step()).toEqual(false);
    expect(pdaSimulator.currentInputIndex).toEqual(4);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual(null);
    expect(pdaSimulator.currentStates).toEqual([]);

    expect(pdaSimulator.step()).toEqual(false);
    expect(pdaSimulator.currentInputIndex).toEqual(4);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual(null);
    expect(pdaSimulator.currentStates).toEqual([]);

    expect(pdaSimulator.accepts(input3)).toEqual(false);

    const input4 = '2';
    pdaSimulator.setInput(input4);

    expect(pdaSimulator.input).toEqual(input4);
    expect(pdaSimulator.currentInputIndex).toEqual(0);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('2');
    expect(pdaSimulator.currentStates).toEqual([0, 1]);

    expect(pdaSimulator.step()).toEqual(false);
    expect(pdaSimulator.currentInputIndex).toEqual(1);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual(null);
    expect(pdaSimulator.currentStates).toEqual([]);

    expect(pdaSimulator.accepts(input4)).toEqual(false);

})

test('test PDA simulator for cfg to pda algorithm', () => {
    const cfg = new CFG();

    cfg.addNonTerminal('S');
    cfg.addTerminal('a');
    cfg.addTerminal('b');
    cfg.addProductionRule('S', 'aSb');
    cfg.addProductionRule('S', EPSILON_IN_CFG);
    cfg.setStartSymbol('S');

    const pda = convertCFGToPDA(cfg);
    const pdaSimulator = new PDASimulator(pda);

    const input1 = '10';
    pdaSimulator.setInput(input1);

    expect(pdaSimulator.input).toEqual(input1);
    expect(pdaSimulator.currentInputIndex).toEqual(0);
    expect(pdaSimulator.isInAcceptStates()).toEqual(true);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('1');
    expect(pdaSimulator.currentStates).toEqual([0, 1, 2, 3, 4, 5]);

    expect(pdaSimulator.step()).toEqual(false);
    expect(pdaSimulator.currentInputIndex).toEqual(1);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('0');
    expect(pdaSimulator.currentStates).toEqual([]);

    expect(pdaSimulator.accepts(input1)).toEqual(false);

    const input2 = 'aba';
    pdaSimulator.setInput(input2);

    expect(pdaSimulator.input).toEqual(input2);
    expect(pdaSimulator.currentInputIndex).toEqual(0);
    expect(pdaSimulator.isInAcceptStates()).toEqual(true);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('a');
    expect(pdaSimulator.currentStates).toEqual([0, 1, 2, 3, 4, 5]);

    expect(pdaSimulator.step()).toEqual(true);
    expect(pdaSimulator.currentInputIndex).toEqual(1);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('b');
    expect(pdaSimulator.currentStates).toEqual([2, 4, 5]);

    expect(pdaSimulator.step()).toEqual(true);
    expect(pdaSimulator.currentInputIndex).toEqual(2);
    expect(pdaSimulator.isInAcceptStates()).toEqual(true);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('a');
    expect(pdaSimulator.currentStates).toEqual([2, 3]);

    expect(pdaSimulator.step()).toEqual(false);
    expect(pdaSimulator.currentInputIndex).toEqual(3);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual(null);
    expect(pdaSimulator.currentStates).toEqual([]);

    expect(pdaSimulator.accepts(input2)).toEqual(false);

    const input3 = 'aabb';
    pdaSimulator.setInput(input3);

    expect(pdaSimulator.input).toEqual(input3);
    expect(pdaSimulator.currentInputIndex).toEqual(0);
    expect(pdaSimulator.isInAcceptStates()).toEqual(true);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('a');
    expect(pdaSimulator.currentStates).toEqual([0, 1, 2, 3, 4, 5]);

    expect(pdaSimulator.step()).toEqual(true);
    expect(pdaSimulator.currentInputIndex).toEqual(1);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('a');
    expect(pdaSimulator.currentStates).toEqual([2, 4, 5]);

    expect(pdaSimulator.step()).toEqual(true);
    expect(pdaSimulator.currentInputIndex).toEqual(2);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('b');
    expect(pdaSimulator.currentStates).toEqual([2, 4, 5]);

    expect(pdaSimulator.step()).toEqual(true);
    expect(pdaSimulator.currentInputIndex).toEqual(3);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('b');
    expect(pdaSimulator.currentStates).toEqual([2]);

    expect(pdaSimulator.step()).toEqual(true);
    expect(pdaSimulator.currentInputIndex).toEqual(4);
    expect(pdaSimulator.isInAcceptStates()).toEqual(true);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual(null);
    expect(pdaSimulator.currentStates).toEqual([2, 3]);

    expect(pdaSimulator.step()).toEqual(false);
    expect(pdaSimulator.currentInputIndex).toEqual(4);
    expect(pdaSimulator.isInAcceptStates()).toEqual(true);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual(null);
    expect(pdaSimulator.currentStates).toEqual([2, 3]);

    expect(pdaSimulator.accepts(input3)).toEqual(true);

    const input4 = 'bbaa';
    pdaSimulator.setInput(input4);

    expect(pdaSimulator.input).toEqual(input4);
    expect(pdaSimulator.currentInputIndex).toEqual(0);
    expect(pdaSimulator.isInAcceptStates()).toEqual(true);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('b');
    expect(pdaSimulator.currentStates).toEqual([0, 1, 2, 3, 4, 5]);

    expect(pdaSimulator.step()).toEqual(false);
    expect(pdaSimulator.currentInputIndex).toEqual(1);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('b');
    expect(pdaSimulator.currentStates).toEqual([]);

    expect(pdaSimulator.step()).toEqual(false);
    expect(pdaSimulator.currentInputIndex).toEqual(2);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('a');
    expect(pdaSimulator.currentStates).toEqual([]);

    expect(pdaSimulator.step()).toEqual(false);
    expect(pdaSimulator.currentInputIndex).toEqual(3);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual('a');
    expect(pdaSimulator.currentStates).toEqual([]);

    expect(pdaSimulator.step()).toEqual(false);
    expect(pdaSimulator.currentInputIndex).toEqual(4);
    expect(pdaSimulator.isInAcceptStates()).toEqual(false);
    expect(pdaSimulator.getCurrentInputSymbol()).toEqual(null);
    expect(pdaSimulator.currentStates).toEqual([]);

    expect(pdaSimulator.accepts(input4)).toEqual(false);

    expect(pdaSimulator.accepts('ab')).toEqual(true);
    expect(pdaSimulator.accepts('aaabbb')).toEqual(true);
    expect(pdaSimulator.accepts('')).toEqual(true);
    expect(pdaSimulator.accepts('ba')).toEqual(false);
    expect(pdaSimulator.accepts('baa')).toEqual(false);
    expect(pdaSimulator.accepts('aab')).toEqual(false);
})
