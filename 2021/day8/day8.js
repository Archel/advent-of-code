const { readCsvFile } = require('../common/csv');
const path = require('path');

const digits = {
    0: 'abcefg',
    1: 'cf',
    2: 'acdeg',
    3: 'acdfg',
    4: 'bcdf',
    5: 'abdfg',
    6: 'abdefg',
    7: 'acf',
    8: 'abcdefg',
    9: 'abcdfg',
}

const searchDigits = (digitsToSearch, signals) => {
    const lengtsToSearch = digitsToSearch.map((digit) => digits[digit].length);
    let numberOfHits = 0;
    const allSignals = signals.flat();
    allSignals.forEach(signal => {
        if (lengtsToSearch.includes(signal.length)) {
            numberOfHits++;
        }
    });

    return numberOfHits;
} 

(async () => {
    const mapper = ([row]) => row.split(" | ")[1].split(" ");

    // const input = await readCsvFile(`${path.resolve(__dirname)}/example.csv`, mapper, '\n');
    const input = await readCsvFile(`${path.resolve(__dirname)}/input.csv`, mapper, '\n');
    const numberOfHits = searchDigits([1,4,7,8], input);
    console.log(numberOfHits);
})();