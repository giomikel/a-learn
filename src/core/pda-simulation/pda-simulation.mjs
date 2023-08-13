import { EPSILON_SYMBOL } from "../constants.mjs";

class PDASimulator {
    constructor(pda) {
        this.pda = pda;
        this.currentStacks = new Map();
        this.currentStates = this.findPDAEpsilonClosures(this.pda.startState, this.pda.transitions, this.currentStacks);
        this.currentInputIndex = 0;
        this.input = '';
    }

    reset() {
        this.currentStates = this.findPDAEpsilonClosures(this.pda.startState, this.pda.transitions, this.currentStacks);
        this.currentInputIndex = 0;
        this.input = '';
        this.currentStacks = new Map();
    }

    setInput(input) {
        this.reset();
        this.input = input;
    }

    findPDAEpsilonClosures(states, transitions, stacks) {
        const closures = new Set(states);

        function dfsEpsilon(state) {
            const currentStateStacks = stacks.get(state);
            transitions.forEach(element => {
                if (element.fromState == state && element.inputSymbol == EPSILON_SYMBOL) {
                    currentStateStacks.forEach(s => {
                        if (s[s.length - 1] == element.popSymbol || element.popSymbol == EPSILON_SYMBOL) {
                            closures.add(element.toState);
                            const toStateStacks = stacks.get(element.toState) || [];
                            if (element.popSymbol != EPSILON_SYMBOL) { s.pop(); }
                            if (element.pushSymbol != EPSILON_SYMBOL) { s.push(element.pushSymbol); }
                            toStateStacks.push(s);
                            stacks.set(element.toState, toStateStacks);
                            dfsEpsilon(element.toState);
                        }
                    });
                }
            });
        }
        states.forEach(state => dfsEpsilon(state));
        return [Array.from(closures), stacks];
    }

    step() {
        if (this.currentInputIndex < this.input.length) {
            const symbol = this.input[this.currentInputIndex];
            const nextStates = [];

            for (const state of this.currentStates) {
                const transitions = this.pda.transitions.filter(transition =>
                    transition.fromState == state
                    && transition.inputSymbol == symbol
                );
                const currentStateStacks = this.stacks.get(state);
                const toStates = new Set();
                transitions.forEach(t => {
                    currentStateStacks.forEach(s => {
                        if (s[s.length - 1] == t.popSymbol || t.popSymbol == EPSILON_SYMBOL) {
                            toStates.push(t.toState);
                            const toStateStacks = this.stacks.get(t.toState) || [];
                            if (t.popSymbol != EPSILON_SYMBOL) { s.pop(); }
                            if (t.pushSymbol != EPSILON_SYMBOL) { s.push(t.pushSymbol); }
                            toStateStacks.push(s);
                            this.stacks.set(t.toState, toStateStacks);
                        }
                    })
                });
                const [closures, stacks] = this.findPDAEpsilonClosures(Array.from(toStates), this.pda.transitions, this.pda.stacks);
                nextStates.push(...closures);
                this.stacks = stacks;
            }
            this.currentStates = Array.from(new Set(nextStates)).sort();
            this.currentInputIndex++;
            return this.currentStates.length > 0;
        }
        return false;
    }

    isInAcceptStates() {
        return this.currentStates.some(state => this.pda.acceptStates.includes(state));
    }

    getCurrentInputSymbol() {
        if (this.currentInputIndex >= this.input.length) {
            return null;
        }
        return this.input[this.currentInputIndex];
    }

    accepts(input) {
        this.setInput(input);

        while (this.step());

        return this.currentStates.some(state => this.isInAcceptStates(state));
    }
}

export { PDASimulator }
