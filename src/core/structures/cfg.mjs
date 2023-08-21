class CFG {
    constructor() {
      this.terminals = new Set();
      this.nonTerminals = new Set();
      this.productionRules = new Map();
      this.startSymbol = null;
    }
  
    addTerminal(terminal) {
      this.terminals.add(terminal);
    }
  
    addNonTerminal(nonTerminal) {
      this.nonTerminals.add(nonTerminal);
    }
  
    addProductionRule(nonTerminal, production) {
      if (!this.productionRules.has(nonTerminal)) {
        this.productionRules.set(nonTerminal, []);
      }
      this.productionRules.get(nonTerminal).push(production);
    }
  
    setStartSymbol(startSymbol) {
      this.startSymbol = startSymbol;
    }
  }

  export default CFG;
