import Graph from "./graph.js";
import { Transition } from "./fsm-transition.mjs";
import { TM_TYPE } from "../constants.mjs";

class TuringMachine{
    constructor(transitions, numberOfStates){
       this.transitions = transitions;
       this.tape = [];
       this.acceptState = numberOfStates - 1;
       this.transitionMap = this.getTransitionMap(transitions);
       this.states = this.getStates(numberOfStates);
       this.writeAlphabet = this.getWriteAlphabetFromTransitions(transitions);
       this.readAlphabet = this.getReadAlphabetFromTransitions(transitions);
    }
     
    getStates(numberOfStates){
        let states = [];
        for (let i = 0; i < numberOfStates; i++){
            states.push(i);
        }
        return states;
    }

    getTransitionMap(transitions){
       let transitionMap = new Map();
       for (let transition of transitions){
          transitionMap[transition.fromState] = transitionMap[transition.fromState] || {};
          transitionMap[transition.fromState][transition.readSymbol] = transition;
       }
       return transitionMap;
    }

    getWriteAlphabetFromTransitions(transitions) {
        const writeAlphabet = new Set();

        for (let transition of transitions){
           writeAlphabet.add(transition.writeSymbol);
        }
        return writeAlphabet;
    }

    getReadAlphabetFromTransitions(transitions) {
        const readAlphabet = new Set();

        for (let transition of transitions){
           readAlphabet.add(transition.readSymbol);
        }
        return readAlphabet;
    }

    toGraph(){
        let transitions = this.transitions.map(t => new Transition(t.fromState, `${t.writeSymbol}, ${t.readSymbol} / ${t.move}`, t.toState));
        return new Graph(this.states, transitions, [this.acceptState], TM_TYPE, this.startState);
    }
}

export default TuringMachine;
