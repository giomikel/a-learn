import { EPSILON_SYMBOL } from "../constants.mjs";

class PDASimulator {
    constructor(pda) {
        this.pda = pda;
        this.currentStacks = new Map();
        this.currentStates = this.findPDAEpsilonClosures([this.pda.startState], this.pda.transitions);
        this.currentInputIndex = 0;
        this.input = '';
    }

    reset() {
        this.currentStacks = new Map();
        this.currentStates = this.findPDAEpsilonClosures([this.pda.startState], this.pda.transitions);
        this.currentInputIndex = 0;
        this.input = '';
    }

    setInput(input) {
        this.reset();
        this.input = input;
    }

    findPDAEpsilonClosures(states, transitions) {
        const closures = new Set(states);

        function dfsEpsilon(state, currentStacks, arraysInclude) {
            const currentStateStacks = [...(currentStacks.get(state) || [[]])];
            transitions.forEach(element => {
                if (element.fromState == state && element.inputSymbol == EPSILON_SYMBOL) {
                    currentStateStacks.forEach(s => {
                        if (s[s.length - 1] == element.popSymbol || element.popSymbol == EPSILON_SYMBOL) {
                            closures.add(element.toState);
                            const toStateStacks = [...(currentStacks.get(element.toState) || [])];
                            const sClone = [...s];
                            if (element.popSymbol != EPSILON_SYMBOL) { sClone.pop(); }
                            if (element.pushSymbol != EPSILON_SYMBOL) { sClone.push(element.pushSymbol); }
                            if (!arraysInclude(toStateStacks, sClone)) { toStateStacks.push(sClone); }
                            currentStacks.set(element.toState, toStateStacks);
                            dfsEpsilon(element.toState, currentStacks, arraysInclude);
                        }
                    });
                }
            });
        }
        states.forEach(state => dfsEpsilon(state, this.currentStacks, this.arraysInclude));
        return Array.from(closures);
    }

    step() {
        if (this.currentInputIndex < this.input.length) {
            const symbol = this.input[this.currentInputIndex];
            const nextStates = [];

            this.currentStates.forEach(st => {
                const transitions = this.pda.transitions.filter(transition => transition.fromState == st && transition.inputSymbol == symbol);
                transitions.forEach(t => {
                    this.currentStacks.forEach(s => {
                        if (s[s.length - 1] == t.popSymbol || t.popSymbol == EPSILON_SYMBOL) {
                            this.currentStacks.delete(t.toState);
                        }
                    });
                });
            });

            const nextStacks = new Map();

            for (const state of this.currentStates) {
                const transitions = this.pda.transitions.filter(transition => transition.fromState == state && transition.inputSymbol == symbol);
                const currentStateStacks = [...(this.currentStacks.get(state) || [[]])];
                const toStates = new Set();
                transitions.forEach(t => {
                    currentStateStacks.forEach(s => {
                        if (s[s.length - 1] == t.popSymbol || t.popSymbol == EPSILON_SYMBOL) {
                            toStates.add(t.toState);
                            const toStateStacks = [...(this.currentStacks.get(t.toState) || [])];
                            const sClone = [...s];
                            if (t.popSymbol != EPSILON_SYMBOL) { sClone.pop(); }
                            if (t.pushSymbol != EPSILON_SYMBOL) { sClone.push(t.pushSymbol); }
                            if (!this.arraysInclude(toStateStacks, sClone)) { toStateStacks.push(sClone); }
                            this.nextStacks.set(t.toState, toStateStacks);
                        }
                    });
                });
                nextStates.push(...this.findPDAEpsilonClosures(transitions.map(t => t.toState), this.pda.transitions));
            }
            this.currentStacks.forEach((value, key) => {

            })
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

        return this.currentStates.some(s => this.isInAcceptStates(s) && Array.from(this.currentStacks.get(s)).some(st => st.length === 0));
    }

    arraysInclude(arrays, targetArray) {
        return arrays.some(array =>
            array.length === targetArray.length &&
            array.every((value, index) => value === targetArray[index])
        );
    }
}

export { PDASimulator }
