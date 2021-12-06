function calculateAgeOfNearByLanternFish(lanternFishes) {
    const numberOfNewLanternFishes = lanternFishes.filter((age) => age === 0).length;
    const result = lanternFishes
        .map(lanternFish => {
            if (lanternFish === 0) {
                return 6;
            }
            return lanternFish - 1;
        });

    for (let i = 0; i < numberOfNewLanternFishes; i++) {
        result.push(8);
    }

    return result;
}

function simulate(input, days, consoleLog = false) {
    let lanternFishes = input;
    for (let i = 0; i < days; i++) {
        lanternFishes = calculateAgeOfNearByLanternFish(lanternFishes);
        if (consoleLog) {
            // console.log(`After ${i + 1} day: ${lanternFishes}`);
            console.log(`Simulating day ${i + 1}`);
        }
    }
    
    return lanternFishes.length;
}

function executePart1() {
    // const input = [3, 4, 3, 1, 2];
    const input = [1, 4, 1, 1, 1, 1, 5, 1, 1, 5, 1, 4, 2, 5, 1, 2, 3, 1, 1, 1, 1, 5, 4, 2, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 5, 1, 4, 1, 1, 4, 1, 1, 1, 1, 4, 1, 1, 5, 5, 1, 1, 1, 4, 1, 1, 1, 1, 1, 3, 2, 1, 1, 1, 1, 1, 2, 3, 1, 1, 2, 1, 1, 1, 3, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 3, 1, 1, 1, 3, 3, 5, 1, 4, 1, 1, 5, 1, 1, 4, 1, 5, 3, 3, 5, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 5, 5, 1, 1, 4, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 4, 1, 1, 1, 1, 3, 1, 2, 3, 4, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 4, 2, 5, 2, 1, 1, 4, 1, 1, 5, 1, 1, 5, 1, 5, 5, 1, 3, 5, 1, 1, 5, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 4, 3, 1, 1, 4, 1, 4, 1, 1, 1, 1, 4, 1, 4, 4, 4, 3, 1, 1, 3, 2, 1, 1, 1, 1, 1, 1, 1, 4, 1, 3, 1, 1, 1, 1, 1, 1, 1, 5, 2, 4, 2, 1, 4, 4, 1, 5, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 4, 2, 3, 2, 1, 1, 2, 1, 5, 2, 1, 1, 4, 1, 4, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 2, 1, 1, 2];
    // const days = 18;
    const days = 80;
    const newFishes = simulate(input, days);
    console.log(`The number of lantern fishes after ${days} is ${newFishes}`);
}


executePart1();