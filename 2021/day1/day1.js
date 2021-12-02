const { readCsvFile } = require('../common/csv');
const path = require('path');


function mesuramentIncresedTimes(input) {
    let increases = 0;
    input.reduce((prev, current) => {
        if (current > prev) {
            increases++;
        }
        return current;
    })

    return increases;
}

function mesuramentIncresedTimesByWindowMesuraments(input) {
    const mesuramentsGrouppedByWindow = groupByWindow(input);
    return mesuramentIncresedTimes(mesuramentsGrouppedByWindow);
}

function groupByWindow(input) {
    return input.map(
        (_, index) => input.slice(index, index+3)
    )
    .filter((combinations) => combinations.length === 3)
    .map((subarray) => subarray.reduce((acc, mesurament) => acc + mesurament));
}




(async () => {
    const mapper = (row) => parseInt(row[0])
    const input = await readCsvFile(`${path.resolve(__dirname)}/input.csv`, mapper);
    // const input = await readCsvFile(`${path.resolve(__dirname)}/example.csv`, mapper);

    //PART 1    
    console.log(`number of increases for part 1: ${mesuramentIncresedTimes(input)}`);
    //PART 2
    console.log(`number of increases for part 2: ${mesuramentIncresedTimesByWindowMesuraments(input)}`);
})()