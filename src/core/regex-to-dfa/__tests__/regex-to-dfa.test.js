import { convertRegexToDFA } from "../regex-to-dfa.mjs"
import validateExpression from "../../utils/regex-validator.mjs";
import { Transition } from "../../structures/fsm-transition.mjs";
import { EPSILON_SYMBOL } from "../../constants.mjs";

test('test regex to dfa conversion 1', () => {
    const regex = "(0|1)*";
    const dfa = convertRegexToDFA(regex);

    const transitions = [
        new Transition(0, '0', 1),
        new Transition(0, '1', 2),
        new Transition(1, '0', 1),
        new Transition(1, '1', 2),
        new Transition(2, '0', 1),
        new Transition(2, '1', 2)
    ];

    expect(validateExpression(regex));
    expect(dfa.isDFA).toEqual(true);
    expect(dfa.transitions).toEqual(transitions);
    expect(dfa.acceptStates).toEqual([0, 1, 2]);
    expect(dfa.startState).toEqual(0);
})

test('test regex to dfa conversion 2', () => {
    const regex = "0*|1";
    const dfa = convertRegexToDFA(regex);

    const transitions = [
        new Transition(0, '0', 1),
        new Transition(0, '1', 2),
        new Transition(1, '0', 1),
        new Transition(1, '1', 3),
        new Transition(2, '0', 3),
        new Transition(2, '1', 3),
        new Transition(3, '0', 3),
        new Transition(3, '1', 3)
    ];

    expect(validateExpression(regex));
    expect(dfa.isDFA).toEqual(true);
    expect(dfa.transitions).toEqual(transitions);
    expect(dfa.acceptStates).toEqual([0, 1, 2]);
    expect(dfa.startState).toEqual(0);
})

test('test regex to dfa conversion 3', () => {
    const regex = "01|1";
    const dfa = convertRegexToDFA(regex);

    const transitions = [
        new Transition(0, '0', 1),
        new Transition(0, '1', 2),
        new Transition(1, '0', 3),
        new Transition(1, '1', 4),
        new Transition(2, '0', 3),
        new Transition(2, '1', 3),
        new Transition(3, '0', 3),
        new Transition(3, '1', 3),
        new Transition(4, '0', 3),
        new Transition(4, '1', 3)
    ];

    expect(validateExpression(regex));
    expect(dfa.isDFA).toEqual(true);
    expect(dfa.transitions).toEqual(transitions);
    expect(dfa.acceptStates).toEqual([2, 4]);
    expect(dfa.startState).toEqual(0);
})

test('test regex to dfa conversion 4 (epsilon)', () => {
    const regex = `${EPSILON_SYMBOL}|1`;
    const dfa = convertRegexToDFA(regex);

    const transitions = [
        new Transition(0, '1', 1),
        new Transition(1, '1', 2),
        new Transition(2, '1', 2)
    ];

    expect(validateExpression(regex));
    expect(dfa.isDFA).toEqual(true);
    expect(dfa.transitions).toEqual(transitions);
    expect(dfa.acceptStates).toEqual([0, 1]);
    expect(dfa.startState).toEqual(0);
})
