const { readCsvFile } = require('../common/csv');
const path = require('path');

(async () => {
    function executeCommands(submarine, commands) {
        return commands.reduce((submarine, command) => {
            if (command.command === 'down') {
                return {
                    ...submarine,
                    aim: submarine.aim + command.unit
                }
            }

            if (command.command === 'up') {
                return {
                    ...submarine,
                    aim: submarine.aim - command.unit
                }
            }

            if (command.command === 'forward') {
                return {
                    ...submarine,
                    horizontal: submarine.horizontal + command.unit,
                    depth: submarine.depth + (submarine.aim * command.unit)
                }
            }
        }, submarine);
    }

    const mapper = ([command, unit]) => ({
        command,
        unit: parseInt(unit)
    });

    const input = await readCsvFile(`${path.resolve(__dirname)}/input.csv`, mapper, ' ');
    // const input = await readCsvFile(`${path.resolve(__dirname)}/example.csv`, mapper, ' ');
    const submarine = executeCommands({
        depth: 0,
        horizontal: 0,
        aim: 0
    }, input);
    console.log(`The submarine is depth: ${submarine.depth} and horizontal ${submarine.horizontal} the result is ${submarine.depth * submarine.horizontal}`)
})()