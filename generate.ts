import { Buffer } from 'node:buffer';

function markerGenerator(seed: number = 0) {
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
        // to a 'marker' 32 bit value:
        fork: () => markerGenerator(next() * 2 ** 32),
    };
}

export default function generate(seed: number = 0, height: number, width: number, density = 2, gridSize = 360) {
    try {
        // Create our initial marker generator:
        const markerXs = markerGenerator(seed);
        for (let x = 0; x < width; x += gridSize) {
            // Fork it for each column:
            const markerYs = markerXs.fork();

            for (let y = 0; y < height; y += gridSize) {
                // Fork it again for each cell:
                const markerItems = markerYs.fork();
                for (let _ = 0; _ < density; _++) {
                    return [markerItems.next() * gridSize + x, markerItems.next() * gridSize + y];
                }
            }
        }
    } catch (e: any) {
        return markerGenerator(parseInt(e.message()));
    }
    return markerGenerator(0);
}
