import regexToNFA from "../regex-to-nfa.mjs"
import { Transition } from "../../structures/fsm-transition.mjs";
 
test('check quantity, number of states and successful state indexes after converting regular expression to nfa', () => {
    let nfa1 = regexToNFA("(1or0|(y)*)*");
    let successStates1 = [0, 4, 5];
    expect(nfa1.transitions.length).toEqual(9);
    expect(nfa1.states.length).toEqual(6);
    expect(Array.from(nfa1.acceptStates)).toEqual(successStates1);

    let nfa2 = regexToNFA("x|zeme|(7lw)*");
    let successStates2 = [0, 1, 5, 8];
    expect(nfa2.transitions.length).toEqual(9);
    expect(nfa2.states.length).toEqual(9);
    expect(Array.from(nfa2.acceptStates)).toEqual(successStates2);
    
    let nfa3 = regexToNFA("(zn5)*|w6ax|1u2j");
    let successStates3 = [0, 3, 7, 11];
    expect(nfa3.transitions.length).toEqual(12);
    expect(nfa3.states.length).toEqual(12);
    expect(Array.from(nfa3.acceptStates)).toEqual(successStates3);

    let nfa4 = regexToNFA("(wmmt|o)*");
    let successStates4 = [0, 4, 5];
    expect(nfa4.transitions.length).toEqual(9);
    expect(nfa4.states.length).toEqual(6);
    expect(Array.from(nfa4.acceptStates)).toEqual(successStates4);

    let nfa5 = regexToNFA("u|wq|qm0");
    let successStates5 = [1, 3, 6];
    expect(nfa5.transitions.length).toEqual(6);
    expect(nfa5.states.length).toEqual(7);
    expect(Array.from(nfa5.acceptStates)).toEqual(successStates5);

    let nfa6 = regexToNFA("((((d)*|aw2o|d|cv6o)*)(yexs|p|(j)*|4)(hi|vu7|lqcg|(92as)*))*");
    let successStates6 = [0, 1, 5, 6, 10, 14, 15, 16, 17, 19, 22, 26, 30];
    expect(nfa6.transitions.length).toEqual(174);
    expect(nfa6.states.length).toEqual(31);
    expect(Array.from(nfa6.acceptStates)).toEqual(successStates6);

    let nfa7 = regexToNFA("((8z6k|(7o4)*|5h|(i)*)(o)((lwg|7if)*)(aa))*");
    let successStates7 = [0, 19];
    expect(nfa7.transitions.length).toEqual(36);
    expect(nfa7.states.length).toEqual(20);
    expect(Array.from(nfa7.acceptStates)).toEqual(successStates7);
})


test('check edges after converting regular expression to nfa', () => {
    let nfa1 = regexToNFA("(1or0|(y)*)*");

    expect(nfa1.transitions[0]).toEqual(new Transition(0, '1', 1));
    expect(nfa1.transitions[1]).toEqual(new Transition(0, 'y', 5));
    expect(nfa1.transitions[2]).toEqual(new Transition(1, 'o', 2));
    expect(nfa1.transitions[3]).toEqual(new Transition(2, 'r', 3));
    expect(nfa1.transitions[4]).toEqual(new Transition(3, '0', 4));
    expect(nfa1.transitions[5]).toEqual(new Transition(4, '1', 1));
    expect(nfa1.transitions[6]).toEqual(new Transition(4, 'y', 5));
    expect(nfa1.transitions[7]).toEqual(new Transition(5, 'y', 5));
    expect(nfa1.transitions[8]).toEqual(new Transition(5, '1', 1));

    let nfa2 = regexToNFA("u|wq|qm0");

    expect(nfa2.transitions[0]).toEqual(new Transition(0, 'u', 1));
    expect(nfa2.transitions[1]).toEqual(new Transition(0, 'w', 2));
    expect(nfa2.transitions[2]).toEqual(new Transition(0, 'q', 4));
    expect(nfa2.transitions[3]).toEqual(new Transition(2, 'q', 3));
    expect(nfa2.transitions[4]).toEqual(new Transition(4, 'm', 5));
    expect(nfa2.transitions[5]).toEqual(new Transition(5, '0', 6));

    let nfa3 = regexToNFA("x|zeme|(7lw)*");

    expect(nfa3.transitions[0]).toEqual(new Transition(0, 'x', 1));
    expect(nfa3.transitions[1]).toEqual(new Transition(0, 'z', 2));
    expect(nfa3.transitions[2]).toEqual(new Transition(0, '7', 6));
    expect(nfa3.transitions[3]).toEqual(new Transition(2, 'e', 3));
    expect(nfa3.transitions[4]).toEqual(new Transition(3, 'm', 4));
    expect(nfa3.transitions[5]).toEqual(new Transition(4, 'e', 5));
    expect(nfa3.transitions[6]).toEqual(new Transition(6, 'l', 7));
    expect(nfa3.transitions[7]).toEqual(new Transition(7, 'w', 8));
    expect(nfa3.transitions[8]).toEqual(new Transition(8, '7', 6));

    let nfa4 = regexToNFA("((8z6k|(7o4)*|5h|(i)*)(o)((lwg|7if)*)(aa))*");

    expect(nfa4.transitions[0]).toEqual(new Transition(0, '8', 1));
    expect(nfa4.transitions[1]).toEqual(new Transition(0, '7', 5));
    expect(nfa4.transitions[2]).toEqual(new Transition(0, '5', 8));
    expect(nfa4.transitions[3]).toEqual(new Transition(0, 'i', 10));
    expect(nfa4.transitions[4]).toEqual(new Transition(0, 'o', 11));
    expect(nfa4.transitions[5]).toEqual(new Transition(1, 'z', 2));
    expect(nfa4.transitions[6]).toEqual(new Transition(2, '6', 3));
    expect(nfa4.transitions[7]).toEqual(new Transition(3, 'k', 4));
    expect(nfa4.transitions[8]).toEqual(new Transition(4, 'o', 11));
    expect(nfa4.transitions[9]).toEqual(new Transition(5, 'o', 6));
    expect(nfa4.transitions[10]).toEqual(new Transition(6, '4', 7));
    expect(nfa4.transitions[11]).toEqual(new Transition(7, '7', 5));
    expect(nfa4.transitions[12]).toEqual(new Transition(7, 'o', 11));
    expect(nfa4.transitions[13]).toEqual(new Transition(8, 'h', 9));
    expect(nfa4.transitions[14]).toEqual(new Transition(9, 'o', 11));
    expect(nfa4.transitions[15]).toEqual(new Transition(10, 'i', 10));
    expect(nfa4.transitions[16]).toEqual(new Transition(10, 'o', 11));
    expect(nfa4.transitions[17]).toEqual(new Transition(11, 'l', 12));
    expect(nfa4.transitions[18]).toEqual(new Transition(11, '7', 15));
    expect(nfa4.transitions[19]).toEqual(new Transition(11, 'a', 18));
    expect(nfa4.transitions[20]).toEqual(new Transition(12, 'w', 13));
    expect(nfa4.transitions[21]).toEqual(new Transition(13, 'g', 14));
    expect(nfa4.transitions[22]).toEqual(new Transition(14, 'l', 12));
    expect(nfa4.transitions[23]).toEqual(new Transition(14, '7', 15));
    expect(nfa4.transitions[24]).toEqual(new Transition(14, 'a', 18));
    expect(nfa4.transitions[25]).toEqual(new Transition(15, 'i', 16));
    expect(nfa4.transitions[26]).toEqual(new Transition(16, 'f', 17));
    expect(nfa4.transitions[27]).toEqual(new Transition(17, 'l', 12));
    expect(nfa4.transitions[28]).toEqual(new Transition(17, '7', 15));
    expect(nfa4.transitions[29]).toEqual(new Transition(17, 'a', 18));
    expect(nfa4.transitions[30]).toEqual(new Transition(18, 'a', 19));
    expect(nfa4.transitions[31]).toEqual(new Transition(19, '8', 1));
    expect(nfa4.transitions[32]).toEqual(new Transition(19, '7', 5));
    expect(nfa4.transitions[33]).toEqual(new Transition(19, '5', 8));
    expect(nfa4.transitions[34]).toEqual(new Transition(19, 'i', 10));
    expect(nfa4.transitions[35]).toEqual(new Transition(19, 'o', 11));
})
