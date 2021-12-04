const csv = require('csv');
const fs = require('fs');

const readCsvFile = (fileName, mapper = (row) => row, delimiter) => {
    return new Promise((resolve, reject) => {
        const rows = [];
        fs.createReadStream(fileName)
            .pipe(csv.parse({
                delimiter: delimiter
            }))
            .on('data', (row) => {
                rows.push(mapper(row))
            })
            .on('error', (err) => reject(err))
            .on('end', () => resolve(rows));
    });
}

module.exports = {
    readCsvFile
}