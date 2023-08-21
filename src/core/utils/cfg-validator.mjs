
	function validateSelfInfiniteProductions(cfg) {	
    for (const [key, value] of cfg.productionRules) {
       for (const element of value){
          if (!element.includes(key)){
             return true;
          }
       }
       
    }
    throw new Error("Self infinite production detected");
  }

  function validateVariables(cfg){
    for (const [, value] of cfg.productionRules) {
        for (const element of value){
          for (const char of element){
              if (/[A-Z]/.test(char) && !cfg.productionRules.has(char)){
                throw new Error("Nonterminal character should be cfg variable");
              }
          }
        }
    }
    return true;
  }


  function validateCFG(cfg){
    return validateVariables(cfg) && validateSelfInfiniteProductions(cfg);
  }

  export default validateCFG;
