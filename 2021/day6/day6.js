
function simulate(lanternFishes, days) {
    let grouppedByLanternFishes = lanternFishes.reduce((acc, lanternFishAge) => {
        if (!acc[lanternFishAge]) {
            acc[lanternFishAge] = 0;
        }
        acc[lanternFishAge]++;

        return acc;
    }, {});

    for (let i = 0; i < days; i++) {
        grouppedByLanternFishes = calculateDay(grouppedByLanternFishes);
    }
    

    return Object.values(grouppedByLanternFishes).reduce((a, b) => a + b);

    function calculateDay(grouppedByLanternFishes) {
        let newLanternFishes = {};
        Object.entries(grouppedByLanternFishes).forEach(([key, value]) => {
            if (parseInt(key) === 0) {
                if (!newLanternFishes[8]) {
                    newLanternFishes[8] = 0;
                }
                newLanternFishes[8] += value;

                if(!newLanternFishes[6]) {
                    newLanternFishes[6] = 0;
                }

                newLanternFishes[6] += value;
            } else {
                if (!newLanternFishes[key - 1]) {
                    newLanternFishes[key - 1] = 0;
                }
    
                newLanternFishes[key - 1] += value;
            }            
        });

        return newLanternFishes;
    }
}

function executePart1() {
    // const input = [3, 4, 3, 1, 2];
    const input = [1, 4, 1, 1, 1, 1, 5, 1, 1, 5, 1, 4, 2, 5, 1, 2, 3, 1, 1, 1, 1, 5, 4, 2, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 5, 1, 4, 1, 1, 4, 1, 1, 1, 1, 4, 1, 1, 5, 5, 1, 1, 1, 4, 1, 1, 1, 1, 1, 3, 2, 1, 1, 1, 1, 1, 2, 3, 1, 1, 2, 1, 1, 1, 3, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 3, 1, 1, 1, 3, 3, 5, 1, 4, 1, 1, 5, 1, 1, 4, 1, 5, 3, 3, 5, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 5, 5, 1, 1, 4, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 4, 1, 1, 1, 1, 3, 1, 2, 3, 4, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 4, 2, 5, 2, 1, 1, 4, 1, 1, 5, 1, 1, 5, 1, 5, 5, 1, 3, 5, 1, 1, 5, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 4, 3, 1, 1, 4, 1, 4, 1, 1, 1, 1, 4, 1, 4, 4, 4, 3, 1, 1, 3, 2, 1, 1, 1, 1, 1, 1, 1, 4, 1, 3, 1, 1, 1, 1, 1, 1, 1, 5, 2, 4, 2, 1, 4, 4, 1, 5, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 4, 2, 3, 2, 1, 1, 2, 1, 5, 2, 1, 1, 4, 1, 4, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 2, 1, 1, 2];
    // const days = 18;
    const days = 80;
    // const days = 256;
    const newFishes = simulate(input, days);
    console.log(`The number of lantern fishes after ${days} is ${newFishes}`);
}

function executePart2() {
    // const input = [3, 4, 3, 1, 2];
    const input = [1, 4, 1, 1, 1, 1, 5, 1, 1, 5, 1, 4, 2, 5, 1, 2, 3, 1, 1, 1, 1, 5, 4, 2, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 5, 1, 4, 1, 1, 4, 1, 1, 1, 1, 4, 1, 1, 5, 5, 1, 1, 1, 4, 1, 1, 1, 1, 1, 3, 2, 1, 1, 1, 1, 1, 2, 3, 1, 1, 2, 1, 1, 1, 3, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 3, 1, 1, 1, 3, 3, 5, 1, 4, 1, 1, 5, 1, 1, 4, 1, 5, 3, 3, 5, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 5, 5, 1, 1, 4, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 4, 1, 1, 1, 1, 3, 1, 2, 3, 4, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 4, 2, 5, 2, 1, 1, 4, 1, 1, 5, 1, 1, 5, 1, 5, 5, 1, 3, 5, 1, 1, 5, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 4, 3, 1, 1, 4, 1, 4, 1, 1, 1, 1, 4, 1, 4, 4, 4, 3, 1, 1, 3, 2, 1, 1, 1, 1, 1, 1, 1, 4, 1, 3, 1, 1, 1, 1, 1, 1, 1, 5, 2, 4, 2, 1, 4, 4, 1, 5, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 4, 2, 3, 2, 1, 1, 2, 1, 5, 2, 1, 1, 4, 1, 4, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 2, 1, 1, 2];
    // const days = 18;
    const days = 256;
    const newFishes = simulate(input, days);
    console.log(`The number of lantern fishes after ${days} is ${newFishes}`);
}


executePart1();
executePart2();