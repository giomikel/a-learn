import { Transition } from "../structures/fsm-transition.mjs";
import { EPSILON_SYMBOL } from "../constants.mjs";
import { FiniteStateMachine } from "../structures/fsm.mjs";

function convertNFAToRegex(nfa) {
    function addNewStartAndFinalStates(nfa) {
        const newStates = [];
        const newTransitions = [];
        const newAcceptStates = [];

        nfa.states.forEach(state => {
            newStates.push(state + 1);
        });
        newStates.splice(0, 0, 0);
        newStates.push(nfa.states.length + 1);

        nfa.transitions.forEach(transition => {
            newTransitions.push(new Transition(transition.fromState + 1, transition.symbol, transition.toState + 1));
        });
        nfa.acceptStates.forEach(acceptState => {
            newTransitions.push(new Transition(acceptState + 1, EPSILON_SYMBOL, nfa.states.length + 1))
        });

        newTransitions.push(new Transition(0, EPSILON_SYMBOL, 1));
        newAcceptStates.push(nfa.states.length + 1);

        return new FiniteStateMachine(newStates, newTransitions, newAcceptStates);
    }

    function buildRegularExpression(nfa) {
        let nextStateToDelete = nfa.startState + 1;
        while (nextStateToDelete != nfa.states.length - 1) {
            let stateTransitions = new Set();
            let newTransitionsToPush = new Set();
            nfa.transitions.forEach(incomingTransition => {
                if (incomingTransition.toState == nextStateToDelete && incomingTransition.fromState != nextStateToDelete) {
                    stateTransitions.add(incomingTransition)
                    nfa.transitions.forEach(outgoingTransition => {
                        if (outgoingTransition.fromState == nextStateToDelete && outgoingTransition.toState != nextStateToDelete) {
                            [stateTransitions, newTransitionsToPush] = buildRegularExpressionForTransitionPair(stateTransitions, nfa, newTransitionsToPush, incomingTransition, outgoingTransition, nextStateToDelete);
                        }
                    });
                }
            });
            newTransitionsToPush.forEach(t => nfa.transitions.push(t));
            nfa.transitions = nfa.transitions.filter(t => !stateTransitions.has(t));
            nextStateToDelete += 1;
        }
        return nfa.transitions.filter(t => t.fromState == nfa.startState && t.toState == nfa.states.length - 1)[0].symbol;
    }

    function buildRegularExpressionForTransitionPair(stateTransitions, nfa, newTransitionsToPush, incomingTransition, outgoingTransition, nextStateToDelete) {
        stateTransitions.add(outgoingTransition);

        let potentialConnectingTransitions = new Set(nfa.transitions);
        newTransitionsToPush.forEach(t => potentialConnectingTransitions.add(t));

        let alreadyConnectingTransitions = new Set();
        alreadyConnectingTransitions = new Set(Array.from(potentialConnectingTransitions).filter(t => t.fromState == incomingTransition.fromState && t.toState == outgoingTransition.toState));
        alreadyConnectingTransitions.forEach(t => stateTransitions.add(t));

        const loopTransitions = nfa.transitions.filter(t => t.fromState == nextStateToDelete && t.toState == nextStateToDelete);

        const finalTransitionRegex = buildRegularExpressionTransitionPairString(alreadyConnectingTransitions, loopTransitions, incomingTransition, outgoingTransition);
        const finalTransition = new Transition(incomingTransition.fromState, finalTransitionRegex, outgoingTransition.toState);

        newTransitionsToPush.add(finalTransition);
        loopTransitions.forEach(t => stateTransitions.add(t));

        return [stateTransitions, newTransitionsToPush];
    }

    function buildRegularExpressionTransitionPairString(alreadyConnectingTransitions, loopTransitions, incomingTransition, outgoingTransition) {
        let loopRegexes = [];
        loopTransitions.forEach(t => loopRegexes.push(`${t.symbol}`));
        const loopRegex = loopRegexes.join('|');

        const incomingSymbol = incomingTransition.symbol == EPSILON_SYMBOL && (outgoingTransition.symbol != EPSILON_SYMBOL || loopRegex != '') ? '' : incomingTransition.symbol;
        const outgoingSymbol = outgoingTransition.symbol == EPSILON_SYMBOL && (incomingTransition.symbol != EPSILON_SYMBOL || loopRegex != '' || incomingSymbol == EPSILON_SYMBOL) ? '' : outgoingTransition.symbol;

        const newTransitionRegex = loopRegex == '' ? `(${incomingSymbol})(${outgoingSymbol})` : `(${incomingSymbol})(${loopRegex})*(${outgoingSymbol})`;

        alreadyConnectingTransitions.add(new Transition(incomingTransition.fromState, newTransitionRegex, outgoingTransition.toState));
        let finalTransitionRegex = Array.from(alreadyConnectingTransitions).map(t => t.symbol).join('|');

        finalTransitionRegex = removeRedundantParentheses(finalTransitionRegex);
        return finalTransitionRegex;
    }

    function removeRedundantParentheses(regex) {
        regex = regex.replace(/\(([^()|*])\)(?!\*)/g, '$1');
        regex = regex.replace(/\(\*\)/g, '');
        regex = regex.replace(/\(\)/g, '');
        regex = regex.replace(/(?<![)\w])\*/g, '');
        return regex;
    }

    function removeEnclosingParentheses(str) {
        if (areEnclosingParenthesesPaired(str)) {
            return str.slice(1, -1);
        }
        return str;
    }

    function areEnclosingParenthesesPaired(str) {
        if (str.length < 2) {
            return false;
        }

        if (str[0] !== '(' || str[str.length - 1] !== ')') {
            return false;
        }

        const stack = [];
        for (let i = 0; i < str.length; i++) {
            if (str[i] === '(') {
                stack.push('(');
            } else if (str[i] === ')') {
                if (stack.length === 0 || (stack.length <= 1 && i != str.length - 1)) {
                    return false;
                }
                stack.pop();
            }
        }

        return stack.length === 0;
    }

    nfa = addNewStartAndFinalStates(nfa);
    let regex = buildRegularExpression(nfa);
    regex = removeRedundantParentheses(regex);
    regex = removeEnclosingParentheses(regex);
    return regex;
}

export { convertNFAToRegex };
