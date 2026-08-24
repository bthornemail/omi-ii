function mulberry32(a) {
    return function() {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        var t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// Using an initial state of 123456:
const rand = mulberry32(123456);
rand(); // 0.38233304349705577
rand(); // 0.7972629074938595
rand(); // 0.9965302373748273
Have you ever had this much fun ??

    Being randomly predictable in two dimensions
This time, we'll reseed our random function for each column:

const size = props.get('--pixel-gradient-size').value;
ctx.fillStyle = props.get('--pixel-gradient-color');

let seed = props.get('--pixel-gradient-seed').value;

for (let x = 0; x < bounds.width; x += size) {
    // Create a new rand() for this column:
    const rand = mulberry32(seed);
    // Increment the seed for next time:
    seed++;

    for (let y = 0; y < bounds.height; y += size) {
        const pos = (y + size / 2) / bounds.height;
        if (rand() < pos) ctx.fillRect(x, y, size, size);
    }
}
And here it is:

Hello
Animate width
Animate height
Animate colours
Animate box size
Change text
Animate box - shadow
Animate blur
Increment seed
Now height and block size animate in a more natural way! But there's one last thing to fix. By incrementing the seed by 1 for each column we've introduced visual predictability into our pattern.You can see this if you 'increment seed' – instead of producing a new random pattern, it shifts the pattern along(until it gets past JavaScript's maximum safe integer, at which point spooky things happen). Instead of incrementing the seed by 1, we want to change it in some way that feels random, but is 100% deterministic. Oh wait, that's what our rand() function does!

In fact, let's create a version of mulberry32 that can be 'forked' for multiple dimensions:

function randomGenerator(seed) {
        let state = seed;

        const next = () => {
            state |= 0;
            state = (state + 0x6d2b79f5) | 0;
            var t = Math.imul(state ^ (state >>> 15), 1 | state);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };

        return {
            next,
            // Instead of incrementing, set the seed
            // to a 'random' 32 bit value:
            fork: () => randomGenerator(next() * 2 ** 32),
        };
    }
We use a random 32 bit value, since that's the amount of state mulberry32 works with. Then our paint method can use that:

const size = props.get('--pixel-gradient-size').value;
ctx.fillStyle = props.get('--pixel-gradient-color');
const seed = props.get('--pixel-gradient-seed').value;
// Create our initial random generator:
const randomXs = randomGenerator(seed);

for (let x = 0; x < bounds.width; x += size) {
    // Then fork it for each column:
    const randomYs = randomXs.fork();

    for (let y = 0; y < bounds.height; y += size) {
        const pos = (y + size / 2) / bounds.height;
        if (randomYs.next() < pos) ctx.fillRect(x, y, size, size);
    }
}
And here it is:

// We'll split the element up
// into 300x300 cells:
const gridSize = 300;
const density = props.get('--confetti-density').value;
const seed = props.get('--confetti-seed').value;
// Create our initial random generator:
const randomXs = randomGenerator(seed);

for (let x = 0; x < bounds.width; x += gridSize) {
    // Fork it for each column:
    const randomYs = randomXs.fork();

    for (let y = 0; y < bounds.height; y += gridSize) {
        // Fork it again for each cell:
        const randomItems = randomYs.fork();

        for (let _ = 0; _ < density; _++) {
            const confettiX = randomItems.next() * gridSize + x;
            const confettiY = randomItems.next() * gridSize + y;
            // TODO: Draw confetti at
            // confettiX, confettiY.
        }
    }
}
This time we have 3
