import CFG from "../structures/cfg.mjs";
import CNF from "../structures/cnf.mjs";

class CNFConverter {
  constructor(cfg) {
    this.cfg = cfg;
    this.currentSymbol = 65; 
    this.generatedNonTerminalSymbolIndex = 0;
    this.initialStartHasEpsilonProduction = false;
  }

  generateAllStateCombinations(state, specialSymbols, index = 0, currentString = '', result = []) {
    if (index === state.length) {
      if (currentString !== ''){
        result.push(currentString);
      }
      return;
    }
  
    const currentSymbol = state[index];
  
    if (specialSymbols.includes(currentSymbol)) {
      this.generateAllStateCombinations(state, specialSymbols, index+1, currentString + currentSymbol, result);
      this.generateAllStateCombinations(state, specialSymbols, index+1, currentString, result);
    } else {
      this.generateAllStateCombinations(state, specialSymbols, index+1, currentString + currentSymbol, result);
    }
    
    return result;
  }

  getUpdatedStateList(state, epsilonProductions) {
    let num = 0;
    let stateList = state.split('');
    stateList.map(Symbol => {if (epsilonProductions.includes(Symbol)) num++;});
    if (num > 4) {
      throw new Error("Number of nullable elements in single state is out of limit.");
    }
    if(num === 0) return [state];
    return this.generateAllStateCombinations(state, epsilonProductions);
  }

  eliminateEpsilonProductions() {
    let epsilonProductions = [];

    for (let rule of this.cfg.productionRules) {
      if (rule[1].includes('')) {
        epsilonProductions.push(rule[0]);
        if (rule[0] === this.cfg.startSymbol) {
          this.initialStartHasEpsilonProduction = true;
        }
      }
    }

    let updatedProductionRules = new Map();
    for (let rule of this.cfg.productionRules) {
      if (rule[1].includes('')) {
        rule[1] = rule[1].filter((element) => element !== '');
      }
      updatedProductionRules.set(rule[0], rule[1]);
    }

    for (let rule of updatedProductionRules){
      let updatedStates = new Set();
      for (let state of rule[1]){
          this.getUpdatedStateList(state, epsilonProductions).map((el) => updatedStates.add(el));
      }
      updatedProductionRules.set(rule[0], Array.from(updatedStates));
    }

    this.cfg.productionRules = updatedProductionRules;

    return epsilonProductions;
  }

  checkChildEpsilonProduction(parentState, epsilonProductions){
    if (!this.cfg.productionRules.has(parentState)) return false;

    for (let state of this.cfg.productionRules.get(parentState)){
      if (epsilonProductions.includes(state) || this.checkChildEpsilonProduction(state, epsilonProductions)){
        return true;
      }
    }
    return false;
  }

  addNewStartSymbol(epsilonProductions){
    this.cfg.addNonTerminal("S0");
    this.cfg.addProductionRule("S0", this.cfg.startSymbol);
    for (let state of this.cfg.productionRules.get(this.cfg.startSymbol)){
      if (epsilonProductions.includes(state) || (this.cfg.nonTerminals.has(state) && this.checkChildEpsilonProduction(state, epsilonProductions))){
         this.cfg.addProductionRule("S0", '');
         break;
      }
    }

    if (this.initialStartHasEpsilonProduction){
      this.cfg.addProductionRule("S0", '');
    }

    this.cfg.setStartSymbol("S0");
  }

  convertToCNF() {
    let epsilonProductions = this.eliminateEpsilonProductions();
    this.addNewStartSymbol(epsilonProductions);
    return new CNF(this.cfg.productionRules, this.cfg.startSymbol);
  }
}
