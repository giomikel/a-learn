import { EPSILON_SYMBOL } from "../constants.mjs";

class CNF {
    constructor(productionRules, startSymbol){
        this.productionRules = new Map(productionRules);
        this.startSymbol = startSymbol;
    }

    printRule(key, value) {
        value = value.map((char) =>  char === ''? EPSILON_SYMBOL: char);
        return `${key} -> ${value.join(' | ')}`;
    }

    toString() {
        return `StartSymbol: ${this.startSymbol}
Productions: 
${Array.from(this.productionRules).map(([key, value]) => this.printRule(key, value)).join('\n')}`;
    }
}

export default CNF
