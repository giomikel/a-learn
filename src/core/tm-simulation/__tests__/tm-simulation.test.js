import TMSimulator from "../tm-simulation.mjs"
import TuringTransition from "../../structures/turing-transition.mjs";
import TuringMachine from "../../structures/turing-machine.mjs";

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