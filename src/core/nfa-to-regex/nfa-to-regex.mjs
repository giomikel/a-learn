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
    nfa = addNewStartAndFinalStates(nfa);
    return nfa;
}

export { convertNFAToRegex };