import { DOLLAR_SYMBOL, EPSILON_SYMBOL } from "../../constants.mjs";
import { PDATransition } from "../../structures/pda-transition.mjs";
import { PDA } from "../../structures/pda.mjs";
import { PDASimulator } from "../pda-simulation.mjs";

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
    expect(pdaSimulator.accepts(input1)).toEqual(true);
})
