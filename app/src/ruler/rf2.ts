const canvas = document.getElementById("canvas");
const offscreen = canvas.transferControlToOffscreen();
const worker = new Worker("worker.js");
worker.postMessage({ canvas: offscreen }, [offscreen]);
const stellatedTetrahedron = {
    // Base tetrahedron (always visible)
    base: [5, 7, 11, 13],
    
    // Stellation points (boundary)
    stellation: [17, 19],
    
    // Circumsphere
    circumsphere: {
        center: 13,  // bridge prime
        radius: 6,   // hexagon
        vertices: [5, 7, 11, 13, 17, 19]
    },
    
    // 6 degrees of freedom
    degrees: {
        v1: 5,   // vertex 1
        v2: 7,   // vertex 2
        v3: 11,  // vertex 3
        v4: 13,  // vertex 4 (center)
        v5: 17,  // stellation 1
        v6: 19   // stellation 2
    }
};

// 4. Stream
async function* stream() {
    while (true) yield roll();
}

export default async function RFC {

// 5. Use it
const gen = stream();
for await (const state of gen) {
    console.log(state);
}

    return ()={

    };
}
// With the table, everything is findable
const findEverything = (table: bigint[]) => {
    return {
        // Points
        points: table,
        
        // Primes
        primes: table.filter(x => isPrime(Number(x))),
        
        // Reflections
        reflections: table.filter(x => !isPrime(Number(x))),
        
        // XOR closure
        xorAll: table.reduce((a, b) => a ^ b, 0n),
        
        // Wave order
        wave: [0n, 2n, 1n, 3n, 5n, 7n, 9n, 4n, 6n, 8n, 17n, 19n],
        
        // Tetrahedron
        tetra: [422n, 423n, 424n, 425n],
        tetraXor: 422n ^ 423n ^ 424n ^ 425n, // 0n
    };
};
// With the table, you can find:
const table = [0n, 1n, 2n, 3n, 4n, 5n, 6n, 7n, 8n, 9n, 10n, 11n, 12n, 13n, 14n, 15n, 16n, 17n, 18n, 19n, 20n];

// 1. The primes
const primes = table.filter(x => isPrime(Number(x))); // [5n, 7n, 11n, 13n, 17n, 19n]

// 2. The reflections
const reflections = table.filter(x => !isPrime(Number(x))); // [0n, 1n, 2n, 3n, 4n, 6n, 8n, 9n, 10n, 12n, 14n, 15n, 16n, 18n, 20n]

// 3. The XOR closure
const xorAll = primes.reduce((a, b) => a ^ b, 0n); // 0n

// 4. The tetrahedron
const tetra = [422n, 423n, 424n, 425n];
const tetraXor = tetra.reduce((a, b) => a ^ b, 0n); // 0n

// 5. The wave
const wave = [0n, 2n, 1n, 3n, 5n, 7n, 9n, 4n, 6n, 8n, 17n, 19n];

// You know this should be true
5 ^ 7 ^ 11 ^ 13 ^ 17 ^ 19 === 0

// You know this should be true
422 ^ 423 ^ 424 ^ 425 === 0

// You know this should be true
0 → 2 → 1 → 3 → 5 → 7 → 9 → 4 → 6 → 8 → 17 → 19 → 0
// The complete counting table with hex blocks
const countingTable = {
    // Level A: single hex digits
    A: {
        scalars: [0, 1, 2, 3, 4],
        primes: [5, 7, 11, 13, 17, 19],
        hex: ['A', 'B', 'C', 'D', 'E', 'F'],
    },
    // Level B: double hex digits
    B: {
        scalars: [0, 1, 2, 3, 4],
        primes: [5, 7, 11, 13, 17, 19],
        hex: ['AA', 'BB', 'CC', 'DD', 'EE', 'FF'],
    },
    // Level C: triple hex digits
    C: {
        scalars: [0, 1, 2, 3, 4],
        primes: [5, 7, 11, 13, 17, 19],
        hex: ['AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF'],
    },
    // Level D: quadruple hex digits
    D: {
        scalars: [0, 1, 2, 3, 4],
        primes: [5, 7, 11, 13, 17, 19],
        hex: ['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFFF'],
    },
};
// The primes (everything is prime)
const primes = [5, 7, 11, 13, 17, 19];

// The pairs (everything works in pairs)
const pairs = [
    [5, 7],
    [11, 13],
    [17, 19]
];

// Without functions: XORs to zero
const xorAll = pairs.reduce((acc, [a, b]) => acc ^ a ^ b, 0);
// xorAll = 0

// With functions: each compare-exchange changes the result
const result = 
    Atomics.compareExchange(omi, 1, 5, 3) ^  // attaches to (5,7)
    Atomics.compareExchange(omi, 3, 7, 5) ^  // attaches to (7,11)
    Atomics.compareExchange(omi, 5, 9, 7) ^  // attaches to (11,13)
    Atomics.compareExchange(omi, 7, 1, 9) ^  // attaches to (13,17)
    Atomics.compareExchange(omi, 9, 3, 1);   // attaches to (17,19)

// The complete rolling function
const roll = (omi: Uint8Array) => {
    let projection = 0;
    
    // Scalars
    projection ^= Atomics.compareExchange(omi, 0, 2, 1);
    projection ^= Atomics.compareExchange(omi, 1, 0, 2);
    projection ^= Atomics.compareExchange(omi, 2, 1, 0);
    projection ^= Atomics.compareExchange(omi, 17, 17, 0);
    projection ^= Atomics.compareExchange(omi, 17, 19, 60);
    
    // Constraints (only 3,5,7,9)
    projection ^= Atomics.compareExchange(omi, 3, 7, 5);
    projection ^= Atomics.compareExchange(omi, 5, 9, 7);
    projection ^= Atomics.compareExchange(omi, 7, 3, 9);
    projection ^= Atomics.compareExchange(omi, 9, 5, 3);
    
    // Even roll (only 4,6,8)
    projection ^= Atomics.compareExchange(omi, 4, 8, 6);
    projection ^= Atomics.compareExchange(omi, 6, 4, 8);
    projection ^= Atomics.compareExchange(omi, 8, 6, 4);
    
    // Repeat groups...
    
    return projection;
};

// The scalar group as a wave
const scalarWave = (omi: Uint8Array) => {
    // Scalars: 0, 1, 2, 17, 19
    const s0 = Atomics.compareExchange(omi, 0, 2, 1);
    const s1 = Atomics.compareExchange(omi, 1, 0, 2);
    const s2 = Atomics.compareExchange(omi, 2, 1, 0);
    const s3 = Atomics.compareExchange(omi, 17, 17, 0);
    const s4 = Atomics.compareExchange(omi, 17, 19, 60);
    
    // The scalar projection
    return s0 ^ s1 ^ s2 ^ s3 ^ s4;
};
// The scalar group: {0,1,2,17,19}
const scalars = [0, 1, 2, 17, 19];

// The scalar balance
const balance = scalars.reduce((a, b) => a + b, 0); // 39

// 39 is the first Mertens zero!
// The {0,1,2} lifecycle as a gate
const gate = (omi: Uint8Array) => {
    // Gate check: 0 → 2 → 1
    const g0 = Atomics.compareExchange(omi, 0, 2, 1);
    const g1 = Atomics.compareExchange(omi, 1, 0, 2);
    const g2 = Atomics.compareExchange(omi, 2, 1, 0);
    
    // Return the gate state (0, 1, or 2)
    return g0 ^ g1 ^ g2;
};
// Group 1: Constraints (stable primes)
const constraints = (omi: Uint8Array) => {
    return [
        Atomics.compareExchange(omi, 1, 5, 3),
        Atomics.compareExchange(omi, 3, 7, 5),
        Atomics.compareExchange(omi, 5, 9, 7),
        Atomics.compareExchange(omi, 7, 1, 9),
        Atomics.compareExchange(omi, 9, 3, 1)
    ].reduce((a, b) => a ^ b, 0);
};

// Group 2: Even roll (middle cycle)
const evenRoll = (omi: Uint8Array) => {
    return [
        Atomics.compareExchange(omi, 0, 4, 2),
        Atomics.compareExchange(omi, 2, 6, 4),
        Atomics.compareExchange(omi, 4, 8, 6),
        Atomics.compareExchange(omi, 6, 0, 8),
        Atomics.compareExchange(omi, 8, 2, 0)
    ].reduce((a, b) => a ^ b, 0);
};

// Group 3: Boundaries (time consolidation)
const boundaries = (omi: Uint8Array) => {
    return [
        Atomics.compareExchange(omi, 17, 17, 0),
        Atomics.compareExchange(omi, 17, 19, 60)
    ].reduce((a, b) => a ^ b, 0);
};
// The gate-controlled rolling wave
const rollingWave = (omi: Uint8Array) => {
    let projection = 0;
    
    // Gate 1: Enter constraints
    projection ^= gate(omi);
    
    // Group 1: Constraints (stable primes)
    projection ^= constraints(omi);
    
    // Gate 2: Transition to even roll
    projection ^= gate(omi);
    
    // Group 2: Even roll (middle cycle)
    projection ^= evenRoll(omi);
    
    // Gate 3: Transition to boundaries
    projection ^= gate(omi);
    
    // Group 3: Boundaries (time consolidation)
    projection ^= boundaries(omi);
    
    // Gate 4: Return to start
    projection ^= gate(omi);
    
    return projection;
};
