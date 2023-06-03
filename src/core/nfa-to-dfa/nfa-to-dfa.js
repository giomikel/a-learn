epsilonSymbol = '#';

function convertNFAToDFA(nfa) {
    const dfaStates = [];
    const dfaTransitions = [];
    const dfaAcceptStates = [];

    /*
    function findEpsilonClosures(state) {
        const closures = new Set();
        closures.add(state);

        function dfs_epsilon(st) {
            const epsilonTransitions = new Set();
            nfa.transitions.forEach(element => {
                if (element.fromState == state && element.symbol == epsilonSymbol) {
                    epsilonTransitions.add(element);
                }
            });
            if (epsilonTransitions) {
                epsilonTransitions.forEach(epsilonTransition => {
                    if (!closures.has(epsilonTransition)) {
                        closures.add(epsilonTransition)
                        dfs_epsilon(epsilonTransition)
                    }
                })
            }
        }

        dfs_epsilon(state)
        return Array.from(closures);
    }*/


    // Finds epsilon closure set for given state(s)
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
        const statesWithEpsilonClosure = findEpsilonClosures(states)
        statesWithEpsilonClosure.forEach(state => {
            const transitions = new Set();
            nfa.transitions.forEach(element => {
                if (element.fromState == state && element.symbol == symbol) {
                    transitions.add(element);
                }
            });
            if (transitions) {
                reachableStates.add(...transitions);
            }
        });
        return Array.from(reachableStates);
    }

    function getOrCreateDFA(nfaStates) {
        const dfaStateName = nfaStates.sort().join(',')
        if (!dfaStates.includes(dfaStateName)) {
            dfaStates.push(dfaStateName)

            if (nfaStates.some(state => nfa.acceptStates.includes(state))) {
                dfaAcceptStates.push(dfaStateName)
            }

            const dfaTransitionsForState = {};
            nfa.alphabet.forEach(symbol => {
                const statesOnSymbol = getReachableStatesWithSymbol(nfaStates, symbol)
                if (statesOnSymbol.length > 0) {
                    dfaTransitionsForState[symbol] = getOrCreateDFA(statesOnSymbol)
                }
            });
            dfaTransitions[dfaStateName] = dfaTransitionsForState
        }
        return dfaStateName
    }

    
}