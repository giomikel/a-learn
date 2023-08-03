import regexToNFA from "../core/regex-to-nfa/regex-to-nfa.mjs"
import Edge from "../core/regex-to-nfa/edge.mjs";
 
test('check quantity, number of states and successful state indexes after converting regular expression to nfa', () => {
    let result1 = regexToNFA("(1or0|(y)*)*");
    let successStates1 = [0, 4, 5];
    expect(result1.quantity).toEqual(9);
    expect(result1.automata.n).toEqual(6);
    expect(Array.from(result1.s).sort((a, b) => a - b)).toEqual(successStates1);

    let result2 = regexToNFA("x|zeme|(7lw)*");
    let successStates2 = [0, 1, 5, 8];
    expect(result2.quantity).toEqual(9);
    expect(result2.automata.n).toEqual(9);
    expect(Array.from(result2.s).sort((a, b) => a - b)).toEqual(successStates2);
    
    let result3 = regexToNFA("(zn5)*|w6ax|1u2j");
    let successStates3 = [0, 3, 7, 11];
    expect(result3.quantity).toEqual(12);
    expect(result3.automata.n).toEqual(12);
    expect(Array.from(result3.s).sort((a, b) => a - b)).toEqual(successStates3);

    let result4 = regexToNFA("(wmmt|o)*");
    let successStates4 = [0, 4, 5];
    expect(result4.quantity).toEqual(9);
    expect(result4.automata.n).toEqual(6);
    expect(Array.from(result4.s).sort((a, b) => a - b)).toEqual(successStates4);

    let result5 = regexToNFA("u|wq|qm0");
    let successStates5 = [1, 3, 6];
    expect(result5.quantity).toEqual(6);
    expect(result5.automata.n).toEqual(7);
    expect(Array.from(result5.s).sort((a, b) => a - b)).toEqual(successStates5);

    let result6 = regexToNFA("((((d)*|aw2o|d|cv6o)*)(yexs|p|(j)*|4)(hi|vu7|lqcg|(92as)*))*");
    let successStates6 = [0, 1, 5, 6, 10, 14, 15, 16, 17, 19, 22, 26, 30];
    expect(result6.quantity).toEqual(174);
    expect(result6.automata.n).toEqual(31);
    expect(Array.from(result6.s).sort((a, b) => a - b)).toEqual(successStates6);

    let result7 = regexToNFA("((8z6k|(7o4)*|5h|(i)*)(o)((lwg|7if)*)(aa))*");
    let successStates7 = [0, 19];
    expect(result7.quantity).toEqual(36);
    expect(result7.automata.n).toEqual(20);
    expect(Array.from(result7.s).sort((a, b) => a - b)).toEqual(successStates7);
})


test('check edges after converting regular expression to nfa', () => {
    let result1 = regexToNFA("(1or0|(y)*)*");

    expect(result1.automata.vec[0].length).toEqual(2);
    expect(result1.automata.vec[0][0]).toEqual(new Edge(1, '1'));
    expect(result1.automata.vec[0][1]).toEqual(new Edge(5, 'y'));

    expect(result1.automata.vec[1].length).toEqual(1);
    expect(result1.automata.vec[1][0]).toEqual(new Edge(2, 'o'));

    expect(result1.automata.vec[2].length).toEqual(1);
    expect(result1.automata.vec[2][0]).toEqual(new Edge(3, 'r'));

    expect(result1.automata.vec[3].length).toEqual(1);
    expect(result1.automata.vec[3][0]).toEqual(new Edge(4, '0'));

    expect(result1.automata.vec[4].length).toEqual(2);
    expect(result1.automata.vec[4][0]).toEqual(new Edge(1, '1'));
    expect(result1.automata.vec[4][1]).toEqual(new Edge(5, 'y'));

    expect(result1.automata.vec[5].length).toEqual(2);
    expect(result1.automata.vec[5][0]).toEqual(new Edge(5, 'y'));
    expect(result1.automata.vec[5][1]).toEqual(new Edge(1, '1'));
    
    

    let result2 = regexToNFA("u|wq|qm0");
    
    expect(result2.automata.vec[0].length).toEqual(3);
    expect(result2.automata.vec[0][0]).toEqual(new Edge(1, 'u'));
    expect(result2.automata.vec[0][1]).toEqual(new Edge(2, 'w'));
    expect(result2.automata.vec[0][2]).toEqual(new Edge(4, 'q'));

    expect(result2.automata.vec[1].length).toEqual(0);

    expect(result2.automata.vec[2].length).toEqual(1);
    expect(result2.automata.vec[2][0]).toEqual(new Edge(3, 'q'));

    expect(result2.automata.vec[3].length).toEqual(0);

    expect(result2.automata.vec[4].length).toEqual(1);
    expect(result2.automata.vec[4][0]).toEqual(new Edge(5, 'm'));

    expect(result2.automata.vec[5].length).toEqual(1);
    expect(result2.automata.vec[5][0]).toEqual(new Edge(6, '0'));

    expect(result2.automata.vec[6].length).toEqual(0);
})