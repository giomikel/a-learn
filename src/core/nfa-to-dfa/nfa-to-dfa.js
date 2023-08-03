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

    function reindexResultStates(states, transitions, acceptStates) {
        const mapping = {};
        let nextState = 0;
        const newStates = [];
        const newTransitions = [];
        const newAcceptStates = [];

        states.forEach(state => {
            mapping[state] = nextState;
            newStates.push(nextState);
            nextState += 1;
        });
        transitions.forEach(transition => {
            const newTransition = new Transition(
                mapping[transition.fromState],
                transition.symbol,
                mapping[transition.toState]
            );
            newTransitions.push(newTransition);
        })
        acceptStates.forEach(acceptState => {
            const newAcceptState = mapping[acceptState];
            newAcceptStates.push(newAcceptState);
        });
        return [newStates, newTransitions, newAcceptStates];
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
    const reindexedResultStates = reindexResultStates(dfaStates, Array.from(dfaTransitions), Array.from(dfaAcceptStates));
    const finalDFAStates = reindexedResultStates[0];
    const finalDFATransitions = reindexedResultStates[1];
    const finalDFAAcceptStates = reindexedResultStates[2];
    return new DFA(finalDFAStates, finalDFATransitions, finalDFAAcceptStates);
}

// export default convertNFAToDFA;
module.exports = {
    convertNFAToDFA,
    epsilonSymbol
};