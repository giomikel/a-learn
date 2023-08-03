// import NFA from './nfa';
const NFA = require('./nfa')
const DFA = require('./dfa')
const Transition = require('./transition')

epsilonSymbol = '#';

function convertNFAToDFA(nfa) {
    const dfaStates = [];
    const dfaTransitions = new Set();
    const dfaAcceptStates = new Set();

    // Finds epsilon closure set for given states
    function findEpsilonClosures(states) {
        const closures = new Set(states);

        function dfs_epsilon(state) {
            nfa.transitions.forEach(element => {
                if (element.fromState == state && element.symbol == epsilonSymbol && !closures.has(element.toState)) {
                    closures.add(element.toState);
                    dfs_epsilon(element.toState);
                }
            });
        }

        states.forEach(state => dfs_epsilon(state));

        return Array.from(closures);
    }

    // Finds every reachable state from all elements of 'states' array with given symbol
    function getReachableStatesWithSymbol(states, symbol) {
        const reachableStates = new Set();
        states.forEach(state => {
            nfa.transitions.forEach(element => {
                if (element.fromState == state && element.symbol == symbol) {
                    toStateClosure = findEpsilonClosures([element.toState])
                    reachableStates.add(...toStateClosure);
                }
            });
        });
        return Array.from(reachableStates);
    }

    const nfaStartStateClosure = findEpsilonClosures([nfa.states[0]])
    dfaStates.push(nfaStartStateClosure);
    const unprocessedDFAStates = [nfaStartStateClosure];
    const dfaStartStateName = nfaStartStateClosure.sort().join(',');
    while (unprocessedDFAStates.length > 0) {
        const currentDFAState = unprocessedDFAStates.shift()
        nfa.alphabet.forEach(symbol => {
            const statesFromCurrentDFAStateWithSymbol = getReachableStatesWithSymbol(currentDFAState, symbol).sort();
            const isInDFAStates = dfaStates.some((arr) => JSON.stringify(arr) === JSON.stringify(statesFromCurrentDFAStateWithSymbol));
            if (!isInDFAStates) {
                dfaStates.push(statesFromCurrentDFAStateWithSymbol);
                unprocessedDFAStates.push(statesFromCurrentDFAStateWithSymbol);
            }
            dfaTransitions.add(new Transition(currentDFAState, symbol, statesFromCurrentDFAStateWithSymbol));
        });
    }

    dfaStates.forEach(st => {
        if (nfa.acceptStates.some((element) => st.includes(element))) {
            dfaAcceptStates.add(st);
        }
    });

    return new DFA(dfaStates, dfaTransitions, dfaAcceptStates)
}

// export default convertNFAToDFA;
module.exports = {
    convertNFAToDFA,
    epsilonSymbol
};