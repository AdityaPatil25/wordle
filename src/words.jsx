import wordBank from './wordle_bank.txt'
export const boarddefault = [
    ["", "" ,"" ,"" ,"" ,""],
    ["", "" ,"" ,"" ,"" ,""],
    ["", "" ,"" ,"" ,"" ,""],
    ["", "" ,"" ,"" ,"" ,""],
    ["", "" ,"" ,"" ,"" ,""],
    ["", "" ,"" ,"" ,"" ,""],
];

export const generateWordSet = async () => {
    let wordSet;
    let chooseword;
    await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
        const wordArr = result.split("\n");
        chooseword = wordArr[Math.floor(Math.random() * wordArr.length)]
        wordSet = new Set(wordArr);
    })
    return { wordSet, chooseword }
}
