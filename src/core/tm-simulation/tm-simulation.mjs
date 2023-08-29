import { TURING_MACHINE_MAX_STEP_NUM } from "../constants.mjs";

class TMSimulator{
    constructor(turingMachine) {
       this.turingMachine = turingMachine;
       this.setInput('');
    }

    setInput(input) {
        this.currentStepNum = 0;
        this.currentState = 0;
        this.pointer = this.setPointer(input);
        this.status = 0;
        this.input = input;
        this.turingMachine.tape = input.split('');
    }

    setPointer(input) {
        if (input === ''){
           return -1;
        }
        
        return 0;
    }

    getEmptyInputStatus() {
        if (this.turingMachine.states.length === 1) {
            this.status = 1;
            return this.status;
        }
        this.currentState = null;
        this.status = -1;
        return this.status; 
    }

    step() {
        
        if (this.isAccepted()) return 1;

        if (this.status === -1) return -1;

        if (this.input === ''){
            return this.getEmptyInputStatus();
        }

        if (this.currentStepNum > TURING_MACHINE_MAX_STEP_NUM || !(this.currentState in this.turingMachine.transitionMap) || !(this.turingMachine.tape[this.pointer] in this.turingMachine.transitionMap[this.currentState])){
            this.currentState = null;
            this.status = -1;
            if (this.currentStepNum <= TURING_MACHINE_MAX_STEP_NUM){
               this.currentStepNum +=1;
            }
            return this.status;
        }

        let transition = this.turingMachine.transitionMap[this.currentState][this.turingMachine.tape[this.pointer]];
        this.currentState = transition.toState;
        this.turingMachine.tape[this.pointer] = transition.writeSymbol;

        if (transition.move === 'L') {
            if (this.pointer !== 0) this.pointer--;
        } else {
            if (this.pointer === this.turingMachine.tape.length - 1) {
                this.turingMachine.tape.push('_');
            }
            this.pointer++;
        }

        if (this.currentState === this.turingMachine.acceptState){
            this.status = 1;
            this.currentStepNum ++;
            return this.status;
        } 
        
        this.currentStepNum ++;

        return 0;
    }

    isAccepted() {
        if (this.status === 1){
            return true;
        }

        return false;
    }

    accepts(input) {
        this.setInput(input);

        while (this.step() === 0);

        return this.isAccepted();
    }

}

export default TMSimulator;
