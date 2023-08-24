import CFG from '../../core/structures/cfg.mjs';

function createCFG(productions, selectedStartSymbol){
    const cfg = new CFG();
    productions.forEach((element) => {
        cfg.addNonTerminal(element.variable);
        cfg.addProductionRule(element.variable, element.expression);
        [...element.expression].forEach(char => {
            if (/[A-Z]/.test(char)) {
              cfg.addNonTerminal(char);
            } else {
              cfg.addTerminal(char);
            }
          });
    });
    
    cfg.setStartSymbol(selectedStartSymbol);

    return cfg;
}

export default createCFG;
