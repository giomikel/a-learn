import { convertNFAToRegex } from "../nfa-to-regex/nfa-to-regex.mjs"

function convertDFAToRegex(dfa) {
    const regex = convertNFAToRegex(dfa);
    return regex;
}

export { convertDFAToRegex }
