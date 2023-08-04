function checkParenthesis(expression) {
    const stack = [];
  
    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
  
      if (char === '(') {
        stack.push(char);
      } else if (char === ')') {
        if (stack.length === 0 || stack.pop() !== '(') {
          return false; 
        }
      }
    }
  
    return stack.length === 0; 
  }

  function checkPrevFollCharsUn(expression, invalidPreviousChars, invalidFollowingChars, index){
    return invalidPreviousChars.includes(expression[index-1]) || invalidFollowingChars.includes(expression[index+1]);

  }

  function checkPrevFollCharsSt(expression, index){
    return expression[index-1] !== ')' || expression[index+1] === '*';
  }

  function checkSpecialSymbols(expression){
    if (expression[0] === '|' || expression[0] === '*' || expression[expression.length-1] === '|' || (expression[expression.length-1] === '*' && expression[expression.length-2] !== ')')){
        return false;
    }

    for(let i = 1; i < expression.length-1; i++){
      const char = expression[i];
      if (char === '|'){
        if (checkPrevFollCharsUn(expression, ['|', '('], ['*', '|', ')'], i)) {
          return false;
        }
      }else if (char === '*'){
          if(checkPrevFollCharsSt(expression, i)){
            return false;
          }
      }
    }
    return true;
  }

	function validateCharacters(expression) {	
    const regex = /^[a-zA-Z0-9()*|]+$/i;	
    return regex.test(expression);	
  }

  function checkLength(expression){
    return expression.length !== 0;
  }


  function validateExpression(expression){
    return checkLength(expression) && validateCharacters(expression) && checkParenthesis(expression) && checkSpecialSymbols(expression);
  }

  export default validateExpression;
