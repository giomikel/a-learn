import { FiniteStateMachine } from "../../structures/fsm.mjs"
import { Transition } from "../../structures/fsm-transition.mjs";
import { EPSILON_SYMBOL } from "../../constants.mjs";
import { convertNFAToRegex } from "../nfa-to-regex.mjs"

test('test nfa to regex conversion', () => {
    const states = [0, 1, 2];
    const transitions = [
        new Transition(0, EPSILON_SYMBOL, 1),
        new Transition(1, 0, 2),
        new Transition(1, 1, 2)
    ];
    const acceptStates = [2];
    const nfa = new FiniteStateMachine(
        states,
        transitions,
        acceptStates
    );
    const result = convertNFAToRegex(nfa);
    console.log(result);
})
