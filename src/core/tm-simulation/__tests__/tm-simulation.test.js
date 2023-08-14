import TMSimulator from "../tm-simulation.mjs"
import TuringTransition from "../../structures/turing-transition.mjs";
import TuringMachine from "../../structures/turing-machine.mjs";
import { TURING_MACHINE_MAX_STEP_NUM } from "../../constants.mjs"


test('test tm-simulator - check step by step - (1)', () => {

    const transitions = [
        new TuringTransition(0, '0', 0, '0', 'R'),
        new TuringTransition(0, '1', 1, '1', 'R')
    ];
    const numberOfStates = 2;
    const turingMachine = new TuringMachine(transitions, numberOfStates);
    const turingSimulator = new TMSimulator(turingMachine);

    turingSimulator.setInput("0011");

    expect(turingSimulator.currentState).toEqual(0);
    expect(turingSimulator.pointer).toEqual(0);
    expect(turingSimulator.status).toEqual(0);
    expect(turingSimulator.turingMachine.tape).toEqual(['0', '0', '1', '1']);
    expect(turingSimulator.isAccepted()).toEqual(false);

    turingSimulator.step();
    expect(turingSimulator.currentState).toEqual(0);
    expect(turingSimulator.pointer).toEqual(1);
    expect(turingSimulator.status).toEqual(0);
    expect(turingSimulator.turingMachine.tape).toEqual(['0', '0', '1', '1']);
    expect(turingSimulator.isAccepted()).toEqual(false);

    turingSimulator.step();
    expect(turingSimulator.currentState).toEqual(0);
    expect(turingSimulator.pointer).toEqual(2);
    expect(turingSimulator.status).toEqual(0);
    expect(turingSimulator.turingMachine.tape).toEqual(['0', '0', '1', '1']);
    expect(turingSimulator.isAccepted()).toEqual(false);

    turingSimulator.step();
    expect(turingSimulator.currentState).toEqual(1);
    expect(turingSimulator.pointer).toEqual(3);
    expect(turingSimulator.status).toEqual(1);
    expect(turingSimulator.turingMachine.tape).toEqual(['0', '0', '1', '1']);
    expect(turingSimulator.isAccepted()).toEqual(true);


    turingSimulator.setInput("");

    turingSimulator.step();
    expect(turingSimulator.currentState).toEqual(0);
    expect(turingSimulator.status).toEqual(-1);
    expect(turingSimulator.turingMachine.tape).toEqual([]);
    expect(turingSimulator.isAccepted()).toEqual(false);


    turingSimulator.setInput("01");

    turingSimulator.step();
    expect(turingSimulator.currentState).toEqual(0);
    expect(turingSimulator.pointer).toEqual(1);
    expect(turingSimulator.status).toEqual(0);
    expect(turingSimulator.turingMachine.tape).toEqual(['0', '1']);
    expect(turingSimulator.isAccepted()).toEqual(false);

    turingSimulator.step();
    expect(turingSimulator.currentState).toEqual(1);
    expect(turingSimulator.pointer).toEqual(2);
    expect(turingSimulator.status).toEqual(1);
    expect(turingSimulator.turingMachine.tape).toEqual(['0', '1', '_']);
    expect(turingSimulator.isAccepted()).toEqual(true);

})

test('test tm-simulator - check step by step - (2)', () => {

    const transitions = [
        new TuringTransition(0, '0', 1, 'X', 'R'),
        new TuringTransition(0, 'Y', 3, 'Y', 'R'),
        new TuringTransition(1, '0', 1, '0', 'R'),
        new TuringTransition(1, '1', 2, 'Y', 'L'),
        new TuringTransition(1, 'Y', 1, 'Y', 'R'),
        new TuringTransition(2, '0', 2, '0', 'L'),
        new TuringTransition(2, 'X', 0, 'X', 'R'),
        new TuringTransition(2, 'Y', 2, 'Y', 'L')
    ];
    const numberOfStates = 4;
    const turingMachine = new TuringMachine(transitions, numberOfStates);
    const turingSimulator = new TMSimulator(turingMachine);

    turingSimulator.setInput("0011");

    expect(turingSimulator.currentState).toEqual(0);
    expect(turingSimulator.status).toEqual(0);
    expect(turingSimulator.turingMachine.tape).toEqual(['0', '0', '1', '1']);
    expect(turingSimulator.isAccepted()).toEqual(false);

    turingSimulator.step();
    expect(turingSimulator.currentState).toEqual(1);
    expect(turingSimulator.pointer).toEqual(1);
    expect(turingSimulator.status).toEqual(0);
    expect(turingSimulator.turingMachine.tape).toEqual(['X', '0', '1', '1']);
    expect(turingSimulator.isAccepted()).toEqual(false);

    turingSimulator.step();
    expect(turingSimulator.currentState).toEqual(1);
    expect(turingSimulator.pointer).toEqual(2);
    expect(turingSimulator.status).toEqual(0);
    expect(turingSimulator.turingMachine.tape).toEqual(['X', '0', '1', '1']);
    expect(turingSimulator.isAccepted()).toEqual(false);

    turingSimulator.step();
    expect(turingSimulator.currentState).toEqual(2);
    expect(turingSimulator.pointer).toEqual(1);
    expect(turingSimulator.status).toEqual(0);
    expect(turingSimulator.turingMachine.tape).toEqual(['X', '0', 'Y', '1']);
    expect(turingSimulator.isAccepted()).toEqual(false);


    turingSimulator.step();
    expect(turingSimulator.currentState).toEqual(2);
    expect(turingSimulator.pointer).toEqual(0);
    expect(turingSimulator.status).toEqual(0);
    expect(turingSimulator.turingMachine.tape).toEqual(['X', '0', 'Y', '1']);
    expect(turingSimulator.isAccepted()).toEqual(false);


    turingSimulator.step();
    expect(turingSimulator.currentState).toEqual(0);
    expect(turingSimulator.pointer).toEqual(1);
    expect(turingSimulator.status).toEqual(0);
    expect(turingSimulator.turingMachine.tape).toEqual(['X', '0', 'Y', '1']);
    expect(turingSimulator.isAccepted()).toEqual(false);

    turingSimulator.step();
    expect(turingSimulator.currentState).toEqual(1);
    expect(turingSimulator.pointer).toEqual(2);
    expect(turingSimulator.status).toEqual(0);
    expect(turingSimulator.turingMachine.tape).toEqual(['X', 'X', 'Y', '1']);
    expect(turingSimulator.isAccepted()).toEqual(false);

    turingSimulator.step();
    expect(turingSimulator.currentState).toEqual(1);
    expect(turingSimulator.pointer).toEqual(3);
    expect(turingSimulator.status).toEqual(0);
    expect(turingSimulator.turingMachine.tape).toEqual(['X', 'X', 'Y', '1']);
    expect(turingSimulator.isAccepted()).toEqual(false);

    turingSimulator.step();
    expect(turingSimulator.currentState).toEqual(2);
    expect(turingSimulator.pointer).toEqual(2);
    expect(turingSimulator.status).toEqual(0);
    expect(turingSimulator.turingMachine.tape).toEqual(['X', 'X', 'Y', 'Y']);
    expect(turingSimulator.isAccepted()).toEqual(false);

    turingSimulator.step();
    expect(turingSimulator.currentState).toEqual(2);
    expect(turingSimulator.pointer).toEqual(1);
    expect(turingSimulator.status).toEqual(0);
    expect(turingSimulator.turingMachine.tape).toEqual(['X', 'X', 'Y', 'Y']);
    expect(turingSimulator.isAccepted()).toEqual(false);

    turingSimulator.step();
    expect(turingSimulator.currentState).toEqual(0);
    expect(turingSimulator.pointer).toEqual(2);
    expect(turingSimulator.status).toEqual(0);
    expect(turingSimulator.turingMachine.tape).toEqual(['X', 'X', 'Y', 'Y']);
    expect(turingSimulator.isAccepted()).toEqual(false);

    turingSimulator.step();
    expect(turingSimulator.currentState).toEqual(3);
    expect(turingSimulator.pointer).toEqual(3);
    expect(turingSimulator.status).toEqual(1);
    expect(turingSimulator.turingMachine.tape).toEqual(['X', 'X', 'Y', 'Y']);
    expect(turingSimulator.isAccepted()).toEqual(true);


    turingSimulator.setInput("0X");

    turingSimulator.step();
    expect(turingSimulator.currentState).toEqual(1);
    expect(turingSimulator.pointer).toEqual(1);
    expect(turingSimulator.status).toEqual(0);
    expect(turingSimulator.turingMachine.tape).toEqual(['X', 'X']);
    expect(turingSimulator.isAccepted()).toEqual(false);

    turingSimulator.step();
    expect(turingSimulator.currentState).toEqual(1);
    expect(turingSimulator.status).toEqual(-1);
    expect(turingSimulator.turingMachine.tape).toEqual(['X', 'X']);
    expect(turingSimulator.isAccepted()).toEqual(false);


    turingSimulator.setInput("01");

    turingSimulator.step();
    expect(turingSimulator.currentState).toEqual(1);
    expect(turingSimulator.pointer).toEqual(1);
    expect(turingSimulator.status).toEqual(0);
    expect(turingSimulator.turingMachine.tape).toEqual(['X', '1']);
    expect(turingSimulator.isAccepted()).toEqual(false);

    turingSimulator.step();
    expect(turingSimulator.currentState).toEqual(2);
    expect(turingSimulator.pointer).toEqual(0);
    expect(turingSimulator.status).toEqual(0);
    expect(turingSimulator.turingMachine.tape).toEqual(['X', 'Y']);
    expect(turingSimulator.isAccepted()).toEqual(false);

    turingSimulator.step();
    expect(turingSimulator.currentState).toEqual(0);
    expect(turingSimulator.pointer).toEqual(1);
    expect(turingSimulator.status).toEqual(0);
    expect(turingSimulator.turingMachine.tape).toEqual(['X', 'Y']);
    expect(turingSimulator.isAccepted()).toEqual(false);

    turingSimulator.step();
    expect(turingSimulator.currentState).toEqual(3);
    expect(turingSimulator.pointer).toEqual(2);
    expect(turingSimulator.status).toEqual(1);
    expect(turingSimulator.turingMachine.tape).toEqual(['X', 'Y', '_']);
    expect(turingSimulator.isAccepted()).toEqual(true);

})


test('test tm-simulator - check accepts method (1)', () => {

    const transitions = [
        new TuringTransition(0, '0', 0, '0', 'R'),
        new TuringTransition(0, '1', 0, '1', 'R'),
        new TuringTransition(0, '_', 1, '_', 'L'),
        new TuringTransition(1, '0', 1, '0', 'L'),
        new TuringTransition(1, '1', 1, '1', 'L'),
        new TuringTransition(1, '_', 0, '_', 'R')
    ];
    const numberOfStates = 3;
    const turingMachine = new TuringMachine(transitions, numberOfStates);
    const turingSimulator = new TMSimulator(turingMachine);

    expect(turingSimulator.accepts("00")).toEqual(false);
    expect(turingSimulator.currentStepNum).toEqual(TURING_MACHINE_MAX_STEP_NUM + 1);
    expect(turingSimulator.turingMachine.tape).toEqual(['0', '0', '_']);

    expect(turingSimulator.accepts("01")).toEqual(false);
    expect(turingSimulator.currentStepNum).toEqual(TURING_MACHINE_MAX_STEP_NUM + 1);
    expect(turingSimulator.turingMachine.tape).toEqual(['0', '1', '_']);

})

test('test tm-simulator - check accepts method (2)', () => {

    const transitions = [
        new TuringTransition(0, '0', 0, '0', 'R'),
        new TuringTransition(0, '1', 1, '1', 'R'),
        new TuringTransition(1, '0', 2, '0', 'R'),
        new TuringTransition(1, '1', 0, '1', 'R'),
        new TuringTransition(2, '0', 1, '0', 'R'),
        new TuringTransition(2, '1', 2, '1', 'R'),
        new TuringTransition(0, '_', 3, '_', 'R')

    ];
    const numberOfStates = 4;
    const turingMachine = new TuringMachine(transitions, numberOfStates);
    const turingSimulator = new TMSimulator(turingMachine);

    expect(turingSimulator.accepts("101")).toEqual(false);
    expect(turingSimulator.turingMachine.tape).toEqual(['1', '0', '1', '_']);

    expect(turingSimulator.accepts("01")).toEqual(false);
    expect(turingSimulator.turingMachine.tape).toEqual(['0', '1', '_']);

    expect(turingSimulator.accepts("1")).toEqual(false);
    expect(turingSimulator.accepts("10")).toEqual(false);
    expect(turingSimulator.accepts("1010")).toEqual(false);
    expect(turingSimulator.accepts("1011")).toEqual(false);
    expect(turingSimulator.accepts("1000")).toEqual(false);
    expect(turingSimulator.accepts("0010")).toEqual(false);
    expect(turingSimulator.accepts("10100")).toEqual(false);
    expect(turingSimulator.accepts("10110")).toEqual(false);
    expect(turingSimulator.accepts("10111")).toEqual(false);
    expect(turingSimulator.accepts("10001")).toEqual(false);

    expect(turingSimulator.accepts("11")).toEqual(true);
    expect(turingSimulator.accepts("110")).toEqual(true);
    expect(turingSimulator.accepts("1001")).toEqual(true);
    expect(turingSimulator.accepts("1100")).toEqual(true);
    expect(turingSimulator.accepts("1111")).toEqual(true);
    expect(turingSimulator.accepts("10010")).toEqual(true);
    expect(turingSimulator.accepts("10101")).toEqual(true);
    expect(turingSimulator.accepts("11000")).toEqual(true);
    expect(turingSimulator.accepts("11011")).toEqual(true);
    expect(turingSimulator.accepts("000011110")).toEqual(true);
})
