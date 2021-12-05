const { readCsvFile } = require('../common/csv');
const path = require('path');

function numberOfVentLinesOverlaps(ventLines) {
    const linesOfOverlap = ventLines
    .filter(({from, to}) => from[0] === to[0] || from[1] === to[1])
    .map(calculateAllPoints)
    .flat()
    .reduce((acc, coordinate) => {
        const key = coordinate.join(',');
        if (!acc[key]) {
            acc[key] = 0;
        }
        acc[key]++;

        return acc;
    }, {});

    return Object.entries(linesOfOverlap).filter(([key, value]) => {
        return value > 1;
    }).length
}

function numberOfVentLinesOverlapsWithDiagonals(ventLines) {
    const linesOfOverlap = ventLines
    .map(calculateAllPoints)
    .flat()
    .reduce((acc, coordinate) => {
        const key = coordinate.join(',');
        if (!acc[key]) {
            acc[key] = 0;
        }
        acc[key]++;

        return acc;
    }, {});

    return Object.entries(linesOfOverlap).filter(([key, value]) => {
        return value > 1;
    }).length
}

function calculateAllPoints({from, to}) {
    let actualPoint = { x: from[0], y: from[1] };
    const points = [from];
    
    while(actualPoint.x !== to[0] || actualPoint.y !== to[1]) {
        let nextY;
        let nextX;

        if (actualPoint.x > to[0]) {
            nextX = actualPoint.x-1;
        } else if(actualPoint.x === to[0]) {
            nextX = actualPoint.x;
        } else {
            nextX = actualPoint.x+1;
        }

        if (actualPoint.y > to[1]) {
            nextY = actualPoint.y-1;
        } else if(actualPoint.y === to[1]) {
            nextY = actualPoint.y;
        } else {
            nextY = actualPoint.y+1;
        }

        points.push([nextX, nextY]);
        actualPoint = {
            x: nextX,
            y: nextY
        }
    }

    return points;
}

(async () => {
    const mapper = ([ventLine]) => {
        const [from, to] = ventLine.split(' -> ');
        return {
            from: from.split(',').map((n) => parseInt(n)),
            to: to.split(',').map((n) => parseInt(n)),
        }
    };

    const input = await readCsvFile(`${path.resolve(__dirname)}/input.csv`, mapper, '\n');
    // const input = await readCsvFile(`${path.resolve(__dirname)}/example.csv`, mapper, '\n');
    console.log(`The number of danger zones is: ${numberOfVentLinesOverlaps(input)}`);
    console.log(`The number of danger zones with diagonals is: ${numberOfVentLinesOverlapsWithDiagonals(input)}`);
})()
