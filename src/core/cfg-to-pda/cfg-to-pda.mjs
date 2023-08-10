import { PDATransition } from "../structures/pda-transition.mjs";
import { PDA } from "../structures/pda.mjs";
import { DOLLAR_SYMBOL, EPSILON_SYMBOL } from "../constants.mjs";

function convertCFGToPDA(cfg) {

    function createBaseStates() {
        const states = [0, 1, 2, 3];
        const acceptStates = [3];
        return [states, acceptStates];
    }

    // Dollar symbol sits on the bottom of the stack
    function createDollarTransitions() {
        const dollarTransitions = [
            new PDATransition(0, 1, EPSILON_SYMBOL, EPSILON_SYMBOL, DOLLAR_SYMBOL),
            new PDATransition(2, 3, EPSILON_SYMBOL, DOLLAR_SYMBOL, EPSILON_SYMBOL)
        ];
        return dollarTransitions;
    }

    function createCFGStartSymbolTransition(startSymbol) {
        const startSymbolTransition = new PDATransition(1, 2, EPSILON_SYMBOL, EPSILON_SYMBOL, startSymbol);
        return startSymbolTransition;
    }

    function createTerminalTransitions(terminals) {
        const terminalTransitions = [];
        terminals.forEach(t => terminalTransitions.push(new PDATransition(2, 2, t, t, EPSILON_SYMBOL)));
        return terminalTransitions;
    }

    function createNonTerminalTransitions(nonTerminals) {
        // const nonTerminalPDAStates = new Set();
        // const nonTerminalPDAStateTransitions = new Set();
        // let nextStateIndex = 4;
        // nonTerminals.forEach(nonTerminal => {

        // });
    }

    let pdaStates, pdaAcceptStates, pdaTransitions;
    [pdaStates, pdaAcceptStates] = createBaseStates();
    pdaTransitions = new Set(createDollarTransitions());
    pdaTransitions.add(createCFGStartSymbolTransition(cfg.startSymbol));
    createTerminalTransitions(cfg.terminals).forEach(t => pdaTransitions.add(t));

    // ... add non terminal transitions to pdaTransitions

    return new PDA(Array.from(pdaStates), Array.from(pdaTransitions), Array.from(pdaAcceptStates));
}

export { convertCFGToPDA }
