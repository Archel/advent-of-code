const csv = require('csv');
const fs = require('fs');

const readCsvFile = (fileName, mapper = (row) => row) => {
    return new Promise((resolve, reject) => {
        const rows = [];
        fs.createReadStream(fileName)
            .pipe(csv.parse())
            .on('data', (row) => {
                rows.push(mapper(row))
            })
            .on('error', () => reject())
            .on('end', () => resolve(rows));
    });
}

module.exports = {
    readCsvFile
}