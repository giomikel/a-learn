class CNF {
    constructor(productionRules, startSymbol){
        this.productionRules = new Map(productionRules);
        this.startSymbol = startSymbol;
        this.productionRules.set(this.startSymbol, this.productionRules.get(this.startSymbol).map((char) =>  char === ''? 'ε': char));
    }

    printRule(key, value) {
        return `${key} -> ${value.join(' | ')}`;
    }

    toString() {
        return `StartSymbol: ${this.startSymbol}
Productions: 
${Array.from(this.productionRules).map(([key, value]) => this.printRule(key, value)).join('\n')}`;
    }
}

export default CNF
