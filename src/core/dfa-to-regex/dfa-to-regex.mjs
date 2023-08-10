import { convertNFAToRegex } from "../nfa-to-regex/nfa-to-regex.mjs"

function convertDFAToRegex(dfa) {
    const regexResult = convertNFAToRegex(dfa);
    return regexResult;
}

export { convertDFAToRegex }
