import { Transition } from "../../structures/fsm-transition.mjs";
import { FiniteStateMachine } from "../../structures/fsm.mjs";
import { convertDFAToRegex } from "../dfa-to-regex.mjs";

test('test dfa to regex conversion - 1', () => {
    
    const states = [0, 1, 2];
    const transitions = [
        new Transition(0, 'a', 1),
        new Transition(1, 'b', 1),
        new Transition(2, 'a', 1),
    ];
    const acceptStates = [1];
    
    const result = convertDFAToRegex(new FiniteStateMachine(states, transitions, acceptStates));
    expect(result).toEqual("ab*");
})

test('test dfa to regex conversion - 2', () => {

    const states = [0, 1, 2];
    const transitions = [
        new Transition(0, 'a', 1),
        new Transition(1, 'b', 1),
        new Transition(1, 'a', 2),
    ];
    const acceptStates = [2];
    
    const result = convertDFAToRegex(new FiniteStateMachine(states, transitions, acceptStates));
    expect(result).toEqual("ab*a");
})

test('test dfa to regex conversion - 3', () => {

    const states = [0, 1, 2, 3];
    const transitions = [
        new Transition(0, 'a', 1),
        new Transition(1, 'b', 1),
        new Transition(1, 'a', 2),
        new Transition(0, 'd', 3),
        new Transition(3, 'c', 2)
    ];
    const acceptStates = [2];
    
    const result = convertDFAToRegex(new FiniteStateMachine(states, transitions, acceptStates));
    expect(result).toEqual("(ab*a)|dc");
})

test('test dfa to regex conversion - 4', () => {

    const states = [0, 1, 2, 3, 4];
    const transitions = [
        new Transition(0, 'a', 1),
        new Transition(1, 'b', 1),
        new Transition(1, 'a', 2),
        new Transition(0, 'd', 3),
        new Transition(3, 'c', 2),
        new Transition(3, 'v', 4)
    ];
    const acceptStates = [1, 4];
    
    const result = convertDFAToRegex(new FiniteStateMachine(states, transitions, acceptStates));
    expect(result).toEqual("ab*|(dv)");
})

test('test dfa to regex conversion - 5', () => {

    const states = [0, 1, 2, 3, 4, 5];
    const transitions = [
        new Transition(0, 'a', 1),
        new Transition(2, 'b', 1),
        new Transition(3, 'a', 1),
        new Transition(4, 'd', 1),
        new Transition(5, 'c', 1),
        new Transition(3, 'v', 4),
        new Transition(4, 'v', 4)
    ];
    const acceptStates = [1];
    
    const result = convertDFAToRegex(new FiniteStateMachine(states, transitions, acceptStates));
    expect(result).toEqual("a");
})

test('test dfa to regex conversion - 6', () => {

    const states = [0, 1, 2, 3, 4, 5];
    const transitions = [
        new Transition(0, 'a', 1),
        new Transition(2, 'b', 1),
        new Transition(0, 't', 2),
        new Transition(3, 'a', 1),
        new Transition(0, 'k', 3),
        new Transition(4, 'd', 1),
        new Transition(0, 'p', 4),
        new Transition(5, 'c', 1),
        new Transition(0, 'l', 5),
        new Transition(3, 'v', 4),
        new Transition(4, 'v', 4)
    ];
    const acceptStates = [1];
    
    const result = convertDFAToRegex(new FiniteStateMachine(states, transitions, acceptStates));
    expect(result).toEqual("a|tb|ka|(p|kv)v*d|lc");
})

test('test dfa to regex conversion - 7', () => {

    const states = [0, 1, 2, 3, 4, 5];
    const transitions = [
        new Transition(0, 'a', 1),
        new Transition(2, 'b', 1),
        new Transition(0, 't', 2),
        new Transition(3, 'a', 1),
        new Transition(0, 'k', 3),
        new Transition(4, 'd', 1),
        new Transition(0, 'p', 4),
        new Transition(5, 'c', 1),
        new Transition(0, 'l', 5),
        new Transition(3, 'v', 4),
        new Transition(4, 'v', 4)
    ];
    const acceptStates = [2, 4];
    
    const result = convertDFAToRegex(new FiniteStateMachine(states, transitions, acceptStates));
    expect(result).toEqual("t|(p|kv)v*");
})

test('test dfa to regex conversion - 8', () => {
    const states = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    const transitions = [
        new Transition(0, '8', 1),
        new Transition(0, '7', 5),
        new Transition(0, '5', 8),
        new Transition(0, 'i', 10),
        new Transition(0, 'o', 11),
        new Transition(1, 'z', 2),
        new Transition(2, '6', 3),
        new Transition(3, 'k', 4),
        new Transition(4, 'o', 11),
        new Transition(5, 'o', 6),
        new Transition(6, '4', 7),
        new Transition(7, '7', 5),
        new Transition(7, 'o', 11),
        new Transition(8, 'h', 9),
        new Transition(9, 'o', 11),
        new Transition(10, 'i', 10),
        new Transition(10, 'o', 11),
        new Transition(11, 'l', 12),
        new Transition(11, '7', 15),
        new Transition(11, 'a', 18),
        new Transition(12, 'w', 13),
        new Transition(13, 'g', 14),
        new Transition(14, 'l', 12),
        new Transition(14, '7', 15),
        new Transition(14, 'a', 18),
        new Transition(15, 'i', 16),
        new Transition(16, 'f', 17),
        new Transition(17, 'l', 12),
        new Transition(17, '7', 15),
        new Transition(17, 'a', 18),
        new Transition(18, 'a', 19),
        new Transition(19, '8', 1),
        new Transition(19, '7', 5),
        new Transition(19, '5', 8),
        new Transition(19, 'i', 10),
        new Transition(19, 'o', 11)
    ];
    const acceptStates = [0, 19];
    
    const result = convertDFAToRegex(new FiniteStateMachine(states, transitions, acceptStates));
    expect(result).toEqual("#|(((o|(((8z)6)k)o|((7o)4)((7o)4)*o|(5h)o|ii*o)a|((((o|(((8z)6)k)o|((7o)4)((7o)4)*o|(5h)o|ii*o)l)w)g)((lw)g)*a|((((o|(((8z)6)k)o|((7o)4)((7o)4)*o|(5h)o|ii*o)7|((((o|(((8z)6)k)o|((7o)4)((7o)4)*o|(5h)o|ii*o)l)w)g)((lw)g)*7)i)f)(((7|((lw)g)((lw)g)*7)i)f)*(a|((lw)g)((lw)g)*a))a)(((o|(((8z)6)k)o|((7o)4)((7o)4)*o|(5h)o|ii*o)a|((((o|(((8z)6)k)o|((7o)4)((7o)4)*o|(5h)o|ii*o)l)w)g)((lw)g)*a|((((o|(((8z)6)k)o|((7o)4)((7o)4)*o|(5h)o|ii*o)7|((((o|(((8z)6)k)o|((7o)4)((7o)4)*o|(5h)o|ii*o)l)w)g)((lw)g)*7)i)f)(((7|((lw)g)((lw)g)*7)i)f)*(a|((lw)g)((lw)g)*a))a)*");
})