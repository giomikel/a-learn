class CNF {
    constructor(productionRules, startSymbol){
        this.productionRules = new Map(productionRules);
        this.startSymbol = startSymbol;
    }
}

export default CNF
