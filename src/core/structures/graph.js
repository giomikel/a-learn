class Graph {
    constructor(states, transitions, acceptStates, type, startState) {
        this.states = states;  
        this.transitions = transitions; 
        this.acceptStates = acceptStates; 
        this.type = type;
        this.startState = startState;
    }

    toString() {
        return `States: ${this.states.toString()}
Transitions: ${this.transitions.toString()}
Accept States: ${this.acceptStates.toString()}
Start State: ${this.startState.toString()}`;
    }

    getType(){
        return this.type;
    }
}

export default Graph;
