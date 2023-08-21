import CNF from "../structures/cnf.mjs";
import { EPSILON_IN_CFG } from '../constants.mjs';
import { NON_TERMINAL_SYMBOLS_LIMIT } from '../constants.mjs';

class CNFConverter {
  constructor(cfg) {
    this.cfg = cfg;
    this.currentSymbol = 65; 
    this.generatedNonTerminalSymbolIndex = 0;
    this.initialStartHasEpsilonProduction = false;
  }

  generateAllStateCombinations(state, specialSymbols, index = 0, currentString = EPSILON_IN_CFG, result = []) {
    if (index === state.length) {
      if (currentString !== EPSILON_IN_CFG){
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
    stateList.forEach((Symbol) => {if (epsilonProductions.includes(Symbol)) num++;});
    if (num > 4) {
        throw new Error("Number of nullable elements in single state is out of limit.");
    }
    if(num === 0) return [state];
    return this.generateAllStateCombinations(state, epsilonProductions);
  }

  eliminateEpsilonProductions() {
    let epsilonProductions = [];

    for (let rule of this.cfg.productionRules) {
      if (rule[1].includes(EPSILON_IN_CFG)) {
        epsilonProductions.push(rule[0]);
        if (rule[0] === this.cfg.startSymbol) {
          this.initialStartHasEpsilonProduction = true;
        }
      }
    }

    let updatedProductionRules = new Map();
    for (let rule of this.cfg.productionRules) {
      if (rule[1].includes(EPSILON_IN_CFG)) {
        rule[1] = rule[1].filter((element) => element !== EPSILON_IN_CFG);
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
    let newStartSymbol = this.generateNonTerminal();
    this.cfg.addNonTerminal(newStartSymbol);
    this.cfg.addProductionRule(newStartSymbol, this.cfg.startSymbol);
    for (let state of this.cfg.productionRules.get(this.cfg.startSymbol)){
      if (epsilonProductions.includes(state) || (this.cfg.nonTerminals.has(state) && this.checkChildEpsilonProduction(state, epsilonProductions))){
         this.cfg.addProductionRule(newStartSymbol, EPSILON_IN_CFG);
         break;
      }
    }

    if (this.initialStartHasEpsilonProduction){
      this.cfg.addProductionRule(newStartSymbol, EPSILON_IN_CFG);
    }

    this.cfg.setStartSymbol(newStartSymbol);
  }

  addUnitProductions(state, key, unitProductions){
    if (this.cfg.nonTerminals.has(state) && key !== state){
      unitProductions[key] = unitProductions[key] || [];
      unitProductions[key].push(state);
    } 
  }

  makeUniqueProductions(){
    for (let rule of this.cfg.productionRules){
      let uniqueElements = new Set();
      this.cfg.productionRules.get(rule[0]).map((el) => uniqueElements.add(el));
      this.cfg.productionRules.set(rule[0], Array.from(uniqueElements));
    }
  }

  removeSelfProductions(){
    for (let rule of this.cfg.productionRules){
          this.cfg.productionRules.set(rule[0], this.cfg.productionRules.get(rule[0]).filter((el) => el !== rule[0]));
    }
  }

  eliminateUnitProductions() {
    let unitProductions = {};

    this.removeSelfProductions();

    for (let rule of this.cfg.productionRules) {
      for (let state of rule[1]){
        this.addUnitProductions(state, rule[0], unitProductions);
      }
    }

    while (Object.keys(unitProductions).length > 0) {
      for (let [key, value] of Object.entries(unitProductions)) {
        delete unitProductions[key];

        for (let v of value) {
          let rulesToReplace = this.cfg.productionRules.get(v);
          for (let state of rulesToReplace) {
            this.cfg.productionRules.get(key).push(state);
            this.addUnitProductions(state, key, unitProductions)
          }
        }
      }
    }

    for (let rule of this.cfg.productionRules) {
      let nonTerminalStates = [];
      for (let state of rule[1]){
        if (!this.cfg.nonTerminals.has(state)){
          nonTerminalStates.push(state);
        } 
      }
      this.cfg.productionRules.set(rule[0], nonTerminalStates);
    }
    
    this.makeUniqueProductions();
  }

  generateNonTerminal() {
    if (this.cfg.nonTerminals.length > NON_TERMINAL_SYMBOLS_LIMIT){
      throw new Error("Number of non terminal symbols exceeded the limited quantity in processing");
    }

    while(this.cfg.nonTerminals.has(String.fromCharCode(this.currentSymbol))){
      this.currentSymbol ++;
    }

    return String.fromCharCode(this.currentSymbol);
  }

  getSymbol(mp, key){
    if(mp.has(key)){
      return mp.get(key);
    }
    return this.generateNonTerminal();
  }

  convertLongProductions() {
    let longProductions = [];
    let newNonTermninalProductions = new Map();

    for (let rule of this.cfg.productionRules) {
      for (let state of rule[1]){
        if (state.length > 2){
           longProductions.push([rule[0], state]);
        }else if (state.length === 2 && rule[0] !== this.cfg.startSymbol && rule[1].length === 1){
           newNonTermninalProductions.set(state, rule[0]);
        }
      }
    }

    for (let rule of longProductions) {
      let nonTerminal = rule[0];
      let stateArr = rule[1].split('');
      this.cfg.productionRules.set(nonTerminal, this.cfg.productionRules.get(nonTerminal).filter(element => element !== rule[1]));

      while (stateArr.length > 2) {
        let remainPart = stateArr.slice(1).join("");
        let newNonTerminalSymbol = this.getSymbol(newNonTermninalProductions, remainPart);
        let newState = stateArr[0] + newNonTerminalSymbol;
        this.cfg.addNonTerminal(newNonTerminalSymbol);
        this.cfg.addProductionRule(nonTerminal, newState);
        newNonTermninalProductions.set(remainPart, newNonTerminalSymbol);
        nonTerminal = newNonTerminalSymbol;
        stateArr = stateArr.slice(1);
        if (stateArr.length === 2){
          this.cfg.addProductionRule(nonTerminal, stateArr.join(''));
        }
      }      
    }
    
    this.makeUniqueProductions();
  }

  replaceTerminals() {

    let terminalMap = new Map();
    for (let rule of this.cfg.productionRules){
      if (rule[1].length === 1 && this.cfg.terminals.has(rule[1][0])){
         terminalMap.set(rule[1][0], rule[0]);
      }
    }

    for (let rule of this.cfg.productionRules){
      if (rule[1].length !== 1 || !this.cfg.terminals.has(rule[1][0])){
         let productions = [];
         for (let state of rule[1]){
           let stateArr = state.split('');
           for (let index = 0; index < stateArr.length; index++){
             if (this.cfg.terminals.has(stateArr[index])){
               let nonTerminal = this.getSymbol(terminalMap, stateArr[index]);
               if (!terminalMap.has(stateArr[index])){
                 this.cfg.addNonTerminal(nonTerminal);
                 this.cfg.addProductionRule(nonTerminal, stateArr[index]);
                 terminalMap.set(stateArr[index], nonTerminal);
               }
               stateArr[index] = nonTerminal;
             }
           }
           productions.push(stateArr.join(''));
         }
         this.cfg.productionRules.set(rule[0], productions);
      }
    }
  }

  convertToCNF() {
    let epsilonProductions = this.eliminateEpsilonProductions();
    this.addNewStartSymbol(epsilonProductions);
    this.eliminateUnitProductions();
    this.convertLongProductions();
    this.replaceTerminals();
    return new CNF(this.cfg.productionRules, this.cfg.startSymbol);
  }
}

export default CNFConverter;
