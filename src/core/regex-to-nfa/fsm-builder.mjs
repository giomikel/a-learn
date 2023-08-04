import { FiniteStateMachine } from "../structures/fsm.mjs"
import { Transition } from "../structures/fsm-transition.mjs";

function createStateArray(numberOfStates){
    let states = [];
    for (let i = 0; i < numberOfStates; i++) {
        states.push(i);
    }
    return states;
}

function createTransitionArray(edges){
    const transitions = [];

    for(let i = 0; i<edges.length; i++){
        edges[i].forEach(edge => {
            transitions.push(new Transition(i, edge.ch, edge.index));
        });
    }

    return transitions;
}

function buildFSM(automata, s){
    const states = createStateArray(automata.n);
    const transitions = createTransitionArray(automata.edges);
    const acceptStates = Array.from(s).sort((a, b) => a - b);
    return new FiniteStateMachine(states, transitions, acceptStates)
}

export default buildFSM;
