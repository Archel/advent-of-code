const { readCsvFile } = require('../common/csv');
const path = require('path');

function runDiagonostic(diagnostic) {
    const diagnosticLineLenght = diagnostic[0].length;
    const gammaRate = [];
    for(let i = 0; i < diagnosticLineLenght; i++) {
        let numberOfOnes = 0;
        let numberOfZeros = 0;
        for(let j =0; j < diagnostic.length; j++) {
            if (diagnostic[j][i] === '1') {
                numberOfOnes++;
            }

            if (diagnostic[j][i] === '0') {
                numberOfZeros++;
            }
        }

        gammaRate.push(numberOfOnes > numberOfZeros ? 1 : 0);
    }

    const epsilonRate = gammaRate.map((digit) => digit === 1 ? 0 : 1);
    return {
        gammaRate,
        epsilonRate
    }
}

function calculateOxygenGeneratorRating(diagnostic) {
    let remainingCombinations = [...diagnostic];
    const diagnosticLineLenght = diagnostic[0].length;
    let i = 0;
    while(remainingCombinations.length != 1 && i < diagnosticLineLenght) {
        const diagnosticWithZero = remainingCombinations.filter((line) => line[i] === '0');
        const diagnosticWithOne = remainingCombinations.filter((line) => line[i] === '1');
        remainingCombinations = diagnosticWithOne.length >= diagnosticWithZero.length ? diagnosticWithOne : diagnosticWithZero;
        i++;
    }

    return parseInt(remainingCombinations[0].join(''), 2);
}

function calculateCO2ScrubberRating(diagnostic) {
    let remainingCombinations = [...diagnostic];
    const diagnosticLineLenght = diagnostic[0].length;
    let i = 0;
    while(remainingCombinations.length != 1 && i < diagnosticLineLenght) {
        const diagnosticWithZero = remainingCombinations.filter((line) => line[i] === '0');
        const diagnosticWithOne = remainingCombinations.filter((line) => line[i] === '1');
        remainingCombinations = diagnosticWithOne.length >= diagnosticWithZero.length ? diagnosticWithZero : diagnosticWithOne;
        i++;
    }

    return parseInt(remainingCombinations[0].join(''), 2);
}


(async () => {
    const mapper = ([diagnostic]) => diagnostic.split('');

    const input = await readCsvFile(`${path.resolve(__dirname)}/input.csv`, mapper, ' ');
    // const input = await readCsvFile(`${path.resolve(__dirname)}/example.csv`, mapper, ' ');
    // PART 1
    const { gammaRate, epsilonRate } = runDiagonostic(input);
    console.log(`Gamma Rate: ${parseInt(gammaRate.join(''), 2)}\nEpsilon rate: ${parseInt(epsilonRate.join(''), 2)}\nPower consumption: ${parseInt(gammaRate.join(''), 2) * parseInt(epsilonRate.join(''), 2)}`);
    // PART 2
    const oxigenGeneratorRating = calculateOxygenGeneratorRating(input);
    const co2ScrubberRating = calculateCO2ScrubberRating(input);
    
    console.log(`Oxygen generator rating: ${oxigenGeneratorRating}\nCO2 Scrubber Rating: ${co2ScrubberRating}\nLife support rating: ${oxigenGeneratorRating*co2ScrubberRating}`)
})()