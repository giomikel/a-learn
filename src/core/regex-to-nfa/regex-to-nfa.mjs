import Edge from './edge.mjs';
import Automata from './automata.mjs';

var automata_stack = [];

function noSpecialSignAtProvidedIndex(expression, index){
	return expression[index]!=='|'&&expression[index]!=='*'&&expression[index]!=='('&&expression[index]!==')'&&expression[index]!=='.';
}

function postfix(expression){
    var result = "";
	const chr_stack = []
	for(let i=0; i<expression.length; i++){
		if(noSpecialSignAtProvidedIndex(expression, i)){
			result+=expression[i];
		
		}else{
			if(chr_stack.length === 0){
				chr_stack.push(expression[i]);
			
			}else{
		    	if(expression[i]==='('){
					chr_stack.push(expression[i]);
		    		
		    	}else if( expression[i]==='*'){
		    		if(chr_stack[chr_stack.length - 1]!=='*'){
						chr_stack.push(expression[i]);
		    		}else{
			      	 while(chr_stack.length !== 0 && chr_stack[chr_stack.length - 1]==='*'){
			    			result+=chr_stack[stack.length - 1];
			    			chr_stack.pop();
			    		}
			    		chr_stack.push(expression[i]);
			    		
		    		}
		    	}else if(expression[i]==='.'){
				   if(chr_stack[chr_stack.length - 1]!=='*' && chr_stack[chr_stack.length - 1]!=='.'){
					   chr_stack.push(expression[i]);
				   
				   }else{
				   	   while(chr_stack.length !== 0 && (chr_stack[chr_stack.length - 1]==='*'||chr_stack[chr_stack.length - 1]==='.')){
			    			result+=chr_stack[chr_stack.length - 1];
			    			chr_stack.pop();
			    		}
			    		chr_stack.push(expression[i]);
			    	
				   }
			    }else if(expression[i]=='|'){
			    	if(chr_stack[chr_stack.length - 1]=='('){
			    		chr_stack.push(expression[i]);
			    	
			    	}else{
			    		while(chr_stack.length !== 0 && chr_stack[chr_stack.length - 1]!='('){
			    			result+=chr_stack[chr_stack.length - 1];
			    			chr_stack.pop();
			    		}
			    		chr_stack.push(expression[i]);
			    	
			    	}
			    }else{
			    	while(chr_stack[chr_stack.length - 1]!='('){
			    		
			    		result+=chr_stack[chr_stack.length - 1];
			    		chr_stack.pop();
			    	    
			    	}
			    	chr_stack.pop();
			    
			    }
			}
		}
		
	}

	while(chr_stack.length !== 0){
		result+=chr_stack[chr_stack.length - 1];
		chr_stack.pop();
	}
	return result;
}

function isConcatenation(expression, index){
    return expression[index]!=='('&&expression[index]!=='|'&&expression[index+1]!==')'&&expression[index+1]!=='*'&&expression[index+1]!=='|';
}

function isEmptyParentesis(expression, index){
    return expression[index]==='('&& expression[index+1]===')';
}

function insertSigns(expression){
    for(let i=0; i<expression.length-1; i++){
		if(isEmptyParentesis(expression, i)){
			expression=expression.substr(0,i+1)+"#"+expression.substr(i+1);
			i++;
		}else if(isConcatenation(expression, i)){
			expression=expression.substr(0,i+1)+"."+expression.substr(i+1);
			i++;
		}
	}
    return expression;
}

function standart(ch){
	var automata = new Automata();
	automata.n=2;
	automata.a=1;
	automata.t=1;
	var initial_arr = [];
	initial_arr.push(1);
	automata.eIndex=initial_arr;
	var edge = new Edge();
	edge.index=1;
	edge.ch=ch;
	var allEdges = [];

	var nodeEdges = [];
	nodeEdges.push(edge);
   
	allEdges.push(nodeEdges);
    var n_tm = [];
	allEdges.push(n_tm);
	automata.edges = allEdges;
	automata_stack.push(automata);
	
}

function contains(v, num){
   for(let i=0; i<v.length; i++){
	   if(num===v[i])return true;
   }

   return false;
}


function star(){
  var last_aut = automata_stack[automata_stack.length -1];
  automata_stack.pop();
  var nodeEdges = Array.from(last_aut.edges[0]);
  for(let i=0; i<last_aut.eIndex.length; i++){
		for(let j=0; j<nodeEdges.length; j++){
			last_aut.edges[last_aut.eIndex[i]].push(new Edge(nodeEdges[j].index, nodeEdges[j].ch));
		}
  }
  
  
  last_aut.a+=1;
  last_aut.t+=(last_aut.eIndex.length*nodeEdges.length);
  last_aut.eIndex.push(0);
  automata_stack.push(last_aut);
}

function unification(){
   var second_aut=automata_stack[automata_stack.length -1];
   automata_stack.pop();
   var first_aut=automata_stack[automata_stack.length -1];
   automata_stack.pop();	
   for(let i=0; i<second_aut.eIndex.length; i++){
	   second_aut.eIndex[i]+=first_aut.n-1;
   }
   for(let i=0; i<second_aut.edges.length; i++){
	   for(let j=0; j<second_aut.edges[i].length; j++){
		  second_aut.edges[i][j].index+=first_aut.n-1;
	   }
   }
   var edges=second_aut.edges[0];
   var nFirst=first_aut.n+second_aut.n-1;
   for(let i=0; i<edges.length; i++){
		if(edges[i].index===first_aut.n-1){
			var edge=edges[i]; 
			first_aut.edges[0].push(new Edge(edge.index, edge.ch));
		}else{
			first_aut.edges[0].push(new Edge(edges[i].index, edges[i].ch));
		}
	}
	
	for(let i=1; i<second_aut.edges.length; i++){
		var tm_edges = [];
		for(let j=0; j<second_aut.edges[i].length; j++){
            tm_edges.push(new Edge(second_aut.edges[i][j].index, second_aut.edges[i][j].ch));
		}
		first_aut.edges.push(tm_edges);
	}
	   
    if(contains(second_aut.eIndex, first_aut.n-1)){
	   if(!contains(first_aut.eIndex, 0)){
		   first_aut.eIndex.push(0);
		   for(let i=0; i<second_aut.eIndex.length; i++){
				  if(second_aut.eIndex[i]!=first_aut.n-1){
				     first_aut.eIndex.push(second_aut.eIndex[i]);
				  }
		   }
		   first_aut.a+=second_aut.a;
	   }else{
		   for(let i=0; i<second_aut.eIndex.length; i++){
			  
			  first_aut.eIndex.push(second_aut.eIndex[i]);
				  
		   }
		   first_aut.a+=second_aut.a-1;
	   }
	   
   }else{
	   for(let i=0; i<second_aut.eIndex.length; i++){
			  first_aut.eIndex.push(second_aut.eIndex[i]);
		  }
	   first_aut.a+=second_aut.a;
   }	
	first_aut.n=nFirst;
	first_aut.t+=second_aut.t;
	automata_stack.push(first_aut);
}



function concatenation(){
   var second_aut=automata_stack[automata_stack.length -1];
   automata_stack.pop();
   var first_aut=automata_stack[automata_stack.length -1];
   automata_stack.pop();
   for(let i=0; i<second_aut.eIndex.length; i++){
	   second_aut.eIndex[i]+=first_aut.n-1;
   }

   for(let i=0; i<second_aut.edges.length; i++){
	   for(let j=0; j<second_aut.edges[i].length; j++){
		   second_aut.edges[i][j].index+=first_aut.n-1;
	   }
   }

   var edges=second_aut.edges[0];
   var nFirst=first_aut.n+second_aut.n-1;
   var tFirst=first_aut.t+(second_aut.edges[0].length*first_aut.eIndex.length)+second_aut.t-second_aut.edges[0].length;


   for(let j=0; j<first_aut.eIndex.length; j++){
	
		for(let i=0; i<edges.length; i++){
			
			if(edges[i].index===first_aut.n-1){
				var edge=edges[i];
				edge.index=first_aut.eIndex[j];
				first_aut.edges[first_aut.eIndex[j]].push(new Edge(edge.index, edge.ch));
			}else{
				first_aut.edges[first_aut.eIndex[j]].push(new Edge(edges[i].index, edges[i].ch));
			}
	
		}
	}   

	for(let i=1; i<second_aut.edges.length; i++){
		var tm_edges = [];
		for(let j=0; j<second_aut.edges[i].length; j++){
            tm_edges.push(new Edge(second_aut.edges[i][j].index, second_aut.edges[i][j].ch));
		}
		first_aut.edges.push(tm_edges);
	}

    if(contains(second_aut.eIndex, first_aut.n-1)){
	   
		for(let i=0; i<second_aut.eIndex.length; i++){
			if(second_aut.eIndex[i]!==first_aut.n-1){
				first_aut.eIndex.push(second_aut.eIndex[i]);
			}
		}
		first_aut.a+=second_aut.a-1;
   }else{
	    first_aut.eIndex=second_aut.eIndex;
	    first_aut.a=second_aut.a;
   }
   
   first_aut.n=nFirst;
   first_aut.t=tFirst;
   
   automata_stack.push(first_aut);
	
}

function epsilon(){
	var automata = new Automata();
	automata.n=1;
	automata.a=1;
	automata.t=0;
	var initial_arr = [];
	initial_arr.push(0);
	automata.eIndex=initial_arr;
	var nodeEdges = [];
	var allEdges = [];
	allEdges.push(nodeEdges);
	automata.edges=allEdges;
	automata_stack.push(automata);	
}

function iterateOverPostfixExpression(postfix_expression){
    for(let i=0; i<postfix_expression.length; i++){
		switch(postfix_expression[i]){
			case '*': star(); break;
			case '|': unification(); break;
			case '.': concatenation(); break;
			case '#': epsilon(); break;
			default: standart(postfix_expression[i]);
			
			
		}
	}
}

function addEdgeToSet(set, edge){
	for(let existingEdge of set){
		if(existingEdge.equals(edge)){
		   return;
		}
	}
	set.add(edge);
	return;
}



function regexToNFA(expression){
    var modified_expression = insertSigns(expression);
    var postfix_expression = postfix(modified_expression);
	iterateOverPostfixExpression(postfix_expression);
	
	var automata = automata_stack[automata_stack.length -1];
    const s = new Set();
    for (let i = 0; i < automata.eIndex.length; i++) {
        s.add(automata.eIndex[i]);
    }

    let quantity = 0;
    for (let i = 0; i < automata.edges.length; i++) {
		const all_edges = automata.edges[i];
		const unique_edges = new Set();
		for (let j = 0; j < all_edges.length; j++) {
		  addEdgeToSet(unique_edges, all_edges[j]);
		}
		all_edges.length = 0;
		unique_edges.forEach((value) => {
		  all_edges.push(value);
		  quantity++;
		});
		automata.edges[i] = all_edges;
	}
	
    return { automata, s, quantity };
}

export default regexToNFA;
