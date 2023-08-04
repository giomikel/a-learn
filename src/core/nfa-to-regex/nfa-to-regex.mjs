import { FiniteStateMachine } from "../structures/fsm.mjs"
import { Transition } from "../structures/fsm-transition.mjs";
import { EPSILON_SYMBOL } from "../constants.mjs";

function convertNFAToRegex(nfa) {

    function addNewStartAndFinalStates(nfa) {
        const newStates = [];
        const newTransitions = [];
        const newAcceptStates = [];

        nfa.states.forEach(state => {
            newStates.push(state + 1);
        });
        newStates.splice(0, 0, 0);
        newStates.push(nfa.states.length + 1);

        nfa.transitions.forEach(transition => {
            newTransitions.push(new Transition(transition.fromState + 1, transition.symbol, transition.toState + 1));
        });
        nfa.acceptStates.forEach(acceptState => {
            newTransitions.push(new Transition(acceptState + 1, EPSILON_SYMBOL, nfa.states.length + 1))
        });

        newTransitions.push(new Transition(0, EPSILON_SYMBOL, 1));
        newAcceptStates.push(nfa.states.length + 1);

        nfa.states = newStates;
        nfa.transitions = newTransitions;
        nfa.acceptStates = newAcceptStates;
        return nfa;
    }

    function buildRegularExpression(nfa) {
        let nextStateToDelete = nfa.startState + 1;
        while (nextStateToDelete != nfa.states.length - 1) {
            let stateTransitions = new Set();
            nfa.transitions.forEach(incomingTransition => {
                if (incomingTransition.toState == nextStateToDelete && incomingTransition.fromState != nextStateToDelete) {
                    stateTransitions.add(incomingTransition)
                    nfa.transitions.forEach(outgoingTransition => {
                        if (outgoingTransition.fromState == nextStateToDelete && outgoingTransition.toState != nextStateToDelete) {
                            stateTransitions.add(outgoingTransition)
                            let alreadyConnectingTransitions = nfa.transitions.filter(t => t.fromState == incomingTransition.fromState && t.toState == outgoingTransition.toState);
                            stateTransitions.add(...alreadyConnectingTransitions);
                            const loopTransitions = nfa.transitions.filter(t => t.fromState == nextStateToDelete && t.toState == nextStateToDelete);
                            let loopRegexes = [];
                            loopTransitions.forEach(t => {
                                loopRegexes.push(`${t.symbol}`);
                            })
                            const loopRegex = loopRegexes.join('|');
                            const newTransitionRegex = `(${incomingTransition.symbol})(${loopRegex})*(${outgoingTransition.symbol})`;
                            alreadyConnectingTransitions.push(new Transition(incomingTransition.fromState, newTransitionRegex, outgoingTransition.toState));
                            const finalTransitionRegex = alreadyConnectingTransitions.map(t => t.symbol).join('|');
                            const finalTransition = new Transition(incomingTransition.fromState, finalTransitionRegex, outgoingTransition.toState);
                            nfa.transitions.push(finalTransition);
                            stateTransitions.add(...loopTransitions);
                        }
                    })
                }
            })
            nfa.transitions = nfa.transitions.filter(t => !stateTransitions.has(t));
            nextStateToDelete += 1;
        }
        return nfa.transitions.filter(t => t.fromState == 0 && t.toState == nfa.states.length - 1);
    }
    nfa = addNewStartAndFinalStates(nfa);
    const regex = buildRegularExpression(nfa);
    return regex;
}

export { convertNFAToRegex };