import CNFConverter from "../cfg_to_cnf.mjs";
import CFG from "../../structures/cfg.mjs";
 
test('check cfg with non epsilon productions', () => {
    const cfg1 = new CFG();

    cfg1.addNonTerminal('S');
    cfg1.addNonTerminal('A');
    cfg1.addNonTerminal('B');
    cfg1.addNonTerminal('K');
    cfg1.addTerminal('c');
    cfg1.addTerminal('l');
    cfg1.addProductionRule('S', 'AB');
    cfg1.addProductionRule('A', 'B');
    cfg1.addProductionRule('A', 'c');
    cfg1.addProductionRule('A', 'K');
    cfg1.addProductionRule('K', 'l');
    cfg1.addProductionRule('B', 'l');
    cfg1.setStartSymbol('S');

    const cnfConverter1 = new CNFConverter(cfg1);
    let cnf1 = cnfConverter1.convertToCNF();
    expect(cnf1.productionRules.get("C")).toEqual([ 'AB' ]);
    expect(cnf1.productionRules.get("S")).toEqual([ 'AB' ]);
    expect(cnf1.productionRules.get("A")).toEqual([ 'D', 'B' ]);
    expect(cnf1.productionRules.get("K")).toEqual([ 'l' ]);
    expect(cnf1.productionRules.get("B")).toEqual([ 'l' ]);
    expect(cnf1.productionRules.get("D")).toEqual([ 'c' ]);


    const cfg2 = new CFG();

    cfg2.addNonTerminal('S');
    cfg2.addNonTerminal('Y');
    cfg2.addNonTerminal('X');
    cfg2.addTerminal('t');
    cfg2.addTerminal('z');

    cfg2.addProductionRule('S', 'Yz');
    cfg2.addProductionRule('X', 'X');
    cfg2.addProductionRule('X', 't');
    cfg2.addProductionRule('Y', 'Y');
    cfg2.addProductionRule('Y', 'X');
    cfg2.setStartSymbol('S');

    const cnfConverter2 = new CNFConverter(cfg2);
    let cnf2 = cnfConverter2.convertToCNF();
    expect(cnf2.productionRules.get("S")).toEqual([ 'YB' ]);
    expect(cnf2.productionRules.get("X")).toEqual([ 't' ]);
    expect(cnf2.productionRules.get("Y")).toEqual([ 't' ]);
    expect(cnf2.productionRules.get("A")).toEqual([ 'YB' ]);
    expect(cnf2.productionRules.get("B")).toEqual([ 'z' ]);



    const cfg3 = new CFG();

    cfg3.addNonTerminal('S');
    cfg3.addNonTerminal('T');
    cfg3.addNonTerminal('F');
    cfg3.addTerminal('t');
    cfg3.addTerminal('x');
    cfg3.addTerminal('l');
    cfg3.addTerminal('+');

    cfg3.addProductionRule('S', 'S+');
    cfg3.addProductionRule('S', 'T');
    cfg3.addProductionRule('T', 'xF');
    cfg3.addProductionRule('T', 'l');
    cfg3.addProductionRule('F', 't');
    cfg3.setStartSymbol('S');

    const cnfConverter3 = new CNFConverter(cfg3);
    let cnf3 = cnfConverter3.convertToCNF();
    expect(cnf3.productionRules.get("S")).toEqual([ 'SB', 'CF', 'D' ]);
    expect(cnf3.productionRules.get("T")).toEqual([ 'CF', 'D' ]);
    expect(cnf3.productionRules.get("F")).toEqual([ 't' ]);
    expect(cnf3.productionRules.get("A")).toEqual([ 'SB', 'CF', 'D' ]);
    expect(cnf3.productionRules.get("B")).toEqual([ '+' ]);
    expect(cnf3.productionRules.get("C")).toEqual([ 'x' ]);
    expect(cnf3.productionRules.get("D")).toEqual([ 'l' ]);
})

test('check cfg with epsilon productions', () => {
    const cfg1 = new CFG();

    cfg1.addNonTerminal('S');
    cfg1.addNonTerminal('A');
    cfg1.addNonTerminal('B');
    cfg1.addProductionRule('S', 'AB');
    cfg1.addProductionRule('A', 'B');
    cfg1.addProductionRule('B', '');
    cfg1.setStartSymbol('S');

    const cnfConverter1 = new CNFConverter(cfg1);
    let cnf1 = cnfConverter1.convertToCNF();
    expect(cnf1.productionRules.get("S")).toEqual([ 'AB' ]);
    expect(cnf1.productionRules.get("A")).toEqual([ ]);
    expect(cnf1.productionRules.get("B")).toEqual([ ]);
    expect(cnf1.productionRules.get("C")).toEqual([ '', 'AB' ]);



    const cfg2 = new CFG();

    cfg2.addNonTerminal('S');
    cfg2.addNonTerminal('A');
    cfg2.addNonTerminal('B');
    cfg2.addTerminal('a');
    cfg2.addTerminal('b');
    cfg2.addProductionRule('S', 'aA');
    cfg2.addProductionRule('S', 'AB');
    cfg2.addProductionRule('A', 'aA');
    cfg2.addProductionRule('A', 'a');
    cfg2.addProductionRule('B', 'bB');
    cfg2.addProductionRule('B', '');
    cfg2.setStartSymbol('S');

    const cnfConverter2 = new CNFConverter(cfg2);
    let cnf2 = cnfConverter2.convertToCNF();
    expect(cnf2.productionRules.get("S")).toEqual([ 'DA', 'AB', 'D' ]);
    expect(cnf2.productionRules.get("C")).toEqual([ 'DA', 'AB', 'D' ]);
    expect(cnf2.productionRules.get("A")).toEqual([ 'DA', 'D' ]);
    expect(cnf2.productionRules.get("B")).toEqual([ 'EB', 'E' ]);
    expect(cnf2.productionRules.get("D")).toEqual([ 'a' ]);
    expect(cnf2.productionRules.get("E")).toEqual([ 'b' ]);



    const cfg3 = new CFG();

    cfg3.addNonTerminal('S');
    cfg3.addNonTerminal('A');
    cfg3.addNonTerminal('B');
    cfg3.addNonTerminal('C');
    cfg3.addTerminal('a');
    cfg3.addTerminal('b');
    cfg3.addProductionRule('S', 'AB');
    cfg3.addProductionRule('A', 'aA');
    cfg3.addProductionRule('A', '');
    cfg3.addProductionRule('B', 'BC');
    cfg3.addProductionRule('B', '');
    cfg3.addProductionRule('C', 'b');
    cfg3.addProductionRule('C', '');

    cfg3.setStartSymbol('S');

    const cnfConverter3 = new CNFConverter(cfg3);
    let cnf3 = cnfConverter3.convertToCNF();

    expect(cnf3.productionRules.get("S")).toEqual([ 'AB', 'EA', 'E', 'BC', 'C' ]);
    expect(cnf3.productionRules.get("A")).toEqual([ 'EA', 'E' ]);
    expect(cnf3.productionRules.get("B")).toEqual([ 'BC', 'C' ]);
    expect(cnf3.productionRules.get("C")).toEqual([ 'b' ]);
    expect(cnf3.productionRules.get("D")).toEqual([ '', 'AB', 'EA', 'E', 'BC', 'C' ]);
    expect(cnf3.productionRules.get("E")).toEqual([ 'a' ]);

})

test('check cfg with long productions', () => {

    const cfg1 = new CFG();

    cfg1.terminals = new Set(['+', 'x', '(', ')', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
    cfg1.nonTerminals = new Set(['E', 'T', 'F']);
    cfg1.setStartSymbol('E');

    cfg1.addProductionRule('E', 'E+T');
    cfg1.addProductionRule('E', 'T');
    cfg1.addProductionRule('T', 'TxF');
    cfg1.addProductionRule('T', 'F');
    cfg1.addProductionRule('F', '(E)');
    cfg1.addProductionRule('F', '0');
    cfg1.addProductionRule('F', '1');
    cfg1.addProductionRule('F', '2');
    cfg1.addProductionRule('F', '3');
    cfg1.addProductionRule('F', '4');
    cfg1.addProductionRule('F', '5');
    cfg1.addProductionRule('F', '6');
    cfg1.addProductionRule('F', '7');
    cfg1.addProductionRule('F', '8');
    cfg1.addProductionRule('F', '9');

    const cnfConverter1 = new CNFConverter(cfg1);
    let cnf1 = cnfConverter1.convertToCNF();

    expect(cnf1.productionRules.get("E")).toEqual(['G',  'H', 'I', 'J', 'K', 'L', 'M', 'N','O', 'P', 'EB', 'TC','QD']);
    expect(cnf1.productionRules.get("A")).toEqual(['G',  'H', 'I', 'J', 'K', 'L', 'M', 'N','O', 'P', 'EB', 'TC','QD']);
    expect(cnf1.productionRules.get("T")).toEqual(['G',  'H', 'I', 'J', 'K', 'L', 'M', 'N','O', 'P', 'TC','QD']);
    expect(cnf1.productionRules.get("F")).toEqual(['G',  'H', 'I', 'J', 'K', 'L', 'M', 'N','O', 'P', 'QD']);
    expect(cnf1.productionRules.get("B")).toEqual(['RT']);
    expect(cnf1.productionRules.get("C")).toEqual(['SF']);
    expect(cnf1.productionRules.get("D")).toEqual(['EU']);
    expect(cnf1.productionRules.get("G")).toEqual(['0']);
    expect(cnf1.productionRules.get("H")).toEqual(['1']);
    expect(cnf1.productionRules.get("I")).toEqual(['2']);
    expect(cnf1.productionRules.get("J")).toEqual(['3']);
    expect(cnf1.productionRules.get("K")).toEqual(['4']);
    expect(cnf1.productionRules.get("L")).toEqual(['5']);
    expect(cnf1.productionRules.get("M")).toEqual(['6']);
    expect(cnf1.productionRules.get("N")).toEqual(['7']);
    expect(cnf1.productionRules.get("O")).toEqual(['8']);
    expect(cnf1.productionRules.get("P")).toEqual(['9']);
    expect(cnf1.productionRules.get("Q")).toEqual(['(']);
    expect(cnf1.productionRules.get("R")).toEqual(['+']);
    expect(cnf1.productionRules.get("S")).toEqual(['x']);
    expect(cnf1.productionRules.get("U")).toEqual([')']);
    

    const cfg2 = new CFG();

    cfg2.addNonTerminal('S');
    cfg2.addNonTerminal('A');
    cfg2.addNonTerminal('B');
    cfg2.addNonTerminal('C');
    cfg2.addTerminal('l');
    cfg2.addTerminal('a');
    cfg2.addTerminal('b');
    cfg2.addTerminal('c');
    cfg2.addProductionRule('S', 'AB');
    cfg2.addProductionRule('S', 'A');
    cfg2.addProductionRule('A', 'B');
    cfg2.addProductionRule('B', 'aBbc');
    cfg2.addProductionRule('B', 'l');
    cfg2.addProductionRule('C', 'Bbc');
    cfg2.setStartSymbol('S');

    const cnfConverter2 = new CNFConverter(cfg2);
    let cnf2 = cnfConverter2.convertToCNF();
    expect(cnf2.productionRules.get("S")).toEqual([ 'AB', 'G', 'HE' ]);
    expect(cnf2.productionRules.get("A")).toEqual([ 'G', 'HE' ]);
    expect(cnf2.productionRules.get("B")).toEqual([ 'G', 'HE' ]);
    expect(cnf2.productionRules.get("C")).toEqual([ 'BF' ]);
    expect(cnf2.productionRules.get("D")).toEqual([ 'AB', 'G', 'HE' ]);
    expect(cnf2.productionRules.get("E")).toEqual([ 'BF' ]);
    expect(cnf2.productionRules.get("F")).toEqual([ 'IJ' ]);
    expect(cnf2.productionRules.get("G")).toEqual([ 'l' ]);
    expect(cnf2.productionRules.get("H")).toEqual([ 'a' ]);
    expect(cnf2.productionRules.get("I")).toEqual([ 'b' ]);
    expect(cnf2.productionRules.get("J")).toEqual([ 'c' ]);
})

