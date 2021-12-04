const { readCsvFile } = require('../common/csv');
const path = require('path');
const util = require('util')

class BingoCard {
    constructor(card) {
        this.rows = card;
        this.columns = card[0].map((val, index) => card.map(row => row[index]))
    }

    markNumberIfPresent(number) {
        const row = this.rows.find(row => {
            return row.includes(number);
        });

        const column = this.columns.find(column => {
            return column.includes(number);
        });

        if (row) {
            const indexOfNumber = row.indexOf(number);
            row.splice(indexOfNumber, 1);
        }

        if (column) {
            const indexOfNumber = column.indexOf(number);
            column.splice(indexOfNumber, 1);
        }
    }

    hasWinningCombination() {
        const emptyRow = this.rows.find((row) => row.length === 0);
        const emptyColumn = this.columns.find((column) => column.length === 0);
        return emptyRow?.length === 0 || emptyColumn?.length === 0;
    }

    calculateScore(number) {
        return this.rows.flat().reduce((a, b) => a + b) * number;
    }
}

function cardsParser(unparsedCards) {
    const cards = [];
    let rows = [];
    unparsedCards.forEach((unparsedCardLine, index) => {
        if (unparsedCardLine[0] === '' || index === unparsedCards.length - 1) {
            cards.push(new BingoCard([...rows]));
            rows = [];
            return;
        }

        rows.push(
            unparsedCardLine[0].split(' ')
                .filter((element) => element.trim() !== '')
                .map((element) => parseInt(element))
        );
    });
    return cards;
}

(async () => {
    //PART 1
    await (async () => {
        const input = await readCsvFile(`${path.resolve(__dirname)}/input.csv`, (row) => row, '\n');
        // const input = await readCsvFile(`${path.resolve(__dirname)}/example.csv`, (row) => row, '\n');
        const bingoSequence = (''.concat(input[0][0])).split(',');

        const unparsedCards = input.slice(2, input.length);
        const cards = cardsParser(unparsedCards);
        let i = 0;
        let winningCard = false;
        while (i < bingoSequence.length - 1 && !winningCard) {
            cards.forEach(card => card.markNumberIfPresent(parseInt(bingoSequence[i])));
            i++;
            winningCard = cards.find((card) => card.hasWinningCombination())
        }

        console.log(`PART 1: The final bingo score is: ${winningCard.calculateScore(bingoSequence[i - 1])}`)
    })()

    //PART 2
    await (async () => {
        const input = await readCsvFile(`${path.resolve(__dirname)}/input.csv`, (row) => row, '\n');
        // const input = await readCsvFile(`${path.resolve(__dirname)}/example.csv`, (row) => row, '\n');
        const bingoSequence = (''.concat(input[0][0])).split(',');

        const unparsedCards = input.slice(2, input.length);
        const cards = cardsParser(unparsedCards);
        let i = 0;
        let remainingCards = cards;
        while (i < bingoSequence.length - 1 && remainingCards.length !== 1) {
            cards.forEach(card => card.markNumberIfPresent(parseInt(bingoSequence[i])));
            i++;
            remainingCards = cards.filter((card) => !card.hasWinningCombination())
        }

        const lastCard = remainingCards[0];
        while(i < bingoSequence.length - 1 && !lastCard.hasWinningCombination()) {
            lastCard.markNumberIfPresent(parseInt(bingoSequence[i]));
            i++;
        }
        
        console.log(`PART 2: The final bingo score is: ${lastCard.calculateScore(bingoSequence[i - 1])}`)
    })()

})()