import regexToNFA from "../regex-to-nfa/regex-to-nfa.mjs"
import { convertNFAToDFA } from "../nfa-to-dfa/nfa-to-dfa.mjs"

function convertRegexToDFA(regex) {
    const nfa = regexToNFA(regex);
    const dfa = convertNFAToDFA(nfa);
    return dfa;
}
