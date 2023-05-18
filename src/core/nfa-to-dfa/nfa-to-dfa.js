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

    function findEpsilonClosures(states) {
        const closures = new Set(states);
      
        function dfs_epsilon(state) {
          nfa.transitions.forEach(element => {
            if (element.fromState === state && element.symbol === 'ε' && !closures.has(element.toState)) {
              closures.add(element.toState);
              dfs_epsilon(element.toState);
            }
          });
        }
      
        states.forEach(state => dfs_epsilon(state));
      
        return Array.from(closures);
    }

    function getReachableStatesWithSymbol(states, symbol) {
        const reachableStates = new Set();
        states.forEach(state => {
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
}