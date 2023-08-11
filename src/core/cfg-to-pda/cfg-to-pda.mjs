import { PDATransition } from "../structures/pda-transition.mjs";
import { PDA } from "../structures/pda.mjs";
import { DOLLAR_SYMBOL, EPSILON_IN_CFG, EPSILON_SYMBOL } from "../constants.mjs";

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

    function getSuffix(suffixArr, state) {
        let resultSuffix = '';
        suffixArr.sort((a, b) =>  b.length - a.length);
        for (let suf of suffixArr){
            if (state.endsWith(suf) && state !== suf){
                resultSuffix = suf;
                break;
            }
        }
        return resultSuffix;
    }

    function getInitialState(suffix, suffixStateMap){
        if (suffix === '') return 2;
        return suffixStateMap.get(suffix);
    }

    function populateSuffix(increment, suffix, nextStateIndex, suffixStateMap, suffixArr){
        if (increment !== 0){
           suffixArr.push(suffix);
           suffixStateMap.set(suffix, nextStateIndex);
        }
    }

    function createNonTerminalTransitions(cfg, pdaTransitions, pdaStates) {
        let nonTerminals = cfg.nonTerminals;
        let nextStateIndex = 4;
        nonTerminals.forEach(nonTerminal => {
            const suffixArr = [];
            const suffixStateMap = new Map();
             let states = cfg.productionRules.get(nonTerminal);
             states.forEach(state => {
                if (state === EPSILON_IN_CFG) {

                    pdaTransitions.add(new PDATransition(2, 2, EPSILON_SYMBOL, nonTerminal, EPSILON_SYMBOL))
                } else {
                    
                    let suffix = getSuffix(suffixArr, state);
                    let tmState = getInitialState(suffix, suffixStateMap);
                    for (let i = state.length - suffix.length - 1; i >= 0; i--){
                        let increment = 0;
                        if (i === 0 && i === state.length - 1){
                            pdaTransitions.add(new PDATransition(tmState, 2, EPSILON_SYMBOL, nonTerminal, state[i]));
                        }else if (i === state.length - 1 ){
                            pdaTransitions.add(new PDATransition(tmState, nextStateIndex, EPSILON_SYMBOL, nonTerminal, state[i]));
                            tmState = nextStateIndex;
                            pdaStates.push(nextStateIndex);
                            increment ++;
                        }else if(i === 0){
                            pdaTransitions.add(new PDATransition(tmState, 2, EPSILON_SYMBOL, EPSILON_SYMBOL, state[i]));
                        }else{
                            pdaTransitions.add(new PDATransition(tmState, nextStateIndex, EPSILON_SYMBOL, EPSILON_SYMBOL, state[i]));
                            pdaStates.push(nextStateIndex);
                            tmState = nextStateIndex;
                            increment ++;
                        }
                        suffix = state[i]+suffix;
                        populateSuffix(increment, suffix, nextStateIndex, suffixStateMap, suffixArr);
                        nextStateIndex += increment;
                    }
                }
             });
        });
    }

    let pdaStates, pdaAcceptStates, pdaTransitions;
    [pdaStates, pdaAcceptStates] = createBaseStates();
    pdaTransitions = new Set(createDollarTransitions());
    pdaTransitions.add(createCFGStartSymbolTransition(cfg.startSymbol));
    createTerminalTransitions(cfg.terminals).forEach(t => pdaTransitions.add(t));
    createNonTerminalTransitions(cfg, pdaTransitions, pdaStates);

    return new PDA(Array.from(pdaStates), Array.from(pdaTransitions), Array.from(pdaAcceptStates));
}

export { convertCFGToPDA }
